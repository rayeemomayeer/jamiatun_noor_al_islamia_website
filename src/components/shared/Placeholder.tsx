import { cn } from '@/lib/utils';

/**
 * Tinted placeholder standing in for real imagery until assets are optimized
 * (BLUEPRINT §10.1, Phase 7). Decorative; label is for visual orientation only.
 */
export function Placeholder({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/80 via-primary to-primary-darkest',
        className
      )}
    >
      {label ? (
        <span className="px-3 text-center font-display text-h4 text-primary-foreground/30">
          {label}
        </span>
      ) : null}
    </div>
  );
}
