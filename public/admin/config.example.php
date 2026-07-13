<?php

declare(strict_types=1);

/**
 * Copy this file to config.php on the production server and replace the
 * password_hash placeholder with the output of password_hash().
 */
return [
    'password_hash' => 'REPLACE_WITH_PASSWORD_HASH',
    'session_name' => 'CAUCOADMIN',
    'content_dir' => dirname(__DIR__) . '/content',
    'backup_dir' => dirname(__DIR__) . '/content/backups',
];
