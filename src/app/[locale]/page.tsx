import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { Divider } from '@/components/shared/Divider';

type PageParams = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations('home');

  return (
    <section className="container flex min-h-[80vh] max-w-3xl flex-col items-center justify-center gap-6 text-center">
      <p className="text-eyebrow uppercase text-muted-foreground">
        {t('eyebrow')}
      </p>
      <h1 className="font-display text-display font-bold leading-tight text-primary">
        {t('title')}
      </h1>
      <p className="max-w-xl text-body-lg text-foreground">{t('subtitle')}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <Button variant="primary" size="lg">
          {t('ctaApply')}
        </Button>
        <Button variant="secondary" size="lg">
          {t('ctaDepartments')}
        </Button>
      </div>
      <Divider className="mt-6 w-full" />
      <p className="rounded-md border border-accent px-4 py-2 text-small text-muted-foreground">
        {t('scaffoldNotice')}
      </p>
    </section>
  );
}
