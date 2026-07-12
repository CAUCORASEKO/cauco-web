export const motionEase = [0.22, 1, 0.36, 1] as const;
export const motionEaseSoft = [0.33, 1, 0.68, 1] as const;

export const revealTransition = {
  duration: 0.65,
  ease: motionEase,
};

export const shortRevealTransition = {
  duration: 0.4,
  ease: motionEaseSoft,
};
