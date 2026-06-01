import Image from 'next/image';
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
              <div className="relative mx-auto flex aspect-[1052/1024] w-full max-w-[220px] flex-col items-center justify-center p-4 text-center">
                <Image
                  src="/images/stats_frame.svg"
                  alt=""
                  width={1052}
                  height={1024}
                  className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
                  aria-hidden
                />
                <div className="relative z-10 flex flex-col items-center justify-center p-2">
                  <dd className="font-display text-h2 font-bold text-primary sm:text-h1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1 font-body text-small font-semibold text-muted-foreground sm:text-body">
                    {pick(stat.label, locale)}
                  </dt>
                </div>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
