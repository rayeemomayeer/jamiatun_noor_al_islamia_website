import type { GalleryImage } from '@/types/content';

export const GALLERY: readonly GalleryImage[] = [
  {
    id: 'campus-1',
    alt: { en: 'Main campus building', ar: 'مبنى الحرم الرئيسي' },
  },
  { id: 'library', alt: { en: 'Institution library', ar: 'مكتبة المؤسسة' } },
  {
    id: 'classroom',
    alt: { en: 'Kitab classroom session', ar: 'حصة في قسم الكتاب' },
  },
  { id: 'prayer-hall', alt: { en: 'Prayer hall', ar: 'قاعة الصلاة' } },
  { id: 'graduation', alt: { en: 'Graduation gathering', ar: 'حفل التخرّج' } },
  { id: 'courtyard', alt: { en: 'Campus courtyard', ar: 'فناء الحرم' } },
];
