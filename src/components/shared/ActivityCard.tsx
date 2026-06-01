import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import type { Locale } from '@/constants/i18n';
import { LocalizedDate } from '@/components/shared/LocalizedDate';
import { Placeholder } from '@/components/shared/Placeholder';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import type { Activity } from '@/types/content';
import { pick } from '@/utils/localize';

export function ActivityCard({
  activity,
  locale,
}: {
  activity: Activity;
  locale: Locale;
}) {
  const title = pick(activity.title, locale);
  const t = useTranslations('common');

  return (
    <Card className="group flex flex-col overflow-hidden">
      <Placeholder label={title} className="aspect-[16/9] w-full" />
      <CardContent className="flex flex-1 flex-col gap-2 p-5">
        <LocalizedDate
          date={activity.date}
          locale={locale}
          className="text-small text-muted-foreground"
        />
        <h3 className="font-display text-h4 font-semibold text-primary">
          {title}
        </h3>
        <p className="text-small text-muted-foreground">
          {pick(activity.excerpt, locale)}
        </p>
        <Link
          href={`/activities/${activity.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-2 text-small font-semibold text-primary transition-colors hover:text-accent"
          aria-label={`${t('readMore')}: ${title}`}
        >
          {t('readMore')}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
            aria-hidden
          />
        </Link>
      </CardContent>
    </Card>
  );
}
