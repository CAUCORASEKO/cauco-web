<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit;
}

if (!csrf_token_is_valid($_POST['csrf_token'] ?? null)) {
    http_response_code(403);
    exit;
}

$now = time();
$requests = isset($_SESSION['reset_requests']) && is_array($_SESSION['reset_requests'])
    ? array_values(array_filter(
        $_SESSION['reset_requests'],
        static fn($timestamp): bool => is_int($timestamp) && $timestamp > $now - 3600
    ))
    : [];
$mayGenerate = count($requests) < 3;
$requests[] = $now;
$_SESSION['reset_requests'] = $requests;

if ($mayGenerate && $configReady && reset_configuration_is_ready($config)) {
    $lock = acquire_runtime_lock($config, 'password-reset');
    if ($lock !== false) {
        try {
            $existing = read_reset_record($config);
            $cooldownElapsed = $existing === null || $existing['created_at'] <= $now - 600;

            if ($cooldownElapsed) {
                $rawToken = base64url_encode(random_bytes(32));
                $record = [
                    'token_hash' => hash('sha256', $rawToken),
                    'created_at' => $now,
                    'expires_at' => $now + 1800,
                ];
                $resetUrl = password_reset_url($config, $rawToken);

                if ($resetUrl !== null && write_reset_record($config, $record)) {
                    send_password_reset_email($config, $resetUrl);
                }
            }
        } catch (Throwable $error) {
            // The response remains intentionally generic.
        } finally {
            release_runtime_lock($lock);
        }
    }
}

header('Location: forgot-password.php?sent=1', true, 303);
exit;
