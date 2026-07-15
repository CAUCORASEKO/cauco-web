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
  const field = phase(p, .23, .35);
  return <div className="reel-universe" style={vars({ "--universe": field })}>
    <p className="reel-cinema-label" style={reveal(label)}>{copy.phaseLabels[0]}</p>
    <svg aria-hidden="true" viewBox="0 0 1000 500"><path pathLength="1" style={{ strokeDashoffset: mix(1, 0, field) }} d="M500 250L160 105M500 250L365 75M500 250L760 90M500 250L875 235M500 250L735 420M500 250L430 440M500 250L120 365M500 250L275 250" /><circle cx="500" cy="250" r={mix(20, 76, field)} /></svg>
    <b aria-hidden="true" style={{ opacity: field }}>C</b>
    <div className="reel-capability-orbit">{copy.capabilities.map((item, index) => { const on = phase(p, .25 + index * .018, .31 + index * .018); return <span key={item} style={reveal(on)}><i />{item}</span>; })}</div>
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
  const statement = windowed(p, .05, .11, .48, .52);
  const brand = phase(p, .56, .64);
  const ready = phase(p, .7, .78);
  return <div className="reel-end-cinematic" style={vars({ "--ready": ready })}>
    <h2 style={reveal(statement)}>{copy.closing}</h2>
    <div className="reel-final-brand" style={reveal(brand)}><strong>CAUCO</strong><i aria-hidden="true" /></div>
  </div>;
}

export function ReelScene({ id, copy, progress = 0, reduced = false }: ReelSceneProps) {
  if (reduced) return <div className="reel-static-chapters">{copy.chapters.map((chapter, index) => <article key={chapter}><span>0{index + 1}</span><strong>{chapter}</strong></article>)}</div>;
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
