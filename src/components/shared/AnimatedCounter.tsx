'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import { EASE_GSAP } from '@/animations/tokens';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

/**
 * Count-up from 0 → value on scroll-in (BLUEPRINT §8.4).
 * Screen readers get the final value via aria-label; visual ticker is aria-hidden.
 * Reduced-motion: shows final value immediately.
 */
export function AnimatedCounter({ value, suffix = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reduced) {
        el.textContent = `${value}${suffix}`;
        return;
      }

      const counter = { val: 0 };
      el.textContent = `0${suffix}`;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: value,
            duration: 2,
            ease: EASE_GSAP.counter,
            onUpdate: () => {
              el.textContent = `${Math.round(counter.val)}${suffix}`;
            },
            onComplete: () => {
              el.textContent = `${value}${suffix}`;
            },
          });
        },
      });
    },
    { scope: ref, dependencies: [value, suffix, reduced] }
  );

  return (
    <span ref={ref} aria-label={`${value}${suffix}`} aria-live="off">
      {/* populated by GSAP; server renders final value for bots */}
      {value}
      {suffix}
    </span>
  );
}
