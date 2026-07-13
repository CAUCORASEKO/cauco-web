import type { CSSProperties } from "react";
import type { SiteContent } from "@/i18n/content";
import type { ReelSceneId } from "./reelData";

type ReelSceneProps = { id: ReelSceneId; copy: SiteContent["reel"]; progress?: number; paused?: boolean; reduced?: boolean };
type SceneProps = { copy: SiteContent["reel"]; p: number };

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const phase = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
const mix = (from: number, to: number, p: number) => from + (to - from) * p;
const vars = (values: Record<string, string | number>) => values as CSSProperties;

function EntryScene({ copy, p }: SceneProps) {
  const mark = phase(p, 0, .2);
  const lines = [phase(p, .1, .36), phase(p, .22, .52), phase(p, .4, .68)];
  return <div className="reel-entry reel-kinetic-entry" style={vars({ "--grid-on": phase(p, .05, .7), "--entry-p": p })}>
    <div className="reel-entry-geometry" aria-hidden="true"><i /><i /><i /></div>
    <b style={{ clipPath: `inset(${mix(50, 0, mark)}% ${mix(50, 0, mark)}%)`, transform: `scale(${mix(.35, 1, mark)}) rotate(${mix(-35, 0, mark)}deg)` }}>C</b>
    <div>{copy.entry.map((line, index) => <h2 key={line} style={{ opacity: lines[index], transform: index === 0 ? `translateX(${mix(-38, 0, lines[index])}vw)` : index === 1 ? `scale(${mix(1.8, 1, lines[index])}) translateZ(0)` : `translateY(${mix(90, 0, lines[index])}px) rotate(${mix(4, 0, lines[index])}deg)` }}>{line}</h2>)}</div>
  </div>;
}

function ProblemScene({ copy, p }: SceneProps) {
  const impact = phase(p, .58, .82);
  const scatter = phase(p, .05, .55);
  return <div className="reel-problem reel-problem-kinetic">
    <svg aria-hidden="true" viewBox="0 0 1000 380"><path pathLength="1" style={{ strokeDashoffset: mix(1, .42, scatter) }} d="M20 90 L190 90 L250 190 M275 190 L430 190 M470 190 L590 95 L760 95 M790 95 L960 240" /><path pathLength="1" style={{ strokeDashoffset: mix(1, .68, scatter) }} d="M80 310 L250 245 M290 230 L520 280 M570 275 L720 210 M760 190 L930 190" /></svg>
    <div>{copy.problemItems.map((item, index) => { const enter = phase(p, index * .045, .24 + index * .045); const collision = phase(p, .34, .62); const x = ((index % 3) - 1) * mix(110, 26, enter) + (index % 2 ? 1 : -1) * collision * 18; const y = ((index % 2) * 2 - 1) * mix(90, 6, enter) + collision * (index % 3 - 1) * 14; return <span key={item} style={{ opacity: enter * (1 - impact * .72), transform: `translate(${x}px, ${y}px) rotate(${mix(index % 2 ? 9 : -8, index % 2 ? 3 : -3, enter) + collision * (index % 2 ? 2 : -2)}deg) scale(${1 + collision * .08})` }}>{item}</span>; })}</div>
    <h2 style={{ opacity: impact, transform: `translateY(${mix(80, 0, impact)}px) scaleX(${mix(.45, 1, impact)})` }}>{copy.problemStatement}</h2>
  </div>;
}

function AuroraScene({ copy, p }: SceneProps) {
  const active = Math.min(copy.aurora.length - 1, Math.floor(phase(p, .04, .88) * copy.aurora.length));
  const scan = phase(p, .12, .3);
  const gate = phase(p, .38, .52);
  const document = phase(p, .52, .7);
  const lock = phase(p, .78, .94);
  return <div className="reel-process reel-aurora" style={vars({ "--reel-accent": "#ff654d", "--scan": scan, "--gate": gate, "--doc": document, "--lock": lock })}>
    <header><p>01 / CONTROLLED OPERATION</p><h2>Aurora</h2><i style={{ transform: `translateX(${mix(-120, 520, scan)}px)` }} /></header>
    <div className="reel-process-track">{copy.aurora.map((item, index) => { const on = phase(p, .05 + index * .1, .16 + index * .1); return <div key={item} data-active={index <= active} style={{ opacity: mix(.18, 1, on), transform: `translateY(${mix(44, 0, on)}px) scale(${mix(.88, 1, on)})` }}><span>0{index + 1}</span><strong>{item}</strong>{index === 3 && <i className="policy-gate" />}{index === 4 && <i className="evidence-doc"><b /><b /><b /></i>}{index === 6 && <i className="decision-lock">{lock > .55 ? "LOCKED" : "…"}</i>}</div>; })}</div>
  </div>;
}

function QALensScene({ copy, p }: SceneProps) {
  const issueIn = phase(p, 0, .2), disorder = phase(p, .16, .36), structure = phase(p, .32, .56), compile = phase(p, .55, .9);
  return <div className="reel-qalens" style={vars({ "--reel-accent": "#d7ff45", "--structure": structure, "--compile": compile })}>
    <header><p>02 / QUALITY INTELLIGENCE</p><h2>QALens</h2></header>
    <div className="qa-workbench">
      <article className="qa-issue" style={{ opacity: issueIn, transform: `translate(${mix(-46, 0, issueIn)}vw, ${disorder * 18}px) rotate(${mix(-8, disorder * 3, issueIn)}deg) scale(${mix(.76, 1 - structure * .13, issueIn)})` }}><small>ISSUE / QA-184</small><b>{copy.qalens[0]}</b><i style={{ width: `${mix(28, 91, structure)}%` }} /><i style={{ width: `${mix(72, 48, structure)}%` }} /><em>?!</em></article>
      <div className="qa-risk" style={{ opacity: disorder * (1 - structure), transform: `scale(${mix(.5, 1.25, disorder)}) rotate(${disorder * 8}deg)` }}>RISK<br />+{Math.round(disorder * 73)}</div>
      <article className="qa-improvement" style={{ opacity: structure, transform: `translateX(${mix(220, 0, structure)}px)` }}><small>STRUCTURED OUTPUT</small><strong>{copy.qalens[2]}</strong>{[0,1,2].map((i) => <i key={i} style={{ transform: `scaleX(${phase(p, .43 + i * .06, .58 + i * .06)})` }} />)}</article>
      <div className="qa-tests">{[1,2,3,4].map((test, index) => { const on = phase(p, .58 + index * .055, .7 + index * .055); return <span key={test} style={{ opacity: on, transform: `translateY(${mix(30, 0, on)}px)` }}>TC-0{test} <b>{on > .8 ? "PASS" : "…"}</b></span>; })}</div>
      <div className="qa-evidence" style={{ opacity: compile, transform: `scale(${mix(.7, 1, compile)})` }}>{copy.qalens[4]}<i style={{ transform: `scaleX(${compile})` }} /></div>
    </div>
  </div>;
}

function AisoSecScene({ copy, p }: SceneProps) {
  const scan = phase(p, .02, .3), finding = phase(p, .18, .4), capture = phase(p, .34, .55), map = phase(p, .46, .72), output = phase(p, .7, .94);
  return <div className="reel-aisosec" style={vars({ "--reel-accent": "#a993ff", "--capture": capture })}>
    <header><p>03 / INVESTIGATIVE AUDIT</p><h2>AisoSec Audit</h2></header>
    <div className="audit-field">
      <div className="audit-system"><span>AUTH</span><span>API</span><span>DATA</span><i style={{ transform: `translateY(${mix(-20, 290, scan)}px)` }} /></div>
      <article className="audit-finding" style={{ opacity: finding, transform: `translateX(${mix(-90, 0, finding)}px) scale(${mix(.8, 1, finding)})` }}><small>FINDING / SEC-07</small><strong>{copy.aisosec[0]}</strong><em style={{ transform: `scaleX(${finding})` }}>SEVERITY {Math.round(finding * 8.7)}</em></article>
      <div className="audit-evidence" style={{ opacity: capture, clipPath: `inset(${mix(50, 0, capture)}%)` }}><b>+</b>{copy.aisosec[1]}<small>CAPTURED</small></div>
      <div className="audit-mapping">{["OWASP", "NIST", "ISO"].map((label, index) => { const on = phase(p, .48 + index * .07, .62 + index * .07); return <span key={label} style={{ opacity: on, transform: `translate(${mix(index === 1 ? 70 : -70, 0, on)}px, ${mix(index * 22, 0, on)}px)` }}>{label}<i /></span>; })}</div>
      <div className="audit-gap" style={{ opacity: map, transform: `scale(${mix(.65, 1, map)})` }}>{copy.aisosec[4]}<b>!</b></div>
      <div className="audit-output" style={{ opacity: output, transform: `translateY(${mix(110, 0, output)}px)` }}><small>PDF / TRACEABLE</small><strong>{copy.aisosec[5]}</strong><i /><i /><i /></div>
    </div>
  </div>;
}

function RevelationScene({ copy, p }: SceneProps) {
  const systems = phase(p, 0, .28), connect = phase(p, .22, .48), core = phase(p, .38, .64), layers = phase(p, .54, .75), pullback = phase(p, .65, .82), statement = phase(p, .75, .96);
  return <div className="reel-revelation reel-revelation-kinetic" style={{ transform: `scale(${mix(1.18, .86, pullback)})` }}>
    <svg aria-hidden="true" viewBox="0 0 1000 470"><path style={{ strokeDashoffset: mix(1, 0, connect) }} pathLength="1" d="M110 220 C260 220 330 235 470 235" /><path style={{ strokeDashoffset: mix(1, 0, connect) }} pathLength="1" d="M880 90 C720 90 650 185 530 220" /><path style={{ strokeDashoffset: mix(1, 0, connect) }} pathLength="1" d="M880 385 C720 385 650 290 530 250" /></svg>
    <div className="reel-system-stack"><span style={{ transform: `translateX(${mix(-420, 0, systems)}px)`, opacity: systems }}>Aurora</span><span style={{ transform: `translate(${mix(420, 0, systems)}px, ${mix(-170, 0, systems)}px)`, opacity: systems }}>QALens</span><span style={{ transform: `translate(${mix(420, 0, systems)}px, ${mix(170, 0, systems)}px)`, opacity: systems }}>AisoSec Audit</span></div>
    <div className="reel-trust-core" style={{ opacity: core, transform: `scale(${mix(.35, 1, core)}) rotate(${mix(-25, 0, core)}deg)` }}><i style={{ transform: `rotate(${core * 240}deg)` }} /><i style={{ transform: `rotate(${-core * 160}deg) scale(.78)` }} /><small>{copy.sharedCore}</small><strong>AURORA<br />TRUST ENGINE</strong></div>
    <div className="reel-layer-stack">{copy.layers.map((layer, index) => { const on = phase(p, .53 + index * .035, .68 + index * .035); return <span key={layer} style={{ opacity: on, transform: `translateX(${mix(120, 0, on)}px)` }}>{layer}</span>; })}</div>
    <h2 style={{ opacity: statement, transform: `translateY(${mix(80, 0, statement)}px) scale(${mix(.82, 1, statement)})` }}>{copy.revelation}</h2>
  </div>;
}

function LabScene({ copy, p }: SceneProps) {
  return <div className="reel-lab reel-lab-kinetic"><p>CAUCO LAB / {copy.unlocked}</p>{copy.lab.map((item, index) => { const on = phase(p, index * .08, .28 + index * .08); const sweep = index === 1 ? phase(p, .55, .92) : 0; return <div key={item} style={{ opacity: on, transform: `translate(${mix(index % 2 ? 340 : -340, sweep * (index === 1 ? -520 : 0), on)}px, ${mix(180, index % 2 ? 22 : -10, on)}px) rotate(${mix(index % 2 ? 14 : -14, index % 2 ? 3 : -3, on) + sweep * -5}deg) scale(${mix(.55, 1, on)})` }}><span>0{index + 1} / {on > .78 ? copy.unlocked : "…"}</span>{item}</div>; })}</div>;
}

function EndScene({ copy, p }: SceneProps) {
  const collapse = phase(p, 0, .28), brand = phase(p, .18, .52), tagline = phase(p, .42, .68);
  return <div className="reel-end reel-end-kinetic"><div className="reel-collapse" aria-hidden="true">{[0,1,2,3,4,5].map((item) => <i key={item} style={{ transform: `translate(${mix((item % 3 - 1) * 45, 0, collapse)}vw, ${mix((item % 2 ? 1 : -1) * 35, 0, collapse)}vh) rotate(${mix(item * 20, 0, collapse)}deg) scale(${mix(1, 0, collapse)})` }} />)}</div><strong style={{ opacity: brand, transform: `scale(${mix(.15, 1, brand)})` }}>CAUCO</strong><h2 style={{ opacity: tagline, letterSpacing: `${mix(.7, .3, tagline)}em`, transform: `translateY(${mix(45, 0, tagline)}px)` }}>{copy.end}</h2></div>;
}

export function ReelScene({ id, copy, progress = 0, reduced = false }: ReelSceneProps) {
  if (reduced) return <div className="reel-static-chapters">{copy.chapters.map((chapter, index) => <article key={chapter}><span>0{index + 1}</span><strong>{chapter}</strong></article>)}</div>;
  const props = { copy, p: progress };
  switch (id) {
    case "entry": return <EntryScene {...props} />;
    case "problem": return <ProblemScene {...props} />;
    case "aurora": return <AuroraScene {...props} />;
    case "qalens": return <QALensScene {...props} />;
    case "aisosec": return <AisoSecScene {...props} />;
    case "revelation": return <RevelationScene {...props} />;
    case "lab": return <LabScene {...props} />;
    case "end": return <EndScene {...props} />;
  }
}
