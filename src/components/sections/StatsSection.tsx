import { useTranslations } from 'next-intl';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { Reveal } from '@/components/shared/Reveal';
import { STATS } from '@/data/stats';
import { pick } from '@/utils/localize';

/** Credibility proof points with count-up (BLUEPRINT §2.3, §8.4). */
export function StatsSection({ locale }: { locale: Locale }) {
  const t = useTranslations('sections.stats');

  return (
    <section className="bg-parchment-deep py-16">
      <Container>
        <h2 className="sr-only">{t('title')}</h2>
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.1} as="div">
              <div className="flex flex-col items-center text-center">
                <div className="relative grid place-items-center">
                  <svg
                    viewBox="0 0 100 100"
                    className="size-24 fill-accent/10 stroke-accent"
                    strokeWidth={1.5}
                    aria-hidden
                  >
                    <path d="M50 4l9 22 24-8-8 24 22 9-22 9 8 24-24-8-9 22-9-22-24 8 8-24-22-9 22-9-8-24 24 8z" />
                  </svg>
                  <dd className="absolute font-display text-h2 font-bold text-primary">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
                <dt className="mt-3 text-body font-semibold text-muted-foreground">
                  {pick(stat.label, locale)}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
