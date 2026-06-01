'use client';

import { motion } from 'framer-motion';

import { cardInteraction } from '@/animations/variants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Framer Motion hover/tap wrapper for card components (BLUEPRINT §8.4).
 * Server-rendered card content is passed as children — no RSC boundary violation.
 */
export function CardMotionWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={cardInteraction}
    >
      {children}
    </motion.div>
  );
}
