# Jamiatun Noor Al Islamia — Technical Implementation Blueprint

> Premium institutional website. Next.js 15 (App Router) · TypeScript · Tailwind CSS · Shadcn UI · GSAP · Framer Motion · React Hook Form · Zod · Vercel.
>
> **Status:** Pre-development specification. No implementation code is produced here. This document is the single source of truth that the build will follow.
>
> **Languages:** English (default), Bangla (bn), Arabic (ar, RTL). Architecture is i18n-first.
>
> **Version:** 1.0 · **Date:** 2026-06-02 · **Owner:** Engineering

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Design Analysis (Section-by-Section)](#2-design-analysis-section-by-section)
3. [Information Architecture](#3-information-architecture)
4. [Folder Structure](#4-folder-structure)
5. [Content Strategy](#5-content-strategy)
6. [Component Architecture](#6-component-architecture)
7. [Design System](#7-design-system)
8. [Animation System](#8-animation-system)
9. [SEO Strategy](#9-seo-strategy)
10. [Performance Strategy](#10-performance-strategy)
11. [Development Roadmap](#11-development-roadmap)
12. [Coding Standards](#12-coding-standards)
13. [Design Improvement Recommendations](#13-design-improvement-recommendations)

---

## 1. Architecture Overview

### 1.1 Guiding principles

The site is a content-driven, mostly-static institutional brochure with light interactivity (forms, gallery lightbox, downloads). There is no backend, no database, and no CMS. This pushes us toward a **content-as-code** model rendered at build time.

The defining constraints that shape every decision below:

- **Static-first.** Every page that _can_ be statically generated _must_ be. Department detail, faculty, publications, gallery, downloads, and activities are all derived from typed content files known at build time. This yields CDN-served HTML, near-zero TTFB, and trivial scaling.
- **Server Components by default.** Client Components are an exception, justified only by interactivity (forms, lightbox, mobile menu, animated counters, scroll triggers). Marketing/content markup never ships JS for rendering.
- **i18n-first.** Because the institution serves English, Bangla, and Arabic audiences — and Arabic is RTL — locale and direction are first-class concerns baked into routing, layout, typography, and content shape from day one. Retrofitting RTL later is expensive; we design for it now.
- **Premium feel through restraint.** Motion is choreographed, not sprinkled. Animations exist to guide attention and reinforce craft, and they always respect `prefers-reduced-motion`.

### 1.2 Rendering strategy

| Concern                            | Decision                                                                         | Rationale                                                            |
| ---------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Page generation                    | **SSG** via `generateStaticParams` for all dynamic routes (`[locale]`, `[slug]`) | All content is known at build time; no runtime data fetching.        |
| Component model                    | **RSC by default**, `"use client"` only at interactive leaves                    | Minimize client bundle; ship HTML, hydrate islands.                  |
| Data source                        | Typed TS modules + JSON + MDX in `/content` and `/data`                          | No CMS; content versioned in git, type-safe at compile time.         |
| Forms (admission enquiry, contact) | Client Components (RHF + Zod) → Server Action or third-party (Formspree/Resend)  | No DB; submissions routed to email/webhook. Decision in §5.7.        |
| Images                             | `next/image` with local imports for static assets, AVIF/WebP                     | LCP control, automatic responsive sizing.                            |
| i18n                               | `next-intl` with `[locale]` segment + middleware                                 | Mature App-Router-native i18n with RTL support and message catalogs. |

### 1.3 High-level data flow

```
/content (MDX, JSON)   /data (typed TS)        /messages (i18n catalogs)
        │                     │                          │
        └──────── lib/content loaders (typed, zod-validated) ──────────┘
                              │
              Server Components (build-time render)
                              │
            ┌─────────────────┼─────────────────┐
       static HTML       client islands     next/image assets
      (CDN, Vercel)   (forms, lightbox,    (optimized, AVIF)
                       counters, menu)
```

### 1.4 Key architectural decisions (ADR summary)

- **ADR-001 — App Router over Pages Router.** RSC, nested layouts, streaming, and metadata API are required for the performance and SEO targets. _Accepted._
- **ADR-002 — `next-intl` for i18n.** Native App Router support, message catalogs, locale-aware routing, RTL-friendly. Alternative `next-i18next` is Pages-Router-oriented. _Accepted._
- **ADR-003 — Content as code, not a CMS.** Requirement is no backend/CMS. Trade-off: non-technical edits require a developer or a future headless CMS. Mitigation: clean, well-documented content schemas (§5) so a CMS (Sanity/Contentlayer) can be layered in later without touching components. _Accepted._
- **ADR-004 — GSAP + Framer Motion coexist.** GSAP (with ScrollTrigger) owns scroll-driven and timeline-heavy choreography; Framer Motion owns component-level interaction and page transitions. Clear ownership boundaries (§8) prevent conflict. _Accepted._
- **ADR-005 — Form delivery without a DB.** Use a Next.js Route Handler/Server Action that forwards to Resend (email) and optionally a Google Sheet/webhook. Keeps "no backend" promise while capturing leads. _Proposed — confirm provider._

---

## 2. Design Analysis (Section-by-Section)

The provided `/design` assets are a full homepage composition plus isolated section references. Visual language is consistent: an ivory/parchment canvas, deep emerald green for authority and trust, gold ornamental framing (mihrab arches, eight-point star rosettes, calligraphic flourishes), and serif display typography. The mood is scholarly, calm, and premium — closer to a heritage university than a startup.

Below, each section is analyzed for **Purpose · User journey · UX goals · Mobile behavior · Accessibility**.

### 2.1 Header & Navigation

- **Purpose.** Persistent wayfinding and the primary conversion entry point (Apply / Donate). Establishes brand instantly via the calligraphic logo.
- **User journey.** First fixation on arrival; users orient ("what is this institution, what can I do here"). Returning users use it to jump between Admission, Departments, About.
- **UX goals.** Logo left, primary links centered/right (Admission, Departments, About Us), a high-contrast **Donate** button as the standout CTA, plus a locale switcher (EN/বাংলা/العربية). Sticky on scroll with a subtle elevation/translucency shift. Keep link count ≤ 6 to avoid overload.
- **Mobile behavior.** Collapse to a hamburger → full-height slide-in drawer (`MobileMenu`). Donate remains visible in the bar (not hidden in the drawer). Locale switcher inside the drawer. Touch targets ≥ 44px.
- **Accessibility.** `<header>` + `<nav aria-label="Primary">`; skip-to-content link; focus trap in the open drawer; `aria-expanded`/`aria-controls` on the toggle; logo `alt` = institution name. Direction flips for Arabic (logo right, nav left) automatically via logical CSS properties.

### 2.2 Hero

- **Purpose.** Communicate mission in one breath and drive the two primary actions: **Apply for Admission** and **View Departments**.
- **User journey.** The emotional first impression. A confident headline ("Jamiatun Noor Al Islamia"), a one-line mission statement, then a clear action fork.
- **UX goals.** Ornamental arch/pattern background at low contrast so text stays legible. Two buttons with clear primary/secondary hierarchy. Above-the-fold, no carousel (carousels hurt LCP and engagement).
- **Mobile behavior.** Stack headline → subtext → buttons (full-width, stacked). Reduce background pattern density to protect contrast and performance. Hero image served responsively; never a layout-shift source (reserved aspect ratio).
- **Accessibility.** Single `<h1>` per page lives here. Decorative background marked `aria-hidden`. Contrast ratio of headline over background ≥ 4.5:1 (verify against the pattern's lightest/darkest regions). Buttons are real `<a>`/`<button>`, not divs.

### 2.3 Statistics

- **Purpose.** Build credibility fast with proof points: 1200+ Students, 45+ Faculty, 12+ Departments, 500+ Graduates.
- **User journey.** Skimmed immediately after the hero — a trust accelerator before deeper exploration.
- **UX goals.** Four gold star-rosette badges with animated count-up on scroll-in. Numbers must read instantly; labels beneath.
- **Mobile behavior.** 2×2 grid (not 1×4 — keeps it compact and scannable). Counters still animate but only once, on first entry.
- **Accessibility.** Counters announce final value, not every tick: render the final number in the DOM and animate visually; mark intermediate states `aria-hidden` or use `aria-live="off"`. Respect reduced-motion (show final number immediately). Each stat is a labelled unit (`<dl>`/`<dt>`/`<dd>` pattern works well semantically).

### 2.4 Departments (overview)

- **Purpose.** Present the academic structure — Kitab, Hifz, General Classes — and route to detail + syllabus downloads.
- **User journey.** A prospective student/parent compares tracks, reads a short description, downloads the full syllabus, or clicks through to a detail page.
- **UX goals.** Mihrab-arch cards with image, title, short description, and a "Download Full Syllabus" action. Equal-height cards; consistent arch silhouette reinforces brand.
- **Mobile behavior.** Single-column stack; arch imagery scales but preserves aspect ratio; download button full-width.
- **Accessibility.** Cards are linked regions with a clear accessible name (department title). Download links state file type/size ("PDF, 1.2 MB") for screen readers. Arch decoration is CSS/masking, not content.

### 2.5 Faculty

- **Purpose.** Humanize the institution and signal academic authority via distinguished scholars.
- **User journey.** Trust-building; users scan portraits and credentials, optionally open a profile for bio/specialization.
- **UX goals.** Portrait cards (photo, name, title/credential). Horizontal rail or responsive grid. Optional modal/detail for full bio.
- **Mobile behavior.** Horizontal swipe carousel or 1–2 column grid. Lazy-load portraits below the fold.
- **Accessibility.** Portraits require meaningful `alt` (name + role). If a carousel, provide keyboard controls and `aria-roledescription`; pause on focus/hover. Modal uses focus trap + `Esc` to close + restore focus to trigger.

### 2.6 Admission ("Join Our Academic Journey")

- **Purpose.** Convert interest into application; surface Requirements, Key Dates, and Fee Structure in one place.
- **User journey.** The decision hub. Users toggle between Requirements / Key Dates / Fee Structure, review costs, then apply or enquire.
- **UX goals.** Tabbed interface (Requirements · Key Dates · Fee Structure) with the fee table prominent. Persistent "Apply" CTA. Clarity and trust over decoration here.
- **Mobile behavior.** Tabs become an accordion or horizontally scrollable tab strip; fee table switches to stacked/scrollable cards (never a cramped horizontal table).
- **Accessibility.** Proper ARIA tabs pattern (`role="tablist"`, `tab`, `tabpanel`, arrow-key navigation). Fee table uses real `<table>` with `<th scope>`. Dates in machine-readable `<time>`.

### 2.7 Fee Structure

- **Purpose.** Transparent cost communication — a major decision factor for families.
- **User journey.** Often the make-or-break content; users want exact, unambiguous numbers.
- **UX goals.** Clean comparison table (item, price, possibly per-track columns), with a clear total row. Gold-framed for emphasis but high legibility inside.
- **Mobile behavior.** Responsive table → stacked key/value cards per row; horizontal scroll only as a last resort with a visible affordance.
- **Accessibility.** Semantic table, `scope` on headers, caption describing the table, currency announced clearly. Avoid conveying meaning by color alone (e.g., highlighted totals also bolded/labelled).

### 2.8 Publications / Featured Collections

- **Purpose.** Showcase scholarly output (books, papers, audio lectures, academic reviews) — signals depth and ongoing scholarship.
- **User journey.** Researchers/students browse or filter collections; some read, some listen (audio), some download.
- **UX goals.** Filterable grid (Collections · Papers · Audio · More) with cards that adapt to media type (cover image vs. audio player affordance). Featured items highlighted.
- **Mobile behavior.** Filters become a horizontal chip strip or dropdown; cards single-column. Audio uses a compact native-friendly player.
- **Accessibility.** Filter controls are real buttons with `aria-pressed`. Audio has accessible `<audio controls>` with labels and transcript links where available. Result count announced via `aria-live` on filter change.

### 2.9 Gallery

- **Purpose.** Convey campus atmosphere and credibility through photography.
- **User journey.** Emotional/visual; users browse, enlarge images, get a feel for the physical institution.
- **UX goals.** Arch-framed thumbnail grid → lightbox on click with prev/next. Staggered reveal on scroll.
- **Mobile behavior.** 2-column masonry/grid; lightbox supports swipe; pinch-zoom optional. Thumbnails lazy-loaded and properly sized (avoid shipping full-res).
- **Accessibility.** Each image has descriptive `alt`. Lightbox: focus trap, `Esc` close, arrow-key navigation, `aria-label`ed controls, restores focus on close. Reduced-motion disables the stagger.

### 2.10 Downloads (Institutional Downloads)

- **Purpose.** Central repository for forms, prospectus, syllabi, results, notices (PDFs/docs).
- **User journey.** Goal-directed; users arrive to grab a specific document quickly.
- **UX goals.** Grid of download cards (icon, title, format/size, button). Group by category. Clear, scannable, no surprises.
- **Mobile behavior.** Single/two-column grid; full-width buttons. Files open/download with explicit `download` attribute where appropriate.
- **Accessibility.** Link text describes the document and format ("Admission Form — PDF, 320 KB"); never bare "Download". `rel="noopener"` for external. Icon is decorative (`aria-hidden`).

### 2.11 Activities (Recent Activities)

- **Purpose.** Demonstrate a living, active institution — events, news, announcements.
- **User journey.** Returning visitors check what's new; prospective families gauge vibrancy.
- **UX goals.** Article/event cards with image, title, date, excerpt → detail page (MDX-backed). Most-recent-first.
- **Mobile behavior.** Single-column feed; images lazy-loaded; dates and titles prioritized.
- **Accessibility.** Each card is an `<article>` with a heading and `<time datetime>`. "Read more" links have descriptive accessible names (not repeated "Read more").

### 2.12 Donate / Support Our Mission

- **Purpose.** Drive philanthropic support — a strategic conversion alongside admissions.
- **User journey.** Emotionally motivated; a concise appeal then a single strong action.
- **UX goals.** Full-width emerald band with ornamental corners, short mission copy, one bold "Donate Now" CTA. Visually distinct from the rest of the page to draw the eye.
- **Mobile behavior.** Centered stack; CTA full-width; ornament density reduced. CTA routes to a donation page/flow or external processor.
- **Accessibility.** High contrast gold/white on green (verify ≥ 4.5:1). CTA is a real link/button with clear destination. Decorative corners `aria-hidden`.

### 2.13 Financial Transparency

- **Purpose.** Build institutional trust by showing how funds are used (progress bars + summary figures).
- **User journey.** Donors and parents validate integrity before committing.
- **UX goals.** Labelled progress bars with percentages plus framed summary stats. Honest, legible, not gamified.
- **Mobile behavior.** Bars stack full-width; summary cards stack. Animate fill on scroll-in (reduced-motion → static fill).
- **Accessibility.** Progress bars use `role="progressbar"` with `aria-valuenow/min/max` and a visible text percentage (not color alone).

### 2.14 Footer

- **Purpose.** Closure, secondary navigation, contact, social, and legal.
- **User journey.** Fallback navigation and the place users look for phone/email/address and socials.
- **UX goals.** Multi-column: Links · Contact · Contact Info (phone, email) · social icons · calligraphic brand mark · copyright. Calm, ordered, on parchment.
- **Mobile behavior.** Columns collapse to stacked groups; tap-to-call (`tel:`) and `mailto:` links; social icons in a row.
- **Accessibility.** `<footer>` landmark; `nav aria-label="Footer"`; social icon links have `aria-label`; phone/email are actionable links; sufficient contrast on parchment.

---

## 3. Information Architecture

### 3.1 Sitemap

```
/[locale]
├── /                         Home
├── /about                    About Us
├── /departments              Departments (overview)
│   └── /departments/[slug]   Department detail (kitab, hifz, general)
├── /faculty                  Faculty (overview)
│   └── /faculty/[slug]       Faculty profile (optional, phase 5)
├── /admission                Admission (requirements, key dates, fees)
├── /publications             Publications / Featured Collections
│   └── /publications/[slug]  Publication detail (optional)
├── /gallery                  Gallery
├── /downloads                Downloads
├── /activities               Activities (news/events list)
│   └── /activities/[slug]    Activity / article detail (MDX)
├── /donate                   Donate / Support Our Mission
└── /contact                  Contact
```

All routes are nested under a `[locale]` segment (`/en`, `/bn`, `/ar`). The default locale (`en`) may be served at the root via middleware rewrite; `ar` renders RTL.

### 3.2 Per-page specification

| Page                  | URL                            | Content hierarchy (H1 → key blocks)                                                                                                        | SEO focus                                                      | Internal linking                                       |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------ |
| **Home**              | `/[locale]`                    | H1 mission → Stats → Departments → Faculty → Admission → Publications → Gallery → Activities → Downloads → Donate → Financial Transparency | Brand + primary keywords ("Islamic institute", city, programs) | Hub linking out to every major section page            |
| **About**             | `/[locale]/about`              | H1 About → history, vision/mission, leadership, affiliations                                                                               | "about", history, accreditation                                | → Admission, Faculty, Donate                           |
| **Departments**       | `/[locale]/departments`        | H1 → 3 department cards                                                                                                                    | Program keywords                                               | → each department detail, → Admission                  |
| **Department detail** | `/[locale]/departments/[slug]` | H1 dept name → overview, curriculum, syllabus download, faculty in dept                                                                    | Long-tail program queries                                      | → syllabus (Downloads), → related faculty, → Admission |
| **Faculty**           | `/[locale]/faculty`            | H1 → faculty grid                                                                                                                          | "scholars", "teachers", names                                  | → profiles, → departments                              |
| **Faculty profile**   | `/[locale]/faculty/[slug]`     | H1 name → bio, specialization, publications                                                                                                | Person name + Person schema                                    | → publications, → department                           |
| **Admission**         | `/[locale]/admission`          | H1 → tabs: Requirements, Key Dates, Fees → Apply CTA/form                                                                                  | "admission", "fees", "how to apply"                            | → Departments, → Downloads (forms), → Contact          |
| **Publications**      | `/[locale]/publications`       | H1 → filters → collection grid                                                                                                             | "publications", "research", "lectures"                         | → detail, → faculty authors                            |
| **Gallery**           | `/[locale]/gallery`            | H1 → image grid/lightbox                                                                                                                   | "campus", "photos"                                             | → About, → Admission                                   |
| **Downloads**         | `/[locale]/downloads`          | H1 → categorized download grid                                                                                                             | "prospectus", "form", "syllabus PDF"                           | ← linked from Admission, Departments                   |
| **Activities**        | `/[locale]/activities`         | H1 → article/event feed                                                                                                                    | News/event keywords, freshness                                 | → detail pages                                         |
| **Activity detail**   | `/[locale]/activities/[slug]`  | H1 title → date → body (MDX) → related                                                                                                     | Article schema, dated content                                  | → related activities, → home                           |
| **Donate**            | `/[locale]/donate`             | H1 → appeal → impact → CTA                                                                                                                 | "donate", "support", "sadaqah/waqf"                            | → Financial Transparency, → About                      |
| **Contact**           | `/[locale]/contact`            | H1 → form, map, address, hours                                                                                                             | Local SEO, NAP, LocalBusiness schema                           | → About, → Admission                                   |

### 3.3 SEO & linking principles

- **One `<h1>` per page**, descriptive and localized.
- **URLs** are lowercase, hyphenated, slug-based, locale-prefixed, and stable (slugs in content files are the canonical identifiers).
- **Breadcrumbs** on all detail pages (`departments/[slug]`, `activities/[slug]`) with `BreadcrumbList` structured data.
- **Hub-and-spoke linking:** Home is the hub; each section page is a spoke that cross-links to 2–3 contextually related pages (Departments ↔ Faculty ↔ Admission ↔ Downloads form a tight cluster).
- **hreflang** alternates emitted for `en`/`bn`/`ar` on every page (§9).
- **No orphan pages:** every published content item is reachable from at least one listing page in the nav graph.

---

## 4. Folder Structure

```
jamiatun_noor_al_islamia_fullstack/
├── public/
│   ├── images/                  # optimized static imagery (hero, sections)
│   ├── faculty/                 # faculty portraits
│   ├── departments/             # department imagery
│   ├── gallery/                 # gallery photos (responsive sources)
│   ├── downloads/               # PDFs, syllabi, forms, prospectus
│   ├── icons/                   # favicons, app icons, social icons
│   ├── logo.svg
│   ├── og/                      # generated/static Open Graph images
│   ├── robots.txt
│   └── site.webmanifest
│
├── messages/                    # i18n message catalogs
│   ├── en.json
│   ├── bn.json
│   └── ar.json
│
├── content/                     # long-form, editable content (MDX)
│   ├── activities/              # *.mdx — news/events (one file per item)
│   ├── publications/            # *.mdx — publication detail bodies
│   ├── departments/             # *.mdx — department long descriptions/curriculum
│   └── pages/                   # about.mdx etc. for prose-heavy static pages
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx                 # locale layout: html lang/dir, fonts, providers
│   │   │   ├── page.tsx                   # Home
│   │   │   ├── about/page.tsx
│   │   │   ├── departments/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── faculty/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── admission/page.tsx
│   │   │   ├── publications/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   ├── downloads/page.tsx
│   │   │   ├── activities/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── donate/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── api/
│   │   │   └── contact/route.ts           # form handler → email/webhook
│   │   ├── sitemap.ts                      # dynamic sitemap (all locales/routes)
│   │   ├── robots.ts                       # robots config
│   │   ├── manifest.ts                     # PWA/manifest
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   └── global-error.tsx
│   │
│   ├── components/
│   │   ├── ui/                  # Shadcn primitives (button, card, tabs, dialog, ...)
│   │   ├── layout/              # Navbar, Footer, MobileMenu, LocaleSwitcher, Container
│   │   ├── sections/            # Hero, Stats, Departments, Faculty, Admission, ...
│   │   └── shared/              # SectionHeader, CTAButton, AnimatedCounter, IslamicFrame, ...
│   │
│   ├── data/                    # structured, typed data (TS) — single source of truth
│   │   ├── faculty.ts
│   │   ├── departments.ts
│   │   ├── publications.ts
│   │   ├── downloads.ts
│   │   ├── stats.ts
│   │   ├── fees.ts
│   │   ├── navigation.ts
│   │   └── site.ts              # NAP, socials, global config
│   │
│   ├── lib/                     # framework/infra logic
│   │   ├── content.ts           # MDX/content loaders + zod validation
│   │   ├── i18n/                # next-intl config, routing, locales
│   │   ├── seo.ts               # metadata + JSON-LD builders
│   │   ├── mdx.ts               # MDX compile config, components map
│   │   └── utils.ts             # cn(), formatters, guards
│   │
│   ├── hooks/                   # useReducedMotion, useMediaQuery, useLockBodyScroll, useGsap
│   ├── animations/             # GSAP timelines, variants, easing/timing tokens
│   │   ├── gsap/                # scroll-trigger setups, hero timeline, counters
│   │   ├── variants.ts          # Framer Motion variants
│   │   └── tokens.ts            # durations, easings, stagger constants
│   │
│   ├── constants/               # enums, route maps, breakpoints, z-index scale
│   ├── styles/                  # globals.css, tailwind layers, fonts.css
│   ├── types/                   # shared TS types (Faculty, Department, Publication, ...)
│   └── utils/                   # pure helpers (date, currency, slug, classnames)
│
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── middleware.ts                # locale detection/routing (next-intl)
├── .eslintrc / eslint.config.mjs
├── .prettierrc
└── BLUEPRINT.md                 # this document
```

### 4.1 Directory responsibilities

- **`public/`** — Static, unprocessed assets served as-is (PDFs, favicons, manifest, robots) plus image source files. No JS/TS here.
- **`messages/`** — Per-locale UI string catalogs consumed by `next-intl`. Keys are namespaced by feature (`nav.*`, `hero.*`, `admission.*`).
- **`content/`** — Authored long-form content as MDX, one file per item. This is what changes most often and benefits from prose + embedded components. Localized via filename or front-matter (§5).
- **`src/app/`** — Routing, layouts, route handlers, and SEO route files. Pages are thin: they fetch typed content and compose section components. Nothing reusable lives here.
- **`src/components/ui/`** — Unstyled-to-tokenized Shadcn primitives. Generated, then themed to the design system. No business logic.
- **`src/components/layout/`** — App chrome present across pages (Navbar, Footer, MobileMenu, LocaleSwitcher, Container).
- **`src/components/sections/`** — Page-level composed blocks mapping 1:1 to the design sections (Hero, Stats, etc.). Mostly Server Components; delegate interactivity to shared/ui leaves.
- **`src/components/shared/`** — Cross-cutting reusable pieces (SectionHeader, CTAButton, AnimatedCounter, IslamicFrame, Lightbox). The design-system building blocks.
- **`src/data/`** — Typed, structured data that is _tabular/relational_ (faculty list, fee tables, nav). Imported directly into Server Components; validated by types and optionally Zod at module load.
- **`src/lib/`** — Infrastructure: content/MDX loading, i18n setup, SEO/JSON-LD builders, shared utilities with framework awareness.
- **`src/hooks/`** — Reusable client hooks; all are Client-Component-only concerns (media queries, reduced motion, scroll locking, GSAP context).
- **`src/animations/`** — Single home for motion: GSAP timelines/ScrollTrigger setups, Framer Motion variants, and the shared timing/easing tokens so motion stays consistent and tunable.
- **`src/constants/`** — Immutable app constants (breakpoints, z-index scale, route enums, locale list). Prevents magic values scattered across files.
- **`src/styles/`** — Global CSS, Tailwind layer extensions, font-face declarations.
- **`src/types/`** — Domain types shared across data, content, and components.
- **`src/utils/`** — Pure, framework-agnostic helpers (date/currency formatting, slugify). Unit-testable in isolation.

---

## 5. Content Strategy

No CMS, no database. Content lives in git as **typed code** and **MDX**, validated at build time. The rule of thumb:

- **Structured / tabular / relational data → TypeScript modules in `src/data/`.** (Faculty list, fee tables, downloads index, stats, navigation.) Type-safe, importable, refactor-friendly.
- **Long-form prose with formatting → MDX in `content/`.** (Activity articles, department curricula, About page, publication write-ups.) Authors get rich text + the ability to drop in components.
- **UI strings & micro-copy → JSON catalogs in `messages/`** per locale, consumed by `next-intl`.

### 5.1 Trilingual content model (EN / BN / AR)

Two complementary mechanisms:

1. **UI chrome & short labels** (nav, buttons, section headers, form labels) live in `messages/{en,bn,ar}.json`. Keys are stable; translations swap by locale.
2. **Entity content** (a faculty member's bio, a department description) carries localized fields _inside_ the data/content object, keyed by locale:

```ts
// shape illustration — not implementation
type Localized<T> = Record<'en' | 'bn' | 'ar', T>;

interface Faculty {
  slug: string; // locale-independent identifier
  name: Localized<string>;
  title: Localized<string>;
  bio: Localized<string>;
  specialization: Localized<string[]>;
  photo: string; // /public path; same image across locales
  order: number;
}
```

For MDX, localize by **filename suffix** (`my-event.en.mdx`, `my-event.bn.mdx`, `my-event.ar.mdx`) sharing a slug, OR a per-locale subfolder (`content/activities/en/...`). Filename suffix is recommended — it keeps translations of one item adjacent and makes missing translations obvious. The loader falls back to `en` when a locale file is absent and flags the gap in dev.

**RTL:** Arabic content sets `dir="rtl"` at the `<html>` level (driven by locale in the `[locale]/layout`). All spacing uses CSS **logical properties** (`ms-*`/`me-*`, `ps-*`/`pe-*`, `start`/`end`) so layouts mirror automatically. Arabic prose uses a dedicated typeface and larger line-height (§7.2).

### 5.2 Faculty (`src/data/faculty.ts`)

A typed array of `Faculty` objects (shape above). New scholar = append an object + drop the portrait into `public/faculty/`. The Faculty section and profile pages derive entirely from this array; `generateStaticParams` builds a page per `slug`. Sorting via `order`.

### 5.3 Departments (`src/data/departments.ts` + `content/departments/*.mdx`)

Structured metadata (slug, title, short description, hero image, syllabus download ref, faculty slugs) lives in `departments.ts`; the long curriculum/prose lives in `content/departments/{slug}.{locale}.mdx`. Detail pages merge both. Adding a department = one data entry + one MDX file per locale + imagery.

### 5.4 Downloads (`src/data/downloads.ts`)

Each entry: `{ slug, title (Localized), category, file (/public/downloads path), format, sizeBytes, updatedAt }`. The Downloads page groups by `category` and renders size/format from the data (size can also be derived at build time via a small script reading the file stats — preferred, to avoid stale numbers). Adding a file = drop PDF in `public/downloads/` + add one entry.

### 5.5 Publications (`src/data/publications.ts` + optional MDX)

Each entry carries `type` (`collection | paper | audio | review`) which drives the card variant and the filter chips. Audio entries include an `audioSrc`; papers/collections include `coverImage` and optional `downloadRef`. Optional long write-ups go in `content/publications/`. Filtering is client-side over the static list.

### 5.6 Activities (`content/activities/*.mdx`)

Pure MDX with front-matter (`title`, `date`, `excerpt`, `coverImage`, `locale`). The list page reads front-matter from all files, sorts by `date` desc, and paginates if needed; detail pages render the MDX body. This is the most frequently updated content — MDX keeps it author-friendly. `<time datetime>` from front-matter dates.

### 5.7 Forms (Admission enquiry, Contact)

No DB. Forms are Client Components using **React Hook Form + Zod** for validation. On submit, they POST to `app/api/contact/route.ts` (or a Server Action) which:

1. Re-validates with the same Zod schema (never trust the client).
2. Forwards via **Resend** (transactional email to the institution) and/or appends to a Google Sheet / webhook (n8n) for a lightweight lead record.
3. Implements basic anti-spam: honeypot field + rate limiting (Vercel KV or in-memory per-IP) + optional Turnstile/hCaptcha.

This honors "no backend" (no persistent DB you operate) while still capturing leads reliably. _Provider (Resend vs. Formspree vs. n8n webhook) to be confirmed before Phase 5._

### 5.8 Maintainability summary

| Content type                | Lives in                                            | Add/edit by         | Locale handling               |
| --------------------------- | --------------------------------------------------- | ------------------- | ----------------------------- |
| UI strings                  | `messages/*.json`                                   | edit JSON           | one file per locale           |
| Faculty                     | `data/faculty.ts`                                   | append typed object | `Localized<T>` fields         |
| Departments                 | `data/departments.ts` + `content/departments/*.mdx` | data entry + MDX    | localized fields + MDX suffix |
| Downloads                   | `data/downloads.ts` + `public/downloads/`           | add file + entry    | localized title               |
| Publications                | `data/publications.ts` (+ MDX)                      | append typed object | `Localized<T>` fields         |
| Activities                  | `content/activities/*.mdx`                          | add MDX file        | filename suffix per locale    |
| Gallery                     | `data/gallery.ts` + `public/gallery/`               | add image + entry   | localized alt/caption         |
| Global (NAP, socials, fees) | `data/site.ts`, `data/fees.ts`                      | edit typed module   | localized labels              |

> **Future-proofing:** because all reads go through `lib/content.ts` loaders returning typed objects, swapping the source to a headless CMS (Sanity, Contentlayer, Payload) later means rewriting only the loaders — components never change.

---

## 6. Component Architecture

```
components/
├── ui/                    # Shadcn primitives, themed to design tokens
│   ├── button.tsx  card.tsx  tabs.tsx  dialog.tsx  accordion.tsx
│   ├── table.tsx   badge.tsx input.tsx textarea.tsx  form.tsx
│   └── sheet.tsx (mobile drawer)  carousel.tsx  progress.tsx  skeleton.tsx
│
├── layout/
│   ├── Navbar
│   ├── Footer
│   ├── MobileMenu
│   ├── LocaleSwitcher
│   └── Container
│
├── sections/
│   ├── HeroSection
│   ├── StatsSection
│   ├── DepartmentsSection
│   ├── FacultySection
│   ├── AdmissionSection
│   ├── FeeStructure
│   ├── PublicationsSection
│   ├── GallerySection
│   ├── DownloadsSection
│   ├── ActivitiesSection
│   ├── DonateSection
│   └── FinancialTransparency
│
└── shared/
    ├── SectionHeader
    ├── CTAButton
    ├── AnimatedCounter
    ├── IslamicFrame
    ├── ArchCard
    ├── FacultyCard
    ├── DownloadCard
    ├── PublicationCard
    ├── ActivityCard
    ├── Lightbox
    ├── ProgressBar
    ├── Reveal            # scroll-reveal wrapper (Framer/GSAP)
    └── LocalizedDate
```

### 6.1 Component contracts

| Component            | Purpose                          | Key props (illustrative)       | Server/Client                                | Reusability                  | Mobile considerations                       |
| -------------------- | -------------------------------- | ------------------------------ | -------------------------------------------- | ---------------------------- | ------------------------------------------- |
| **Navbar**           | Primary nav + CTAs + locale      | `locale`                       | Server shell, client for sticky/scroll state | App-wide                     | Collapses to `MobileMenu` < `lg`            |
| **MobileMenu**       | Slide-in drawer nav              | `items, open, onClose, locale` | Client                                       | App-wide                     | Focus trap, body-scroll lock, ≥44px targets |
| **LocaleSwitcher**   | EN/BN/AR switch preserving path  | `current, locales`             | Client                                       | App-wide                     | In drawer on mobile; flips for RTL          |
| **Footer**           | Links, contact, social, legal    | `locale`                       | Server                                       | App-wide                     | Columns → stacked groups; `tel:`/`mailto:`  |
| **Container**        | Max-width + responsive gutters   | `as, size, children`           | Server                                       | Everywhere                   | Single source for horizontal rhythm         |
| **SectionHeader**    | Consistent section title/eyebrow | `title, eyebrow?, align?, as?` | Server                                       | Every section                | Center on mobile, scale type down           |
| **CTAButton**        | Branded primary/secondary action | `variant, href/onClick, size`  | Server (or client if action)                 | High                         | Full-width variant on mobile                |
| **AnimatedCounter**  | Count-up stat                    | `value, suffix, label`         | Client                                       | Stats, Financial             | Animate once; reduced-motion → static       |
| **IslamicFrame**     | Reusable gold ornamental border  | `variant, children`            | Server                                       | High (cards, tables, donate) | Simplify ornament density < `md`            |
| **ArchCard**         | Mihrab-arch image card           | `image, title, body, action`   | Server                                       | Departments, gallery         | Arch via CSS mask; full-width stack         |
| **FacultyCard**      | Portrait + name + title          | `faculty, locale`              | Server (modal trigger client)                | Faculty                      | Lazy image; carousel item on mobile         |
| **DownloadCard**     | File entry                       | `download, locale`             | Server                                       | Downloads, dept syllabi      | Full-width button; format/size text         |
| **PublicationCard**  | Media-aware publication          | `publication, locale`          | Server (audio = client)                      | Publications                 | Variant by `type`; compact audio player     |
| **ActivityCard**     | News/event teaser                | `activity, locale`             | Server                                       | Activities, home             | Single-column; lazy cover                   |
| **Lightbox**         | Gallery image viewer             | `images, index, onClose`       | Client                                       | Gallery                      | Swipe, `Esc`, arrow keys, focus trap        |
| **FeeStructure**     | Fee comparison table             | `fees, locale`                 | Server                                       | Admission                    | Table → stacked cards < `md`                |
| **ProgressBar**      | Transparency metric              | `value, label`                 | Client (animate)                             | Financial                    | `role="progressbar"`; animate fill on view  |
| **Reveal**           | Scroll-reveal wrapper            | `as, delay, variant`           | Client                                       | Everywhere                   | Disabled under reduced-motion               |
| **LocalizedDate**    | Locale/calendar-aware date       | `date, locale`                 | Server                                       | Activities, admission        | `<time datetime>`; Intl formatting          |
| **Tabs (Admission)** | Requirements/Dates/Fees          | `tabs`                         | Client                                       | Admission                    | → Accordion or scroll-strip on mobile       |

### 6.2 Composition rules

- **Pages** (in `app/`) are thin orchestrators: load typed content, pass to **sections**.
- **Sections** own layout and compose **shared** + **ui** pieces; they default to Server Components.
- **Client boundaries** are pushed to the smallest possible leaf (`AnimatedCounter`, `Lightbox`, `MobileMenu`, form fields) — a section stays server-rendered while a single interactive child is `"use client"`.
- **`IslamicFrame` / `ArchCard`** centralize the ornamental identity so the "Islamic premium" look is consistent and tunable from one place, not re-implemented per section.
- Every list-driven component (`FacultyCard`, `DownloadCard`, etc.) is **data-shape-driven** so adding content never requires touching the component.

---

## 7. Design System

Extracted from the `/design` assets. The palette is ivory parchment + deep emerald + gold, with serif display type and Islamic ornamentation. Tokens are defined once in `tailwind.config.ts` (and CSS variables for theme-ability) and consumed everywhere — no raw hex in components.

### 7.1 Colors

Sampled directly from the design files.

| Token                                 | Hex              | Usage                                                |
| ------------------------------------- | ---------------- | ---------------------------------------------------- |
| `--bg-parchment` (background)         | `#FCF9EA`        | Page canvas, light sections                          |
| `--bg-parchment-deep`                 | `#FAF5E2`        | Alternating section bands, subtle depth              |
| `--primary` (emerald)                 | `#0F5A34`        | Brand green: donate band, buttons, headings on light |
| `--primary-dark`                      | `#073E27`        | Hover/active, gradients, deep accents                |
| `--primary-darkest`                   | `#043724`        | Footer-on-green, deepest shade                       |
| `--accent-gold`                       | `#C9A227`        | Ornamental frames, stat badges, dividers             |
| `--accent-gold-soft`                  | `#D8B65A`        | Gradient highlight on gold, hover sheen              |
| `--text-primary`                      | `#1C2B22`        | Body text on parchment (near-black green-tint)       |
| `--text-muted`                        | `#5A6B5F`        | Secondary text, captions                             |
| `--text-on-dark`                      | `#F5F3E6`        | Text on emerald surfaces                             |
| `--border-subtle`                     | `#E7E0C8`        | Hairlines, card borders on parchment                 |
| `--success` / `--error` / `--warning` | std semantic set | Form validation states                               |

Rules: gold is **accent only** (never large fills of pure gold text on parchment — fails contrast). Body text uses `--text-primary` on parchment (passes AAA). On emerald, use `--text-on-dark` and gold for emphasis (verify ≥ 4.5:1 — `#C9A227` on `#0F5A34` is borderline; reserve gold-on-green for large/bold text or decoration, use `--accent-gold-soft`/white for body).

### 7.2 Typography

The design uses a classical serif for display ("Classical Source Serif" per footer credit). Recommended, license-friendly stacks:

- **Display / Headings (Latin):** `Cormorant Garamond` or `Playfair Display` (elegant, high-contrast serif matching the references). Fallback: `Georgia, serif`.
- **Body (Latin):** `Source Serif 4` or `Lora` for readability; or pair with a humanist sans (`Inter`) for UI/labels if a serif-everywhere feel reads too heavy on data tables.
- **Bangla:** `Noto Serif Bengali` (display + body) — matches the serif tone and has full glyph coverage.
- **Arabic:** `Amiri` or `Noto Naskh Arabic` (traditional, scholarly, excellent for Qur'anic/Islamic context) for both display and body; larger line-height.

All loaded via `next/font` (self-hosted, `display: swap`, subset per locale, preloaded for the active locale only).

**Type scale** (fluid via `clamp()`, 1.250 major-third on desktop):

| Token     | Desktop                | Mobile | Use               |
| --------- | ---------------------- | ------ | ----------------- |
| `display` | 60px                   | 40px   | Hero H1           |
| `h1`      | 48px                   | 32px   | Page titles       |
| `h2`      | 36px                   | 28px   | Section titles    |
| `h3`      | 28px                   | 22px   | Card/sub headings |
| `h4`      | 22px                   | 18px   | Minor headings    |
| `body-lg` | 18px                   | 17px   | Lead paragraphs   |
| `body`    | 16px                   | 16px   | Default text      |
| `small`   | 14px                   | 14px   | Captions, meta    |
| `eyebrow` | 13px tracked/uppercase | 12px   | Section eyebrows  |

Line-height: 1.15 headings, 1.6 body (1.8 for Arabic). Arabic/Bangla scale +1–2px on body for legibility.

### 7.3 Spacing system

8px base scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Section vertical padding: `96px` desktop / `56px` mobile. Container max-width `1200px` with `24px` (mobile) → `40px` (desktop) logical inline gutters. Grid gaps `24–32px`. All spacing uses **logical properties** for RTL safety.

### 7.4 Border radius

| Token         | Value       | Use                                                                      |
| ------------- | ----------- | ------------------------------------------------------------------------ |
| `radius-sm`   | 6px         | Inputs, badges, chips                                                    |
| `radius-md`   | 12px        | Buttons, small cards                                                     |
| `radius-lg`   | 20px        | Cards, panels                                                            |
| `radius-xl`   | 32px        | Feature panels                                                           |
| `radius-arch` | custom mask | Mihrab arch (top rounded → pointed) via SVG/clip-path, not border-radius |

### 7.5 Shadows & elevation

Soft, warm shadows (tinted toward the parchment/green, never pure black/gray):

- `shadow-sm`: `0 1px 2px rgba(28,43,34,.06)` — hairline lift.
- `shadow-md`: `0 6px 16px rgba(28,43,34,.10)` — cards.
- `shadow-lg`: `0 16px 40px rgba(28,43,34,.14)` — modals, hover-raised cards.
- `shadow-gold`: `0 0 0 1px #C9A227, 0 4px 18px rgba(201,162,39,.18)` — emphasized ornamental frames.

### 7.6 Component tokens

- **Buttons.** `primary` = emerald fill, parchment text, gold focus ring; hover → `--primary-dark` + slight lift (translateY -1px, `shadow-md`). `secondary` = emerald outline on parchment, fill on hover. `donate` = gold-accented emphasis variant. Sizes: sm (36px), md (44px), lg (52px). Radius `md`. Full-width on mobile. Always a real `<a>`/`<button>` with visible focus ring (gold, 2px offset).
- **Cards.** Parchment surface, `border-subtle` hairline, `radius-lg`, `shadow-md`; hover → `shadow-lg` + 2–4px rise (Framer). Optional `IslamicFrame` gold border for featured cards. Equal-height in grids.
- **Badges/Chips.** `radius-sm`, small caps, emerald or gold text on tinted bg; filter chips use `aria-pressed` active state (emerald fill).
- **Tables (fees/transparency).** Header row emerald-tinted, gold top/bottom rule, zebra parchment rows, bold total row. Responsive → stacked cards < `md`. Semantic `<table>`.
- **Navigation.** Transparent over hero → parchment with `shadow-sm` + slight blur on scroll. Active link = gold underline/indicator. 44px hit areas.
- **Forms.** `radius-sm` inputs, `border-subtle` → emerald focus ring; inline Zod error text in `--error` with icon; labels always visible (no placeholder-only); RTL-aware alignment.

### 7.7 Iconography & ornament

- UI icons: `lucide-react` (consistent, tree-shakeable), stroke 1.5–2.
- Ornaments (arches, rosettes, corner flourishes, dividers): SVG components in `shared/` (`IslamicFrame`, `ArchCard`, `Divider`) — vector, theme-colored via `currentColor`/tokens, `aria-hidden`. Never raster where vector works.
- Logo: provided `logo.svg`, given accessible name; constrained max height in nav (~40px) and footer.

---

## 8. Animation System

Motion is choreographed and restrained — it signals craft and guides attention, never decorates for its own sake. Two libraries with **clear, non-overlapping ownership**.

### 8.1 Ownership boundaries

| Library                  | Owns                                                                                                                                                                | Why                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **GSAP + ScrollTrigger** | Hero entrance timeline, scroll-triggered section reveals, statistics count-up, gallery staggered reveals, decorative pattern/ornament animation, progress-bar fills | Best-in-class timeline control, scroll orchestration, performance on complex sequences  |
| **Framer Motion**        | Hover/tap micro-interactions, nav & mobile-drawer transitions, card lift/hover, modal/lightbox enter-exit, page/route transitions, filter/tab content swaps         | Declarative, React-state-driven, `AnimatePresence` for mount/unmount, layout animations |

Rule: if it's **scroll- or timeline-driven**, GSAP; if it's **component-state- or presence-driven**, Framer. Never animate the same property on the same element with both.

### 8.2 Timing system (`animations/tokens.ts`)

| Token       | Duration   | Use                            |
| ----------- | ---------- | ------------------------------ |
| `instant`   | 100ms      | Tap feedback, focus rings      |
| `fast`      | 200ms      | Hovers, small UI               |
| `base`      | 350ms      | Card reveals, fades            |
| `slow`      | 600ms      | Section reveals, hero elements |
| `cinematic` | 900–1200ms | Hero master timeline only      |
| `stagger`   | 80–120ms   | Per-item delay in grids/lists  |

### 8.3 Easing system

- `ease-standard` → `cubic-bezier(0.4, 0, 0.2, 1)` — default UI.
- `ease-entrance` → `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) — reveals/entrances (premium, decelerating).
- `ease-emphasis` → `cubic-bezier(0.34, 1.56, 0.64, 1)` — subtle overshoot for stat badges/CTAs (use sparingly).
- GSAP equivalents: `power3.out` (entrance), `power2.inOut` (movement), `back.out(1.4)` (emphasis).

### 8.4 Signature choreography

- **Hero (GSAP timeline):** background pattern fades/scales in (subtle) → headline words/lines reveal with mask + y-translate (stagger) → subtext fade-up → buttons fade-up. Total ≤ 1.2s, runs once on load.
- **Section reveals (ScrollTrigger):** elements start `opacity:0, y:24`, animate to visible when ~20% in view, once. Children stagger.
- **Stats (GSAP):** count-up from 0 → value on enter, with badge `back.out` pop; numbers ease with `power1.out`. Once per session.
- **Gallery (GSAP stagger):** thumbnails reveal in a masonry stagger; lightbox open/close handled by Framer `AnimatePresence`.
- **Cards (Framer):** `whileHover` lift (-4px) + shadow grow; `whileTap` scale 0.98.
- **Nav/drawer (Framer):** drawer slides from inline-end with spring; backdrop fades; respects RTL direction.
- **Page transitions (Framer):** subtle cross-fade + 8px rise on route change via `template.tsx`; kept short (≤ 300ms) to not delay perceived navigation.

### 8.5 Performance rules

- Animate **only `transform` and `opacity`** (GPU-composited). Never animate `width/height/top/left/margin` (layout thrash).
- Use `will-change` sparingly and remove after animation; clean up GSAP with `gsap.context()` + `ctx.revert()` in `useEffect` cleanup to avoid leaks on unmount/route change.
- ScrollTrigger instances killed on unmount; use `once: true` for reveals to avoid re-running.
- No animation blocks LCP: hero text is server-rendered and visible; animation enhances, never gates content (no `opacity:0` on critical content without a fast/immediate reveal, and disabled under reduced-motion).
- Lazy-init heavy GSAP/ScrollTrigger only on the client via dynamic import; nothing motion-related runs on the server.
- Target sustained 60fps; budget total JS for motion libs and code-split Framer/GSAP so they don't bloat the initial bundle on pages that don't need them.

### 8.6 Reduced-motion accessibility

- A single `useReducedMotion()` hook (wrapping `prefers-reduced-motion`) gates all motion. When set:
  - GSAP timelines jump to end-state instantly (content fully visible, counters show final value immediately).
  - Framer variants collapse to opacity-only or no transition.
  - Page transitions disabled; gallery stagger disabled.
- This is enforced centrally in the `Reveal` wrapper and `AnimatedCounter`, so no section can accidentally ignore it.
- Also honor reduced data / low-end: avoid autoplaying anything; no parallax that induces motion sickness.

---

## 9. SEO Strategy

Targets: SEO ≥ 95, fully crawlable static HTML, rich results eligible, trilingual discoverability.

### 9.1 Metadata strategy

- Use the **Next.js Metadata API** (`generateMetadata`) per route, locale-aware, sourced from a `lib/seo.ts` builder so titles/descriptions are consistent.
- Title template: `%s · Jamiatun Noor Al Islamia`; home uses a full branded title with primary keywords.
- Unique `description` per page (≤ 160 chars), localized.
- `metadataBase` set; canonical URLs per page; `alternates.languages` for `en`/`bn`/`ar` (hreflang) + `x-default`.
- Keyword themes per page defined in §3.2.

### 9.2 Open Graph & social

- OG + Twitter card tags on every page (localized title/description).
- OG images: a branded static default (logo + emerald/gold) plus optional per-section images; can be generated at build with `next/og` (`ImageResponse`) for dynamic pages (activities, departments). 1200×630.
- `og:locale` + `og:locale:alternate` for each language.

### 9.3 Structured data (JSON-LD via `lib/seo.ts`)

- **Organization / EducationalOrganization** (sitewide, in root layout): name, logo, url, address (NAP from `data/site.ts`), sameAs (socials), contactPoint.
- **WebSite** + `SearchAction` (if a search is added later).
- **BreadcrumbList** on all detail pages.
- **Course / EducationalOccupationalProgram** on department pages.
- **Person** on faculty profiles.
- **Article / NewsArticle** on activity detail pages (with `datePublished`).
- **CreativeWork / Book** on publications where applicable.
- **LocalBusiness/Place** on Contact (with geo + openingHours) for local SEO.

### 9.4 Sitemap & robots

- `app/sitemap.ts` generates entries for **every route × every locale** with `lastModified` (from content front-matter/file stats), `alternates`, and sensible `changeFrequency`/`priority`.
- `app/robots.ts` allows all, points to sitemap, disallows `/api/`.
- Submit sitemap to Google Search Console; verify all three locales.

### 9.5 Semantic HTML & accessibility (target ≥ 95)

- One `<h1>` per page; logical, unskipped heading order.
- Landmarks: `<header> <nav> <main> <footer>`, `<article>`, `<section aria-labelledby>`.
- All interactive elements keyboard-operable, visible focus (gold ring), ≥ 44px targets.
- Color contrast verified (§7.1 caveats on gold); never color-only meaning.
- `alt` text on all meaningful images; decorative ornaments `aria-hidden`.
- Forms: associated `<label>`s, `aria-describedby` for errors, `aria-invalid`, fieldset/legend where grouped.
- `lang` and `dir` set correctly per locale at `<html>`; per-element `lang` when mixing scripts.
- ARIA patterns for tabs (Admission), dialog (lightbox/modal), disclosure (mobile menu/accordion).
- Respect `prefers-reduced-motion` (§8.6).
- Skip-to-content link as first focusable element.

---

## 10. Performance Strategy

Targets: Lighthouse Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Core Web Vitals: LCP < 2.0s, CLS < 0.05, INP < 200ms.

### 10.1 Images

- `next/image` everywhere; local imports give Next the intrinsic dimensions → **zero CLS** (reserved space).
- Serve **AVIF then WebP**; quality ~70–78 for photos.
- Correct `sizes` per layout (e.g., gallery thumbs `(max-width:768px) 50vw, 25vw`).
- Hero image: `priority` + preload; everything below the fold `loading="lazy"`.
- Pre-optimize source assets (the design folder has multi-MB PNGs — convert/compress to right-sized AVIF/WebP before commit; a build script can enforce max dimensions).
- Gallery uses responsive `srcset`; never ship full-res to thumbnails.

### 10.2 Fonts

- `next/font` self-hosting (no render-blocking Google requests); `display: swap`.
- **Subset per locale** and preload only the active locale's primary font; lazy/secondary for the rest (avoid loading Arabic + Bangla + Latin all at once).
- Limit weights to those used (e.g., 400/600/700). Use `font-feature-settings` for ligatures where the serif benefits.
- Reserve metrics with `size-adjust`/fallback metrics to prevent layout shift on swap.

### 10.3 Routes & rendering

- All content routes **statically generated** (`generateStaticParams` + SSG); no per-request work.
- Cache-Control via Vercel CDN; static assets immutable-hashed.
- `app/` segment layouts keep shared chrome cached; only changing segments re-render.

### 10.4 Lazy loading & dynamic imports

- Client-only heavy components (`Lightbox`, GSAP setups, audio player, map on Contact) loaded with `next/dynamic` (`ssr: false` where they're purely interactive) and only on routes that use them.
- Framer Motion and GSAP code-split per route so content-only pages don't pay for motion JS.
- Below-the-fold sections can be dynamically imported/deferred where they carry client JS.

### 10.5 Bundle size control

- RSC by default → minimal client JS; client islands kept tiny.
- Tree-shakeable imports (named `lucide-react` icons, no barrel re-export bloat).
- Audit with `@next/bundle-analyzer`; budget: initial route JS < ~120KB gzip.
- Avoid large client libs; prefer CSS/Tailwind for effects over JS where possible.
- No moment.js/lodash full imports; use `Intl` and native methods.

### 10.6 Animation performance

- Transform/opacity only; GPU-composited; cleanup contexts (§8.5).
- `once: true` reveals; throttle/`requestAnimationFrame` for any scroll math (ScrollTrigger handles this).
- Reduced-motion path skips animation work entirely.

### 10.7 Verification

- CI runs **Lighthouse CI** on key routes (home, departments, admission, gallery) with score thresholds gating merges.
- Track CWV in Vercel Analytics/Speed Insights post-deploy.
- Manual audits: axe DevTools (a11y), bundle analyzer (size), throttled mobile profiling.

---

## 11. Development Roadmap

Eight phases. Complexity is relative (S/M/L). Each phase ends in a working, deployable state.

### Phase 1 — Project Setup · _Complexity: S_

- **Deliverables:** Next.js 15 + TS + Tailwind init; ESLint/Prettier/Husky + lint-staged; `next-intl` middleware & `[locale]` routing skeleton with EN/BN/AR; folder scaffold (§4); Shadcn UI init; commit conventions; Vercel project + preview deploys; env management.
- **Dependencies:** none.
- **Exit:** empty trilingual app deploys to Vercel preview; CI runs lint + typecheck.

### Phase 2 — Design System · _Complexity: M_

- **Deliverables:** Tailwind theme tokens (colors, type scale, spacing, radius, shadows from §7); `next/font` setup for all three scripts; global styles + logical-property utilities for RTL; themed Shadcn primitives (button, card, tabs, dialog, table, input, sheet, accordion); `IslamicFrame`/`ArchCard`/`Divider` ornament components; Storybook-style demo page (optional).
- **Dependencies:** Phase 1.
- **Exit:** design-token playground renders all primitives in LTR + RTL.

### Phase 3 — Core Layout · _Complexity: M_

- **Deliverables:** `Navbar` (sticky/scroll states), `MobileMenu` (drawer, focus trap), `LocaleSwitcher`, `Footer`, `Container`, `SectionHeader`, `CTAButton`; root + `[locale]` layouts with `lang`/`dir`, fonts, providers; 404/error pages; navigation data + i18n catalogs for chrome.
- **Dependencies:** Phase 2.
- **Exit:** shell navigable across locales/RTL on mobile + desktop.

### Phase 4 — Homepage · _Complexity: L_

- **Deliverables:** all home sections (Hero, Stats, Departments, Faculty, Admission preview, Publications, Gallery preview, Activities, Downloads, Donate, Financial Transparency) composed from typed data/MDX; responsive + RTL; placeholder content wired to real `data/` + `content/` schemas (§5).
- **Dependencies:** Phase 3, content schemas.
- **Exit:** pixel-faithful, responsive homepage with real data shapes (pre-animation).

### Phase 5 — Secondary Pages · _Complexity: L_

- **Deliverables:** About, Departments + `[slug]`, Faculty (+ profile), Admission (tabs + fee table), Publications (+ filters), Gallery (+ lightbox), Downloads, Activities + `[slug]` (MDX), Donate, Contact; forms (RHF + Zod) + `api/contact` handler + email/webhook provider; `generateStaticParams` for all dynamic routes.
- **Dependencies:** Phase 4, form provider decision (§5.7).
- **Exit:** every route in §3 live, statically generated, trilingual.

### Phase 6 — Animations · _Complexity: M_

- **Deliverables:** animation tokens; GSAP hero timeline, ScrollTrigger reveals, stat counters, gallery stagger, progress fills; Framer hovers, drawer, lightbox, page transitions; `Reveal` + `useReducedMotion` enforcement; cleanup/code-splitting.
- **Dependencies:** Phases 4–5.
- **Exit:** choreographed motion at 60fps; reduced-motion fully honored.

### Phase 7 — SEO & Optimization · _Complexity: M_

- **Deliverables:** metadata builders, JSON-LD, `sitemap.ts`, `robots.ts`, OG images, hreflang; image pre-optimization pass; font subsetting; dynamic imports/bundle trimming; Lighthouse CI thresholds; axe pass.
- **Dependencies:** Phases 5–6.
- **Exit:** all four Lighthouse categories ≥ 95 on key routes in CI.

### Phase 8 — Deployment · _Complexity: S_

- **Deliverables:** production Vercel deploy; custom domain + SSL; analytics/Speed Insights; Search Console (all locales) + sitemap submission; security headers (CSP, HSTS, etc.); 301 redirects if migrating; final QA + content review; handover docs (how to add faculty/activities/downloads).
- **Dependencies:** Phase 7.
- **Exit:** live, monitored, documented, owner can self-serve content edits.

---

## 12. Coding Standards

### 12.1 TypeScript

- `strict: true`, `noUncheckedIndexedAccess`, `noImplicitOverride`. No `any` (use `unknown` + narrowing). No non-null `!` except provably safe.
- Domain types in `src/types/`; `interface` for object shapes, `type` for unions/utilities. Prefer `Localized<T>` for translatable fields.
- Validate all external/content data with **Zod** at the boundary (content loaders, form handlers); infer TS types from Zod schemas (`z.infer`) to keep one source of truth.
- No magic values — use `src/constants/`.

### 12.2 Next.js

- **Server Components by default**; add `"use client"` only at the smallest interactive leaf, with a one-line comment justifying it.
- Data loading in Server Components/loaders, never in client components.
- Use Metadata API (no manual `<head>`); `next/image` and `next/font` always; `next/link` for internal nav.
- Route handlers validate input server-side; never trust client data.
- Co-locate route-only UI in the route folder; promote to `components/` only when reused.

### 12.3 Component architecture

- One component per file; named export for components, default export only for route files where Next expects it. Props typed via an explicit `interface XProps`.
- Presentational vs. container separation; keep components < ~150 lines — extract when larger.
- No prop drilling beyond 2 levels — lift to a small context or pass composed children.
- All list components are data-shape-driven and locale-aware.

### 12.4 Naming conventions

- Components & types: `PascalCase`. Hooks: `useCamelCase`. Variables/functions: `camelCase`. Constants: `UPPER_SNAKE_CASE`. Files: components `PascalCase.tsx`, others `kebab-case.ts`. Folders: `kebab-case`.
- Booleans read as predicates (`isOpen`, `hasError`). Event handlers `handleX` / props `onX`.
- Slugs and content IDs are lowercase-kebab and locale-independent.

### 12.5 Folder conventions

- Follow §4 strictly. `data/` = structured TS, `content/` = MDX, `messages/` = i18n JSON, `animations/` = all motion, `lib/` = infra, `utils/` = pure helpers. No business logic in `app/` pages beyond orchestration.

### 12.6 Styling

- Tailwind utilities + design tokens only; no inline hex, no arbitrary values except rare one-offs. Use `cn()` for conditional classes. Logical properties (`ms/me/ps/pe`, `start/end`) — **never** `left/right` — for RTL safety. Shared variants via `cva` (class-variance-authority).

### 12.7 Git workflow & branches

- **Trunk-based with short-lived branches.** `main` = always deployable (Vercel production). `develop` optional; feature branches off `main`.
- Branch naming: `feat/…`, `fix/…`, `chore/…`, `docs/…`, `refactor/…`, `perf/…` (e.g., `feat/faculty-section`).
- PRs required to merge to `main`; CI (typecheck, lint, Lighthouse CI) must pass; 1 review; squash-merge. Vercel preview per PR for visual review.

### 12.8 Commit conventions

- **Conventional Commits:** `type(scope): subject` — `feat(hero): add GSAP reveal timeline`, `fix(a11y): trap focus in mobile menu`, `perf(images): convert gallery to AVIF`. Enabled by commitlint + Husky. Drives optional changelog.

### 12.9 Quality gates

- Prettier + ESLint (next/core-web-vitals, jsx-a11y, import-order) enforced via lint-staged pre-commit.
- Type errors and lint errors block merge. Unit-test pure utils (`utils/`) with Vitest; component smoke tests optional. Accessibility checked with axe in CI on representative routes.

---

## 13. Design Improvement Recommendations

The references are strong; these refinements raise it to top-tier agency quality:

1. **Stats as 2×2 on mobile, not 1×4.** The four star-rosettes cramped into one row shrink badly on phones — a 2×2 grid keeps them legible and balanced.
2. **Gold contrast guardrails.** Pure gold (`#C9A227`) text on parchment and on emerald is borderline for WCAG AA. Reserve gold for large/bold text, borders, and ornament; use emerald or `--accent-gold-soft`/white for body-size text on green. This protects the ≥95 accessibility target without changing the look.
3. **Fee table → stacked cards on mobile.** The fee comparison is decision-critical; a cramped horizontal table on phones hurts conversion. Stacked key/value cards read far better.
4. **Drop carousels for the hero; keep one strong static hero.** Carousels harm LCP and engagement. A single confident hero with choreographed reveal performs and converts better.
5. **Admission tabs → accordion on mobile.** Requirements/Key Dates/Fee Structure as tabs work on desktop; on mobile an accordion avoids horizontal cramping and is more thumb-friendly.
6. **Faculty profiles as real pages, not just modals.** Individual `/faculty/[slug]` pages add SEO surface (Person schema), shareable URLs, and depth — high ROI for an institution selling on scholarly authority.
7. **Add an explicit "Financial Transparency" → "Donate" link path.** Donors validate integrity before giving; make transparency a visible step in the donation journey (cross-link both ways).
8. **Trilingual typography pairing.** Don't force one serif across all scripts. Pair a Latin display serif with `Noto Serif Bengali` and `Amiri`/`Noto Naskh Arabic`, with per-script line-height tuning, so each language looks native and premium.
9. **Honest, labeled progress bars.** Keep Financial Transparency bars literal and labeled (percent + value in text), never gamified — trust is the whole point of that section.
10. **Pre-optimize the heavy source images.** The design assets are multi-MB PNGs; convert to right-sized AVIF/WebP before commit to hit LCP targets. Enforce with a build step.
11. **Consider a subtle "section divider" ornament** (gold rosette/line motif) between major bands to reinforce the Islamic-heritage identity and improve scannability — already implied by `borderline_image.png`; systematize it as a `Divider` component.
12. **Add a sticky mobile action bar** (Apply / Donate) on key pages — improves conversion on the two strategic actions without cluttering the header.

---

_End of blueprint. No implementation code has been written. Recommended next step: approve §13 changes and the form provider (§5.7), then begin Phase 1._
