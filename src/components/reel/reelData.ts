export type ReelSceneId = "boot" | "transformation" | "span" | "universe" | "evidence" | "synthesis" | "end";

export type ReelSceneTiming = { id: ReelSceneId; start: number; end: number };

export const REEL_DURATION = 60;

export const reelTimeline: ReelSceneTiming[] = [
  { id: "boot", start: 0, end: 3 },
  { id: "transformation", start: 3, end: 13 },
  { id: "span", start: 13, end: 21 },
  { id: "universe", start: 21, end: 28 },
  { id: "evidence", start: 28, end: 42 },
  { id: "synthesis", start: 42, end: 51 },
  { id: "end", start: 51, end: 60 },
];

export const sceneAt = (elapsed: number) => reelTimeline.find((scene) => elapsed >= scene.start && elapsed < scene.end) ?? reelTimeline[reelTimeline.length - 1];
