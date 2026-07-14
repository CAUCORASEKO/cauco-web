<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if (is_authenticated()) {
    header('Location: index.php', true, 303);
    exit;
}

$errorMessage = '';
$now = time();
$lockedUntil = isset($_SESSION['login_locked_until']) ? (int) $_SESSION['login_locked_until'] : 0;

if ($lockedUntil > 0 && $lockedUntil <= $now) {
    unset($_SESSION['login_locked_until'], $_SESSION['login_failures']);
    $lockedUntil = 0;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
    $submittedToken = isset($_POST['csrf_token']) && is_string($_POST['csrf_token'])
        ? $_POST['csrf_token']
        : '';
    $submittedPassword = isset($_POST['password']) && is_string($_POST['password'])
        ? $_POST['password']
        : '';
    $tokenIsValid = $submittedToken !== ''
        && hash_equals((string) $_SESSION['csrf_token'], $submittedToken);

    if (
        $lockedUntil === 0
        && $configReady
        && $tokenIsValid
        && password_verify($submittedPassword, $config['password_hash'])
    ) {
        session_regenerate_id(true);
        $_SESSION['authenticated'] = true;
        $_SESSION['password_version'] = password_version($config);
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        unset($_SESSION['login_failures'], $_SESSION['login_locked_until']);
        header('Location: index.php', true, 303);
        exit;
    }

    if ($lockedUntil === 0) {
        $failures = (int) ($_SESSION['login_failures'] ?? 0) + 1;
        $_SESSION['login_failures'] = $failures;
        if ($failures >= 5) {
            $_SESSION['login_locked_until'] = $now + 600;
        }
    }

    $errorMessage = 'Sign-in failed. Please try again later.';
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CAUCO Admin — Sign in</title>
  <link rel="stylesheet" href="admin.css">
</head>
<body class="login-page">
  <main class="login-shell">
    <section class="login-card" aria-labelledby="login-heading">
      <p class="eyebrow">Private content workspace</p>
      <h1 id="login-heading">CAUCO Admin</h1>
      <p class="muted">Sign in to edit and publish website content.</p>

      <?php if ($errorMessage !== ''): ?>
        <p class="alert alert-error" role="alert"><?= e($errorMessage) ?></p>
      <?php endif; ?>

      <?php if (!$configReady): ?>
        <p class="alert alert-error" role="alert">Administrator configuration is unavailable.</p>
      <?php endif; ?>

      <?php if (isset($_GET['changed']) || isset($_GET['reset'])): ?>
        <p class="alert alert-success" role="status">Your password was updated. Sign in with the new password.</p>
      <?php endif; ?>

      <form method="post" action="login.php" class="login-form" autocomplete="on">
        <input type="hidden" name="csrf_token" value="<?= e((string) $_SESSION['csrf_token']) ?>">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required autofocus>
        <button type="submit" class="button button-primary"<?= !$configReady ? ' disabled' : '' ?>>Sign in</button>
      </form>
      <p class="auth-link"><a href="forgot-password.php">Forgot password?</a></p>
    </section>
  </main>
</body>
</html>
