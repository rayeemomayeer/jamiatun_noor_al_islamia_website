import {
  Amiri,
  Cormorant_Garamond,
  Noto_Serif_Bengali,
  Source_Serif_4,
} from 'next/font/google';

/**
 * Trilingual type system (BLUEPRINT §7.2).
 * Each face exposes a CSS variable. Glyph-coverage fallback in the Tailwind
 * font stacks (§ tailwind.config) routes Bengali/Arabic runs to their face
 * automatically, so one `font-display`/`font-body` class works across scripts.
 */

// Latin display + body.
export const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const fontBody = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
});

// Bangla — serif, full glyph coverage.
export const fontBangla = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['400', '600', '700'],
  variable: '--font-bangla',
  display: 'swap',
});

// Arabic — traditional Naskh, scholarly.
export const fontArabic = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

/** All font variables, applied once on <html>. */
export const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontBangla.variable,
  fontArabic.variable,
].join(' ');
