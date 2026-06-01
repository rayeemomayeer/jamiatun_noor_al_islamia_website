/** Primary navigation — single source for Navbar + MobileMenu (BLUEPRINT §2.1). */

export interface NavItem {
  /** i18n key under the `nav` namespace. */
  key: string;
  /** Locale-independent internal path (next-intl Link resolves the prefix). */
  href: string;
}

/** Kept to ≤ 6 to avoid overload (§2.1). Donate is a separate CTA, not a link. */
export const PRIMARY_NAV: readonly NavItem[] = [
  { key: 'about', href: '/about' },
  { key: 'departments', href: '/departments' },
  { key: 'admission', href: '/admission' },
  { key: 'gallery', href: '/gallery' },
];

/** Footer quick links (superset of primary nav). */
export const FOOTER_NAV: readonly NavItem[] = [
  { key: 'about', href: '/about' },
  { key: 'departments', href: '/departments' },
  { key: 'admission', href: '/admission' },
  { key: 'gallery', href: '/gallery' },
  { key: 'donate', href: '/donate' },
];

export const DONATE_HREF = '/donate';
