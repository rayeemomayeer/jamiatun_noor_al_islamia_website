'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { Container } from '@/components/layout/Container';
import { CTAButton } from '@/components/shared/CTAButton';
import { Divider } from '@/components/shared/Divider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Hero with GSAP entrance timeline (BLUEPRINT §8.4).
 * Content is rendered in the HTML — animation enhances, never gates.
 * Reduced-motion: all elements visible immediately, no timeline.
 */
export function HeroSection() {
  const t = useTranslations('home');
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', clearProps: 'all' },
      });

      tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.5 })
        .from('.hero-title', { opacity: 0, y: 32, duration: 0.7 }, '-=0.25')
        .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from(
          '.hero-ctas > *',
          {
            opacity: 0,
            y: 16,
            duration: 0.4,
            stagger: 0.1,
          },
          '-=0.25'
        )
        .from(
          '.hero-divider',
          {
            opacity: 0,
            scaleX: 0,
            transformOrigin: '50% 50%',
            duration: 0.6,
          },
          '-=0.2'
        );
    },
    { scope: containerRef, dependencies: [reduced] }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      {/* Decorative ornamental backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.parchment.deep),theme(colors.background))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 6l5 11 12-4-4 12 11 5-11 5 4 12-12-4-5 11-5-11-12 4 4-12-11-5 11-5-4-12 12 4z' fill='none' stroke='%230F5A34' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: '80px 80px',
        }}
      />
      <Container className="relative flex min-h-[88vh] flex-col items-center justify-center gap-6 py-24 text-center">
        <p className="hero-eyebrow text-eyebrow uppercase text-accent">
          {t('eyebrow')}
        </p>
        <h1 className="hero-title font-display text-display font-bold leading-[1.05] text-primary">
          {t('title')}
        </h1>
        <p className="hero-subtitle max-w-2xl text-body-lg text-foreground">
          {t('subtitle')}
        </p>
        <div className="hero-ctas mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <CTAButton href="/admission" variant="primary" size="lg">
            {t('ctaApply')}
          </CTAButton>
          <CTAButton href="/departments" variant="secondary" size="lg">
            {t('ctaDepartments')}
          </CTAButton>
        </div>
        <Divider className="hero-divider mt-10 w-full max-w-md" />
      </Container>
    </section>
  );
}
