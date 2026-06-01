import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { FacultyCard } from '@/components/shared/FacultyCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FACULTY } from '@/data/faculty';
import { routing } from '@/i18n/routing';

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.faculty' });
  return { title: t('title') };
}

export default async function FacultyPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pages.faculty' });
  const faculty = [...FACULTY].sort((a, b) => a.order - b.order);

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {faculty.map((member) => (
              <FacultyCard
                key={member.slug}
                faculty={member}
                locale={locale as Locale}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
