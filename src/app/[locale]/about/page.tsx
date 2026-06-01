import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/layout/Container';
import { CTAButton } from '@/components/shared/CTAButton';
import { Divider } from '@/components/shared/Divider';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { routing } from '@/i18n/routing';

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about' });
  return { title: t('title') };
}

export default async function AboutPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('pages.about');

  return (
    <>
      <section className="bg-parchment-deep py-20">
        <Container>
          <SectionHeader
            as="h1"
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
          />
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-accent">
            <h2>{t('historyTitle')}</h2>
            <p>{t('historyBody')}</p>
            <h2>{t('missionTitle')}</h2>
            <p>{t('missionBody')}</p>
            <h2>{t('visionTitle')}</h2>
            <p>{t('visionBody')}</p>
          </div>
          <Divider className="my-12" />
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <CTAButton href="/admission" variant="primary">
              {t('ctaAdmission')}
            </CTAButton>
            <CTAButton href="/donate" variant="donate">
              {t('ctaDonate')}
            </CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
