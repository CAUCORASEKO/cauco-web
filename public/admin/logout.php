<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit;
}

$submittedToken = isset($_POST['csrf_token']) && is_string($_POST['csrf_token'])
    ? $_POST['csrf_token']
    : '';
if ($submittedToken === '' || !hash_equals((string) $_SESSION['csrf_token'], $submittedToken)) {
    http_response_code(403);
    exit;
}

destroy_admin_session();
header('Location: login.php', true, 303);
exit;
