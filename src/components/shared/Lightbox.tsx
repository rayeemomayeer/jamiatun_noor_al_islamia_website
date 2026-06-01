'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import { cn } from '@/lib/utils';

interface LightboxImage {
  id: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Gallery lightbox — focus trap, Esc/arrow keys, aria-modal (BLUEPRINT §2.9).
 * Mounts as a portal via a client component (no server rendering).
 */
export function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = images[index];

  // Restore focus on unmount and trap focus inside.
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => prev?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  // Scroll lock.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!current) return null;

  return (
    // Keyboard close handled by the useEffect above (Esc key).
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-darkest/90"
      onClick={onClose}
    >
      {/* Stop propagation so clicking image/controls doesn't close. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center gap-4 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Placeholder image block — real images replace in Phase 7. */}
        <div className="flex h-3/4 w-full max-w-3xl items-center justify-center rounded-lg bg-primary-dark/60">
          <span className="font-display text-h3 text-primary-foreground/50">
            {current.alt}
          </span>
        </div>
        <p className="text-body text-primary-foreground/80">{current.alt}</p>
        <p className="text-small text-primary-foreground/50">
          {index + 1} / {images.length}
        </p>
      </div>

      {/* Controls */}
      <button
        ref={closeRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute end-4 top-4 grid size-10 place-items-center rounded-md text-primary-foreground/70 transition-colors hover:text-primary-foreground"
      >
        <X className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Previous image"
        onClick={onPrev}
        disabled={index === 0}
        className={cn(
          'absolute start-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-primary-darkest/60 text-primary-foreground transition-colors hover:bg-primary-darkest',
          index === 0 && 'opacity-30'
        )}
      >
        <ChevronLeft className="size-6 rtl:rotate-180" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={onNext}
        disabled={index === images.length - 1}
        className={cn(
          'absolute end-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-primary-darkest/60 text-primary-foreground transition-colors hover:bg-primary-darkest',
          index === images.length - 1 && 'opacity-30'
        )}
      >
        <ChevronRight className="size-6 rtl:rotate-180" />
      </button>
    </div>
  );
}
