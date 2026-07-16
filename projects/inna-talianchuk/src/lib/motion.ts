import type { Transition, Variants } from "motion/react";

/**
 * Shared timing tokens. Kept inside the brief's ranges:
 * entrance 0.45-0.75s, stagger 0.04-0.07s, hover 0.18-0.28s,
 * float loops 8-14s, no entrance delay above 0.12s.
 */
export const motionTiming = {
  enterDuration: 0.6,
  hoverDuration: 0.22,
  staggerChildren: 0.06,
  maxInitialDelay: 0.1,
  floatDurationMin: 8,
  floatDurationMax: 14,
} as const;

/** Calm, premium "expo out" curve used for all entrance motion. */
export const easeEnter = [0.16, 1, 0.3, 1] as const;
/** Quicker curve for hover/press feedback. */
export const easeHover = [0.4, 0, 0.2, 1] as const;

const enterTransition: Transition = {
  duration: motionTiming.enterDuration,
  ease: easeEnter,
};

/** Fade + gentle upward translate. Default reveal for most content. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: enterTransition },
};

/** Enters from the left with a slight upward lift, per the brief's card motion. */
export const revealLeftToRight: Variants = {
  hidden: { opacity: 0, x: -28, y: 12 },
  visible: { opacity: 1, x: 0, y: 0, transition: enterTransition },
};

/** Soft upward arc: small rotation + diagonal translate, never a full spin. */
export const revealArcUp: Variants = {
  hidden: { opacity: 0, x: -18, y: 30, rotate: -2.5 },
  visible: { opacity: 1, x: 0, y: 0, rotate: 0, transition: enterTransition },
};

/** Scale 0.97 -> 1, per the brief's card/panel entrance spec. */
export const softScale: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: enterTransition },
};

/** Stagger wrapper for groups of cards/panels. Delay capped at 0.1s. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionTiming.staggerChildren,
      delayChildren: motionTiming.maxInitialDelay,
    },
  },
};

/** Hover lift for cards: at most 5px, quick settle. */
export const hoverLift = {
  y: -5,
  transition: { duration: motionTiming.hoverDuration, ease: easeHover },
};

/**
 * Idle floating loop for glass panels. Call with a `seed` (e.g. index) so
 * multiple panels never move in lockstep.
 */
export function glassFloat(seed = 0): {
  animate: { y: number[]; rotate: number[] };
  transition: Transition;
} {
  const duration =
    motionTiming.floatDurationMin +
    (seed % 5) *
      ((motionTiming.floatDurationMax - motionTiming.floatDurationMin) / 5);

  return {
    animate: { y: [0, -6, 0, 6, 0], rotate: [0, 1, 0, -1, 0] },
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: (seed % 5) * 0.4,
    },
  };
}

/** SVG line/path draw, left-to-right, via Motion's pathLength. */
export const lineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
  },
};
