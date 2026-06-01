import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // emerald fill, parchment text (§7.6)
        primary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary-dark hover:-translate-y-px hover:shadow-md',
        // emerald outline → fill on hover
        secondary:
          'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
        // gold-accented emphasis CTA
        donate:
          'bg-accent text-accent-foreground shadow-gold hover:bg-accent-soft hover:-translate-y-px',
        ghost: 'text-primary hover:bg-secondary',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-small',
        md: 'h-11 px-6 text-body',
        lg: 'h-[3.25rem] px-8 text-body-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
