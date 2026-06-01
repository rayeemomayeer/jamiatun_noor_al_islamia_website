import { getRequestConfig } from 'next-intl/server';

import { isLocale } from '@/constants/i18n';
import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && isLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
