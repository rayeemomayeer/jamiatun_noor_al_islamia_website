import { useTranslations } from 'next-intl';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FINANCIAL_METRICS } from '@/data/financial';
import { pick } from '@/utils/localize';

/** Honest, labeled allocation bars (BLUEPRINT §2.13). Fill animation in Phase 6. */
export function FinancialTransparency({ locale }: { locale: Locale }) {
  const t = useTranslations('sections.financial');

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div className="mx-auto mt-12 max-w-2xl space-y-6">
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
                    className="h-full rounded-sm bg-accent"
                    style={{ inlineSize: `${metric.value}%` }}
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
