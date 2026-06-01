import type { Department } from '@/types/content';

export const DEPARTMENTS: readonly Department[] = [
  {
    slug: 'kitab',
    title: { en: 'Kitab Department', bn: 'কিতাব বিভাগ', ar: 'قسم الكتاب' },
    description: {
      en: 'Classical Islamic sciences — fiqh, hadith, tafsir, and Arabic grammar taught through the traditional kitab curriculum.',
      bn: 'ঐতিহ্যবাহী কিতাব পাঠক্রমে ফিকহ, হাদিস, তাফসির ও আরবি ব্যাকরণ।',
      ar: 'العلوم الإسلامية الكلاسيكية: الفقه والحديث والتفسير والنحو.',
    },
    syllabus: 'kitab-syllabus',
  },
  {
    slug: 'hifz',
    title: { en: 'Hifz Department', bn: 'হিফজ বিভাগ', ar: 'قسم الحفظ' },
    description: {
      en: 'Complete memorization of the Holy Qur’an with tajweed under experienced huffaz, paced to each student.',
      bn: 'অভিজ্ঞ হাফেজদের তত্ত্বাবধানে তাজবিদসহ সম্পূর্ণ কুরআন হিফজ।',
      ar: 'حفظ القرآن الكريم كاملًا مع التجويد بإشراف حفّاظ مهرة.',
    },
    syllabus: 'hifz-syllabus',
  },
  {
    slug: 'general',
    title: { en: 'General Classes', bn: 'সাধারণ শিক্ষা', ar: 'الفصول العامة' },
    description: {
      en: 'National curriculum subjects integrated with Islamic studies, preparing students for both deen and dunya.',
      bn: 'ইসলামি শিক্ষার সাথে জাতীয় পাঠক্রমের সমন্বয়।',
      ar: 'مواد المنهج الوطني مدمجة بالدراسات الإسلامية.',
    },
    syllabus: 'general-syllabus',
  },
];
