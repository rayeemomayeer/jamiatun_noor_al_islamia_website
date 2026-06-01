import { cn } from '@/lib/utils';

/**
 * Section divider — gold rosette flanked by tapering rules (BLUEPRINT §13.11).
 * Purely decorative; hidden from assistive tech.
 */
export function Divider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'flex items-center justify-center gap-4 text-accent',
        className
      )}
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-accent sm:w-28" />
      <svg
        viewBox="0 0 24 24"
        className="size-6 shrink-0 fill-current"
        role="presentation"
      >
        {/* eight-point star rosette */}
        <path d="M12 0l2.6 6.3L21 4.2l-2.1 6.4L24 12l-5.1 1.4L21 19.8l-6.4-2.1L12 24l-2.6-6.3L3 19.8l2.1-6.4L0 12l5.1-1.4L3 4.2l6.4 2.1z" />
        <circle cx="12" cy="12" r="3" className="fill-background" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-accent sm:w-28" />
    </div>
  );
}
