/** Supported locales and direction metadata — single source of truth (BLUEPRINT §1.2, §5.1). */

export const LOCALES = ['en', 'bn', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Text direction per locale. Arabic is RTL. */
export const LOCALE_DIRECTION: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  bn: 'ltr',
  ar: 'rtl',
};

/** Native display names for the locale switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  bn: 'বাংলা',
  ar: 'العربية',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
