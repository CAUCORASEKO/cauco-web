# CAUCO single-user content administrator

This directory contains the private, dependency-free PHP administrator for the three public CAUCO content files. It is designed for ordinary Apache/PHP shared hosting. It does not use a database and supports exactly one administrator.

## Server requirements

- Apache with `.htaccess` support enabled for this directory.
- PHP 7.4 or newer with sessions and JSON enabled.
- HTTPS for production use.
- The PHP process must be able to read and write the configured content and backup directories.

## Configure the administrator

1. Generate a password hash on a PHP-enabled server. Replace `YOUR_PASSWORD` locally in the shell command; do not put the plain-text password in a file:

   ```sh
   php -r 'echo password_hash("YOUR_PASSWORD", PASSWORD_DEFAULT), PHP_EOL;'
   ```

2. Copy `config.example.php` to `config.php` in this directory.

3. Replace `REPLACE_WITH_PASSWORD_HASH` in `config.php` with the generated hash. Keep the hash inside quotes. Set `reset_email` to the only administrator's recovery address and set `admin_base_url` to the public HTTPS admin URL. The content, backup, and runtime defaults normally need no changes.

4. Confirm that `config.php` is not tracked by Git. The repository `.gitignore` excludes `public/admin/config.php`; never force-add it and never store a plain-text password there.

Example production configuration shape:

```php
return [
    'password_hash' => 'PASTE_THE_GENERATED_HASH_HERE',
    'session_name' => 'CAUCOADMIN',
    'content_dir' => dirname(__DIR__) . '/content',
    'backup_dir' => dirname(__DIR__) . '/content/backups',
    'reset_email' => 'administrator@example.com',
    'admin_base_url' => 'https://aisosu.fi/admin',
    'runtime_dir' => __DIR__ . '/runtime',
    'password_version' => 1,
];
```

`admin_base_url` must use HTTPS and should not end with a slash. It is preferred over request headers when constructing recovery links. `password_version` is incremented automatically after every password change or reset; do not decrease it.

The login form remains disabled when `config.php` is missing, unreadable, contains the placeholder, or contains an invalid password hash. Password recovery also fails safely when its email, HTTPS base URL, or writable runtime directory is missing or invalid.

## Permissions

The web-server/PHP user needs:

- read and write access to `public/content/` so a temporary file can be created and atomically renamed over a language JSON file;
- read and write access to `public/content/backups/` so backups and the publishing lock can be created;
- read access to `public/admin/config.php`.
- write access to `public/admin/` so `config.php` can be replaced atomically after a password update;
- read and write access to `public/admin/runtime/` for private reset state and lock files.

Use the least-permissive ownership and group settings supported by the host. The publisher sets public JSON files to `0644`, backup files to `0640`, and private config, reset, and lock files to `0600`, subject to the host's filesystem policy. The runtime directory itself normally uses `0750` or another host-approved mode that lets PHP create files without granting public access.

The `public/content/backups/.htaccess` file denies all browser access to the backup directory and its files while leaving PHP filesystem access unaffected. Backups must be inspected or restored through the hosting file manager, SSH, or another server-side method. A direct HTTP request to `/content/backups/` or to an individual backup file must return `403 Forbidden`.

The separate `public/admin/runtime/.htaccess` denies browser access with Apache 2.4 and legacy authorization syntax while preserving PHP filesystem access. `config.php` and runtime reset files must never be committed. The repository ignores both.

## Access and workflow

Open `https://YOUR-DOMAIN.example/admin/`, sign in with the password used to create the configured hash, and select English, Finnish, or Swedish. Each top-level section expands into editable fields. Use the preview link to open the corresponding public page, then select **Publish changes** to save.

Each successful publish:

1. validates the current public JSON file;
2. copies that version to a timestamped language backup;
3. writes the edited document under an exclusive publishing lock to a temporary file in the content directory;
4. atomically renames the temporary file over the public language file;
5. retains the newest 20 backups for that language.

Backups are named like `fi-20260713-152530.json`. If two publishes occur within one second, a numeric suffix prevents an existing backup from being overwritten.

## Password management and recovery

An authenticated administrator can open **Change password** from the admin header. The form verifies the current password, requires the replacement to be at least 14 characters and different from the current password, and requires matching confirmation. A successful change creates a `PASSWORD_DEFAULT` hash, atomically replaces only the private configuration file, increments `password_version`, invalidates any outstanding reset link, and requires a fresh sign-in.

The sign-in page links to **Forgot password?**. Because there is exactly one administrator, the recovery form accepts no username or email. A valid request sends a neutral plain-text message only to `reset_email`. The response shown in the browser is generic whether mail succeeds or fails.

Recovery requests are limited to three per hour in a browser session and the server will not generate a new token until ten minutes after the previous one. A new token invalidates the previous token. The emailed link expires after 30 minutes and works once. Only a SHA-256 hash of the random token, plus its creation and expiration timestamps, is stored in `runtime/password-reset.json`; passwords and raw tokens are never stored or emailed. The current password and password hash are never emailed.

After a password change or reset, the incremented `password_version` invalidates previously authenticated sessions on their next protected request. A reset never signs the administrator in automatically.

PHP `mail()` uses the hosting account's sendmail configuration. Test actual delivery only on the production host: request one recovery message, confirm it arrives at `reset_email`, inspect the From address and plain-text link, use it once, and confirm a second use is rejected. Also check the spam folder and the hosting mail logs. A generic browser success message does not prove that mail was delivered.

If email delivery fails, recover through the hosting file manager or SSH:

1. Generate a new hash with `php -r 'echo password_hash("YOUR_PASSWORD", PASSWORD_DEFAULT), PHP_EOL;'` on a trusted PHP environment.
2. Back up `public/admin/config.php` privately.
3. Replace only the quoted `password_hash` value carefully, and increment `password_version` by one.
4. Preserve every other configuration key and restore private readable permissions.
5. Remove `public/admin/runtime/password-reset.json` if it exists, then sign in with the new password.

Never place the plain password in `config.php`, never share or commit the generated hash, and never commit `config.php` or any runtime reset file.

## Production test checklist

1. Visit `/admin/` over HTTPS and confirm an unauthenticated request reaches the sign-in page.
2. Confirm a wrong password produces only the generic sign-in error. Five failed attempts should prevent further attempts for ten minutes in that browser session.
3. Sign in with the configured password and confirm English, Finnish, and Swedish each load their matching content.
4. Make a harmless text change, publish it, and confirm the success status includes a new backup filename.
5. Open the language preview and confirm the change appears on the public page.
6. Through the hosting file manager or SSH, inspect `public/content/backups/` and confirm the backup contains the pre-publish document.
7. Log out and confirm returning to `/admin/` requires authentication again.
8. Confirm direct web requests to `config.php`, `config.example.php`, and `bootstrap.php` are denied by Apache.
9. Confirm `/admin/runtime/`, a guessed reset JSON URL, `/content/backups/`, and an individual backup all return `403 Forbidden`.
10. Change the password, verify the old password fails and the new password succeeds, then restore the intended production password if this is a test deployment.
11. Request a recovery link, confirm delivery, use it once, and confirm reuse and expired or invalid tokens fail.
12. Confirm admin responses include the no-cache, frame, content-type, referrer, and Content Security Policy headers.

## Restore a backup manually

1. Sign out or avoid publishing while restoring.
2. Download or copy the current public language file to a safe location.
3. Use the hosting file manager, SSH, or another server-side method to inspect the backups; browser access is intentionally denied.
4. Validate the chosen backup as JSON and confirm its top-level `language` value matches the destination language.
5. Copy the backup over the matching file in `public/content/` using the hosting file manager or SSH. For example, restore a Finnish backup only to `public/content/fi.json`.
6. Keep the destination filename unchanged and restore readable permissions, normally `0644`.
7. Load the public language page and `/admin/` to verify the restored content.

Do not rename a backup based on a browser-provided value and do not place additional executable scripts in this directory. The included `.htaccess` allows only the required admin PHP entry points and blocks direct access to configuration/bootstrap files and unexpected PHP-like scripts.
