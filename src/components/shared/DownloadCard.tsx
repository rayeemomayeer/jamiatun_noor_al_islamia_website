import { Download as DownloadIcon, FileText } from 'lucide-react';

import type { Locale } from '@/constants/i18n';
import { Card } from '@/components/ui/card';
import type { Download } from '@/types/content';
import { pick } from '@/utils/localize';

export function DownloadCard({
  download,
  locale,
}: {
  download: Download;
  locale: Locale;
}) {
  const title = pick(download.title, locale);
  const meta = `${download.format}, ${download.size}`;

  return (
    <Card className="flex items-center gap-4 p-4">
      <span className="grid size-12 shrink-0 place-items-center rounded-md bg-secondary text-primary">
        <FileText className="size-6" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-foreground">{title}</h3>
        <p className="text-small text-muted-foreground">
          {pick(download.category, locale)} · {meta}
        </p>
      </div>
      <a
        href={`/downloads/${download.slug}.pdf`}
        download
        aria-label={`${title} — ${meta}`}
        className="grid size-10 shrink-0 place-items-center rounded-md text-primary transition-colors hover:bg-secondary"
      >
        <DownloadIcon className="size-5" aria-hidden />
      </a>
    </Card>
  );
}
