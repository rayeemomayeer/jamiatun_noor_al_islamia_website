import { useTranslations } from 'next-intl';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { DownloadCard } from '@/components/shared/DownloadCard';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { DOWNLOADS } from '@/data/downloads';

export function DownloadsSection({ locale }: { locale: Locale }) {
  const t = useTranslations('sections.downloads');

  return (
    <section className="bg-parchment-deep py-20">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
          />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {DOWNLOADS.map((download, i) => (
            <Reveal key={download.slug} delay={i * 0.08}>
              <DownloadCard download={download} locale={locale} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
