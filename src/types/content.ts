import type { Locale } from '@/constants/i18n';

/**
 * Translatable field — `en` is always present and acts as the fallback;
 * other locales are optional (BLUEPRINT §5.1).
 */
export type Localized<T> = { en: T } & Partial<Record<Locale, T>>;

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  label: Localized<string>;
}

export interface Department {
  slug: string;
  title: Localized<string>;
  description: Localized<string>;
  /** Download ref slug for the syllabus (resolved in Downloads). */
  syllabus?: string;
}

export interface Faculty {
  slug: string;
  name: Localized<string>;
  title: Localized<string>;
  order: number;
}

export type PublicationType = 'collection' | 'paper' | 'audio' | 'review';

export interface Publication {
  slug: string;
  type: PublicationType;
  title: Localized<string>;
  author: Localized<string>;
}

export interface Download {
  slug: string;
  title: Localized<string>;
  category: Localized<string>;
  format: string;
  size: string;
}

export interface Activity {
  slug: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  /** ISO date (machine-readable). */
  date: string;
}

export interface GalleryImage {
  id: string;
  alt: Localized<string>;
}

export interface FinancialMetric {
  id: string;
  label: Localized<string>;
  /** 0–100 */
  value: number;
}
