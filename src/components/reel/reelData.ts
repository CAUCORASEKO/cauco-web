export type ReelSceneId = "entry" | "problem" | "aurora" | "qalens" | "aisosec" | "revelation" | "lab" | "end";

export type ReelSceneTiming = { id: ReelSceneId; start: number; end: number };

export const REEL_DURATION = 45;

export const reelTimeline: ReelSceneTiming[] = [
  { id: "entry", start: 0, end: 3.5 },
  { id: "problem", start: 3.5, end: 8 },
  { id: "aurora", start: 8, end: 15 },
  { id: "qalens", start: 15, end: 21.5 },
  { id: "aisosec", start: 21.5, end: 28 },
  { id: "revelation", start: 28, end: 35 },
  { id: "lab", start: 35, end: 39 },
  { id: "end", start: 39, end: 45 },
];

export const sceneAt = (elapsed: number) => reelTimeline.find((scene) => elapsed >= scene.start && elapsed < scene.end) ?? reelTimeline[reelTimeline.length - 1];
