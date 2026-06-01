'use client';

import { cn } from '@/lib/utils';

interface FilterChipsProps<T extends string> {
  options: { value: T; label: string }[];
  value: T | 'all';
  onChange: (v: T | 'all') => void;
  allLabel?: string;
}

/** Accessible filter chip strip with `aria-pressed` (BLUEPRINT §2.8). */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  allLabel = 'All',
}: FilterChipsProps<T>) {
  const all = [{ value: 'all' as const, label: allLabel }, ...options];

  return (
    <div role="group" className="flex flex-wrap gap-2">
      {all.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.value as T | 'all')}
            className={cn(
              'rounded-sm px-4 py-1.5 text-small font-semibold transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-primary'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
