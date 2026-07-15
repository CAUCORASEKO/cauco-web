import type { CSSProperties } from "react";
import type { SiteContent } from "@/i18n/content";
import type { ReelSceneId } from "./reelData";

type ReelSceneProps = { id: ReelSceneId; copy: SiteContent["reel"]; progress?: number; paused?: boolean; reduced?: boolean };
type SceneProps = { copy: SiteContent["reel"]; p: number };

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const phase = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
const mix = (from: number, to: number, p: number) => from + (to - from) * p;
const vars = (values: Record<string, string | number>) => values as CSSProperties;
const reveal = (on: number, opacity = on): CSSProperties => ({
  opacity,
  visibility: opacity <= .001 ? "hidden" : "visible",
  filter: `blur(${mix(3, 0, on)}px)`,
  transform: `translateY(${mix(12, 0, on)}px)`,
});
const windowed = (p: number, enterStart: number, enterEnd: number, exitStart: number, exitEnd: number) =>
  phase(p, enterStart, enterEnd) * (1 - phase(p, exitStart, exitEnd));

type GraphGeometry = {
  desktop: [number, number];
  tablet: [number, number];
  mobile: [number, number];
  side: "left" | "right";
};

type GraphColor = "lime" | "coral" | "violet";
type CapabilityId = "ai" | "backend" | "devtools" | "desktop" | "fintech" | "compliance" | "trust" | "automation" | "product";
type CapabilityNode = GraphGeometry & { id: CapabilityId; labelIndex: number; color: GraphColor; priority: "primary" | "secondary" };
type GraphEdge<Id extends string> = { from: Id; to: Id; kind?: "core" | "semantic"; mobile?: "show" | "hide" };

const capabilityCore: GraphGeometry & { id: "core" } = { id: "core", desktop: [50, 50], tablet: [50, 50], mobile: [50, 50], side: "right" };

const capabilityNodes: CapabilityNode[] = [
  { id: "ai", labelIndex: 0, color: "lime", priority: "primary", desktop: [50, 12], tablet: [50, 12], mobile: [43, 9], side: "left" },
  { id: "backend", labelIndex: 1, color: "coral", priority: "primary", desktop: [72, 75], tablet: [73, 76], mobile: [57, 72], side: "right" },
  { id: "devtools", labelIndex: 2, color: "violet", priority: "secondary", desktop: [74, 23], tablet: [76, 23], mobile: [57, 17], side: "right" },
  { id: "desktop", labelIndex: 3, color: "lime", priority: "secondary", desktop: [83, 63], tablet: [79, 61], mobile: [57, 34], side: "right" },
  { id: "fintech", labelIndex: 4, color: "coral", priority: "secondary", desktop: [48, 89], tablet: [49, 89], mobile: [57, 87], side: "right" },
  { id: "compliance", labelIndex: 5, color: "violet", priority: "primary", desktop: [25, 76], tablet: [23, 76], mobile: [43, 69], side: "left" },
  { id: "trust", labelIndex: 6, color: "lime", priority: "primary", desktop: [13, 52], tablet: [10, 52], mobile: [43, 61], side: "left" },
  { id: "automation", labelIndex: 7, color: "coral", priority: "secondary", desktop: [25, 23], tablet: [23, 23], mobile: [43, 26], side: "left" },
  { id: "product", labelIndex: 8, color: "violet", priority: "primary", desktop: [76, 48], tablet: [78, 47], mobile: [43, 91], side: "left" },
];

const capabilityEdges: GraphEdge<CapabilityId | "core">[] = [
  { from: "core", to: "ai", kind: "core" },
  { from: "core", to: "backend", kind: "core" },
  { from: "core", to: "compliance", kind: "core" },
  { from: "core", to: "trust", kind: "core" },
  { from: "core", to: "product", kind: "core" },
  { from: "ai", to: "automation", kind: "semantic" },
  { from: "ai", to: "devtools", kind: "semantic" },
  { from: "ai", to: "product", kind: "semantic", mobile: "hide" },
  { from: "backend", to: "fintech", kind: "semantic" },
  { from: "backend", to: "desktop", kind: "semantic", mobile: "hide" },
  { from: "backend", to: "product", kind: "semantic" },
  { from: "compliance", to: "trust", kind: "semantic" },
  { from: "compliance", to: "fintech", kind: "semantic" },
  { from: "devtools", to: "automation", kind: "semantic", mobile: "hide" },
];

const pointVars = ({ desktop, tablet, mobile }: GraphGeometry) => vars({
  "--x-desktop": desktop[0],
  "--y-desktop": desktop[1],
  "--x-tablet": tablet[0],
  "--y-tablet": tablet[1],
  "--x-mobile": mobile[0],
  "--y-mobile": mobile[1],
});

const edgeVars = (from: GraphGeometry, to: GraphGeometry) => vars({
  "--from-x-desktop": from.desktop[0], "--from-y-desktop": from.desktop[1], "--to-x-desktop": to.desktop[0], "--to-y-desktop": to.desktop[1],
  "--from-x-tablet": from.tablet[0], "--from-y-tablet": from.tablet[1], "--to-x-tablet": to.tablet[0], "--to-y-tablet": to.tablet[1],
  "--from-x-mobile": from.mobile[0], "--from-y-mobile": from.mobile[1], "--to-x-mobile": to.mobile[0], "--to-y-mobile": to.mobile[1],
});

const capabilityGeometry = (id: CapabilityId | "core") => id === "core" ? capabilityCore : capabilityNodes.find((node) => node.id === id)!;

type FinalNodeId = CapabilityId | "aurora" | "qalens" | "aisosec" | "whalescope" | "market" | "kumevet" | "streakly" | "aisoflow";
type FinalNode = GraphGeometry & {
  id: FinalNodeId;
  source: "capability" | "project";
  labelIndex: number;
  color: GraphColor;
  level: "primary" | "secondary" | "tertiary";
  mobileLabel: boolean;
};

const finalCore: GraphGeometry & { id: "core" } = { id: "core", desktop: [50, 58], tablet: [50, 57], mobile: [50, 49], side: "right" };

const finalNodes: FinalNode[] = [
  { id: "aurora", source: "project", labelIndex: 0, color: "coral", level: "primary", mobileLabel: true, desktop: [18, 29], tablet: [18, 29], mobile: [23, 18], side: "left" },
  { id: "qalens", source: "project", labelIndex: 1, color: "lime", level: "primary", mobileLabel: true, desktop: [81, 25], tablet: [81, 25], mobile: [77, 18], side: "right" },
  { id: "aisosec", source: "project", labelIndex: 2, color: "violet", level: "primary", mobileLabel: true, desktop: [82, 73], tablet: [82, 72], mobile: [77, 73], side: "right" },
  { id: "whalescope", source: "project", labelIndex: 3, color: "coral", level: "tertiary", mobileLabel: false, desktop: [8, 53], tablet: [8, 53], mobile: [11, 47], side: "left" },
  { id: "market", source: "project", labelIndex: 4, color: "coral", level: "tertiary", mobileLabel: false, desktop: [18, 84], tablet: [19, 83], mobile: [14, 78], side: "left" },
  { id: "kumevet", source: "project", labelIndex: 5, color: "lime", level: "tertiary", mobileLabel: false, desktop: [32, 76], tablet: [31, 76], mobile: [28, 70], side: "left" },
  { id: "streakly", source: "project", labelIndex: 6, color: "violet", level: "tertiary", mobileLabel: false, desktop: [48, 91], tablet: [48, 90], mobile: [39, 86], side: "left" },
  { id: "aisoflow", source: "project", labelIndex: 7, color: "coral", level: "tertiary", mobileLabel: false, desktop: [93, 52], tablet: [92, 52], mobile: [90, 48], side: "right" },
  { id: "ai", source: "capability", labelIndex: 0, color: "lime", level: "secondary", mobileLabel: true, desktop: [62, 12], tablet: [62, 12], mobile: [62, 34], side: "right" },
  { id: "backend", source: "capability", labelIndex: 1, color: "coral", level: "secondary", mobileLabel: false, desktop: [31, 14], tablet: [30, 14], mobile: [25, 34], side: "left" },
  { id: "devtools", source: "capability", labelIndex: 2, color: "violet", level: "tertiary", mobileLabel: false, desktop: [91, 39], tablet: [91, 39], mobile: [89, 34], side: "right" },
  { id: "fintech", source: "capability", labelIndex: 4, color: "coral", level: "tertiary", mobileLabel: false, desktop: [23, 68], tablet: [22, 67], mobile: [12, 64], side: "left" },
  { id: "compliance", source: "capability", labelIndex: 5, color: "violet", level: "tertiary", mobileLabel: false, desktop: [65, 87], tablet: [65, 86], mobile: [65, 86], side: "right" },
  { id: "trust", source: "capability", labelIndex: 6, color: "lime", level: "secondary", mobileLabel: true, desktop: [27, 49], tablet: [27, 49], mobile: [38, 49], side: "left" },
  { id: "automation", source: "capability", labelIndex: 7, color: "coral", level: "tertiary", mobileLabel: true, desktop: [72, 49], tablet: [73, 48], mobile: [77, 56], side: "right" },
  { id: "product", source: "capability", labelIndex: 8, color: "violet", level: "secondary", mobileLabel: true, desktop: [43, 82], tablet: [43, 82], mobile: [32, 72], side: "left" },
];

const finalEdges: GraphEdge<FinalNodeId | "core">[] = [
  { from: "core", to: "aurora", kind: "core" },
  { from: "core", to: "qalens", kind: "core" },
  { from: "core", to: "aisosec", kind: "core" },
  { from: "aurora", to: "trust", kind: "semantic" },
  { from: "aurora", to: "backend", kind: "semantic" },
  { from: "qalens", to: "ai", kind: "semantic" },
  { from: "qalens", to: "devtools", kind: "semantic", mobile: "hide" },
  { from: "qalens", to: "automation", kind: "semantic" },
  { from: "aisosec", to: "compliance", kind: "semantic" },
  { from: "aisosec", to: "trust", kind: "semantic" },
  { from: "whalescope", to: "ai", kind: "semantic", mobile: "hide" },
  { from: "market", to: "fintech", kind: "semantic", mobile: "hide" },
  { from: "kumevet", to: "product", kind: "semantic", mobile: "hide" },
  { from: "streakly", to: "product", kind: "semantic", mobile: "hide" },
  { from: "aisoflow", to: "automation", kind: "semantic", mobile: "hide" },
];

const finalGeometry = (id: FinalNodeId | "core") => id === "core" ? finalCore : finalNodes.find((node) => node.id === id)!;

function BootScene({ copy, p }: SceneProps) {
  const signal = phase(p, .03, .2);
  const scan = phase(p, .08, .36);
  const mark = phase(p, .28, .4);
  const identity = phase(p, .46, .58);
  return <div className="reel-boot" style={vars({ "--signal": signal, "--scan": scan })}>
    <div className="reel-boot-field" aria-hidden="true">
      <i className="reel-boot-pulse" />
      <i className="reel-boot-scan" />
      <svg viewBox="0 0 1000 420"><path pathLength="1" style={{ strokeDashoffset: mix(1, 0, signal) }} d="M500 210H760M500 210H240M500 210V45M500 210V375" /></svg>
    </div>
    <b className="reel-boot-mark" style={reveal(mark)}>C</b>
    <div className="reel-boot-identity" style={reveal(identity)}>{copy.entry.map((line) => <span key={line}>{line}</span>)}</div>
  </div>;
}

function TransformationScene({ copy, p }: SceneProps) {
  const fragments = windowed(p, .02, .12, .36, .4);
  const assemble = phase(p, .14, .34);
  const headline = phase(p, .45, .51);
  return <div className="reel-transformation" style={vars({ "--assemble": assemble })}>
    <div className="reel-fragment-field" aria-hidden="true" style={{ opacity: fragments }}>
      {Array.from({ length: 8 }, (_, index) => <i key={index} style={{ transform: `translate(${mix((index % 4 - 1.5) * 150, (index % 3 - 1) * 38, assemble)}px, ${mix((Math.floor(index / 4) - .5) * 190, (Math.floor(index / 3) - 1) * 30, assemble)}px) rotate(${mix(index % 2 ? 18 : -16, 0, assemble)}deg)` }} />)}
      <svg viewBox="0 0 1000 420"><path pathLength="1" style={{ strokeDashoffset: mix(1, 0, assemble) }} d="M85 90C260 90 310 210 500 210S740 330 915 330M85 330C260 330 310 210 500 210S740 90 915 90" /></svg>
      <b />
    </div>
    <h2 style={reveal(headline)}>{copy.capabilityStatement}</h2>
  </div>;
}

function SpanScene({ copy, p }: SceneProps) {
  const label = windowed(p, .02, .08, .14, .18);
  const headline = windowed(p, .22, .28, .53, .57);
  const path = phase(p, .61, .68);
  return <div className="reel-span-cinematic" style={vars({ "--path": path })}>
    <p className="reel-cinema-label" style={reveal(label)}>{copy.buildLabel}</p>
    <h2 style={reveal(headline)}>{copy.buildStatement}</h2>
    <div className="reel-living-path" aria-label={copy.buildLabel}>
      <svg aria-hidden="true" viewBox="0 0 1000 280"><path pathLength="1" style={{ strokeDashoffset: mix(1, 0, path) }} d="M40 205C170 205 190 70 345 70S500 205 655 205 805 70 960 70" /></svg>
      {copy.buildSpan.map((item, index) => { const on = phase(p, .61 + index * .035, .67 + index * .035); return <div key={item} style={reveal(on)}><i /><span>0{index + 1}</span><strong>{item}</strong></div>; })}
    </div>
  </div>;
}

function UniverseScene({ copy, p }: SceneProps) {
  const label = windowed(p, .02, .08, .15, .19);
  const core = phase(p, .05, .11);
  const assembly = phase(p, .11, .3);
  const exit = 1 - phase(p, .93, .99);
  return <div className="reel-universe" style={vars({ "--universe": assembly, "--universe-exit": exit })}>
    <p className="reel-cinema-label" style={reveal(label)}>{copy.phaseLabels[0]}</p>
    <svg className="reel-graph-lines reel-universe-connections" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
      {capabilityEdges.map((edge, index) => {
        const semanticIndex = index - capabilityEdges.filter((item) => item.kind === "core").length;
        const start = edge.kind === "core" ? .13 + index * .006 : .18 + semanticIndex * .006;
        const connected = phase(p, start, start + .08);
        return <line className="reel-graph-link" data-kind={edge.kind} data-mobile={edge.mobile ?? "show"} key={`${edge.from}-${edge.to}`} pathLength="1" style={{ ...edgeVars(capabilityGeometry(edge.from), capabilityGeometry(edge.to)), strokeDashoffset: mix(1, 0, connected) }} />;
      })}
      {([capabilityEdges[5], capabilityEdges[11]] as const).map((edge, index) => {
        const travel = phase(p, index ? .76 : .54, index ? .84 : .62);
        const visible = windowed(p, index ? .755 : .535, index ? .77 : .55, index ? .84 : .62, index ? .86 : .65) * exit;
        return <line className="reel-graph-signal" key={`signal-${edge.from}-${edge.to}`} pathLength="1" style={{ ...edgeVars(capabilityGeometry(edge.from), capabilityGeometry(edge.to)), opacity: visible, strokeDashoffset: mix(1, 0, travel) }} />;
      })}
      <circle className="reel-universe-ring" cx="50%" cy="50%" r={mix(2.4, 7.2, assembly)} />
    </svg>
    <b className="reel-universe-core" aria-hidden="true" style={vars({ "--core-on": core * exit })}>C<i /></b>
    <div className="reel-capability-orbit" role="group" aria-label={copy.phaseLabels[0]}>
      {capabilityNodes.map((node, index) => {
        const start = node.priority === "primary" ? .08 + index * .004 : .14 + index * .004;
        const on = phase(p, start, start + .07) * exit;
        return <span key={node.id} data-side={node.side} data-color={node.color} data-priority={node.priority} style={vars({ ...pointVars(node), "--node-on": on, opacity: on, visibility: on <= .001 ? "hidden" : "visible", filter: `blur(${mix(3, 0, on)}px)` })}><i aria-hidden="true" /><em>{copy.capabilities[node.labelIndex]}</em></span>;
      })}
    </div>
  </div>;
}

type EvidencePulseProps = { name: string; index: number; kind: "decision" | "quality" | "audit"; visible: number; progress: number };

function EvidencePulse({ name, index, kind, visible, progress }: EvidencePulseProps) {
  return <article className={`reel-evidence-pulse reel-evidence-${kind}`} style={reveal(visible)}>
    <header><span>0{index + 1}</span><h2>{name}</h2><i /></header>
    <div className="reel-evidence-system" aria-hidden="true" style={vars({ "--evidence-progress": progress })}>
      <svg viewBox="0 0 1000 300"><path pathLength="1" style={{ strokeDashoffset: mix(1, 0, progress) }} d="M40 150H210C275 150 275 65 345 65H500C570 65 570 235 640 235H790C855 235 855 150 960 150" /></svg>
      {Array.from({ length: 5 }, (_, node) => <i key={node} />)}
      <b />
    </div>
  </article>;
}

function EvidenceScene({ copy, p }: SceneProps) {
  const label = windowed(p, .01, .05, .095, .12);
  const headline = windowed(p, .14, .185, .39, .42);
  const fieldOut = 1 - phase(p, .9, .94);
  const moments = [
    { kind: "decision" as const, visible: phase(p, .45, .49) * fieldOut, progress: phase(p, .45, .49) },
    { kind: "quality" as const, visible: phase(p, .5, .54) * fieldOut, progress: phase(p, .5, .54) },
    { kind: "audit" as const, visible: phase(p, .55, .59) * fieldOut, progress: phase(p, .55, .59) },
  ];
  const supporting = phase(p, .62, .65) * fieldOut;
  return <div className="reel-evidence-cinematic">
    <p className="reel-cinema-label" style={reveal(label)}>{copy.phaseLabels[1]}</p>
    <h2 className="reel-evidence-statement" style={reveal(headline)}>{copy.evidenceStatement}</h2>
    <div className="reel-evidence-field" role="group" aria-label={copy.evidenceStatement}>
      {moments.map((moment, index) => <EvidencePulse key={copy.projects[index]} name={copy.projects[index]} index={index} {...moment} />)}
      <div className="reel-evidence-support" style={reveal(supporting)}>{copy.projects.slice(3).map((project) => <span key={project}>{project}</span>)}</div>
    </div>
  </div>;
}

function SynthesisScene({ copy, p }: SceneProps) {
  const converge = phase(p, .04, .25);
  const core = windowed(p, .2, .3, .44, .48);
  const statement = phase(p, .52, .58);
  return <div className="reel-synthesis-cinematic" style={vars({ "--converge": converge })}>
    <div className="reel-convergence" aria-hidden="true" style={{ opacity: 1 - phase(p, .44, .48) }}>
      <svg viewBox="0 0 1000 430"><path pathLength="1" style={{ strokeDashoffset: mix(1, 0, converge) }} d="M20 55C230 55 270 215 475 215M20 375C230 375 270 215 475 215M980 55C770 55 730 215 525 215M980 375C770 375 730 215 525 215" /></svg>
      {Array.from({ length: 8 }, (_, index) => <i key={index} style={{ transform: `translate(${mix((index % 2 ? 1 : -1) * (320 + (index % 4) * 45), 0, converge)}px, ${mix((Math.floor(index / 2) - 1.5) * 92, 0, converge)}px)` }} />)}
    </div>
    <div className="reel-architecture-core" style={reveal(core)}><small>{copy.architectureLabel}</small><strong>CAUCO</strong><i /><i /></div>
    <h2 style={reveal(statement)}>{copy.architectureStatement}</h2>
  </div>;
}

function EndScene({ copy, p }: SceneProps) {
  const statement = windowed(p, .025, .08, .42, .48);
  const brand = phase(p, .5, .56);
  const ready = phase(p, .56, .6);
  const graph = phase(p, .58, .73);
  return <div className="reel-end-cinematic" style={vars({ "--ready": ready, "--final-graph": graph })}>
    <h2 style={reveal(statement)}>{copy.closing}</h2>
    <div className="reel-final-brand" style={reveal(brand)}><strong>CAUCO</strong></div>
    <div className="reel-final-graph" role="group" aria-label={copy.closing}>
      <svg className="reel-graph-lines" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
        {finalEdges.map((edge, index) => {
          const connected = phase(p, .6 + index * .004, .67 + index * .004);
          return <line className="reel-graph-link" data-kind={edge.kind} data-mobile={edge.mobile ?? "show"} key={`${edge.from}-${edge.to}`} pathLength="1" style={{ ...edgeVars(finalGeometry(edge.from), finalGeometry(edge.to)), strokeDashoffset: mix(1, 0, connected) }} />;
        })}
        <line className="reel-graph-signal" pathLength="1" style={{ ...edgeVars(finalGeometry("qalens"), finalGeometry("ai")), opacity: windowed(p, .8, .82, .9, .92), strokeDashoffset: mix(1, 0, phase(p, .81, .9)) }} />
      </svg>
      <i className="reel-final-core-point" aria-hidden="true" style={pointVars(finalCore)} />
      <div className="reel-final-nodes">
        {finalNodes.map((node, index) => {
          const start = node.level === "primary" ? .58 + index * .003 : node.level === "secondary" ? .61 + index * .003 : .64 + index * .003;
          const on = phase(p, start, start + .055);
          const text = node.source === "project" ? copy.projects[node.labelIndex] : copy.capabilities[node.labelIndex];
          return <span aria-label={text} key={node.id} data-side={node.side} data-color={node.color} data-level={node.level} data-mobile-label={node.mobileLabel} style={vars({ ...pointVars(node), "--node-on": on, opacity: on, visibility: on <= .001 ? "hidden" : "visible" })}><i aria-hidden="true" /><em>{text}</em></span>;
        })}
      </div>
    </div>
  </div>;
}

function StaticKnowledgeGraph({ copy }: Pick<SceneProps, "copy">) {
  return <div className="reel-static-knowledge" role="group" aria-label={copy.reduced}>
    <ul className="reel-static-capabilities">{copy.capabilities.map((item, index) => <li key={item} data-color={capabilityNodes[index].color}><i aria-hidden="true" />{item}</li>)}</ul>
    <div className="reel-static-core" aria-hidden="true"><strong>CAUCO</strong><i /></div>
    <ul className="reel-static-projects">{copy.projects.map((item, index) => <li key={item}><i aria-hidden="true" />{item}</li>)}</ul>
  </div>;
}

export function ReelScene({ id, copy, progress = 0, reduced = false }: ReelSceneProps) {
  if (reduced) return <StaticKnowledgeGraph copy={copy} />;
  const props = { copy, p: progress };
  switch (id) {
    case "boot": return <BootScene {...props} />;
    case "transformation": return <TransformationScene {...props} />;
    case "span": return <SpanScene {...props} />;
    case "universe": return <UniverseScene {...props} />;
    case "evidence": return <EvidenceScene {...props} />;
    case "synthesis": return <SynthesisScene {...props} />;
    case "end": return <EndScene {...props} />;
  }
}
