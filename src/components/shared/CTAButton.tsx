import * as React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface CTAButtonProps extends Pick<
  ButtonProps,
  'variant' | 'size' | 'className'
> {
  href: string;
  /** External target — renders a plain anchor with safe rel. */
  external?: boolean;
  children: React.ReactNode;
}

/** Branded action that resolves locale-aware internal links (BLUEPRINT §6). */
export function CTAButton({
  href,
  external,
  variant,
  size,
  className,
  children,
}: CTAButtonProps) {
  if (external) {
    return (
      <Button asChild variant={variant} size={size} className={cn(className)}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
