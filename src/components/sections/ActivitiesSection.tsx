import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { ActivityCard } from '@/components/shared/ActivityCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ACTIVITIES } from '@/data/activities';
import { Link } from '@/i18n/navigation';

export function ActivitiesSection({ locale }: { locale: Locale }) {
  const t = useTranslations('sections.activities');
  const tc = useTranslations('common');

  const activities = [...ACTIVITIES].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.slug}
              activity={activity}
              locale={locale}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/activities"
            className="inline-flex items-center gap-1.5 text-body font-semibold text-primary transition-colors hover:text-accent"
          >
            {tc('viewAll')}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
