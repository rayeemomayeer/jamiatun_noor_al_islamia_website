import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/constants/i18n';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/Container';
import { GalleryGrid } from '@/components/sections/GalleryGrid';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GALLERY } from '@/data/gallery';
import { routing } from '@/i18n/routing';

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.gallery' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/gallery',
  });
}

export default async function GalleryPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pages.gallery' });

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
          <GalleryGrid images={GALLERY} locale={locale as Locale} />
        </Container>
      </section>
    </>
  );
}
