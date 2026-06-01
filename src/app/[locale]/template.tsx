'use client';

import { motion } from 'framer-motion';

import { pageEnter } from '@/animations/variants';

/**
 * Re-mounts on every navigation → drives per-route enter transition (BLUEPRINT §8.4).
 * Kept short (≤ 300ms) so navigation feels instant.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageEnter} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
