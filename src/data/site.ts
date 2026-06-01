/** Global site config — NAP + socials (BLUEPRINT §4.1, used by Footer/SEO). */

export interface SocialLink {
  key: string;
  label: string;
  href: string;
}

export const SITE = {
  name: 'Jamiatun Noor Al Islamia',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  contact: {
    phone: '+8801700000000',
    email: 'info@noor-islamia.edu.bd',
  },
  socials: [
    { key: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
    { key: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
    { key: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  ] satisfies SocialLink[],
} as const;
