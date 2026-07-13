<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';
require_authentication();

if (!$configReady) {
    http_response_code(503);
    exit('Administrator configuration is unavailable.');
}

$requestedLanguage = isset($_GET['lang']) && is_string($_GET['lang']) ? $_GET['lang'] : 'en';
$language = language_is_allowed($requestedLanguage) ? $requestedLanguage : 'en';
$contentPath = content_path_for_language($config, $language);
$contentJson = $contentPath !== null && is_readable($contentPath)
    ? file_get_contents($contentPath)
    : false;

if (!is_string($contentJson) || decode_content_document($contentJson, $language) === null) {
    http_response_code(500);
    exit('The selected content is unavailable.');
}

$previewPaths = [
    'en' => '/index.html',
    'fi' => '/index-fi.html',
    'sv' => '/index-sv.html',
];
$languageTabLabels = [
    'en' => 'English',
    'fi' => 'Suomi',
    'sv' => 'Svenska',
];
$previewLabels = [
    'en' => 'English',
    'fi' => 'Finnish',
    'sv' => 'Swedish',
];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CAUCO Admin</title>
  <link rel="stylesheet" href="admin.css">
  <script src="admin.js" defer></script>
</head>
<body>
  <header class="admin-header">
    <div>
      <p class="eyebrow">Private content workspace</p>
      <h1>CAUCO Admin</h1>
    </div>
    <form id="logout-form" method="post" action="logout.php">
      <input type="hidden" name="csrf_token" value="<?= e((string) $_SESSION['csrf_token']) ?>">
      <button type="submit" class="button button-secondary">Log out</button>
    </form>
  </header>

  <main class="admin-main">
    <section class="toolbar" aria-label="Content controls">
      <nav class="language-tabs" aria-label="Content language">
        <?php foreach ($languageTabLabels as $code => $label): ?>
          <a
            class="language-tab<?= $code === $language ? ' is-active' : '' ?>"
            href="?lang=<?= e($code) ?>"
            data-language-code="<?= e($code) ?>"
            <?= $code === $language ? 'aria-current="page"' : '' ?>
          ><?= e($label) ?></a>
        <?php endforeach; ?>
      </nav>

      <p id="save-status" class="save-status is-saved" role="status" aria-live="polite" aria-atomic="true">Saved</p>

      <div class="toolbar-actions">
        <a class="button button-secondary" href="<?= e($previewPaths[$language]) ?>" target="_blank" rel="noopener noreferrer">Preview <?= e($previewLabels[$language]) ?></a>
        <button id="save-button" type="button" class="button button-primary" disabled>Publish changes</button>
      </div>
    </section>

    <div
      id="content-editor"
      data-language="<?= e($language) ?>"
      data-csrf-token="<?= e((string) $_SESSION['csrf_token']) ?>"
      data-content="<?= e(base64_encode($contentJson)) ?>"
      data-save-url="save.php"
    ></div>
  </main>

  <noscript>
    <p class="noscript-message">JavaScript is required to use the content editor.</p>
  </noscript>
</body>
</html>
