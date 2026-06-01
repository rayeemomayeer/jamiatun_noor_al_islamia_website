'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <section className="container flex min-h-[70vh] max-w-xl flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-display text-h1 font-bold text-primary">
        {t('title')}
      </h1>
      <p className="text-body-lg text-muted-foreground">{t('description')}</p>
      <Button onClick={reset}>{t('retry')}</Button>
    </section>
  );
}
