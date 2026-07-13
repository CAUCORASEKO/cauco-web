import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Play, X } from "lucide-react";
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
  reelCopy: SiteContent["reel"];
  onPlayReel: (opener: HTMLElement) => void;
};

export function Header({ content, currentLanguage, reelCopy, onPlayReel }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <header data-scrolled={scrolled} className="site-header fixed inset-x-0 top-0 z-50">
        <div className="header-shell container flex h-20 items-center justify-between gap-4">
          <a
            href="#top"
            className="group inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff45]"
            aria-label={content.homeLabel}
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/25 font-mono text-xs font-medium text-white transition-transform group-hover:-rotate-12">
              C<span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#ff5c35]" />
            </span>
            <span className="text-xs font-semibold tracking-[0.18em] text-white">CAUCO</span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {content.nav.map((item) => (
              <a key={item.href} href={item.href} className="editorial-link text-xs text-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff45]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(event) => onPlayReel(event.currentTarget)}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-xs text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff45] sm:inline-flex"
            >
              <motion.span animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}><Play className="h-3.5 w-3.5 fill-current" /></motion.span> {reelCopy.play}
            </button>
            <select
              aria-label="Language"
              className="h-9 rounded-full border border-white/15 bg-[#090b0d] px-3 text-xs text-white outline-none focus:border-[#d7ff45] focus:ring-2 focus:ring-[#d7ff45]/30 sm:hidden"
              value={currentLanguage}
              onChange={(event) => { window.location.href = languageLinks[event.target.value as Language]; }}
            >
              {(Object.keys(languageLinks) as Language[]).map((language) => (
                <option key={language} value={language}>{language.toUpperCase()}</option>
              ))}
            </select>
            <div className="hidden items-center gap-1 sm:flex">
              {(Object.keys(languageLinks) as Language[]).map((language) => (
                <a
                  key={language}
                  href={languageLinks[language]}
                  aria-current={language === currentLanguage ? "page" : undefined}
                  className={`rounded-full px-2 py-1 font-mono text-[10px] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff45] ${language === currentLanguage ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
                >
                  {language}
                </a>
              ))}
            </div>
            <Button asChild size="sm" className="hidden rounded-full bg-[#d7ff45] text-black shadow-none hover:bg-white lg:inline-flex">
              <a href="#contact">{content.cta}</a>
            </Button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff45] lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile primary"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              className="mx-4 rounded-2xl border border-white/15 bg-[#0d0f11]/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              {content.nav.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff45]">
                  {item.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button type="button" onClick={(event) => { setMenuOpen(false); onPlayReel(event.currentTarget); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-3 text-xs text-white focus-visible:ring-2 focus-visible:ring-[#d7ff45]">
                  <Play className="h-3.5 w-3.5 fill-current" /> {reelCopy.play}
                </button>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="rounded-xl bg-[#d7ff45] px-3 py-3 text-center text-xs font-medium text-black focus-visible:ring-2 focus-visible:ring-white">{content.cta}</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
