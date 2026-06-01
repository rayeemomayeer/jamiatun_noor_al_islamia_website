import type { FinancialMetric } from '@/types/content';

/** Honest, labeled allocation of funds (BLUEPRINT §2.13, §13.9). */
export const FINANCIAL_METRICS: readonly FinancialMetric[] = [
  {
    id: 'education',
    label: {
      en: 'Education & Faculty',
      bn: 'শিক্ষা ও শিক্ষক',
      ar: 'التعليم والأساتذة',
    },
    value: 62,
  },
  {
    id: 'scholarships',
    label: { en: 'Student Scholarships', bn: 'শিক্ষাবৃত্তি', ar: 'منح الطلاب' },
    value: 24,
  },
  {
    id: 'facilities',
    label: {
      en: 'Facilities & Upkeep',
      bn: 'অবকাঠামো',
      ar: 'المرافق والصيانة',
    },
    value: 14,
  },
];
