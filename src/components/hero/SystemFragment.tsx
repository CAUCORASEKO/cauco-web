import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type SystemFragmentProps = {
  name: string;
  meta: string;
  icon: LucideIcon;
  className: string;
  delay?: number;
};

export function SystemFragment({ name, meta, icon: Icon, className, delay = 0 }: SystemFragmentProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`system-fragment ${className}`}
    >
      <div className="flex items-start justify-between gap-5">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">{meta}</span>
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-5 text-xl font-semibold tracking-[-0.04em]">{name}</p>
      <div className="mt-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest opacity-55">
        <motion.span
          className="system-live-dot h-1.5 w-1.5 rounded-full bg-current"
          animate={reduceMotion ? undefined : { opacity: [.4, 1, .4] }}
          transition={{ duration: 4.8 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
        /> live signal
      </div>
    </motion.div>
  );
}
