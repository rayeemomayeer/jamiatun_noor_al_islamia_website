import type { Publication } from '@/types/content';

export const PUBLICATIONS: readonly Publication[] = [
  {
    slug: 'tafsir-collection',
    type: 'collection',
    title: { en: 'Selected Tafsir Collection', ar: 'مجموعة التفسير المختارة' },
    author: { en: 'Faculty of Tafsir', ar: 'هيئة التفسير' },
  },
  {
    slug: 'fiqh-paper',
    type: 'paper',
    title: { en: 'Contemporary Fiqh Issues', ar: 'قضايا فقهية معاصرة' },
    author: { en: 'Mufti Abdullah Rahman', ar: 'المفتي عبد الله الرحمن' },
  },
  {
    slug: 'friday-lectures',
    type: 'audio',
    title: { en: 'Friday Lecture Series', ar: 'سلسلة خطب الجمعة' },
    author: { en: 'Maulana Yusuf Ali', ar: 'مولانا يوسف علي' },
  },
  {
    slug: 'hadith-review',
    type: 'review',
    title: { en: 'Annual Hadith Review', ar: 'المراجعة السنوية للحديث' },
    author: { en: 'Faculty of Hadith', ar: 'هيئة الحديث' },
  },
];
