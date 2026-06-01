import Link from 'next/link';

import { DEFAULT_LOCALE } from '@/constants/i18n';

import '@/styles/globals.css';

/**
 * Global fallback for requests that never reach a locale segment.
 * In-locale 404s render src/app/[locale]/not-found.tsx instead.
 */
export default function GlobalNotFound() {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body className="antialiased">
        <main className="container flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 text-center">
          <p className="font-display text-display font-bold text-accent">404</p>
          <p className="text-body-lg text-muted-foreground">Page not found.</p>
          <Link
            href={`/${DEFAULT_LOCALE}`}
            className="rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
          >
            Home
          </Link>
        </main>
      </body>
    </html>
  );
}
