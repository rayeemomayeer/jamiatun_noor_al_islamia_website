import type { Locale } from '@/constants/i18n';

const INTL_LOCALE: Record<Locale, string> = {
  en: 'en-US',
  bn: 'bn-BD',
  ar: 'ar',
};

/** Locale-aware date rendered in a machine-readable <time> (BLUEPRINT §6.1). */
export function LocalizedDate({
  date,
  locale,
  className,
}: {
  date: string;
  locale: Locale;
  className?: string;
}) {
  const formatted = new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

  return (
    <time dateTime={date} className={className}>
      {formatted}
    </time>
  );
}
