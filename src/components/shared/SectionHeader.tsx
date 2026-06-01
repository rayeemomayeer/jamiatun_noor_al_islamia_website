import * as React from 'react';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: 'start' | 'center';
  /** Heading level — pages own <h1>; sections default to <h2>. */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

/** Consistent section title block (BLUEPRINT §6, centered on mobile). */
export function SectionHeader({
  title,
  eyebrow,
  description,
  align = 'center',
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center'
          ? 'items-center text-center'
          : 'items-start text-start',
        className
      )}
    >
      {eyebrow ? (
        <span className="text-eyebrow uppercase text-accent">{eyebrow}</span>
      ) : null}
      <Heading className="font-display text-h2 font-bold text-primary">
        {title}
      </Heading>
      {description ? (
        <p className="max-w-2xl text-body-lg text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
