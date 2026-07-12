import { motion, useReducedMotion } from "framer-motion";
import { SystemScene } from "@/components/systems/SystemScene";
import type { SiteContent } from "@/i18n/content";

type FeaturedSystemsProps = { content: SiteContent["featuredSystems"] };

export function FeaturedSystems({ content }: FeaturedSystemsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="systems" className="systems-sequence">
      <div className="systems-intro container">
        <motion.div initial={reduceMotion ? false : { opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }}>
          <p className="section-kicker">{content.kicker}</p>
          <h2>{content.title}</h2>
        </motion.div>
        <motion.p initial={reduceMotion ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>{content.copy}</motion.p>
      </div>
      <div className="systems-scenes">
        {content.systems.map((system, index) => <SystemScene key={system.id} system={system} index={index} />)}
      </div>
    </section>
  );
}
