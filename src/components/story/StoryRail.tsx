import { motion } from "framer-motion";

type StoryRailProps = {
  steps: string[];
  system: string;
  activeStep: number;
  reduced: boolean;
};

export function StoryRail({ steps, system, activeStep, reduced }: StoryRailProps) {
  return (
    <ol className="story-rail" data-static={reduced} style={{ "--story-steps": steps.length } as React.CSSProperties} aria-label={`${system} visualized workflow`}>
      {steps.map((step, index) => (
        <motion.li
          key={step}
          data-active={!reduced && activeStep === index}
          data-complete={reduced || index < activeStep}
          aria-current={!reduced && activeStep === index ? "step" : undefined}
          initial={reduced ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .35, delay: index * .045 }}
        >
          <span>{String(index + 1).padStart(2, "0")}</span><b>{step}</b><i aria-hidden="true" />
        </motion.li>
      ))}
    </ol>
  );
}
