import { ArrowDownRight, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CpuArchitecture } from "@/components/visuals/CpuArchitecture";
import type { SiteContent } from "@/i18n/content";

type HeroProps = {
  content: SiteContent["hero"];
};

export function Hero({ content }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(91,141,239,0.22),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(155,212,198,0.14),transparent_32%)]" />
      <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-primary">
            {content.eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {content.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#systems">
                {content.primaryCta} <ArrowDownRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">
                {content.secondaryCta} <MessageSquare className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          aria-hidden="false"
        >
          <CpuArchitecture />
        </motion.div>
      </div>
    </section>
  );
}
