import type { Locale } from '@/constants/i18n';
import type { Localized } from '@/types/content';

/** Resolve a localized field, falling back to English (BLUEPRINT §5.1). */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.en;
}
