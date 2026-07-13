import { Pause, Play, RotateCcw, X } from "lucide-react";
import type { SiteContent } from "@/i18n/content";

type ReelControlsProps = {
  copy: SiteContent["reel"];
  elapsed: number;
  duration: number;
  paused: boolean;
  onToggle: () => void;
  onRestart: () => void;
  onClose: () => void;
};

export function ReelControls({ copy, elapsed, duration, paused, onToggle, onRestart, onClose }: ReelControlsProps) {
  const time = `${Math.floor(elapsed).toString().padStart(2, "0")} / ${duration.toString().padStart(2, "0")}`;
  return (
    <div className="reel-controls" aria-label={copy.controls}>
      <div className="reel-progress" role="progressbar" aria-label={copy.progress} aria-valuemin={0} aria-valuemax={duration} aria-valuenow={Math.floor(elapsed)}><i style={{ transform: `scaleX(${elapsed / duration})` }} /></div>
      <span className="reel-time">{time}</span>
      <button autoFocus type="button" onClick={onToggle} aria-label={paused ? copy.resume : copy.pause}>{paused ? <Play /> : <Pause />}</button>
      <button type="button" onClick={onRestart} aria-label={copy.restart}><RotateCcw /></button>
      <button type="button" onClick={onClose} aria-label={copy.close}><X /></button>
    </div>
  );
}
