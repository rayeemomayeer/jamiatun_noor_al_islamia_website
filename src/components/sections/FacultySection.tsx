import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { CardMotionWrapper } from '@/components/shared/CardMotionWrapper';
import { FacultyCard } from '@/components/shared/FacultyCard';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FACULTY } from '@/data/faculty';
import { Link } from '@/i18n/navigation';

export function FacultySection({ locale }: { locale: Locale }) {
  const t = useTranslations('sections.faculty');
  const tc = useTranslations('common');

  const faculty = [...FACULTY].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-parchment-deep py-20">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t('eyebrow')}
            title={t('title')}
            description={t('description')}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {faculty.map((member, i) => (
            <Reveal key={member.slug} delay={i * 0.08}>
              <CardMotionWrapper>
                <FacultyCard faculty={member} locale={locale} />
              </CardMotionWrapper>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/faculty"
            className="inline-flex items-center gap-1.5 text-body font-semibold text-primary transition-colors hover:text-accent"
          >
            {tc('viewAll')}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
