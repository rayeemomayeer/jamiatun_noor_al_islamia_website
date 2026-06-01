'use client';

import { useState } from 'react';

import type { Locale } from '@/constants/i18n';
import { FilterChips } from '@/components/shared/FilterChips';
import { PublicationCard } from '@/components/shared/PublicationCard';
import type { Publication, PublicationType } from '@/types/content';

interface Props {
  publications: readonly Publication[];
  locale: Locale;
  filterLabels: Record<string, string>;
}

/** Client wrapper: filter chips + live-filtered grid (BLUEPRINT §2.8). */
export function PublicationsGrid({
  publications,
  locale,
  filterLabels,
}: Props) {
  const [active, setActive] = useState<PublicationType | 'all'>('all');

  const filtered =
    active === 'all'
      ? publications
      : publications.filter((p) => p.type === active);

  const options: { value: PublicationType; label: string }[] = [
    { value: 'collection', label: filterLabels['collection'] ?? 'Collections' },
    { value: 'paper', label: filterLabels['paper'] ?? 'Papers' },
    { value: 'audio', label: filterLabels['audio'] ?? 'Audio' },
    { value: 'review', label: filterLabels['review'] ?? 'Reviews' },
  ];

  return (
    <div className="space-y-8">
      <FilterChips
        options={options}
        value={active}
        onChange={setActive}
        allLabel={filterLabels['all'] ?? 'All'}
      />
      <div
        aria-live="polite"
        aria-atomic="false"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {filtered.map((pub) => (
          <PublicationCard key={pub.slug} publication={pub} locale={locale} />
        ))}
      </div>
    </div>
  );
}
