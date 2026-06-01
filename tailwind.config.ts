import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

/**
 * Design system tokens — BLUEPRINT §7.
 * Colors are driven by HSL CSS variables (src/styles/globals.css) so opacity
 * modifiers work and theming stays centralized. No raw hex in components.
 */
const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '2.5rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        parchment: {
          DEFAULT: 'hsl(var(--background))',
          deep: 'hsl(var(--parchment-deep))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          dark: 'hsl(var(--primary-dark))',
          darkest: 'hsl(var(--primary-darkest))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          soft: 'hsl(var(--accent-soft))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontFamily: {
        display: [
          'var(--font-display)',
          'var(--font-bangla)',
          'var(--font-arabic)',
          'Georgia',
          'serif',
        ],
        body: [
          'var(--font-body)',
          'var(--font-bangla)',
          'var(--font-arabic)',
          'Georgia',
          'serif',
        ],
      },
      fontSize: {
        // fluid type scale (§7.2) — clamp(min, preferred, max)
        display: [
          'clamp(2.5rem, 1.6rem + 4.5vw, 3.75rem)',
          { lineHeight: '1.05' },
        ],
        h1: ['clamp(2rem, 1.4rem + 3vw, 3rem)', { lineHeight: '1.1' }],
        h2: [
          'clamp(1.75rem, 1.3rem + 2.25vw, 2.25rem)',
          { lineHeight: '1.15' },
        ],
        h3: ['clamp(1.375rem, 1.1rem + 1.4vw, 1.75rem)', { lineHeight: '1.2' }],
        h4: ['clamp(1.125rem, 1rem + 0.6vw, 1.375rem)', { lineHeight: '1.25' }],
        'body-lg': [
          'clamp(1.0625rem, 1rem + 0.3vw, 1.125rem)',
          { lineHeight: '1.6' },
        ],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        eyebrow: ['0.8125rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(28,43,34,.06)',
        md: '0 6px 16px rgba(28,43,34,.10)',
        lg: '0 16px 40px rgba(28,43,34,.14)',
        gold: '0 0 0 1px hsl(var(--accent)), 0 4px 18px rgba(201,162,39,.18)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
