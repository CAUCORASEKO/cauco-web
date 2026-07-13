import { forwardRef, type PointerEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { LabProductVisual } from "@/components/lab/LabProductVisual";
import type { LabCategory, LabProductContent, SiteContent } from "@/i18n/content";

type CaucoLabProps = { content: SiteContent["lab"] };
type LabCardProps = { product: LabProductContent; index: number; categoryLabel: string; expanded: boolean; onOpen: () => void };

const categories: LabCategory[] = ["all", "web", "commerce", "operations", "mobile", "ai", "intelligence", "trust", "custom"];
const featuredPositions = new Set([0, 5]);
const tallPositions = new Set([2, 7]);
const compactTitleLength = 27;
const compactWordLength = 16;

const needsCompactTitle = (title: string) =>
  title.length > compactTitleLength || title.split(/\s+/).some((word) => word.length > compactWordLength);

const LabCard = forwardRef<HTMLElement, LabCardProps>(function LabCard({ product, index, categoryLabel, expanded, onOpen }, ref) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const artRawX = useMotionValue(0);
  const artRawY = useMotionValue(0);
  const rotateX = useSpring(rawY, { stiffness: 160, damping: 24 });
  const rotateY = useSpring(rawX, { stiffness: 160, damping: 24 });
  const artX = useSpring(artRawX, { stiffness: 120, damping: 22 });
  const artY = useSpring(artRawY, { stiffness: 120, damping: 22 });
  const format = featuredPositions.has(index) ? "featured" : tallPositions.has(index) ? "tall" : "standard";

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rawX.set(x * 2.4);
    rawY.set(y * -2.4);
    artRawX.set(x * 12);
    artRawY.set(y * 9);
  };

  const resetPointer = () => {
    rawX.set(0); rawY.set(0); artRawX.set(0); artRawY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.985 }}
      transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={`lab-card lab-card-${format}`}
      style={reduceMotion ? undefined : { rotateX, rotateY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className={`lab-cover lab-cover-${index + 1}`} aria-hidden="true">
        <span className="lab-cover-index">LAB—{String(index + 1).padStart(2, "0")}</span>
        <span className="lab-cover-mark">CAUCO®</span>
        <motion.div className="lab-cover-art" style={reduceMotion ? undefined : { x: artX, y: artY }}>
          <LabProductVisual index={index} />
        </motion.div>
      </div>
      <div className="lab-card-body">
        <div className="lab-card-meta">
          <span className="lab-badge">{product.engagement}</span>
          <span>{categoryLabel}</span>
        </div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <button type="button" className="lab-cta" aria-expanded={expanded} aria-controls="lab-detail" onClick={onOpen}>{product.cta}<ArrowRight aria-hidden="true" /></button>
      </div>
    </motion.article>
  );
});

export function CaucoLab({ content }: CaucoLabProps) {
  const [activeCategory, setActiveCategory] = useState<LabCategory>("all");
  const [selected, setSelected] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const visibleProducts = activeCategory === "all" ? content.products : content.products.filter((product) => product.category === activeCategory);
  const total = String(content.products.length).padStart(2, "0");
  const selectedProduct = selected === null ? null : content.products[selected];
  const compactDetailTitle = selectedProduct ? needsCompactTitle(selectedProduct.title) : false;
  useEffect(() => { if (selectedProduct) detailRef.current?.focus(); }, [selectedProduct]);
  useEffect(() => {
    if (!selectedProduct) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedProduct]);

  return (
    <section id="lab" className="cauco-lab" aria-labelledby="cauco-lab-title">
      <div className="lab-marquee" aria-hidden="true">
        <div>CAUCO LAB — SOFTWARE SYSTEMS — APPLIED ENGINEERING — CLIENT WORK — CAUCO LAB — SOFTWARE SYSTEMS — APPLIED ENGINEERING — CLIENT WORK —</div>
      </div>
      <div className="container">
        <p className="lab-bridge"><span>04 / LAB OUTPUT</span>{content.bridge}</p>
        <header className="lab-heading">
          <p className="lab-label"><span aria-hidden="true" />{content.label}</p>
          <div className="lab-title-row">
            <h2 id="cauco-lab-title">{content.title}</h2>
            <p>{content.description}</p>
          </div>
        </header>

        <div className="lab-browser-bar">
          <div className="lab-filters" role="group" aria-label={content.label}>
            {categories.map((category) => (
              <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>
                {content.filters[category]}
              </button>
            ))}
          </div>
          <span className="lab-result-count" aria-live="polite">{String(visibleProducts.length).padStart(2, "0")} / {total}</span>
        </div>

        <motion.div layout={!reduceMotion} className="lab-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProducts.map((product) => {
              const index = content.products.indexOf(product);
              return <LabCard key={product.title} product={product} index={index} categoryLabel={content.filters[product.category]} expanded={selected === index} onOpen={() => setSelected(index)} />;
            })}
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {selectedProduct && <motion.div id="lab-detail" ref={detailRef} tabIndex={-1} role="region" aria-labelledby="lab-detail-title" className="lab-detail" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : 16 }}>
            <div className="lab-detail-head"><span>LAB—{String(selected! + 1).padStart(2, "0")} / {content.filters[selectedProduct.category]}</span><button type="button" onClick={() => setSelected(null)} aria-label={content.detail.close}><X aria-hidden="true" />{content.detail.close}</button></div>
            <div className="lab-detail-layout"><div className="lab-detail-main"><p className="lab-detail-label">{content.detail.includes}</p><h3 id="lab-detail-title" data-title-size={compactDetailTitle ? "compact" : "default"}>{selectedProduct.title}</h3><p>{selectedProduct.description}</p></div><div className="lab-detail-specs"><section><h4>{content.detail.idealFor}</h4><ul>{selectedProduct.idealFor.map(x => <li key={x}>{x}</li>)}</ul></section><section><h4>{content.detail.capabilities}</h4><ul>{selectedProduct.capabilities.map(x => <li key={x}>{x}</li>)}</ul></section><dl><div><dt>{content.detail.delivery}</dt><dd>{selectedProduct.delivery}</dd></div><div><dt>{content.detail.engagement}</dt><dd>{selectedProduct.engagement}</dd></div></dl><a href="#contact" className="lab-detail-contact">{content.detail.contact}<ArrowRight aria-hidden="true" /></a></div></div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </section>
  );
}
