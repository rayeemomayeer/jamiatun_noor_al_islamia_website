'use client';

import { motion } from 'framer-motion';

import { cardInteraction, cardInteractionBoxed } from '@/animations/variants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CardMotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  /**
   * "arch" — no box-shadow (box-shadow ignores CSS masks, bleeds outside arch shape).
   * "boxed" — includes box-shadow for rectangular cards.
   * Default: "boxed".
   */
  variant?: 'arch' | 'boxed';
}

export function CardMotionWrapper({
  children,
  className,
  variant = 'boxed',
}: CardMotionWrapperProps) {
  const reduced = useReducedMotion();
  const variants = variant === 'arch' ? cardInteraction : cardInteractionBoxed;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
