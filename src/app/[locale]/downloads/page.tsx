import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/constants/i18n';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/Container';
import { DownloadCard } from '@/components/shared/DownloadCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { DOWNLOADS } from '@/data/downloads';
import { routing } from '@/i18n/routing';
import { pick } from '@/utils/localize';

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.downloads' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/downloads',
  });
}

export default async function DownloadsPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations({ locale, namespace: 'pages.downloads' });

  // Group downloads by category label.
  const categories = [...new Set(DOWNLOADS.map((d) => pick(d.category, l)))];

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
          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat}>
                <h2 className="mb-4 font-display text-h3 font-semibold text-primary">
                  {cat}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {DOWNLOADS.filter((d) => pick(d.category, l) === cat).map(
                    (download) => (
                      <DownloadCard
                        key={download.slug}
                        download={download}
                        locale={l}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
