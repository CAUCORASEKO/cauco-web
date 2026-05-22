import type { SiteContent } from "@/i18n/content";

type FooterProps = {
  content: SiteContent["footer"];
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {content.copyright}</p>
        <div className="flex gap-4">
          <a className="transition-colors hover:text-foreground" href="/privacy-policy.html">
            {content.privacy}
          </a>
          <a className="transition-colors hover:text-foreground" href="/data-deletion.html">
            {content.dataDeletion}
          </a>
        </div>
      </div>
    </footer>
  );
}
