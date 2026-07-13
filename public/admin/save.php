<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

const CAUCO_MAX_REQUEST_BYTES = 1048576;

function json_response(int $status, bool $ok, string $message, ?string $backup = null): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=UTF-8');
    $response = ['ok' => $ok, 'message' => $message];
    if ($backup !== null) {
        $response['backup'] = $backup;
    }

    echo json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function publishing_failed(int $status = 422): void
{
    json_response($status, false, 'The content could not be published.');
}

function read_request_body(int $maximumBytes): ?string
{
    $declaredLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
    if ($declaredLength > $maximumBytes) {
        return null;
    }

    $stream = fopen('php://input', 'rb');
    if ($stream === false) {
        return null;
    }

    $body = stream_get_contents($stream, $maximumBytes + 1);
    fclose($stream);

    if (!is_string($body) || strlen($body) > $maximumBytes) {
        return null;
    }

    return $body;
}

function normalize_json_indentation(string $prettyJson): string
{
    $normalized = preg_replace_callback(
        '/^(?: {4})+/m',
        static function (array $matches): string {
            return str_repeat(' ', intdiv(strlen($matches[0]), 2));
        },
        $prettyJson
    );

    if (!is_string($normalized)) {
        throw new RuntimeException('Unable to normalize JSON indentation.');
    }

    return rtrim($normalized, "\r\n") . "\n";
}

function write_locked_file(string $path, string $contents, int $permissions): void
{
    $handle = fopen($path, 'c+b');
    if ($handle === false) {
        throw new RuntimeException('Unable to open file.');
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            throw new RuntimeException('Unable to lock file.');
        }

        if (!ftruncate($handle, 0) || fseek($handle, 0) !== 0) {
            throw new RuntimeException('Unable to prepare file.');
        }

        $length = strlen($contents);
        $written = 0;
        while ($written < $length) {
            $result = fwrite($handle, substr($contents, $written));
            if ($result === false || $result === 0) {
                throw new RuntimeException('Unable to write file.');
            }
            $written += $result;
        }

        if (!fflush($handle)) {
            throw new RuntimeException('Unable to flush file.');
        }

        if (function_exists('fsync')) {
            fsync($handle);
        }

        flock($handle, LOCK_UN);
    } finally {
        fclose($handle);
    }

    @chmod($path, $permissions);
}

function next_backup_name(string $backupDirectory, string $language): string
{
    $base = $language . '-' . date('Ymd-His');
    $candidate = $base . '.json';
    $suffix = 1;

    while (file_exists($backupDirectory . DIRECTORY_SEPARATOR . $candidate)) {
        $candidate = $base . '-' . $suffix . '.json';
        $suffix++;
    }

    return $candidate;
}

function prune_backups(string $backupDirectory, string $language, int $keep): void
{
    $matches = glob($backupDirectory . DIRECTORY_SEPARATOR . $language . '-*.json');
    if (!is_array($matches) || count($matches) <= $keep) {
        return;
    }

    usort($matches, static function (string $left, string $right): int {
        $leftTime = filemtime($left) ?: 0;
        $rightTime = filemtime($right) ?: 0;
        return $rightTime <=> $leftTime ?: strcmp(basename($right), basename($left));
    });

    foreach (array_slice($matches, $keep) as $expiredBackup) {
        @unlink($expiredBackup);
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    header('Allow: POST');
    publishing_failed(405);
}

if (!is_authenticated()) {
    publishing_failed(401);
}

if (!$configReady) {
    publishing_failed(503);
}

$requestBody = read_request_body(CAUCO_MAX_REQUEST_BYTES);
if ($requestBody === null) {
    publishing_failed(413);
}

try {
    $payload = json_decode($requestBody, false, 512, JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    publishing_failed();
}

if (!($payload instanceof stdClass)) {
    publishing_failed();
}

$language = property_exists($payload, 'language') && is_string($payload->language)
    ? $payload->language
    : '';
$submittedToken = property_exists($payload, 'csrf_token') && is_string($payload->csrf_token)
    ? $payload->csrf_token
    : '';
$document = property_exists($payload, 'content') ? $payload->content : null;

if (
    $submittedToken === ''
    || !hash_equals((string) $_SESSION['csrf_token'], $submittedToken)
    || !language_is_allowed($language)
    || !content_document_is_valid($document, $language)
) {
    publishing_failed();
}

$destination = content_path_for_language($config, $language);
$contentDirectory = rtrim($config['content_dir'], DIRECTORY_SEPARATOR);
$backupDirectory = rtrim($config['backup_dir'], DIRECTORY_SEPARATOR);

if (
    $destination === null
    || !is_dir($contentDirectory)
    || !is_writable($contentDirectory)
    || !is_file($destination)
    || !is_readable($destination)
) {
    publishing_failed(500);
}

if (!is_dir($backupDirectory) && !@mkdir($backupDirectory, 0750, true)) {
    publishing_failed(500);
}

if (!is_writable($backupDirectory)) {
    publishing_failed(500);
}

$lockPath = $backupDirectory . DIRECTORY_SEPARATOR . '.publish.lock';
$publishLock = fopen($lockPath, 'c');
if ($publishLock === false || !flock($publishLock, LOCK_EX)) {
    if (is_resource($publishLock)) {
        fclose($publishLock);
    }
    publishing_failed(500);
}
@chmod($lockPath, 0600);

$temporaryPath = null;

try {
    $existingJson = file_get_contents($destination);
    if (!is_string($existingJson) || decode_content_document($existingJson, $language) === null) {
        throw new RuntimeException('Existing content is invalid.');
    }

    $backupName = next_backup_name($backupDirectory, $language);
    $backupPath = $backupDirectory . DIRECTORY_SEPARATOR . $backupName;
    write_locked_file($backupPath, $existingJson, 0640);

    $publishedJson = json_encode(
        $document,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
    );
    $publishedJson = normalize_json_indentation($publishedJson);

    $temporaryPath = tempnam($contentDirectory, '.cauco-content-');
    if ($temporaryPath === false) {
        throw new RuntimeException('Unable to create temporary file.');
    }
    if (realpath(dirname($temporaryPath)) !== realpath($contentDirectory)) {
        throw new RuntimeException('Temporary file is outside the content directory.');
    }

    write_locked_file($temporaryPath, $publishedJson, 0644);

    if (!rename($temporaryPath, $destination)) {
        throw new RuntimeException('Unable to publish content.');
    }
    $temporaryPath = null;
    @chmod($destination, 0644);

    prune_backups($backupDirectory, $language, 20);
} catch (Throwable $error) {
    if (is_string($temporaryPath) && file_exists($temporaryPath)) {
        @unlink($temporaryPath);
    }
    flock($publishLock, LOCK_UN);
    fclose($publishLock);
    publishing_failed(500);
}

flock($publishLock, LOCK_UN);
fclose($publishLock);
json_response(200, true, 'Content published successfully.', $backupName);
