import { useTranslations } from 'next-intl';
import { Download } from 'lucide-react';

import type { Locale } from '@/constants/i18n';
import { Container } from '@/components/layout/Container';
import { ArchCard } from '@/components/shared/ArchCard';
import { CardMotionWrapper } from '@/components/shared/CardMotionWrapper';
import { Reveal } from '@/components/shared/Reveal';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Button } from '@/components/ui/button';
import { DEPARTMENTS } from '@/data/departments';
import { Link } from '@/i18n/navigation';
import { pick } from '@/utils/localize';

export function DepartmentsSection({ locale }: { locale: Locale }) {
  const t = useTranslations('sections.departments');
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
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((dept, i) => (
            <Reveal key={dept.slug} delay={i * 0.12}>
              {/* variant="arch": filter:drop-shadow (respects SVG mask), no box-shadow */}
              <CardMotionWrapper variant="arch">
                <ArchCard
                  title={pick(dept.title, locale)}
                  description={pick(dept.description, locale)}
                  action={
                    <Button asChild variant="secondary" size="sm">
                      <Link href={`/downloads/${dept.syllabus}`}>
                        <Download /> {tc('downloadSyllabus')}
                      </Link>
                    </Button>
                  }
                />
              </CardMotionWrapper>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
