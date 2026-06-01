/** Shared timing + easing tokens (BLUEPRINT §8.2–8.3). */

/** Durations in seconds — used by both GSAP and Framer Motion. */
export const DUR = {
  instant: 0.1,
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  cinematic: 1.0,
} as const;

/** Per-item stagger delays in seconds. */
export const STAGGER = {
  tight: 0.07,
  base: 0.1,
  loose: 0.15,
} as const;

/** GSAP easing strings. */
export const EASE_GSAP = {
  standard: 'power2.inOut',
  entrance: 'power3.out',
  emphasis: 'back.out(1.4)',
  counter: 'power1.out',
} as const;

/** Framer Motion cubic-bezier arrays. */
export const EASE_FM = {
  standard: [0.4, 0, 0.2, 1],
  entrance: [0.16, 1, 0.3, 1],
  emphasis: [0.34, 1.56, 0.64, 1],
} as const;
