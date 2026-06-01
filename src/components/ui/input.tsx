import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-11 w-full rounded-sm border border-input bg-card px-3 py-2 text-body text-foreground transition-colors',
      'placeholder:text-muted-foreground',
      'focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
