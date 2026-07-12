import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "@/i18n/content";
import { motionEase } from "@/motion/config";

type EcosystemRevealProps = { content: SiteContent["ecosystem"] };

const systems = [
  { name: "Aurora", id: "aurora", delay: .15 },
  { name: "QALens", id: "qalens", delay: .65 },
  { name: "AisoSec Audit", id: "aisosec", delay: 1.15 },
] as const;

const routes = [
  { id: "aurora", d: "M240 102 C330 102 345 205 438 220", delay: 1.55 },
  { id: "qalens", d: "M265 280 C345 280 370 255 438 250", delay: 1.9 },
  { id: "aisosec", d: "M275 458 C355 458 365 315 448 282", delay: 2.25 },
  { id: "layer-0", d: "M590 220 C665 205 690 105 778 105", delay: 3.15 },
  { id: "layer-1", d: "M600 242 C680 242 710 220 808 220", delay: 3.35 },
  { id: "layer-2", d: "M595 265 C685 275 690 350 770 350", delay: 3.55 },
  { id: "layer-3", d: "M575 285 C660 325 700 470 805 470", delay: 3.75 },
] as const;

export function EcosystemReveal({ content }: EcosystemRevealProps) {
  const reduced = useReducedMotion();
  const [engineLabel, sharedLabel] = content.coreLabel.split(" / ");

  const reveal = (offset = 18) => reduced ? false : { opacity: 0, y: offset, filter: "blur(5px)" };

  return (
    <section className="ecosystem-reveal" aria-labelledby="ecosystem-title">
      <div className="container ecosystem-heading">
        <motion.p initial={reduced ? false : { opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="section-kicker">03 / {content.label}</motion.p>
        <motion.h2 id="ecosystem-title" initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .7, ease: motionEase }}>{content.title}</motion.h2>
        <p>{content.description}</p>
      </div>

      <div className="container ecosystem-map">
        <svg className="ecosystem-routes" aria-hidden="true" viewBox="0 0 1000 560" preserveAspectRatio="none">
          {routes.map((route) => (
            <motion.path className={`route-${route.id}`} key={route.id} d={route.d}
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true, amount: .35 }}
              transition={{ duration: reduced ? 0 : .75, delay: reduced ? 0 : route.delay, ease: motionEase }} />
          ))}
        </svg>

        <div className="ecosystem-systems" aria-label="Connected systems">
          {systems.map((system, index) => (
            <motion.div className={`ecosystem-system system-${system.id}`} key={system.id}
              initial={reveal()} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: .5 }} transition={{ duration: .55, delay: reduced ? 0 : system.delay, ease: motionEase }}>
              <span><i aria-hidden="true" />SYSTEM 0{index + 1}</span><strong>{system.name}</strong>
            </motion.div>
          ))}
        </div>

        <motion.div className="ecosystem-core" initial={reduced ? false : { opacity: 0, scale: .82 }}
          whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .55 }}
          transition={{ duration: .7, delay: reduced ? 0 : 2.7, ease: motionEase }}>
          <i className="core-orbit" aria-hidden="true"><b /><b /><b /><b /></i>
          <div><span>{sharedLabel ?? "Shared trust core"}</span><strong>{engineLabel}</strong><small>ACTIVE / 04 LAYERS</small></div>
        </motion.div>

        <div className="ecosystem-layers" aria-label="Shared trust layers">
          {content.layers.map((layer, index) => (
            <motion.div className={`ecosystem-layer layer-${index}`} key={layer}
              initial={reveal(0)} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: .4 }} transition={{ duration: .5, delay: reduced ? 0 : 3.15 + index * .2 }}>
              <span>0{index + 1}</span><strong>{layer}</strong><i aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
      <p className="container ecosystem-summary">{content.summary}</p>
    </section>
  );
}
