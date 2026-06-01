import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Mihrab arch silhouette — straight sides rising to a rounded point.
// Stretchable via mask-size:100% 100% (preserveAspectRatio none).
export const ARCH_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120' preserveAspectRatio='none'%3E%3Cpath d='M0 120 L0 50 C0 22 22 0 50 0 C78 0 100 22 100 50 L100 120 Z' fill='black'/%3E%3C/svg%3E\")";

export const archMaskStyle: React.CSSProperties = {
  maskImage: ARCH_MASK,
  WebkitMaskImage: ARCH_MASK,
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
};

interface ArchCardProps {
  title: string;
  /** Optional image; when absent a tinted emerald placeholder is shown. */
  imageSrc?: string;
  imageAlt?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/** Mihrab-arch image card (BLUEPRINT §2.4, §6.1). */
export function ArchCard({
  title,
  imageSrc,
  imageAlt,
  description,
  action,
  className,
}: ArchCardProps) {
  return (
    <article
      className={cn('flex flex-col items-center gap-4 text-center', className)}
    >
      <div
        className="relative aspect-[3/4] w-full overflow-hidden"
        style={archMaskStyle}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-end justify-center bg-gradient-to-b from-primary/85 to-primary-darkest p-4"
          >
            <span className="font-display text-h4 text-primary-foreground/40">
              {title}
            </span>
          </div>
        )}
      </div>
      <h3 className="font-display text-h3 font-semibold text-primary">
        {title}
      </h3>
      {description ? (
        <p className="text-body text-muted-foreground">{description}</p>
      ) : null}
      {action}
    </article>
  );
}
