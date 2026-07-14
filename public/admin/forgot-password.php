<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if (is_authenticated()) {
    header('Location: index.php', true, 303);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    exit;
}

$requestAvailable = $configReady && reset_configuration_is_ready($config);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CAUCO Admin — Password recovery</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body class="login-page">
  <main class="login-shell">
    <section class="login-card" aria-labelledby="recovery-heading">
      <p class="eyebrow">Account recovery</p>
      <h1 id="recovery-heading">Reset password</h1>
      <p class="muted">Request a one-time recovery link for the configured administrator.</p>

      <?php if (isset($_GET['sent'])): ?>
        <p class="alert alert-success" role="status">If recovery is available, a reset link has been sent.</p>
      <?php elseif (!$requestAvailable): ?>
        <p class="alert alert-error" role="alert">Password recovery is currently unavailable.</p>
      <?php endif; ?>

      <form method="post" action="request-reset.php" class="login-form">
        <input type="hidden" name="csrf_token" value="<?= e((string) $_SESSION['csrf_token']) ?>">
        <button type="submit" class="button button-primary"<?= !$requestAvailable ? ' disabled' : '' ?>>Send recovery link</button>
      </form>
      <p class="auth-link"><a href="login.php">Back to sign in</a></p>
    </section>
  </main>
</body>
</html>
