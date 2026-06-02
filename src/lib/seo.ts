/**
 * SEO utilities — metadata builders + JSON-LD (BLUEPRINT §9).
 * All pages call buildMetadata(); JSON-LD injected via <script> in layouts/pages.
 */

import type { Metadata } from 'next';

import { LOCALES, type Locale } from '@/constants/i18n';
import { SITE } from '@/data/site';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://jamiatunnoor.edu.bd';

// ---------------------------------------------------------------------------
// Metadata builder
// ---------------------------------------------------------------------------

interface BuildMetadataOpts {
  locale: Locale;
  title: string;
  description?: string;
  /** Locale-relative path e.g. "/about" or "/" */
  path?: string;
  /** Absolute URL to a custom OG image */
  image?: string;
  /** 'article' | 'website' (default) */
  type?: 'website' | 'article';
}

export function buildMetadata({
  locale,
  title,
  description,
  path = '/',
  image,
  type = 'website',
}: BuildMetadataOpts): Metadata {
  const canonical = `${SITE_URL}/${locale}${path === '/' ? '' : path}`;
  const ogImage = image ?? `${SITE_URL}/og/default.png`;

  // hreflang alternates for all three locales + x-default (en)
  const hreflang: Record<string, string> = {
    'x-default': `${SITE_URL}/en${path === '/' ? '' : path}`,
  };
  for (const l of LOCALES) {
    hreflang[l] = `${SITE_URL}/${l}${path === '/' ? '' : path}`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages: hreflang,
    },
    openGraph: {
      type,
      url: canonical,
      title,
      description,
      locale,
      alternateLocale: LOCALES.filter((l) => l !== locale) as string[],
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD builders (BLUEPRINT §9.3)
// ---------------------------------------------------------------------------

/** Sitewide — inject once in root layout. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EducationalOrganization'],
    name: SITE.name,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.contact.phone,
      email: SITE.contact.email,
      contactType: 'admissions',
    },
    sameAs: SITE.socials.map((s) => s.href),
  };
}

/** Department detail — EducationalOccupationalProgram. */
export function courseJsonLd(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE.name,
      url: SITE_URL,
    },
  };
}

/** Activity/news detail — Article. */
export function articleJsonLd(opts: {
  title: string;
  description?: string;
  url: string;
  datePublished: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    image: opts.image ?? `${SITE_URL}/og/default.png`,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
  };
}

/** Breadcrumb — detail pages. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Contact page — LocalBusiness. */
export function localBusinessJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    name: SITE.name,
    url: `${SITE_URL}/${locale}/contact`,
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mirpur',
      addressLocality: 'Dhaka',
      postalCode: '1216',
      addressCountry: 'BD',
    },
  };
}

/** Serialised JSON-LD string — pass to <script dangerouslySetInnerHTML> in layout/page. */
export function jsonLdString(data: object): string {
  return JSON.stringify(data);
}
