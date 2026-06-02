import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Download } from 'lucide-react';

import type { Locale } from '@/constants/i18n';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/Container';
import { CTAButton } from '@/components/shared/CTAButton';
import { Divider } from '@/components/shared/Divider';
import { Button } from '@/components/ui/button';
import { DEPARTMENTS } from '@/data/departments';
import { getMdxSlugs, loadMdxFile } from '@/lib/content';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { pick } from '@/utils/localize';

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getMdxSlugs('departments');
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const dept = DEPARTMENTS.find((d) => d.slug === slug);
  if (!dept) return {};
  return buildMetadata({
    locale: locale as Locale,
    title: pick(dept.title, locale as Locale),
    path: `/departments/${slug}`,
  });
}

export default async function DepartmentDetailPage({ params }: Params) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const dept = DEPARTMENTS.find((d) => d.slug === slug);
  if (!dept) notFound();

  const mdx = loadMdxFile('departments', slug, locale as Locale);
  const t = await getTranslations({ locale, namespace: 'common' });

  return (
    <>
      <section className="bg-parchment-deep py-20">
        <Container className="max-w-3xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 text-small text-muted-foreground"
          >
            <Link href="/departments" className="hover:text-primary">
              {(await getTranslations({ locale, namespace: 'nav' }))(
                'departments'
              )}
            </Link>
            {' / '}
            <span aria-current="page">
              {pick(dept.title, locale as Locale)}
            </span>
          </nav>
          <h1 className="font-display text-display font-bold text-primary">
            {pick(dept.title, locale as Locale)}
          </h1>
          <p className="mt-4 text-body-lg text-muted-foreground">
            {pick(dept.description, locale as Locale)}
          </p>
          {dept.syllabus ? (
            <Button asChild variant="secondary" size="md" className="mt-6">
              <Link href={`/downloads/${dept.syllabus}`}>
                <Download /> {t('downloadSyllabus')}
              </Link>
            </Button>
          ) : null}
        </Container>
      </section>

      {mdx ? (
        <section className="py-16">
          <Container className="max-w-3xl">
            <article className="prose prose-stone max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-accent">
              <MDXRemote source={mdx.source} />
            </article>
            <Divider className="mt-12" />
            <div className="mt-10 text-center">
              <CTAButton href="/admission" variant="primary" size="lg">
                {t('apply')}
              </CTAButton>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
