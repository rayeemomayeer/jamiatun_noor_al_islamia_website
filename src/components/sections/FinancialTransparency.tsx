'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FINANCIAL_METRICS } from '@/data/financial';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { pick } from '@/utils/localize';

gsap.registerPlugin(ScrollTrigger);

/** Animated financial allocation bars (BLUEPRINT §2.13). */
export function FinancialTransparency({ locale }: { locale: Locale }) {
  const t = useTranslations('sections.financial');
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const bars = containerRef.current?.querySelectorAll('[data-bar]');
      bars?.forEach((bar) => {
        const target = bar as HTMLElement;
        const finalWidth = target.dataset['bar'] ?? '0%';

        // Start at 0 width, animate to final.
        gsap.from(target, {
          width: '0%',
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: target,
            start: 'top 85%',
            once: true,
          },
        });

        // Ensure final state is reached (clearProps on complete).
        gsap.set(target, { width: finalWidth });
      });
    },
    { scope: containerRef, dependencies: [reduced] }
  );

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div ref={containerRef} className="mx-auto mt-12 max-w-2xl space-y-6">
          {FINANCIAL_METRICS.map((metric) => {
            const label = pick(metric.label, locale);
            return (
              <div key={metric.id}>
                <div className="mb-2 flex items-center justify-between text-body font-semibold">
                  <span className="text-foreground">{label}</span>
                  <span className="text-primary">{metric.value}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-label={label}
                  aria-valuenow={metric.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="h-3 w-full overflow-hidden rounded-sm bg-secondary"
                >
                  <div
                    data-bar={`${metric.value}%`}
                    className="h-full rounded-sm bg-accent"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
