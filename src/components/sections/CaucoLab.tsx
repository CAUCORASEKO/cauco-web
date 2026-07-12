import { forwardRef, type PointerEvent, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { LabProductVisual } from "@/components/lab/LabProductVisual";
import type { LabCategory, LabProductContent, SiteContent } from "@/i18n/content";

type CaucoLabProps = { content: SiteContent["lab"] };
type LabCardProps = { product: LabProductContent; index: number; categoryLabel: string };

const categories: LabCategory[] = ["all", "software", "research", "ui", "templates", "ai", "downloads"];
const featuredPositions = new Set([0, 4]);
const tallPositions = new Set([2, 6]);

const LabCard = forwardRef<HTMLElement, LabCardProps>(function LabCard({ product, index, categoryLabel }, ref) {
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
          <span className={`lab-badge lab-badge-${product.status}`}>{product.statusLabel}</span>
          <span>{categoryLabel}</span>
        </div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        {product.href ? (
          <a href={product.href} className="lab-cta">{product.cta}<ArrowUpRight aria-hidden="true" /></a>
        ) : (
          <span className="lab-cta lab-cta-static"><Clock3 aria-hidden="true" />{product.statusLabel}</span>
        )}
      </div>
    </motion.article>
  );
});

export function CaucoLab({ content }: CaucoLabProps) {
  const [activeCategory, setActiveCategory] = useState<LabCategory>("all");
  const reduceMotion = useReducedMotion();
  const visibleProducts = activeCategory === "all" ? content.products : content.products.filter((product) => product.category === activeCategory);
  const total = String(content.products.length).padStart(2, "0");

  return (
    <section id="lab" className="cauco-lab" aria-labelledby="cauco-lab-title">
      <div className="lab-marquee" aria-hidden="true">
        <div>CAUCO LAB — DIGITAL GOODS — RESEARCH OBJECTS — INTERFACE SYSTEMS — CAUCO LAB — DIGITAL GOODS — RESEARCH OBJECTS — INTERFACE SYSTEMS —</div>
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
              return <LabCard key={product.title} product={product} index={index} categoryLabel={content.filters[product.category]} />;
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
