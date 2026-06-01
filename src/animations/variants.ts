import type { Variants } from 'framer-motion';

import { DUR, EASE_FM } from '@/animations/tokens';

/** Fade up — general scroll-reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE_FM.entrance },
  },
};

/** Stagger container — parent drives children in sequence. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** Card hover lift + tap press. */
export const cardInteraction = {
  rest: { y: 0, boxShadow: '0 6px 16px rgba(28,43,34,.10)' },
  hover: {
    y: -4,
    boxShadow: '0 16px 40px rgba(28,43,34,.14)',
    transition: { duration: DUR.fast, ease: EASE_FM.standard },
  },
  tap: { scale: 0.98, transition: { duration: DUR.instant } },
};

/** Page-level enter (template.tsx). */
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_FM.entrance },
  },
};
