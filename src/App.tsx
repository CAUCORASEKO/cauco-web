import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ContactSection } from "@/components/sections/ContactSection";
import { CaucoLab } from "@/components/sections/CaucoLab";
import { EngineeringPrinciples } from "@/components/sections/EngineeringPrinciples";
import { FeaturedSystems } from "@/components/sections/FeaturedSystems";
import { Hero } from "@/components/sections/Hero";
import { TechnicalFocus } from "@/components/sections/TechnicalFocus";
import { EcosystemReveal } from "@/components/ecosystem/EcosystemReveal";
import { PlayReel } from "@/components/reel/PlayReel";
import { content, detectLanguage } from "@/i18n/content";
import type { SiteContent } from "@/i18n/content";
import { loadSiteContent } from "@/i18n/loadContent";

export default function App() {
  const [siteContent, setSiteContent] = useState<SiteContent>(() => content[detectLanguage()]);
  const [reelOpen, setReelOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const bodyOverflowRef = useRef("");

  useEffect(() => {
    let mounted = true;

    void loadSiteContent().then((loadedContent) => {
      if (mounted) {
        setSiteContent(loadedContent);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const openReel = (opener: HTMLElement) => { openerRef.current = opener; setReelOpen(true); };
  const closeReel = () => setReelOpen(false);

  useEffect(() => {
    const page = pageRef.current;
    if (reelOpen) {
      bodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      page?.setAttribute("inert", "");
    } else {
      document.body.style.overflow = bodyOverflowRef.current;
      page?.removeAttribute("inert");
      openerRef.current?.focus({ preventScroll: true });
    }
    return () => { document.body.style.overflow = bodyOverflowRef.current; page?.removeAttribute("inert"); };
  }, [reelOpen]);

  const explore = () => {
    setReelOpen(false);
    requestAnimationFrame(() => document.querySelector(".ecosystem-reveal")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  };

  return (
    <>
    <div ref={pageRef} className="min-h-screen bg-background text-foreground">
      <Header content={siteContent.header} currentLanguage={siteContent.language} reelCopy={siteContent.reel} onPlayReel={openReel} />
      <main>
        <Hero content={siteContent.hero} reelCopy={siteContent.reel} onPlayReel={openReel} />
        <FeaturedSystems content={siteContent.featuredSystems} />
        <EcosystemReveal content={siteContent.ecosystem} />
        <CaucoLab content={siteContent.lab} />
        <TechnicalFocus content={siteContent.technicalFocus} />
        <EngineeringPrinciples content={siteContent.engineeringPrinciples} />
        <ContactSection content={siteContent.contact} />
      </main>
      <Footer content={siteContent.footer} />
    </div>
    <AnimatePresence>{reelOpen && <PlayReel copy={siteContent.reel} onClose={closeReel} onExplore={explore} />}</AnimatePresence>
    </>
  );
}
