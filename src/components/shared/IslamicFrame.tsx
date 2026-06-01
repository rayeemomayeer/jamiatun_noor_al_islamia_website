import * as React from 'react';

import { cn } from '@/lib/utils';

type FrameVariant = 'gold' | 'subtle';

interface IslamicFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: FrameVariant;
  /** Render decorative gold corner flourishes. */
  corners?: boolean;
}

/**
 * Reusable gold ornamental border (BLUEPRINT §6.1). Centralizes the "Islamic
 * premium" framing so it stays consistent and tunable from one place.
 */
export function IslamicFrame({
  variant = 'gold',
  corners = true,
  className,
  children,
  ...props
}: IslamicFrameProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg p-1',
        variant === 'gold'
          ? 'bg-gradient-to-br from-accent via-accent-soft to-accent shadow-gold'
          : 'border border-border',
        className
      )}
      {...props}
    >
      <div className="relative rounded-md bg-card">
        {corners && variant === 'gold' ? <FrameCorners /> : null}
        {children}
      </div>
    </div>
  );
}

function FrameCorners() {
  // Four mirrored corner flourishes via logical-safe absolute positioning.
  const corner = (
    <svg
      viewBox="0 0 40 40"
      className="size-8 fill-none stroke-accent"
      strokeWidth={1.5}
      role="presentation"
    >
      <path d="M2 14 V6 a4 4 0 0 1 4 -4 H14" />
      <path d="M9 9 q6 0 9 -3" />
      <circle cx="6" cy="6" r="1.6" className="fill-accent stroke-none" />
    </svg>
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute left-1.5 top-1.5">{corner}</div>
      <div className="absolute right-1.5 top-1.5 -scale-x-100">{corner}</div>
      <div className="absolute bottom-1.5 left-1.5 -scale-y-100">{corner}</div>
      <div className="absolute bottom-1.5 right-1.5 -scale-100">{corner}</div>
    </div>
  );
}
