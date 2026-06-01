import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { PublicationsGrid } from '@/components/sections/PublicationsGrid';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { PUBLICATIONS } from '@/data/publications';
import { routing } from '@/i18n/routing';

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.publications' });
  return { title: t('title') };
}

export default async function PublicationsPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pages.publications' });
  const filterLabels = {
    all: t('filterAll'),
    collection: t('filterCollection'),
    paper: t('filterPaper'),
    audio: t('filterAudio'),
    review: t('filterReview'),
  };

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
          <PublicationsGrid
            publications={PUBLICATIONS}
            locale={locale as Locale}
            filterLabels={filterLabels}
          />
        </Container>
      </section>
    </>
  );
}
