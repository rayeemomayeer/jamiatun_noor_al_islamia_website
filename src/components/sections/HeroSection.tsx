import { useTranslations } from 'next-intl';

import { Container } from '@/components/layout/Container';
import { CTAButton } from '@/components/shared/CTAButton';
import { Divider } from '@/components/shared/Divider';

/** Hero — single confident headline + action fork (BLUEPRINT §2.2, §13.4). */
export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden">
      {/* Decorative ornamental backdrop — low contrast to protect legibility. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.parchment.deep),theme(colors.background))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 6l5 11 12-4-4 12 11 5-11 5 4 12-12-4-5 11-5-11-12 4 4-12-11-5 11-5-4-12 12 4z' fill='none' stroke='%230F5A34' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: '80px 80px',
        }}
      />
      <Container className="relative flex min-h-[88vh] flex-col items-center justify-center gap-6 py-24 text-center">
        <p className="text-eyebrow uppercase text-accent">{t('eyebrow')}</p>
        <h1 className="font-display text-display font-bold leading-[1.05] text-primary">
          {t('title')}
        </h1>
        <p className="max-w-2xl text-body-lg text-foreground">
          {t('subtitle')}
        </p>
        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
          <CTAButton href="/admission" variant="primary" size="lg">
            {t('ctaApply')}
          </CTAButton>
          <CTAButton href="/departments" variant="secondary" size="lg">
            {t('ctaDepartments')}
          </CTAButton>
        </div>
        <Divider className="mt-10 w-full max-w-md" />
      </Container>
    </section>
  );
}
