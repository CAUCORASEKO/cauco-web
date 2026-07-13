import { ArrowDownRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "@/i18n/content";

type TechnicalFocusProps = { content: SiteContent["technicalFocus"] };

export function TechnicalFocus({ content }: TechnicalFocusProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="focus" className="focus-index">
      <div className="container">
        <header className="focus-heading">
          <div><p className="section-kicker">{content.kicker}</p><h2>{content.title}</h2></div>
          <p>{content.copy}</p>
        </header>
        <ol className="focus-list">
          {content.areas.map(({ title }, index) => (
            <motion.li
              key={title}
              tabIndex={0}
              initial={reduceMotion ? false : { opacity: 0, x: index % 2 ? 26 : -26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: .45 }}
              transition={{ duration: .55, ease: "easeOut" }}
            >
              <motion.span className="focus-rule" initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : .75 }} aria-hidden="true" />
              <span className="focus-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <span className="focus-technical">{title.toUpperCase()} / CAUCO</span>
              <ArrowDownRight aria-hidden="true" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
