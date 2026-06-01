'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';

import { LOCALE_LABELS, LOCALES } from '@/constants/i18n';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

/** EN/BN/AR switch preserving the current path (BLUEPRINT §6.1). */
export function LocaleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const active = useLocale();
  const t = useTranslations('a11y');

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="group"
      aria-label={t('selectLanguage')}
    >
      <Globe className="size-4 text-muted-foreground" aria-hidden />
      {LOCALES.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          aria-current={locale === active ? 'true' : undefined}
          className={cn(
            'rounded-sm px-2 py-1 text-small font-semibold transition-colors',
            locale === active
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-primary'
          )}
        >
          {LOCALE_LABELS[locale]}
        </Link>
      ))}
    </div>
  );
}
