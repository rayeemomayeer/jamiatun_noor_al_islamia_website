import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { PublicationCard } from '@/components/shared/PublicationCard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { PUBLICATIONS } from '@/data/publications';
import { Link } from '@/i18n/navigation';

export function PublicationsSection({ locale }: { locale: Locale }) {
  const t = useTranslations('sections.publications');
  const tc = useTranslations('common');

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PUBLICATIONS.map((pub) => (
            <PublicationCard key={pub.slug} publication={pub} locale={locale} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/publications"
            className="inline-flex items-center gap-1.5 text-body font-semibold text-primary transition-colors hover:text-accent"
          >
            {tc('viewAll')}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
