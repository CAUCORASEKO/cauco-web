export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Claudio Valenzuela / CAUCO.</p>
        <div className="flex gap-4">
          <a className="transition-colors hover:text-foreground" href="/privacy-policy.html">
            Privacy
          </a>
          <a className="transition-colors hover:text-foreground" href="/data-deletion.html">
            Data deletion
          </a>
        </div>
      </div>
    </footer>
  );
}
