import { useTranslations } from 'next-intl';
import { CalendarDays, ClipboardCheck, Wallet } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { CTAButton } from '@/components/shared/CTAButton';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Card, CardContent } from '@/components/ui/card';

const ITEMS = [
  { key: 'requirements', body: 'requirementsBody', icon: ClipboardCheck },
  { key: 'keyDates', body: 'keyDatesBody', icon: CalendarDays },
  { key: 'fees', body: 'feesBody', icon: Wallet },
] as const;

export function AdmissionSection() {
  const t = useTranslations('sections.admission');
  const tc = useTranslations('common');

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ITEMS.map(({ key, body, icon: Icon }, i) => (
            <Reveal key={key} delay={i * 0.1}>
              <Card>
                <CardContent className="flex flex-col items-start gap-3 p-6">
                  <span className="grid size-12 place-items-center rounded-md bg-secondary text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="font-display text-h3 font-semibold text-primary">
                    {t(key)}
                  </h3>
                  <p className="text-body text-muted-foreground">{t(body)}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <CTAButton href="/admission" variant="primary" size="lg">
            {tc('apply')}
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
