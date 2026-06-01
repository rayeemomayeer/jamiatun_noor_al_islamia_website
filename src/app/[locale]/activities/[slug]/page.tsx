import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/shared/Divider';
import { LocalizedDate } from '@/components/shared/LocalizedDate';
import { Placeholder } from '@/components/shared/Placeholder';
import { getMdxSlugs, loadMdxFile } from '@/lib/content';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { ACTIVITIES } from '@/data/activities';
import { pick } from '@/utils/localize';

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getMdxSlugs('activities');
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const mdx = loadMdxFile('activities', slug, locale as Locale);
  return { title: mdx?.title ?? slug };
}

export default async function ActivityDetailPage({ params }: Params) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const mdx = loadMdxFile('activities', slug, locale as Locale);
  if (!mdx) notFound();

  const activity = ACTIVITIES.find((a) => a.slug === slug);
  const navT = await getTranslations({ locale, namespace: 'pages.activities' });

  return (
    <>
      {/* Hero placeholder image */}
      <Placeholder label={mdx.title} className="aspect-[21/9] w-full" />

      <section className="py-16">
        <Container className="max-w-3xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 text-small text-muted-foreground"
          >
            <Link href="/activities" className="hover:text-primary">
              {navT('title')}
            </Link>
            {' / '}
            <span aria-current="page">{mdx.title}</span>
          </nav>

          {mdx.date ? (
            <LocalizedDate
              date={mdx.date}
              locale={locale as Locale}
              className="text-small text-muted-foreground"
            />
          ) : null}
          <h1 className="mt-2 font-display text-display font-bold text-primary">
            {mdx.title}
          </h1>

          {activity?.excerpt ? (
            <p className="mt-4 text-body-lg text-muted-foreground">
              {pick(activity.excerpt, locale as Locale)}
            </p>
          ) : null}

          <Divider className="my-10" />

          <article className="prose prose-stone max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-accent">
            <MDXRemote source={mdx.source} />
          </article>

          <Divider className="mt-12" />
          <div className="mt-6 text-center">
            <Link
              href="/activities"
              className="text-body font-semibold text-primary hover:text-accent"
            >
              ← {navT('title')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
