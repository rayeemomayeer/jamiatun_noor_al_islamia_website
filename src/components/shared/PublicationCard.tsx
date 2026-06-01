import { Headphones } from 'lucide-react';

import type { Locale } from '@/constants/i18n';
import { Placeholder } from '@/components/shared/Placeholder';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Publication, PublicationType } from '@/types/content';
import { pick } from '@/utils/localize';

const TYPE_LABEL: Record<PublicationType, string> = {
  collection: 'Collection',
  paper: 'Paper',
  audio: 'Audio',
  review: 'Review',
};

export function PublicationCard({
  publication,
  locale,
}: {
  publication: Publication;
  locale: Locale;
}) {
  const title = pick(publication.title, locale);
  const isAudio = publication.type === 'audio';

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative">
        <Placeholder label={title} className="aspect-[4/3] w-full" />
        <Badge variant="gold" className="absolute end-3 top-3">
          {TYPE_LABEL[publication.type]}
        </Badge>
        {isAudio ? (
          <span className="absolute bottom-3 start-3 grid size-9 place-items-center rounded-full bg-card/90 text-primary">
            <Headphones className="size-4" aria-hidden />
          </span>
        ) : null}
      </div>
      <CardContent className="flex flex-1 flex-col gap-1 p-5">
        <h3 className="font-display text-h4 font-semibold text-primary">
          {title}
        </h3>
        <p className="text-small text-muted-foreground">
          {pick(publication.author, locale)}
        </p>
      </CardContent>
    </Card>
  );
}
