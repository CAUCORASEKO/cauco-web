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

function reset_configuration_is_ready(array $candidate): bool
{
    if (
        !isset($candidate['reset_email'], $candidate['admin_base_url'], $candidate['runtime_dir'])
        || !is_string($candidate['reset_email'])
        || !is_string($candidate['admin_base_url'])
        || !is_string($candidate['runtime_dir'])
    ) {
        return false;
    }

    if (filter_var($candidate['reset_email'], FILTER_VALIDATE_EMAIL) === false) {
        return false;
    }

    $baseUrl = rtrim(trim($candidate['admin_base_url']), '/');
    $parts = parse_url($baseUrl);
    if (
        !is_array($parts)
        || ($parts['scheme'] ?? '') !== 'https'
        || !isset($parts['host'])
        || !host_is_valid((string) $parts['host'])
        || isset($parts['user'])
        || isset($parts['pass'])
        || isset($parts['query'])
        || isset($parts['fragment'])
    ) {
        return false;
    }

    return is_dir($candidate['runtime_dir']) && is_writable($candidate['runtime_dir']);
}

function host_is_valid(string $host): bool
{
    return preg_match(
        '/^(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)*[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/D',
        $host
    ) === 1;
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
    global $config, $configReady;

    return $configReady
        && isset($_SESSION['authenticated'], $_SESSION['password_version'])
        && $_SESSION['authenticated'] === true
        && is_int($_SESSION['password_version'])
        && $_SESSION['password_version'] === password_version($config);
}

function require_authentication(): void
{
    if (!is_authenticated()) {
        header('Location: login.php', true, 303);
        exit;
    }
}

function password_version(array $candidate): int
{
    $version = $candidate['password_version'] ?? 1;
    return is_int($version) && $version >= 1 ? $version : 1;
}

function csrf_token_is_valid($submittedToken): bool
{
    return is_string($submittedToken)
        && $submittedToken !== ''
        && isset($_SESSION['csrf_token'])
        && is_string($_SESSION['csrf_token'])
        && hash_equals($_SESSION['csrf_token'], $submittedToken);
}

function password_is_acceptable(string $password, string $confirmation): bool
{
    return strlen($password) >= 14 && hash_equals($password, $confirmation);
}

function destroy_admin_session(): void
{
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $cookie = session_get_cookie_params();
        setcookie(session_name(), '', [
            'expires' => time() - 42000,
            'path' => $cookie['path'],
            'domain' => $cookie['domain'],
            'secure' => $cookie['secure'],
            'httponly' => $cookie['httponly'],
            'samesite' => 'Strict',
        ]);
    }

    session_destroy();
}

function configuration_value_is_serializable($value): bool
{
    if (is_null($value) || is_bool($value) || is_int($value) || is_float($value) || is_string($value)) {
        return true;
    }

    if (!is_array($value)) {
        return false;
    }

    foreach ($value as $key => $child) {
        if ((!is_int($key) && !is_string($key)) || !configuration_value_is_serializable($child)) {
            return false;
        }
    }

    return true;
}

function write_private_file_atomically(string $destination, string $contents, int $permissions = 0600): bool
{
    $directory = dirname($destination);
    if (!is_dir($directory) || !is_writable($directory)) {
        return false;
    }

    $temporaryPath = tempnam($directory, '.cauco-private-');
    if ($temporaryPath === false) {
        return false;
    }

    $handle = fopen($temporaryPath, 'c+b');
    if ($handle === false) {
        @unlink($temporaryPath);
        return false;
    }

    $success = false;
    try {
        if (!flock($handle, LOCK_EX) || !ftruncate($handle, 0) || fseek($handle, 0) !== 0) {
            return false;
        }

        $length = strlen($contents);
        $written = 0;
        while ($written < $length) {
            $result = fwrite($handle, substr($contents, $written));
            if ($result === false || $result === 0) {
                return false;
            }
            $written += $result;
        }

        if (!fflush($handle)) {
            return false;
        }
        if (function_exists('fsync')) {
            @fsync($handle);
        }
        @chmod($temporaryPath, $permissions);
        flock($handle, LOCK_UN);
        fclose($handle);
        $handle = null;

        if (!rename($temporaryPath, $destination)) {
            return false;
        }

        @chmod($destination, $permissions);
        $success = true;
        return true;
    } finally {
        if (is_resource($handle)) {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
        if (!$success && file_exists($temporaryPath)) {
            @unlink($temporaryPath);
        }
    }
}

function runtime_directory(array $candidate): string
{
    $configured = $candidate['runtime_dir'] ?? '';
    return is_string($configured) && trim($configured) !== ''
        ? rtrim($configured, DIRECTORY_SEPARATOR)
        : __DIR__ . '/runtime';
}

function acquire_runtime_lock(array $candidate, string $name)
{
    $directory = runtime_directory($candidate);
    if (!is_dir($directory) || !is_writable($directory)) {
        return false;
    }

    $handle = fopen($directory . DIRECTORY_SEPARATOR . $name . '.lock', 'c');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return false;
    }

    @chmod($directory . DIRECTORY_SEPARATOR . $name . '.lock', 0600);
    return $handle;
}

function release_runtime_lock($handle): void
{
    if (is_resource($handle)) {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function update_admin_password(array &$activeConfig, string $newPassword): bool
{
    global $configFile;

    $lock = acquire_runtime_lock($activeConfig, 'config');
    if ($lock === false) {
        return false;
    }

    try {
        clearstatcache(true, $configFile);
        if (!is_file($configFile) || !is_readable($configFile)) {
            return false;
        }

        $current = require $configFile;
        if (
            !is_array($current)
            || !configuration_is_ready($current)
            || !configuration_value_is_serializable($current)
        ) {
            return false;
        }

        $newHash = password_hash($newPassword, PASSWORD_DEFAULT);
        if (!is_string($newHash) || $newHash === '') {
            return false;
        }

        $current['password_hash'] = $newHash;
        $current['password_version'] = password_version($current) + 1;
        $contents = "<?php\n\ndeclare(strict_types=1);\n\nreturn "
            . var_export($current, true)
            . ";\n";

        if (!write_private_file_atomically($configFile, $contents)) {
            return false;
        }

        $activeConfig = $current;
        return true;
    } catch (Throwable $error) {
        return false;
    } finally {
        release_runtime_lock($lock);
    }
}

function reset_record_path(array $candidate): string
{
    return runtime_directory($candidate) . DIRECTORY_SEPARATOR . 'password-reset.json';
}

function read_reset_record(array $candidate): ?array
{
    $path = reset_record_path($candidate);
    if (!is_file($path) || !is_readable($path)) {
        return null;
    }

    $json = file_get_contents($path);
    if (!is_string($json)) {
        return null;
    }

    try {
        $record = json_decode($json, true, 8, JSON_THROW_ON_ERROR);
    } catch (Throwable $error) {
        return null;
    }

    if (
        !is_array($record)
        || !isset($record['token_hash'], $record['created_at'], $record['expires_at'])
        || !is_string($record['token_hash'])
        || preg_match('/^[a-f0-9]{64}$/D', $record['token_hash']) !== 1
        || !is_int($record['created_at'])
        || !is_int($record['expires_at'])
    ) {
        return null;
    }

    return $record;
}

function reset_token_is_valid(array $candidate, string $rawToken, ?array $record = null): bool
{
    if (preg_match('/^[A-Za-z0-9_-]{43}$/D', $rawToken) !== 1) {
        return false;
    }

    $record = $record ?? read_reset_record($candidate);
    return is_array($record)
        && $record['expires_at'] >= time()
        && hash_equals($record['token_hash'], hash('sha256', $rawToken));
}

function write_reset_record(array $candidate, array $record): bool
{
    try {
        $json = json_encode($record, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
    } catch (Throwable $error) {
        return false;
    }

    return write_private_file_atomically(reset_record_path($candidate), $json . "\n");
}

function invalidate_reset_record(array $candidate): void
{
    $path = reset_record_path($candidate);
    if (is_file($path)) {
        @unlink($path);
    }
}

function base64url_encode(string $bytes): string
{
    return rtrim(strtr(base64_encode($bytes), '+/', '-_'), '=');
}

function password_reset_url(array $candidate, string $rawToken): ?string
{
    if (!reset_configuration_is_ready($candidate)) {
        return null;
    }

    return rtrim($candidate['admin_base_url'], '/')
        . '/reset-password.php?token='
        . rawurlencode($rawToken);
}

function send_password_reset_email(array $candidate, string $resetUrl): bool
{
    if (!reset_configuration_is_ready($candidate)) {
        return false;
    }

    $subject = 'CAUCO Admin password reset';
    $body = "A password reset was requested for CAUCO Admin.\n\n"
        . "Open this link to choose a new password:\n{$resetUrl}\n\n"
        . "This link expires in 30 minutes and can be used once.\n"
        . "If you did not request this change, you can ignore this message.\n";
    $headers = "From: CAUCO Admin <claudio@aisosu.fi>\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n";

    return @mail($candidate['reset_email'], $subject, $body, $headers);
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
