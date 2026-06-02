import type { MetadataRoute } from 'next';

import { LOCALES, type Locale } from '@/constants/i18n';
import { SITE_URL } from '@/lib/seo';
import { getMdxSlugs } from '@/lib/content';

type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

interface PageDef {
  path: string;
  priority: number;
  changeFrequency: ChangeFreq;
}

/** Static routes — one entry per locale (BLUEPRINT §9.4). */
const STATIC_PAGES: PageDef[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/departments', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/faculty', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/admission', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/publications', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/gallery', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/downloads', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/activities', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/donate', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
];

function localeUrl(locale: Locale, path: string) {
  return `${SITE_URL}/${locale}${path}`;
}

function hreflang(path: string): MetadataRoute.Sitemap[number]['alternates'] {
  return {
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, localeUrl(l, path)])
    ) as Record<string, string>,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages × all locales
  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: localeUrl(locale, page.path),
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: hreflang(page.path),
      });
    }
  }

  // Dynamic: departments/[slug]
  for (const slug of getMdxSlugs('departments')) {
    const path = `/departments/${slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: localeUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: hreflang(path),
      });
    }
  }

  // Dynamic: activities/[slug]
  for (const slug of getMdxSlugs('activities')) {
    const path = `/activities/${slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: localeUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: hreflang(path),
      });
    }
  }

  return entries;
}
