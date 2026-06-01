import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function LocaleNotFound() {
  const t = useTranslations('nav');

  return (
    <main className="container flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-display font-bold text-accent">404</p>
      <p className="text-body-lg text-muted-foreground">Page not found.</p>
      <Button asChild>
        <Link href="/">{t('home')}</Link>
      </Button>
    </main>
  );
}
