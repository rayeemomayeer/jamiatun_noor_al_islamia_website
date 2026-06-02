'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { LOCALE_LABELS, LOCALES, type Locale } from '@/constants/i18n';

const STORAGE_KEY = 'lang-selected';

const LOCALE_META: Record<
  Locale,
  { dir: 'ltr' | 'rtl'; flag: string; sub: string }
> = {
  en: { dir: 'ltr', flag: '🇬🇧', sub: 'English' },
  bn: { dir: 'ltr', flag: '🇧🇩', sub: 'বাংলা' },
  ar: { dir: 'rtl', flag: '🇸🇦', sub: 'العربية' },
};

/**
 * One-time language selection bottom sheet.
 * Shown on first visit (localStorage flag). Dismissed permanently on choice or close.
 * Framer Motion slide-up + backdrop fade.
 */
export function LanguageWelcome({ currentLocale }: { currentLocale: Locale }) {
  const [visible, setVisible] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const firstOptionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Delay slightly so the hero animation plays first.
    const id = setTimeout(() => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    }, 1200);
    return () => clearTimeout(id);
  }, []);

  // Focus first option when sheet opens.
  useEffect(() => {
    if (visible) {
      setTimeout(() => firstOptionRef.current?.focus(), 50);
    }
  }, [visible]);

  // Keyboard: Esc closes.
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, currentLocale);
    setVisible(false);
  }

  function select(locale: Locale) {
    if (selecting) return;
    setSelecting(true);
    localStorage.setItem(STORAGE_KEY, locale);
    setVisible(false);
    if (locale !== currentLocale) {
      router.push(`/${locale}`);
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-primary-darkest/50 backdrop-blur-sm"
            aria-hidden
            onClick={dismiss}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Select your language"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg rounded-t-2xl border-t border-border bg-card px-6 pb-10 pt-6 shadow-lg"
          >
            {/* Handle */}
            <div
              aria-hidden
              className="mx-auto mb-5 h-1 w-10 rounded-full bg-border"
            />

            {/* Close */}
            <button
              ref={closeRef}
              type="button"
              aria-label="Dismiss"
              onClick={dismiss}
              className="absolute end-4 top-4 grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-4" />
            </button>

            {/* Heading */}
            <p className="text-center text-eyebrow uppercase tracking-widest text-accent">
              Jamiatun Noor Al Islamia
            </p>
            <h2 className="mt-1 text-center font-display text-h3 font-semibold text-primary">
              Choose your language
            </h2>

            {/* Options */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {LOCALES.map((locale, i) => {
                const meta = LOCALE_META[locale];
                const isActive = locale === currentLocale;
                return (
                  <button
                    key={locale}
                    ref={i === 0 ? firstOptionRef : undefined}
                    type="button"
                    lang={locale}
                    dir={meta.dir}
                    onClick={() => select(locale)}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 px-3 py-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive
                        ? 'border-primary bg-primary text-primary-foreground shadow-md'
                        : 'border-border bg-secondary text-foreground hover:border-primary/50 hover:bg-parchment-deep'
                    }`}
                  >
                    <span className="text-3xl leading-none" aria-hidden>
                      {meta.flag}
                    </span>
                    <span className="text-body font-semibold">
                      {LOCALE_LABELS[locale]}
                    </span>
                    <span
                      className={`text-small ${isActive ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}
                    >
                      {meta.sub}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-center text-small text-muted-foreground">
              You can change this anytime in the navigation bar.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
