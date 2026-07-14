import { ArrowDownRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { SiteContent } from "@/i18n/content";

type TechnicalFocusProps = { content: SiteContent["technicalFocus"] };

export function TechnicalFocus({ content }: TechnicalFocusProps) {
  const reduceMotion = useReducedMotion();
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const activeIndex = pinnedIndex ?? previewIndex;

  const toggleArea = (index: number) => {
    setPreviewIndex(null);
    setPinnedIndex((current) => current === index ? null : index);
  };

  return (
    <section id="focus" className="focus-index">
      <div className="container">
        <header className="focus-heading">
          <div><p className="section-kicker">{content.kicker}</p><h2>{content.title}</h2></div>
          <p>{content.copy}</p>
        </header>
        <ol className="focus-list">
          {content.areas.map(({ title, description, capabilities, related }, index) => {
            const isActive = activeIndex === index;
            const detailId = `focus-detail-${index}`;

            return (
              <motion.li
                key={title}
                data-active={isActive || undefined}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse" && pinnedIndex === null) setPreviewIndex(index);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse" && pinnedIndex === null) setPreviewIndex(null);
                }}
                initial={reduceMotion ? false : { opacity: 0, x: index % 2 ? 26 : -26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: .45 }}
                transition={{ duration: .55, ease: "easeOut" }}
              >
                <motion.span className="focus-rule" initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : .75 }} aria-hidden="true" />
                <button
                  type="button"
                  className="focus-trigger"
                  aria-expanded={isActive}
                  aria-controls={detailId}
                  onClick={() => toggleArea(index)}
                  onFocus={() => {
                    if (pinnedIndex === null) setPreviewIndex(index);
                  }}
                  onBlur={() => {
                    if (pinnedIndex === null) setPreviewIndex(null);
                  }}
                >
                  <span className="focus-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <span className="focus-technical" aria-hidden="true">{title.toUpperCase()} / CAUCO</span>
                  <ArrowDownRight aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={detailId}
                      className="focus-detail"
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                      transition={{ duration: reduceMotion ? 0 : .18, ease: "easeOut" }}
                    >
                      <p>{description}</p>
                      <ul className="focus-capabilities">
                        {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                      </ul>
                      {related && related.length > 0 && (
                        <ul className="focus-related">
                          {related.map((project) => <li key={project}>{project}</li>)}
                        </ul>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
