import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import type { ComponentType } from 'react';

import { Container } from '@/components/layout/Container';
import { FOOTER_NAV } from '@/data/navigation';
import { SITE } from '@/data/site';
import { Link } from '@/i18n/navigation';

const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  youtube: Youtube,
  instagram: Instagram,
};

/** Footer landmark — links, contact, social, brand (BLUEPRINT §2.14). */
export function Footer() {
  const t = useTranslations();

  return (
    <footer className="mt-24 bg-primary-darkest text-primary-foreground">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Image
              src="/logo.svg"
              alt={t('meta.title')}
              width={140}
              height={44}
              className="h-11 w-auto brightness-0 invert"
            />
            <p className="text-small text-primary-foreground/80">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label={t('a11y.footerNav')} className="flex flex-col gap-3">
            <h2 className="text-eyebrow uppercase text-accent-soft">
              {t('footer.quickLinks')}
            </h2>
            {FOOTER_NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-body text-primary-foreground/85 transition-colors hover:text-accent-soft"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h2 className="text-eyebrow uppercase text-accent-soft">
              {t('footer.contact')}
            </h2>
            <p className="flex items-start gap-2 text-body text-primary-foreground/85">
              <MapPin
                className="mt-1 size-4 shrink-0 text-accent-soft"
                aria-hidden
              />
              {t('footer.address')}
            </p>
            <a
              href={`tel:${SITE.contact.phone}`}
              className="flex items-center gap-2 text-body text-primary-foreground/85 transition-colors hover:text-accent-soft"
            >
              <Phone className="size-4 shrink-0 text-accent-soft" aria-hidden />
              {t('footer.phone')}
            </a>
            <a
              href={`mailto:${SITE.contact.email}`}
              className="flex items-center gap-2 text-body text-primary-foreground/85 transition-colors hover:text-accent-soft"
            >
              <Mail className="size-4 shrink-0 text-accent-soft" aria-hidden />
              {t('footer.email')}
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <h2 className="text-eyebrow uppercase text-accent-soft">
              {t('footer.followUs')}
            </h2>
            <div className="flex gap-3">
              {SITE.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.key];
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-md border border-primary-foreground/20 transition-colors hover:border-accent-soft hover:text-accent-soft"
                  >
                    {Icon ? <Icon className="size-5" /> : null}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/15 pt-6 text-center text-small text-primary-foreground/70">
          © {SITE.name}. {t('footer.rights')}
        </div>
      </Container>
    </footer>
  );
}
