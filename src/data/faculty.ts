import type { Faculty } from '@/types/content';

export const FACULTY: readonly Faculty[] = [
  {
    slug: 'mufti-abdullah',
    name: { en: 'Mufti Abdullah Rahman', ar: 'المفتي عبد الله الرحمن' },
    title: {
      en: 'Principal · Mufti',
      bn: 'অধ্যক্ষ · মুফতি',
      ar: 'المدير · مفتٍ',
    },
    order: 1,
  },
  {
    slug: 'maulana-yusuf',
    name: { en: 'Maulana Yusuf Ali', ar: 'مولانا يوسف علي' },
    title: {
      en: 'Head of Hadith',
      bn: 'হাদিস বিভাগ প্রধান',
      ar: 'رئيس قسم الحديث',
    },
    order: 2,
  },
  {
    slug: 'hafiz-ibrahim',
    name: { en: 'Hafiz Ibrahim Khan', ar: 'الحافظ إبراهيم خان' },
    title: {
      en: 'Head of Hifz',
      bn: 'হিফজ বিভাগ প্রধান',
      ar: 'رئيس قسم الحفظ',
    },
    order: 3,
  },
  {
    slug: 'maulana-sayeed',
    name: { en: 'Maulana Sayeed Ahmad', ar: 'مولانا سعيد أحمد' },
    title: { en: 'Lecturer · Fiqh', bn: 'প্রভাষক · ফিকহ', ar: 'محاضر · الفقه' },
    order: 4,
  },
];
