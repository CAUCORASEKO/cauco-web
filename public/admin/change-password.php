<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require_authentication();

if (!$configReady) {
    http_response_code(503);
    exit('Administrator configuration is unavailable.');
}

$errorMessage = '';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    $currentPassword = isset($_POST['current_password']) && is_string($_POST['current_password'])
        ? $_POST['current_password']
        : '';
    $newPassword = isset($_POST['new_password']) && is_string($_POST['new_password'])
        ? $_POST['new_password']
        : '';
    $confirmation = isset($_POST['confirm_password']) && is_string($_POST['confirm_password'])
        ? $_POST['confirm_password']
        : '';

    if (!csrf_token_is_valid($_POST['csrf_token'] ?? null)) {
        $errorMessage = 'The password could not be changed. Please try again.';
    } elseif (!password_verify($currentPassword, $config['password_hash'])) {
        $errorMessage = 'The password could not be changed. Please check the form and try again.';
    } elseif (!password_is_acceptable($newPassword, $confirmation)) {
        $errorMessage = 'Use at least 14 characters and enter the same new password twice.';
    } elseif (password_verify($newPassword, $config['password_hash'])) {
        $errorMessage = 'Choose a new password that differs from the current password.';
    } elseif (!update_admin_password($config, $newPassword)) {
        $errorMessage = 'The password could not be changed. Please try again.';
    } else {
        invalidate_reset_record($config);
        session_regenerate_id(true);
        destroy_admin_session();
        header('Location: login.php?changed=1', true, 303);
        exit;
    }
} elseif (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    header('Allow: GET, POST');
    http_response_code(405);
    exit;
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CAUCO Admin — Change password</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body class="login-page">
  <main class="login-shell">
    <section class="login-card" aria-labelledby="change-password-heading">
      <p class="eyebrow">Account security</p>
      <h1 id="change-password-heading">Change password</h1>
      <p class="muted">Use at least 14 characters. You will need to sign in again afterward.</p>

      <?php if ($errorMessage !== ''): ?>
        <p class="alert alert-error" role="alert"><?= e($errorMessage) ?></p>
      <?php endif; ?>

      <form method="post" action="change-password.php" class="login-form" autocomplete="on">
        <input type="hidden" name="csrf_token" value="<?= e((string) $_SESSION['csrf_token']) ?>">
        <label for="current-password">Current password</label>
        <input id="current-password" name="current_password" type="password" autocomplete="current-password" required autofocus>
        <label for="new-password">New password</label>
        <input id="new-password" name="new_password" type="password" autocomplete="new-password" minlength="14" required>
        <label for="confirm-password">Confirm new password</label>
        <input id="confirm-password" name="confirm_password" type="password" autocomplete="new-password" minlength="14" required>
        <button type="submit" class="button button-primary">Change password</button>
      </form>
      <p class="auth-link"><a href="index.php">Back to administrator</a></p>
    </section>
  </main>
</body>
</html>
