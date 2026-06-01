import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { archMaskStyle } from '@/components/shared/ArchCard';
import { Placeholder } from '@/components/shared/Placeholder';
import { Reveal, RevealList } from '@/components/shared/Reveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { GALLERY } from '@/data/gallery';
import { Link } from '@/i18n/navigation';
import { pick } from '@/utils/localize';

/** Gallery preview — staggered arch thumbnails (BLUEPRINT §8.4). Lightbox Phase 5. */
export function GallerySection({ locale }: { locale: Locale }) {
  const t = useTranslations('sections.gallery');
  const tc = useTranslations('common');

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
        <RevealList
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3"
          stagger={0.08}
        >
          {GALLERY.map((image) => (
            <li key={image.id} style={archMaskStyle} className="aspect-[3/4]">
              <Placeholder
                label={pick(image.alt, locale)}
                className="h-full w-full"
              />
            </li>
          ))}
        </RevealList>
        <div className="mt-10 text-center">
          <Link
            href="/gallery"
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
