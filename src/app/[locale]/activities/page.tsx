import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/constants/i18n';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/Container';
import { ActivityCard } from '@/components/shared/ActivityCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ACTIVITIES } from '@/data/activities';
import { routing } from '@/i18n/routing';

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.activities' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/activities',
  });
}

export default async function ActivitiesPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pages.activities' });
  const activities = [...ACTIVITIES].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <>
      <section className="bg-parchment-deep py-20">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
          />
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.slug}
                activity={activity}
                locale={locale as Locale}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
