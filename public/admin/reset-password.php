<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'GET' && $method !== 'POST') {
    header('Allow: GET, POST');
    http_response_code(405);
    exit;
}

$rawToken = $method === 'POST'
    ? (isset($_POST['reset_token']) && is_string($_POST['reset_token']) ? $_POST['reset_token'] : '')
    : (isset($_GET['token']) && is_string($_GET['token']) ? $_GET['token'] : '');
$tokenIsValid = $configReady
    && reset_configuration_is_ready($config)
    && reset_token_is_valid($config, $rawToken);
$errorMessage = '';

if ($method === 'POST') {
    $newPassword = isset($_POST['new_password']) && is_string($_POST['new_password'])
        ? $_POST['new_password']
        : '';
    $confirmation = isset($_POST['confirm_password']) && is_string($_POST['confirm_password'])
        ? $_POST['confirm_password']
        : '';

    if (!csrf_token_is_valid($_POST['csrf_token'] ?? null)) {
        $tokenIsValid = false;
    } elseif (!$tokenIsValid) {
        $tokenIsValid = false;
    } elseif (!password_is_acceptable($newPassword, $confirmation)) {
        $errorMessage = 'Use at least 14 characters and enter the same new password twice.';
    } elseif (password_verify($newPassword, $config['password_hash'])) {
        $errorMessage = 'Choose a new password that differs from the current password.';
    } else {
        $lock = acquire_runtime_lock($config, 'password-reset');
        if ($lock === false) {
            $errorMessage = 'The password could not be reset. Request a new recovery link.';
        } else {
            try {
                $record = read_reset_record($config);
                if (!reset_token_is_valid($config, $rawToken, $record)) {
                    $tokenIsValid = false;
                } elseif (!update_admin_password($config, $newPassword)) {
                    $errorMessage = 'The password could not be reset. Request a new recovery link.';
                } else {
                    invalidate_reset_record($config);
                    destroy_admin_session();
                    header('Location: login.php?reset=1', true, 303);
                    exit;
                }
            } finally {
                release_runtime_lock($lock);
            }
        }
    }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CAUCO Admin — Reset password</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body class="login-page">
  <main class="login-shell">
    <section class="login-card" aria-labelledby="reset-password-heading">
      <p class="eyebrow">Account recovery</p>
      <h1 id="reset-password-heading">Choose a new password</h1>

      <?php if (!$tokenIsValid): ?>
        <p class="alert alert-error" role="alert">This recovery link is invalid or has expired. Request a new link.</p>
        <p class="auth-link"><a href="forgot-password.php">Request recovery link</a></p>
      <?php else: ?>
        <p class="muted">Use at least 14 characters. The recovery link works only once.</p>
        <?php if ($errorMessage !== ''): ?>
          <p class="alert alert-error" role="alert"><?= e($errorMessage) ?></p>
        <?php endif; ?>
        <form method="post" action="reset-password.php" class="login-form" autocomplete="on">
          <input type="hidden" name="csrf_token" value="<?= e((string) $_SESSION['csrf_token']) ?>">
          <input type="hidden" name="reset_token" value="<?= e($rawToken) ?>">
          <label for="new-password">New password</label>
          <input id="new-password" name="new_password" type="password" autocomplete="new-password" minlength="14" required autofocus>
          <label for="confirm-password">Confirm new password</label>
          <input id="confirm-password" name="confirm_password" type="password" autocomplete="new-password" minlength="14" required>
          <button type="submit" class="button button-primary">Reset password</button>
        </form>
      <?php endif; ?>
    </section>
  </main>
</body>
</html>
