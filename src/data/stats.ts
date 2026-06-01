import type { Stat } from '@/types/content';

export const STATS: readonly Stat[] = [
  {
    id: 'students',
    value: 1200,
    suffix: '+',
    label: { en: 'Students', bn: 'শিক্ষার্থী', ar: 'طالب' },
  },
  {
    id: 'faculty',
    value: 45,
    suffix: '+',
    label: { en: 'Faculty', bn: 'শিক্ষক', ar: 'أستاذ' },
  },
  {
    id: 'departments',
    value: 12,
    suffix: '+',
    label: { en: 'Departments', bn: 'বিভাগ', ar: 'قسم' },
  },
  {
    id: 'graduates',
    value: 500,
    suffix: '+',
    label: { en: 'Graduates', bn: 'স্নাতক', ar: 'خرّيج' },
  },
];
