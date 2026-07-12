import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "@/i18n/content";

type EngineeringPrinciplesProps = { content: SiteContent["engineeringPrinciples"] };
const accents = ["lime", "orange", "violet", "blue"];

export function EngineeringPrinciples({ content }: EngineeringPrinciplesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="principles" className="principles-manifesto">
      <div className="container">
        <header className="principles-heading">
          <p className="section-kicker">{content.kicker}</p>
          <h2>{content.title}</h2>
        </header>
        <div className="principles-flow">
          {content.principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              className={`principle-block principle-${accents[index]}`}
              initial={reduceMotion ? false : { opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .35 }}
              transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span className="principle-ghost" aria-hidden="true" initial={reduceMotion ? false : { x: -20 }} whileInView={{ x: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>0{index + 1}</motion.span>
              <div className="principle-meta"><span>0{index + 1} / 04</span><i /></div>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
              <motion.div className="principle-line" initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : .9 }} aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
