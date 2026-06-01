import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-24 w-full rounded-sm border border-input bg-card px-3 py-2 text-body text-foreground transition-colors',
      'placeholder:text-muted-foreground',
      'focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive',
      className
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
