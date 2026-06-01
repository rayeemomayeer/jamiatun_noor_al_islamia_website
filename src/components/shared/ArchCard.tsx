import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

// Mihrab arch silhouette — straight sides rising to a rounded point.
// preserveAspectRatio is implicit via mask-size:100% 100% (stretches to box).
const ARCH_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120' preserveAspectRatio='none'%3E%3Cpath d='M0 120 L0 50 C0 22 22 0 50 0 C78 0 100 22 100 50 L100 120 Z' fill='black'/%3E%3C/svg%3E\")";

interface ArchCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description?: string;
  /** Action node (e.g. a download Button). */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Mihrab-arch image card (BLUEPRINT §2.4, §6.1). Arch shape applied via a
 * stretchable SVG mask so it scales with any aspect ratio.
 */
export function ArchCard({
  imageSrc,
  imageAlt,
  title,
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
        style={{
          maskImage: ARCH_MASK,
          WebkitMaskImage: ARCH_MASK,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
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
