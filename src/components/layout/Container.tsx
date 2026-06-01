import * as React from 'react';

import { cn } from '@/lib/utils';

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

/** Single source for max-width + responsive logical gutters (BLUEPRINT §7.3). */
export function Container<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Comp = as ?? 'div';
  return (
    <Comp
      className={cn('mx-auto w-full max-w-[1200px] px-6 lg:px-10', className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
