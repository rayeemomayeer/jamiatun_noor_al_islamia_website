import { defineRouting } from 'next-intl/routing';

import { DEFAULT_LOCALE, LOCALES } from '@/constants/i18n';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // Always prefix so /en, /bn, /ar are explicit and hreflang stays unambiguous.
  localePrefix: 'always',
});
