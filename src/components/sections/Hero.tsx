import type { PointerEvent } from "react";
import { ArrowDown, ArrowDownRight, Braces, Fingerprint, Play, ScanSearch, ShieldCheck } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SystemFragment } from "@/components/hero/SystemFragment";
import type { SiteContent } from "@/i18n/content";
import { motionEase } from "@/motion/config";

type HeroProps = { content: SiteContent["hero"]; reelCopy: SiteContent["reel"]; onPlayReel: (opener: HTMLElement) => void };

export function Hero({ content, reelCopy, onPlayReel }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 70, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 70, damping: 20 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
  };

  return (
    <section id="top" onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} className="hero-stage relative isolate flex min-h-[760px] overflow-hidden pt-20 lg:min-h-[850px] lg:h-[100svh]">
      <div className="hero-noise absolute inset-0 -z-10" />
      <div className="hero-crop hero-crop-left" aria-hidden="true">AI</div>
      <div className="hero-crop hero-crop-right" aria-hidden="true">01</div>

      <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .75, ease: motionEase }} style={reduceMotion ? undefined : { x, y }} className="pointer-field absolute inset-0 hidden lg:block" aria-hidden="true">
        <div className="trust-orbit"><i /><i /><i /><span>human review</span><span>policy gates</span><span>traceable output</span></div>
        <SystemFragment name="AURORA" meta="control layer / 01" icon={Fingerprint} delay={0.3} className="fragment-aurora" />
        <SystemFragment name="QALENS" meta="quality signal / 02" icon={ScanSearch} delay={1.1} className="fragment-qalens" />
        <SystemFragment name="AISOSEC" meta="secure flow / 03" icon={ShieldCheck} delay={1.8} className="fragment-aisosec" />
        <div className="evidence-strip"><Braces className="h-4 w-4" /><span>EVIDENCE</span><span>TRUST</span><span>POLICY</span><span>AUDIT</span></div>
      </motion.div>

      <div className="container relative flex w-full flex-col justify-between pb-8 pt-16 sm:pt-20 lg:pb-10 lg:pt-[10vh]">
        <div className="relative z-10">
          <motion.p initial={reduceMotion ? false : { opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .45, delay: .08, ease: motionEase }} className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#d7ff45]">
            <span className="h-px w-8 bg-current" /> {content.eyebrow}
          </motion.p>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .2, ease: motionEase }} className="hero-title font-semibold tracking-[-0.075em] text-white">
            {content.title}
          </motion.h1>
        </div>

        <div className="relative z-20 mt-10 grid items-end gap-8 lg:mt-2 lg:grid-cols-[minmax(0,1fr)_minmax(280px,440px)]">
          <div className="mobile-system-ticker flex gap-2 overflow-hidden lg:hidden" aria-hidden="true">
            {['AURORA', 'QALENS', 'AISOSEC'].map((name, index) => <span key={name} className="shrink-0 rounded-full border border-white/20 px-3 py-2 font-mono text-[9px] tracking-widest text-white/75">0{index + 1} / {name}</span>)}
          </div>
          <div className="hidden items-end gap-4 lg:flex">
            <a href="#systems" aria-label={content.primaryCta} className="hero-scroll-indicator group grid h-16 w-16 place-items-center rounded-full border border-white/30 text-white transition hover:border-[#d7ff45] hover:bg-[#d7ff45] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7ff45]">
              <motion.span animate={reduceMotion ? undefined : { y: [0, 3, 0], opacity: [.55, 1, .55] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}><ArrowDown className="h-5 w-5" /></motion.span>
            </a>
            <p className="mb-1 max-w-[180px] font-mono text-[9px] uppercase leading-4 tracking-[0.18em] text-white/45">Scroll to enter the system</p>
          </div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, delay: .62, ease: motionEase }} className="border-l border-white/20 pl-5 lg:pl-7">
            <p className="text-base leading-7 text-white/70 sm:text-lg">{content.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-[#d7ff45] text-black shadow-none hover:bg-white">
                <a href="#systems">{content.primaryCta} <ArrowDownRight className="h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/25 bg-transparent hover:bg-white hover:text-black">
                <a href="#contact">{content.secondaryCta}</a>
              </Button>
              <Button type="button" size="lg" variant="ghost" onClick={(event) => onPlayReel(event.currentTarget)} className="rounded-full text-white/75 hover:bg-white/10 hover:text-white">
                <Play className="h-3.5 w-3.5 fill-current" /> {reelCopy.play}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
