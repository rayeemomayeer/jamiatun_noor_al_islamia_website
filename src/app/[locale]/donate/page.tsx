import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/shared/Divider';
import { FinancialTransparency } from '@/components/sections/FinancialTransparency';
import { IslamicFrame } from '@/components/shared/IslamicFrame';
import type { Locale } from '@/constants/i18n';
import { buildMetadata } from '@/lib/seo';
import { SITE } from '@/data/site';
import { routing } from '@/i18n/routing';

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.donate' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/donate',
  });
}

export default async function DonatePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations({ locale, namespace: 'pages.donate' });

  const impacts = [
    t('impactScholarships'),
    t('impactFaculty'),
    t('impactFacilities'),
  ];

  return (
    <>
      {/* Emerald hero band */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 6l5 11 12-4-4 12 11 5-11 5 4 12-12-4-5 11-5-11-12 4 4-12-11-5 11-5-4-12 12 4z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E\")",
            backgroundSize: '80px 80px',
          }}
        />
        <Container className="relative text-center">
          <p className="text-eyebrow uppercase text-accent-soft">
            {t('eyebrow')}
          </p>
          <h1 className="mt-3 font-display text-display font-bold">
            {t('title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-primary-foreground/85">
            {t('description')}
          </p>
        </Container>
      </section>

      {/* Impact */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-h2 font-bold text-primary">
            {t('impactTitle')}
          </h2>
          <ul className="mt-6 space-y-3">
            {impacts.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body">
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-accent"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Divider />

      {/* Bank details */}
      <section className="py-16">
        <Container className="max-w-2xl">
          <IslamicFrame>
            <div className="p-8 text-center">
              <h2 className="font-display text-h2 font-bold text-primary">
                {t('bankTitle')}
              </h2>
              <p className="mt-3 text-body text-muted-foreground">
                {t('bankNote')}
              </p>
              <a
                href={`mailto:${SITE.contact.email}`}
                className="mt-4 inline-block text-body font-semibold text-primary hover:text-accent"
              >
                {SITE.contact.email}
              </a>
            </div>
          </IslamicFrame>
        </Container>
      </section>

      <FinancialTransparency locale={l} />
    </>
  );
}
