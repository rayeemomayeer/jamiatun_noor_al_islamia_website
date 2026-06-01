import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { isLocale, LOCALE_DIRECTION, type Locale } from '@/constants/i18n';
import { routing } from '@/i18n/routing';
import { fontVariables } from '@/styles/fonts';

import '@/styles/globals.css';

type LayoutParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: {
      default: t('title'),
      template: `%s · ${t('title')}`,
    },
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = LOCALE_DIRECTION[locale as Locale];

  const t = await getTranslations({ locale, namespace: 'a11y' });

  return (
    <html lang={locale} dir={dir} className={fontVariables}>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only z-50 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground focus:not-sr-only focus:absolute focus:start-4 focus:top-4"
          >
            {t('skipToContent')}
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
