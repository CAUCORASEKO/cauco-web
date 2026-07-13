import { motion } from "framer-motion";
import { useMotionPreferences } from "@/motion/useMotionPreferences";

type LabProductVisualProps = { index: number };

const systems = [
  { mode: "browser", nodes: ["NAV", "CONTENT", "CTA", "MOBILE"] },
  { mode: "commerce", nodes: ["PRODUCT", "CART", "PAYMENT", "ORDER"] },
  { mode: "calendar", nodes: ["MON 09", "TUE 13", "SLOT 14:30", "CONFIRMED"] },
  { mode: "portal", nodes: ["LOGIN", "PROFILE", "DOCUMENTS", "ACCESS"] },
  { mode: "mobile", nodes: ["HOME", "ACCOUNT", "NOTIFY", "API SYNC"] },
  { mode: "assistant", nodes: ["QUESTION", "KNOWLEDGE", "RETRIEVE", "RESPONSE"] },
  { mode: "analytics", nodes: ["KPI 84%", "LIVE DATA", "ALERT 02", "REPORT"] },
  { mode: "investigation", nodes: ["CASE", "EVIDENCE", "TIMELINE", "REPORT"] },
  { mode: "trust", nodes: ["IDENTITY", "POLICY", "EVIDENCE", "DECISION"] },
  { mode: "custom", nodes: ["INTERFACE", "SERVICE", "DATA", "INTEGRATION"] },
];

export function LabProductVisual({ index }: LabProductVisualProps) {
  const { ambient } = useMotionPreferences();
  const system = systems[index] ?? systems[9];
  return <div className={`lab-product-visual system-object system-object-${system.mode}`} aria-hidden="true">
    <svg viewBox="0 0 500 240" preserveAspectRatio="none"><motion.path d="M55 65 L175 45 L250 120 L385 55 L445 175 L260 195 L145 165 Z" initial={{ pathLength: ambient ? 0 : 1 }} animate={{ pathLength: 1 }} transition={{ duration: ambient ? 1.8 : 0 }} /></svg>
    {system.nodes.map((node, i) => <motion.div key={node} animate={ambient ? { y: [0, i % 2 ? 5 : -5, 0], x: [0, i % 2 ? -3 : 3, 0] } : undefined} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: i * .35 }}><span>0{i + 1}</span><b>{node}</b><i>{i === 3 ? "READY" : "ACTIVE"}</i></motion.div>)}
    <em>{system.mode.toUpperCase()} SYSTEM / CONNECTED</em>
  </div>;
}
