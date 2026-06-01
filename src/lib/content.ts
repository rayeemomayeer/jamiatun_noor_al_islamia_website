import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

import type { Locale } from '@/constants/i18n';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface MdxFile {
  slug: string;
  locale: Locale;
  title: string;
  date?: string;
  excerpt?: string;
  /** Raw MDX source — pass to MDXRemote for rendering. */
  source: string;
}

/**
 * Load all MDX files from a content subdirectory for a given locale,
 * falling back to `en` when the locale file is absent (BLUEPRINT §5.1).
 */
export function loadMdxList(
  folder: 'activities' | 'departments' | 'publications' | 'pages',
  locale: Locale
): MdxFile[] {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  // Group by slug (filename without .locale.mdx suffix).
  const slugMap = new Map<string, Record<string, string>>();
  for (const file of files) {
    const match = file.match(/^(.+)\.([a-z]+)\.mdx$/);
    if (!match) continue;
    const slug = match[1];
    const fileLang = match[2];
    if (!slug || !fileLang) continue;
    if (!slugMap.has(slug)) slugMap.set(slug, {});
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    slugMap.get(slug)![fileLang] = file;
  }

  const results: MdxFile[] = [];
  for (const [slug, localeFiles] of slugMap.entries()) {
    const filename = localeFiles[locale] ?? localeFiles['en'];
    if (!filename) continue;
    const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
    const { data, content } = matter(raw);
    results.push({
      slug,
      locale,
      title: (data['title'] as string | undefined) ?? slug,
      date: data['date'] as string | undefined,
      excerpt: data['excerpt'] as string | undefined,
      source: content,
    });
  }

  return results.sort((a, b) =>
    a.date && b.date
      ? b.date.localeCompare(a.date)
      : a.slug.localeCompare(b.slug)
  );
}

/** Load a single MDX file by slug + locale with English fallback. */
export function loadMdxFile(
  folder: 'activities' | 'departments' | 'publications' | 'pages',
  slug: string,
  locale: Locale
): MdxFile | null {
  const dir = path.join(CONTENT_DIR, folder);

  const candidates = [
    path.join(dir, `${slug}.${locale}.mdx`),
    path.join(dir, `${slug}.en.mdx`),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const raw = fs.readFileSync(candidate, 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug,
        locale,
        title: (data['title'] as string | undefined) ?? slug,
        date: data['date'] as string | undefined,
        excerpt: data['excerpt'] as string | undefined,
        source: content,
      };
    }
  }
  return null;
}

/** All unique slugs across all locales for a folder (for generateStaticParams). */
export function getMdxSlugs(
  folder: 'activities' | 'departments' | 'publications' | 'pages'
): string[] {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return [
    ...new Set(
      fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => f.replace(/\.[a-z]+\.mdx$/, ''))
    ),
  ];
}
