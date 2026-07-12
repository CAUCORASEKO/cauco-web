import { motion } from "framer-motion";
import { Check, FileCheck2, Fingerprint, LockKeyhole, ScanSearch, ShieldCheck } from "lucide-react";
import { useMotionPreferences } from "@/motion/useMotionPreferences";

type LabProductVisualProps = { index: number };

const loop = { duration: 6, repeat: Infinity, ease: "easeInOut" as const };

function AuroraVisual({ reduced }: { reduced: boolean }) {
  return <div className="lab-object aurora-object">
    <motion.div animate={reduced ? undefined : { x: [0, 6, 0], y: [0, -3, 0] }} transition={loop}><Fingerprint /><span>IDENTITY VERIFIED</span><b>PASS</b></motion.div>
    <motion.div animate={reduced ? undefined : { x: [0, -5, 0], y: [0, 4, 0] }} transition={{ ...loop, delay: .6 }}><ShieldCheck /><span>POLICY GATE</span><b>04 / 04</b></motion.div>
    <motion.div animate={reduced ? undefined : { y: [0, -5, 0] }} transition={{ ...loop, delay: 1.1 }}><FileCheck2 /><span>EVIDENCE PACKAGE</span><b>SEALED</b></motion.div>
    <i>CONTROLLED OPERATION / READY</i>
  </div>;
}

function BlueprintVisual({ reduced }: { reduced: boolean }) {
  const nodes = ["IDENTITY", "POLICY", "EVIDENCE", "DECISION", "AUDIT"];
  return <div className="lab-object blueprint-object">
    <svg viewBox="0 0 500 240"><motion.path d="M50 120 L155 45 L250 120 L350 55 L450 120 L350 195 L250 120 L155 195 Z" initial={{ pathLength: reduced ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduced ? 0 : 2, ease: "easeOut" }} /></svg>
    {nodes.map((node, i) => <motion.span key={node} initial={false} animate={reduced ? undefined : { scale: [1, 1.06, 1] }} transition={{ ...loop, delay: i * .35 }}>{node}<b>0{i + 1}</b></motion.span>)}
  </div>;
}

function ReportsVisual({ reduced }: { reduced: boolean }) {
  return <div className="lab-object reports-object">
    {["CONTROL MAPPING", "EVIDENCE / 12", "SEVERITY / HIGH", "FINDING / A-017"].map((label, i) => <motion.div key={label} animate={reduced ? undefined : { x: [0, i * 2 + 3, 0], y: [0, -i * 2, 0] }} transition={{ ...loop, delay: i * .45 }}><span>AUDIT REPORT</span><strong>{label}</strong><i /><i /><i /></motion.div>)}
  </div>;
}

function IconsVisual({ reduced }: { reduced: boolean }) {
  const icons = [ShieldCheck, FileCheck2, Check, ScanSearch, LockKeyhole, Fingerprint];
  const labels = ["SHIELD", "EVIDENCE", "APPROVAL", "RISK", "AUDIT", "IDENTITY"];
  return <div className="lab-object icons-object">{icons.map((Icon, i) => <motion.div key={labels[i]} animate={reduced ? undefined : { y: [0, i % 2 ? 4 : -4, 0] }} transition={{ ...loop, delay: i * .25 }}><Icon /><span>{labels[i]}</span></motion.div>)}</div>;
}

function PromptsVisual({ reduced }: { reduced: boolean }) {
  return <div className="lab-object prompts-object">
    {["/analyze risk surface", "/review delivery evidence", "/generate test cases", "/map control gaps"].map((text, i) => <motion.div key={text} animate={reduced ? undefined : { x: [0, i % 2 ? -8 : 8, 0] }} transition={{ ...loop, delay: i * .4 }}><span>0{i + 1}</span><strong>{text}</strong><b>{i === 2 ? "08 CASES" : "READY"}</b></motion.div>)}
    <i>STRUCTURED OUTPUT / VERIFIED</i>
  </div>;
}

function EvidenceVisual({ reduced }: { reduced: boolean }) {
  const stages = ["CAPTURED", "VERIFIED", "SEALED", "AUDIT REF"];
  return <div className="lab-object evidence-object">
    <div className="evidence-track" />
    {stages.map((stage, i) => <motion.div key={stage} animate={reduced ? undefined : { y: [0, i % 2 ? 5 : -5, 0] }} transition={{ ...loop, delay: i * .45 }}><span>0{i + 1}</span><FileCheck2 /><b>{stage}</b></motion.div>)}
  </div>;
}

function RiskVisual({ reduced }: { reduced: boolean }) {
  return <div className="lab-object risk-object">
    <span className="risk-axis risk-axis-y">LIKELIHOOD</span><span className="risk-axis risk-axis-x">IMPACT</span>
    <div className="risk-grid">{Array.from({ length: 25 }, (_, i) => <motion.i key={i} className={i === 8 ? "active" : i > 17 ? "high" : ""} animate={!reduced && i === 8 ? { scale: [1, 1.16, 1] } : undefined} transition={loop}><b>{Math.floor(i / 5) + 1}×{i % 5 + 1}</b></motion.i>)}</div>
    <em>ACTIVE RISK / HIGH</em>
  </div>;
}

function DeveloperVisual({ reduced }: { reduced: boolean }) {
  const modules = ["FRONTEND", "API", "BACKEND", "DATA", "TESTS"];
  return <div className="lab-object developer-object">
    <svg viewBox="0 0 500 220"><path d="M75 55 L250 35 L425 55 M75 55 L155 170 L250 35 L345 170 L425 55 M155 170 L345 170" /></svg>
    {modules.map((module, i) => <motion.div key={module} animate={reduced ? undefined : { x: [0, i % 2 ? 5 : -5, 0], y: [0, i > 2 ? -4 : 4, 0] }} transition={{ ...loop, delay: i * .3 }}><span>{module}</span><b>{i === 4 ? "PASS" : "READY"}</b></motion.div>)}
  </div>;
}

export function LabProductVisual({ index }: LabProductVisualProps) {
  const { ambient } = useMotionPreferences();
  const reduced = !ambient;
  const visuals = [AuroraVisual, BlueprintVisual, ReportsVisual, IconsVisual, PromptsVisual, EvidenceVisual, RiskVisual, DeveloperVisual];
  const Visual = visuals[index] ?? AuroraVisual;
  return <div className="lab-product-visual" aria-hidden="true"><Visual reduced={reduced} /></div>;
}
