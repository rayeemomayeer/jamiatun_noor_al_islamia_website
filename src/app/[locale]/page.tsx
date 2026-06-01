import { setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/constants/i18n';
import { ActivitiesSection } from '@/components/sections/ActivitiesSection';
import { AdmissionSection } from '@/components/sections/AdmissionSection';
import { DepartmentsSection } from '@/components/sections/DepartmentsSection';
import { DonateSection } from '@/components/sections/DonateSection';
import { DownloadsSection } from '@/components/sections/DownloadsSection';
import { FacultySection } from '@/components/sections/FacultySection';
import { FinancialTransparency } from '@/components/sections/FinancialTransparency';
import { GallerySection } from '@/components/sections/GallerySection';
import { HeroSection } from '@/components/sections/HeroSection';
import { PublicationsSection } from '@/components/sections/PublicationsSection';
import { StatsSection } from '@/components/sections/StatsSection';

type PageParams = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageParams) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <>
      <HeroSection />
      <StatsSection locale={l} />
      <DepartmentsSection locale={l} />
      <FacultySection locale={l} />
      <AdmissionSection />
      <PublicationsSection locale={l} />
      <GallerySection locale={l} />
      <ActivitiesSection locale={l} />
      <DownloadsSection locale={l} />
      <DonateSection />
      <FinancialTransparency locale={l} />
    </>
  );
}
