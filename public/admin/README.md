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

3. Replace `REPLACE_WITH_PASSWORD_HASH` in `config.php` with the generated hash. Keep the hash inside quotes. The other defaults point to the standard `public/content` and `public/content/backups` directories and normally need no changes.

4. Confirm that `config.php` is not tracked by Git. The repository `.gitignore` excludes `public/admin/config.php`; never force-add it and never store a plain-text password there.

Example production configuration shape:

```php
return [
    'password_hash' => 'PASTE_THE_GENERATED_HASH_HERE',
    'session_name' => 'CAUCOADMIN',
    'content_dir' => dirname(__DIR__) . '/content',
    'backup_dir' => dirname(__DIR__) . '/content/backups',
];
```

The login form remains disabled when `config.php` is missing, unreadable, contains the placeholder, or contains an invalid password hash.

## Permissions

The web-server/PHP user needs:

- read and write access to `public/content/` so a temporary file can be created and atomically renamed over a language JSON file;
- read and write access to `public/content/backups/` so backups and the publishing lock can be created;
- read access to `public/admin/config.php`.

Use the least-permissive ownership and group settings supported by the host. The publisher sets public JSON files to `0644`, backup files to `0640`, and the internal publishing lock to `0600`, subject to the host's filesystem policy.

The `public/content/backups/.htaccess` file denies all browser access to the backup directory and its files while leaving PHP filesystem access unaffected. Backups must be inspected or restored through the hosting file manager, SSH, or another server-side method. A direct HTTP request to `/content/backups/` or to an individual backup file must return `403 Forbidden`.

## Access and workflow

Open `https://YOUR-DOMAIN.example/admin/`, sign in with the password used to create the configured hash, and select English, Finnish, or Swedish. Each top-level section expands into editable fields. Use the preview link to open the corresponding public page, then select **Publish changes** to save.

Each successful publish:

1. validates the current public JSON file;
2. copies that version to a timestamped language backup;
3. writes the edited document under an exclusive publishing lock to a temporary file in the content directory;
4. atomically renames the temporary file over the public language file;
5. retains the newest 20 backups for that language.

Backups are named like `fi-20260713-152530.json`. If two publishes occur within one second, a numeric suffix prevents an existing backup from being overwritten.

## Production test checklist

1. Visit `/admin/` over HTTPS and confirm an unauthenticated request reaches the sign-in page.
2. Confirm a wrong password produces only the generic sign-in error. Five failed attempts should prevent further attempts for ten minutes in that browser session.
3. Sign in with the configured password and confirm English, Finnish, and Swedish each load their matching content.
4. Make a harmless text change, publish it, and confirm the success status includes a new backup filename.
5. Open the language preview and confirm the change appears on the public page.
6. Through the hosting file manager or SSH, inspect `public/content/backups/` and confirm the backup contains the pre-publish document.
7. Log out and confirm returning to `/admin/` requires authentication again.
8. Confirm direct web requests to `config.php`, `config.example.php`, and `bootstrap.php` are denied by Apache.
9. Confirm `/content/backups/` and a direct request for an individual backup both return `403 Forbidden`.
10. Confirm admin responses include the no-cache, frame, content-type, referrer, and Content Security Policy headers.

## Restore a backup manually

1. Sign out or avoid publishing while restoring.
2. Download or copy the current public language file to a safe location.
3. Use the hosting file manager, SSH, or another server-side method to inspect the backups; browser access is intentionally denied.
4. Validate the chosen backup as JSON and confirm its top-level `language` value matches the destination language.
5. Copy the backup over the matching file in `public/content/` using the hosting file manager or SSH. For example, restore a Finnish backup only to `public/content/fi.json`.
6. Keep the destination filename unchanged and restore readable permissions, normally `0644`.
7. Load the public language page and `/admin/` to verify the restored content.

Do not rename a backup based on a browser-provided value and do not place additional executable scripts in this directory. The included `.htaccess` allows the four required PHP entry points and blocks direct access to configuration/bootstrap files and unexpected PHP-like scripts.
