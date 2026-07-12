import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, FileCheck2, ScanLine, ShieldCheck, Waypoints } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { SystemContent } from "@/i18n/content";
import { motionEase } from "@/motion/config";
import { useMotionPreferences } from "@/motion/useMotionPreferences";
import { StoryRail } from "@/components/story/StoryRail";

type SystemSceneProps = {
  system: SystemContent;
  index: number;
};

const sceneLabels = {
  aurora: ["IDENTITY / VERIFIED", "POLICY GATE / PASSED", "EVIDENCE / SEALED"],
  qalens: ["ISSUE / QL-184", "RISK / 72", "TESTS / 08"],
  aisosec: ["FINDING / A-017", "OWASP / A01", "EVIDENCE / 12"],
  whalescope: ["FLOW / +18.4%", "WHALE / 2,480 BTC", "SIGNAL / WATCH"],
} as const;

type VisualProps = { activeStep: number; reduced: boolean };

function AuroraVisual({ activeStep, reduced }: VisualProps) {
  return (
    <div className="aurora-visual system-visual" data-step={activeStep} data-complete={reduced} aria-hidden="true">
      <div className="aurora-request operational-state">REQUEST / 0042</div>
      <div className="aurora-ring"><span>CONTROLLED OPERATION</span></div>
      <div className="visual-node node-a"><ShieldCheck /> POLICY GATE <b>{activeStep >= 3 || reduced ? "PASS" : "PENDING"}</b></div>
      <div className="visual-node node-b"><Check /> IDENTITY / PERMISSION <b>{activeStep >= 2 || reduced ? "CHECKED" : activeStep >= 1 ? "VERIFY" : "PENDING"}</b></div>
      <div className="visual-node node-c"><FileCheck2 /> EVIDENCE PACKAGE <b>{activeStep >= 4 || reduced ? "SEALED" : "ASSEMBLING"}</b></div>
      <div className="aurora-review operational-state">HUMAN REVIEW / {activeStep >= 5 || reduced ? "APPROVED" : "QUEUED"}</div>
      <div className="aurora-decision operational-output"><Check /> CONTROLLED DECISION / CONFIRMED</div>
      <div className="aurora-line line-a" /><div className="aurora-line line-b" />
    </div>
  );
}

function QALensVisual({ activeStep, reduced }: VisualProps) {
  return (
    <div className="qalens-visual system-visual" data-step={activeStep} data-complete={reduced} aria-hidden="true">
      <div className="issue-sheet"><span>QL-184 / CHECKOUT FLOW</span><strong>{activeStep >= 2 || reduced ? "Retry must preserve session and cart state" : "Session state may diverge after retry"}</strong><i>{activeStep >= 2 || reduced ? "IMPROVEMENT" : "UNRESOLVED"}</i></div>
      <div className="qa-score"><small>QA RISK</small><strong>{activeStep >= 1 || reduced ? "72" : "—"}</strong><span>/100</span></div>
      <div className="test-stack"><Waypoints /><span>GENERATED TESTS</span><b>Retry preserves cart state</b><em>{activeStep >= 3 || reduced ? "08 READY" : "PENDING"}</em></div>
      <div className="qa-evidence operational-output"><FileCheck2 /> DELIVERY EVIDENCE / VALIDATED</div>
      <Waypoints className="qa-route" />
    </div>
  );
}

function AisoSecVisual({ activeStep, reduced }: VisualProps) {
  return (
    <div className="aisosec-visual system-visual" data-step={activeStep} data-complete={reduced} aria-hidden="true">
      <div className="audit-target"><span>FINDING / A-017</span><strong>Excessive privilege path</strong><b>{activeStep >= 2 || reduced ? "HIGH" : "UNASSESSED"}</b></div>
      <div className="audit-evidence-count operational-state">EVIDENCE / {activeStep >= 1 || reduced ? "12 CAPTURED" : "PENDING"}</div>
      <div className="control-map"><span>CONTROL MAP</span><b>OWASP A01</b><b>NIST AC-6</b><b>ISO A.8.2</b></div>
      <div className="compliance-gap operational-state">COMPLIANCE GAP / OPEN</div>
      <div className="audit-output operational-output"><FileCheck2 /><span>AUDIT OUTPUT</span><strong>Audit-ready / 12 evidence items</strong></div>
    </div>
  );
}

function WhaleScopeVisual({ activeStep, reduced }: VisualProps) {
  return (
    <div className="whalescope-visual system-visual" data-step={activeStep} data-complete={reduced} aria-hidden="true">
      <svg className="flow-chart" viewBox="0 0 600 260" preserveAspectRatio="none"><path d="M0 210 C80 180 90 220 170 130 S290 190 350 85 S470 130 600 20" /><path className="flow-ghost" d="M0 230 C90 210 110 160 190 190 S310 80 410 120 S520 55 600 70" /></svg>
      <div className="market-event operational-state">MARKET EVENT / DETECTED</div>
      <div className="flow-pulse" />
      <div className="market-signal"><span>INSTITUTIONAL FLOW</span><strong>+18.4%</strong><small>7D NET</small></div>
      <div className="whale-event"><span>WHALE TRANSACTION</span><strong>2,480 BTC</strong><small>custody → unknown</small></div>
      <div className="signal-interpretation operational-state">SIGNAL / ACCUMULATION WATCH</div>
      <div className="research-stamp operational-output">RESEARCH INSIGHT<br />SIGNAL 04 / VALIDATED</div>
    </div>
  );
}

const visuals = { aurora: AuroraVisual, qalens: QALensVisual, aisosec: AisoSecVisual, whalescope: WhaleScopeVisual };

export function SystemScene({ system, index }: SystemSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { mobile } = useMotionPreferences();
  const isVisible = useInView(sceneRef, { amount: mobile ? .22 : .46 });
  const [activeStep, setActiveStep] = useState(0);
  const wasVisible = useRef(false);
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start end", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 0.45, 1], reduceMotion ? [0, 0, 0] : [70, 0, -35]);
  const visualY = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [100, 0, -70]);
  const Visual = visuals[system.id];
  const reversed = index % 2 === 1;

  useEffect(() => {
    if (reduceMotion) {
      setActiveStep(system.story.length - 1);
      return;
    }
    if (isVisible && !wasVisible.current) setActiveStep(0);
    wasVisible.current = isVisible;
    if (!isVisible) return;

    const finalStep = activeStep === system.story.length - 1;
    const delay = finalStep ? (mobile ? 4200 : 3000) : (mobile ? 2250 : 1650);
    const timer = window.setTimeout(() => {
      setActiveStep((current) => current === system.story.length - 1 ? 0 : current + 1);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [activeStep, isVisible, mobile, reduceMotion, system.story.length]);

  return (
    <article ref={sceneRef} className={`system-scene scene-${system.id}`}>
      <div className="system-scene-sticky container">
        <span className="scene-watermark" data-chapter={index + 1} aria-hidden="true">
          <span className="scene-watermark-digit">0</span>
          <span className="scene-watermark-digit">{index + 1}</span>
        </span>
        <div className="scene-progress" aria-label={`Chapter ${index + 1} of 4`}>
          <span>0{index + 1} / 04</span><i aria-hidden="true" />
        </div>
        <motion.div style={{ y: contentY }} className={`scene-copy ${reversed ? "md:order-2" : ""}`}>
          <div className="scene-meta"><span className="scene-status"><i />{system.status}</span></div>
          <p className="scene-category">{system.category}</p>
          <h3>{system.name}</h3>
          <p className="scene-description">{system.description}</p>
          <ul className="scene-capabilities" aria-label={`${system.name} capabilities`}>
            {system.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
          {system.href ? (
            <a href={system.href} className="scene-cta">{system.cta}<ArrowUpRight /></a>
          ) : (
            <p className="scene-cta scene-cta-muted"><ScanLine />{system.cta}</p>
          )}
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .7, ease: motionEase }} style={{ y: visualY }} className={`scene-visual-wrap ${reversed ? "md:order-1" : ""}`}>
          <Visual activeStep={activeStep} reduced={Boolean(reduceMotion)} />
          <StoryRail steps={system.story} system={system.name} activeStep={activeStep} reduced={Boolean(reduceMotion)} />
          <div className="scene-readout" aria-hidden="true">
            {sceneLabels[system.id].map((label) => <span key={label}>{label}</span>)}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
