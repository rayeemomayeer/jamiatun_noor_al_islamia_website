import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { FeeTable } from '@/components/shared/FeeTable';
import { IslamicFrame } from '@/components/shared/IslamicFrame';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GOOGLE_FORM_ADMISSION_URL } from '@/data/fees';
import { routing } from '@/i18n/routing';

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.admission' });
  return { title: t('title') };
}

export default async function AdmissionPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pages.admission' });

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
        <Container className="max-w-4xl">
          <Tabs defaultValue="requirements">
            <TabsList className="mb-8 flex-wrap">
              <TabsTrigger value="requirements">
                {t('tabRequirements')}
              </TabsTrigger>
              <TabsTrigger value="dates">{t('tabDates')}</TabsTrigger>
              <TabsTrigger value="fees">{t('tabFees')}</TabsTrigger>
            </TabsList>

            <TabsContent value="requirements">
              <div className="space-y-4">
                <h2 className="font-display text-h2 font-semibold text-primary">
                  {t('reqTitle')}
                </h2>
                <p className="text-body text-muted-foreground">
                  {t('reqBody')}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="dates">
              <div className="space-y-4">
                <h2 className="font-display text-h2 font-semibold text-primary">
                  {t('datesTitle')}
                </h2>
                <ul className="space-y-2">
                  {t('datesItems')
                    .split('|')
                    .map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-body text-foreground"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {item.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="fees">
              <FeeTable locale={locale as Locale} />
            </TabsContent>
          </Tabs>

          {/* Apply CTA — Google Form */}
          <IslamicFrame className="mt-16">
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <h2 className="font-display text-h2 font-bold text-primary">
                {t('applyTitle')}
              </h2>
              <p className="max-w-xl text-body text-muted-foreground">
                {t('applyBody')}
              </p>
              <a
                href={GOOGLE_FORM_ADMISSION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-md bg-primary px-8 font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-px hover:bg-primary-dark hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {t('applyBtn')}
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <p className="text-small text-muted-foreground">
                {t('applyNote')}
              </p>
            </div>
          </IslamicFrame>
        </Container>
      </section>
    </>
  );
}
