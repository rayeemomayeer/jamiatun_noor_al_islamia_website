import type { Activity } from '@/types/content';

/** Most-recent-first; full articles move to content/activities MDX in Phase 5. */
export const ACTIVITIES: readonly Activity[] = [
  {
    slug: 'annual-khatm',
    date: '2026-05-18',
    title: { en: 'Annual Khatm al-Bukhari', ar: 'ختم البخاري السنوي' },
    excerpt: {
      en: 'The institution celebrated the completion of Sahih al-Bukhari with scholars and graduates.',
      ar: 'احتفلت المؤسسة بختم صحيح البخاري بحضور العلماء والخريجين.',
    },
  },
  {
    slug: 'hifz-ceremony',
    date: '2026-04-02',
    title: { en: 'Hifz Graduation Ceremony', ar: 'حفل تخرّج الحفّاظ' },
    excerpt: {
      en: 'Forty students completed memorization of the Holy Qur’an this academic year.',
      ar: 'أتمّ أربعون طالبًا حفظ القرآن الكريم هذا العام.',
    },
  },
  {
    slug: 'inter-madrasa-debate',
    date: '2026-03-10',
    title: { en: 'Inter-Madrasa Debate', ar: 'مناظرة بين المدارس' },
    excerpt: {
      en: 'Students represented the institution in the regional Islamic knowledge competition.',
      ar: 'مثّل الطلاب المؤسسة في المسابقة الإقليمية للعلوم الإسلامية.',
    },
  },
];
