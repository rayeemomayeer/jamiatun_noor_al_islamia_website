import type { Localized } from '@/types/content';

export interface FeeRow {
  id: string;
  item: Localized<string>;
  kitab?: string;
  hifz?: string;
  general?: string;
}

export interface FeeTable {
  caption: Localized<string>;
  rows: FeeRow[];
}

export const FEE_TABLE: FeeTable = {
  caption: {
    en: 'Academic year 2025–26. All amounts in BDT.',
    bn: 'শিক্ষাবর্ষ ২০২৫–২৬। সমস্ত পরিমাণ বাংলাদেশি টাকায়।',
    ar: 'العام الدراسي 2025-26. جميع المبالغ بالتاكا البنغلاديشي.',
  },
  rows: [
    {
      id: 'admission',
      item: {
        en: 'Admission Fee (one-time)',
        bn: 'ভর্তি ফি (এককালীন)',
        ar: 'رسوم القبول (مرة واحدة)',
      },
      kitab: '৳ 5,000',
      hifz: '৳ 5,000',
      general: '৳ 3,000',
    },
    {
      id: 'monthly',
      item: { en: 'Monthly Tuition', bn: 'মাসিক বেতন', ar: 'الرسوم الشهرية' },
      kitab: '৳ 2,500',
      hifz: '৳ 2,000',
      general: '৳ 1,500',
    },
    {
      id: 'books',
      item: {
        en: 'Books & Materials (annual)',
        bn: 'বই ও সামগ্রী (বার্ষিক)',
        ar: 'الكتب والمواد (سنوي)',
      },
      kitab: '৳ 3,500',
      hifz: '৳ 2,000',
      general: '৳ 4,000',
    },
    {
      id: 'exam',
      item: {
        en: 'Exam Fee (annual)',
        bn: 'পরীক্ষার ফি (বার্ষিক)',
        ar: 'رسوم الامتحان (سنوي)',
      },
      kitab: '৳ 1,000',
      hifz: '৳ 800',
      general: '৳ 1,200',
    },
  ],
};

/** Placeholder Google Form URL — replace with real form before launch. */
export const GOOGLE_FORM_ADMISSION_URL =
  'https://docs.google.com/forms/d/e/PLACEHOLDER/viewform';
