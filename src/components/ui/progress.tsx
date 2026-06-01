'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value?: number;
  }
>(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-3 w-full overflow-hidden rounded-sm bg-secondary',
      className
    )}
    value={value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full rounded-sm bg-accent transition-transform duration-500 ease-out"
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
