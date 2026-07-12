import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/i18n/content";
import { ReelControls } from "./ReelControls";
import { ReelScene } from "./ReelScene";
import { REEL_DURATION, sceneAt } from "./reelData";

type PlayReelProps = { copy: SiteContent["reel"]; onClose: () => void; onExplore: () => void };

export function PlayReel({ copy, onClose, onExplore }: PlayReelProps) {
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showFinalActions, setShowFinalActions] = useState(false);
  const startRef = useRef(performance.now());
  const pausedAtRef = useRef(0);
  const frameRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const restart = useCallback(() => {
    pausedAtRef.current = 0;
    startRef.current = performance.now();
    setElapsed(0);
    setPaused(false);
    setShowFinalActions(false);

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    }
  }, []);

  const toggle = useCallback(() => {
    setPaused((value) => {
      const audio = audioRef.current;
      if (value) {
        startRef.current = performance.now() - pausedAtRef.current * 1000;
        if (audio && !reduced) {
          audio.currentTime = pausedAtRef.current;
          void audio.play().catch(() => {});
        }
      } else {
        pausedAtRef.current = elapsed;
        audio?.pause();
      }
      return !value;
    });
  }, [elapsed, reduced]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || reduced) return;

    audio.volume = 0.22;

    if (paused) audio.pause();
    else void audio.play().catch(() => {});
  }, [paused, reduced]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || reduced || paused) return;

    const driftCheck = window.setInterval(() => {
      const reelElapsed = Math.min((performance.now() - startRef.current) / 1000, REEL_DURATION);
      if (Math.abs(audio.currentTime - reelElapsed) > 0.3) audio.currentTime = reelElapsed;
    }, 750);
    return () => window.clearInterval(driftCheck);
  }, [paused, reduced]);

  useEffect(() => {
    if (reduced) {
      setShowFinalActions(true);
      return;
    }
    if (elapsed < REEL_DURATION) {
      setShowFinalActions(false);
      return;
    }
    const finalActionsDelay = window.setTimeout(() => setShowFinalActions(true), 400);
    return () => window.clearTimeout(finalActionsDelay);
  }, [elapsed, reduced]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const tick = (now: number) => {
      const next = Math.min((now - startRef.current) / 1000, REEL_DURATION);
      setElapsed(next);
      if (next < REEL_DURATION) frameRef.current = requestAnimationFrame(tick);
      else {
        pausedAtRef.current = REEL_DURATION;
        setPaused(true);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [paused, reduced]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.code === "Space" && !(event.target instanceof HTMLButtonElement)) { event.preventDefault(); toggle(); }
      if (event.key.toLowerCase() === "r" && !(event.target instanceof HTMLInputElement)) restart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, restart, toggle]);

  const scene = sceneAt(elapsed);
  const sceneProgress = Math.max(0, Math.min(1, (elapsed - scene.start) / (scene.end - scene.start)));
  const transitionIn = Math.max(0, Math.min(1, sceneProgress / .055));
  const transitionOut = scene.id === "end" ? 1 : Math.max(0, Math.min(1, (1 - sceneProgress) / .055));

  return (
    <motion.div role="dialog" aria-modal="true" aria-labelledby="reel-title" className="play-reel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 id="reel-title" className="sr-only">{copy.title}</h1>
      {!reduced && (
        <audio
          ref={audioRef}
          src="/audio/midnight-lab-loop-45s.mp3"
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <div className="reel-texture" aria-hidden="true" />
      <ReelControls copy={copy} elapsed={reduced ? 0 : elapsed} duration={REEL_DURATION} paused={reduced || paused} onToggle={toggle} onRestart={restart} onClose={onClose} />
      <main className="reel-stage">
        {reduced ? <><p className="reel-reduced-label">{copy.reduced}</p><ReelScene id="entry" copy={copy} reduced /></> : (
          <div className={`reel-scene reel-scene-${scene.id}`} style={{ clipPath: `inset(0 ${100 * (1 - transitionIn)}% 0 ${100 * (1 - transitionOut)}%)` }}><ReelScene id={scene.id} copy={copy} progress={sceneProgress} paused={paused} /></div>
        )}
      </main>
      {showFinalActions && <motion.div className="reel-final-actions" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <button type="button" onClick={restart}>{copy.replay}</button>
        <button type="button" onClick={onExplore}>{copy.explore}</button>
        <button type="button" onClick={onClose}>{copy.back}</button>
      </motion.div>}
    </motion.div>
  );
}
