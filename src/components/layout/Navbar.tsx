'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { CTAButton } from '@/components/shared/CTAButton';
import { DONATE_HREF, PRIMARY_NAV } from '@/data/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

/** Sticky primary nav with scroll elevation (BLUEPRINT §2.1, §7.6). */
export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/90 shadow-sm backdrop-blur'
          : 'bg-transparent'
      )}
    >
      <Container as="nav" aria-label={t('a11y.primaryNav')}>
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label={t('meta.title')}
          >
            <Image
              src="/logo.svg"
              alt={t('meta.title')}
              width={120}
              height={40}
              priority
              className="h-9 w-auto lg:h-10"
            />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {PRIMARY_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative py-1 text-body font-semibold transition-colors hover:text-primary',
                      'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100',
                      isActive
                        ? 'text-primary after:scale-x-100'
                        : 'text-foreground'
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <LocaleSwitcher className="hidden lg:flex" />
            <CTAButton href={DONATE_HREF} variant="donate" size="sm">
              {t('nav.donate')}
            </CTAButton>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
