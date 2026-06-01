import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/constants/i18n';
import { DepartmentsSection } from '@/components/sections/DepartmentsSection';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Container } from '@/components/layout/Container';
import { routing } from '@/i18n/routing';

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.departments' });
  return { title: t('title') };
}

export default async function DepartmentsPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="bg-parchment-deep py-20">
        <Container>
          <DepartmentsPageHeader locale={locale as Locale} />
        </Container>
      </section>
      <DepartmentsSection locale={locale as Locale} />
    </>
  );
}

async function DepartmentsPageHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'pages.departments' });
  return (
    <SectionHeader
      as="h1"
      eyebrow={t('eyebrow')}
      title={t('title')}
      description={t('description')}
    />
  );
}
