'use client';

import { useState } from 'react';

import { archMaskStyle } from '@/components/shared/ArchCard';
import { Lightbox } from '@/components/shared/Lightbox';
import { Placeholder } from '@/components/shared/Placeholder';
import type { GalleryImage } from '@/types/content';
import type { Locale } from '@/constants/i18n';
import { pick } from '@/utils/localize';

/** Client gallery grid with lightbox trigger (BLUEPRINT §2.9). */
export function GalleryGrid({
  images,
  locale,
}: {
  images: readonly GalleryImage[];
  locale: Locale;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = images.map((img) => ({
    id: img.id,
    alt: pick(img.alt, locale),
  }));

  return (
    <>
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, i) => {
          const alt = pick(image.alt, locale);
          return (
            <li key={image.id}>
              <button
                type="button"
                aria-label={`View: ${alt}`}
                onClick={() => setLightboxIndex(i)}
                className="group w-full text-start"
                style={archMaskStyle}
              >
                <div className="aspect-[3/4] transition-opacity group-hover:opacity-90">
                  <Placeholder label={alt} className="h-full w-full" />
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {lightboxIndex !== null ? (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() =>
            setLightboxIndex((i) => Math.min(images.length - 1, (i ?? 0) + 1))
          }
        />
      ) : null}
    </>
  );
}
