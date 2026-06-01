import { useTranslations } from 'next-intl';

import { Container } from '@/components/layout/Container';
import { CTAButton } from '@/components/shared/CTAButton';

/** Full-width emerald appeal band with ornamental corners (BLUEPRINT §2.12). */
export function DonateSection() {
  const t = useTranslations('sections.donate');

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
      {/* Ornamental corner flourishes. */}
      <Corner className="start-0 top-0" />
      <Corner className="end-0 top-0 -scale-x-100" />
      <Corner className="bottom-0 start-0 -scale-y-100" />
      <Corner className="bottom-0 end-0 -scale-100" />
      <Container className="relative flex flex-col items-center gap-5 text-center">
        <p className="text-eyebrow uppercase text-accent-soft">
          {t('eyebrow')}
        </p>
        <h2 className="font-display text-h1 font-bold">{t('title')}</h2>
        <p className="max-w-2xl text-body-lg text-primary-foreground/85">
          {t('description')}
        </p>
        <CTAButton href="/donate" variant="donate" size="lg" className="mt-2">
          {t('cta')}
        </CTAButton>
      </Container>
    </section>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={`pointer-events-none absolute size-28 fill-none stroke-accent-soft/40 ${className}`}
      strokeWidth={2}
    >
      <path d="M10 40 V18 a8 8 0 0 1 8 -8 H40" />
      <path d="M22 22 q18 0 26 -10" />
    </svg>
  );
}
