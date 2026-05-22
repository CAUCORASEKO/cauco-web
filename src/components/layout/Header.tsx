import { Button } from "@/components/ui/button";
import type { Language, SiteContent } from "@/i18n/content";

const languageLinks: Record<Language, string> = {
  en: "index.html",
  fi: "index-fi.html",
  sv: "index-sv.html",
};

type HeaderProps = {
  content: SiteContent["header"];
  currentLanguage: Language;
};

export function Header({ content, currentLanguage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="#top"
          className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={content.homeLabel}
        >
          <span className="grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-white/[0.04] font-mono text-sm text-primary">
            C
          </span>
          <span className="hidden text-sm font-semibold tracking-wide text-foreground sm:block">
            CAUCO
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {content.nav.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <select
            aria-label="Language"
            className="h-9 rounded-md border border-white/10 bg-background px-2 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:hidden"
            value={currentLanguage}
            onChange={(event) => {
              window.location.href = languageLinks[event.target.value as Language];
            }}
          >
            {(Object.keys(languageLinks) as Language[]).map((language) => (
              <option key={language} value={language}>
                {content.languages[language]}
              </option>
            ))}
          </select>
          <div className="hidden items-center rounded-md border border-white/10 bg-white/[0.03] p-1 sm:flex">
            {(Object.keys(languageLinks) as Language[]).map((language) => (
              <Button
                key={language}
                asChild
                size="sm"
                variant={language === currentLanguage ? "default" : "ghost"}
                className="h-8 px-2 text-xs"
                aria-current={language === currentLanguage ? "page" : undefined}
              >
                <a href={languageLinks[language]}>
                  {content.languages[language]}
                </a>
              </Button>
            ))}
          </div>
          <Button asChild size="sm" variant="outline">
            <a href="#contact">{content.cta}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
