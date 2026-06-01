import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2.5 py-0.5 text-small font-semibold uppercase tracking-wide transition-colors',
  {
    variants: {
      variant: {
        emerald: 'bg-primary text-primary-foreground',
        gold: 'bg-accent text-accent-foreground',
        outline: 'border border-primary text-primary',
        soft: 'bg-secondary text-secondary-foreground',
      },
    },
    defaultVariants: {
      variant: 'emerald',
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
