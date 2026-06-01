'use client';

import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { DONATE_HREF, PRIMARY_NAV } from '@/data/navigation';
import { Link } from '@/i18n/navigation';

/** Slide-in drawer nav for < lg. Focus trap + scroll lock via Radix Dialog. */
export function MobileMenu() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={t('a11y.openMenu')}
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-4/5 max-w-xs">
        <SheetTitle className="text-start">{t('meta.title')}</SheetTitle>
        <nav aria-label={t('a11y.primaryNav')} className="mt-4 flex flex-col">
          {PRIMARY_NAV.map((item) => (
            <SheetClose asChild key={item.key}>
              <Link
                href={item.href}
                className="border-b border-border py-3 text-h4 font-semibold text-foreground transition-colors hover:text-primary"
              >
                {t(`nav.${item.key}`)}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <SheetClose asChild>
          <Link
            href={DONATE_HREF}
            className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 font-semibold text-accent-foreground shadow-gold"
          >
            {t('nav.donate')}
          </Link>
        </SheetClose>
        <LocaleSwitcher className="mt-6" />
      </SheetContent>
    </Sheet>
  );
}
