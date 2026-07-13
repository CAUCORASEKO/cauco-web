<?php

declare(strict_types=1);

const CAUCO_LANGUAGES = ['en', 'fi', 'sv'];
const CAUCO_REQUIRED_SECTIONS = [
    'header',
    'hero',
    'reel',
    'featuredSystems',
    'ecosystem',
    'lab',
    'technicalFocus',
    'engineeringPrinciples',
    'contact',
    'footer',
];
const CAUCO_FORBIDDEN_KEYS = ['__proto__', 'prototype', 'constructor'];

ini_set('display_errors', '0');

function send_admin_security_headers(): void
{
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    header('X-Frame-Options: DENY');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: no-referrer');
    header("Content-Security-Policy: default-src 'none'; base-uri 'none'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; script-src 'self'; style-src 'self'");
}

function request_is_https(): bool
{
    if (!empty($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off') {
        return true;
    }

    if (isset($_SERVER['SERVER_PORT']) && (string) $_SERVER['SERVER_PORT'] === '443') {
        return true;
    }

    return isset($_SERVER['HTTP_X_FORWARDED_PROTO'])
        && strtolower(trim(explode(',', (string) $_SERVER['HTTP_X_FORWARDED_PROTO'])[0])) === 'https';
}

function configuration_is_ready(array $candidate): bool
{
    $requiredKeys = ['password_hash', 'session_name', 'content_dir', 'backup_dir'];
    foreach ($requiredKeys as $key) {
        if (!isset($candidate[$key]) || !is_string($candidate[$key]) || trim($candidate[$key]) === '') {
            return false;
        }
    }

    if (!preg_match('/^[A-Za-z0-9]{1,64}$/', $candidate['session_name'])) {
        return false;
    }

    if ($candidate['password_hash'] === 'REPLACE_WITH_PASSWORD_HASH') {
        return false;
    }

    $passwordInfo = password_get_info($candidate['password_hash']);
    return isset($passwordInfo['algoName']) && $passwordInfo['algoName'] !== 'unknown';
}

send_admin_security_headers();

$configFile = __DIR__ . '/config.php';
$config = [];
$configReady = false;

if (is_file($configFile) && is_readable($configFile)) {
    $loadedConfig = require $configFile;
    if (is_array($loadedConfig) && configuration_is_ready($loadedConfig)) {
        $config = $loadedConfig;
        $configReady = true;
    }
}

$sessionName = $configReady ? $config['session_name'] : 'CAUCOADMIN';
ini_set('session.use_strict_mode', '1');
ini_set('session.use_only_cookies', '1');
session_name($sessionName);
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/admin',
    'domain' => '',
    'secure' => request_is_https(),
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start();

if (!isset($_SESSION['csrf_token']) || !is_string($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function is_authenticated(): bool
{
    return isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true;
}

function require_authentication(): void
{
    if (!is_authenticated()) {
        header('Location: login.php', true, 303);
        exit;
    }
}

function language_is_allowed(string $language): bool
{
    return in_array($language, CAUCO_LANGUAGES, true);
}

function content_path_for_language(array $config, string $language): ?string
{
    if (!language_is_allowed($language)) {
        return null;
    }

    $filenames = [
        'en' => 'en.json',
        'fi' => 'fi.json',
        'sv' => 'sv.json',
    ];

    return rtrim($config['content_dir'], DIRECTORY_SEPARATOR)
        . DIRECTORY_SEPARATOR
        . $filenames[$language];
}

function object_contains_forbidden_key($value): bool
{
    if (is_object($value)) {
        foreach (get_object_vars($value) as $key => $child) {
            if (in_array($key, CAUCO_FORBIDDEN_KEYS, true) || object_contains_forbidden_key($child)) {
                return true;
            }
        }
    } elseif (is_array($value)) {
        foreach ($value as $child) {
            if (object_contains_forbidden_key($child)) {
                return true;
            }
        }
    }

    return false;
}

function object_contains_php_opening_tag($value): bool
{
    if (is_string($value)) {
        return strpos($value, '<?') !== false;
    }

    if (is_object($value)) {
        foreach (get_object_vars($value) as $child) {
            if (object_contains_php_opening_tag($child)) {
                return true;
            }
        }
    } elseif (is_array($value)) {
        foreach ($value as $child) {
            if (object_contains_php_opening_tag($child)) {
                return true;
            }
        }
    }

    return false;
}

function content_document_is_valid($document, string $language): bool
{
    if (!($document instanceof stdClass)) {
        return false;
    }

    if (!property_exists($document, 'language') || $document->language !== $language) {
        return false;
    }

    foreach (CAUCO_REQUIRED_SECTIONS as $section) {
        if (!property_exists($document, $section) || !($document->{$section} instanceof stdClass)) {
            return false;
        }
    }

    return !object_contains_forbidden_key($document)
        && !object_contains_php_opening_tag($document);
}

function decode_content_document(string $json, string $language): ?stdClass
{
    try {
        $document = json_decode($json, false, 512, JSON_THROW_ON_ERROR);
    } catch (Throwable $error) {
        return null;
    }

    return content_document_is_valid($document, $language) ? $document : null;
}
