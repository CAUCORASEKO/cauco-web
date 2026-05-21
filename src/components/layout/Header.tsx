import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Systems", href: "#systems" },
  { label: "Focus", href: "#focus" },
  { label: "Principles", href: "#principles" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/75 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="#top"
          className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="CAUCO home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-md border border-white/15 bg-white/[0.04] font-mono text-sm text-primary">
            C
          </span>
          <span className="hidden text-sm font-semibold tracking-wide text-foreground sm:block">
            CAUCO
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <Button asChild size="sm" variant="outline">
          <a href="#contact">Start a Conversation</a>
        </Button>
      </div>
    </header>
  );
}
