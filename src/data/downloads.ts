import type { Download } from '@/types/content';

export const DOWNLOADS: readonly Download[] = [
  {
    slug: 'prospectus',
    title: {
      en: 'Institution Prospectus',
      bn: 'প্রতিষ্ঠানের প্রসপেক্টাস',
      ar: 'دليل المؤسسة',
    },
    category: { en: 'General', bn: 'সাধারণ', ar: 'عام' },
    format: 'PDF',
    size: '2.4 MB',
  },
  {
    slug: 'admission-form',
    title: { en: 'Admission Form', bn: 'ভর্তি ফরম', ar: 'استمارة القبول' },
    category: { en: 'Admission', bn: 'ভর্তি', ar: 'القبول' },
    format: 'PDF',
    size: '320 KB',
  },
  {
    slug: 'kitab-syllabus',
    title: { en: 'Kitab Syllabus', bn: 'কিতাব সিলেবাস', ar: 'منهج الكتاب' },
    category: { en: 'Syllabus', bn: 'সিলেবাস', ar: 'المنهج' },
    format: 'PDF',
    size: '1.2 MB',
  },
  {
    slug: 'annual-results',
    title: { en: 'Annual Results', bn: 'বার্ষিক ফলাফল', ar: 'النتائج السنوية' },
    category: { en: 'Results', bn: 'ফলাফল', ar: 'النتائج' },
    format: 'PDF',
    size: '680 KB',
  },
];
