'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';

import { Container } from '@/components/layout/Container';
import { CTAButton } from '@/components/shared/CTAButton';
import { Divider } from '@/components/shared/Divider';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Hero with full-bleed background image + GSAP entrance timeline (BLUEPRINT §8.4).
 * Background: design/hero/hero_background_image.png — parchment arabesque + mihrab arch.
 * Content is centered in the arch's white space. Image served as AVIF/WebP via next/image.
 */
export function HeroSection() {
  const t = useTranslations('home');
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      // Do NOT animate .hero-bg — GSAP clearProps strips next/image fill's position:absolute.
      // Background fades in via CSS animation-fade-in instead.
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', clearProps: 'opacity,transform' },
      });

      tl.from('.hero-eyebrow', { opacity: 0, y: 12, duration: 0.5 })
        .from('.hero-title', { opacity: 0, y: 32, duration: 0.7 }, '-=0.25')
        .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from(
          '.hero-ctas > *',
          { opacity: 0, y: 16, duration: 0.4, stagger: 0.1 },
          '-=0.25'
        )
        .from(
          '.hero-divider',
          { opacity: 0, scaleX: 0, transformOrigin: '50% 50%', duration: 0.6 },
          '-=0.2'
        );
    },
    { scope: containerRef, dependencies: [reduced] }
  );

  return (
    /* Explicit h-[90vh] so next/image fill has a definite parent height (BLUEPRINT §10.1). */
    <section
      ref={containerRef}
      className="relative h-[90vh] min-h-[600px] overflow-hidden"
    >
      {/* Background image — parchment arabesque + mihrab arch */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        className="hero-bg-fade object-cover object-top"
        sizes="100vw"
        quality={85}
      />

      {/* Subtle overlay so text reads cleanly over the pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-background/20"
      />

      <Container className="relative z-10 flex h-full flex-col items-center justify-center gap-6 py-24 text-center">
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
