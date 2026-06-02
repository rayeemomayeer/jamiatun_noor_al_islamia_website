import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail, MapPin, Phone } from 'lucide-react';

import type { Locale } from '@/constants/i18n';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/Container';
import { ContactForm } from '@/components/shared/ContactForm';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SITE } from '@/data/site';
import { routing } from '@/i18n/routing';

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return buildMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    path: '/contact',
  });
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  const footerT = await getTranslations({ locale, namespace: 'footer' });

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
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="mb-6 font-display text-h2 font-semibold text-primary">
                {t('formTitle')}
              </h2>
              <ContactForm />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <h2 className="font-display text-h2 font-semibold text-primary">
                {t('infoTitle')}
              </h2>
              <div className="flex items-start gap-3 text-body">
                <MapPin
                  className="mt-1 size-5 shrink-0 text-accent"
                  aria-hidden
                />
                <span>{footerT('address')}</span>
              </div>
              <div className="flex items-center gap-3 text-body">
                <Phone className="size-5 shrink-0 text-accent" aria-hidden />
                <a
                  href={`tel:${SITE.contact.phone}`}
                  className="hover:text-primary"
                >
                  {footerT('phone')}
                </a>
              </div>
              <div className="flex items-center gap-3 text-body">
                <Mail className="size-5 shrink-0 text-accent" aria-hidden />
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="hover:text-primary"
                >
                  {footerT('email')}
                </a>
              </div>
              <p className="text-small text-muted-foreground">{t('hours')}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
