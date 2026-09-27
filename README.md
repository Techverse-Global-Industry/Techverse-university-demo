# Aurelia International University — Premium 3D React Website

A production-oriented **React + TypeScript + Three.js / React Three Fiber + GSAP** university website implementation based on the supplied phased specification. Aurelia is intentionally fictional so the site can contain realistic information architecture and workflows without impersonating a real institution.

## Run locally

```bash
npm install
npm run dev
```

For a production bundle:

```bash
npm run build
npm run preview
```

## What is implemented

- React/TypeScript application shell with React Router, reusable bilingual content system, global design tokens, cards, buttons, modals, forms, loading fallbacks, 404 and empty/error states.
- Reusable React Three Fiber scenes for hero, research network, interactive globe, campus and timeline visuals. Scene complexity and DPR reduce on mobile/tablet, and motion is reduced when `prefers-reduced-motion` is enabled.
- GSAP + ScrollTrigger reveal, hero parallax, graduation scroll treatment and career-ascent sequence.
- EN/FR language switch stored locally without reloading the page.
- Complete route families for academics, seven faculties, program discovery/detail pages, admissions, scholarships, application workflow, research centers/researchers/publications, campus life, international students, news, events, alumni, directory, about, leadership and contact.
- Program search with faculty, degree, duration and study-mode filters.
- Directory filters for faculty, department, position and research area.
- Searchable publications, news categories/search and event categories/search.
- Validated multi-step admissions prototype with an explicit **front-end only** success state; it never pretends to submit to a real university backend.
- Local event registration, alumni-registration and contact-form flows with explicit demo-only success states.
- Dynamic page titles/descriptions, Open Graph title/description updates, semantic page structure, `robots.txt`, `sitemap.xml` and basic university structured data.
- Native responsive CSS for phone/tablet/desktop, accessible focus states, keyboard-friendly native controls and reduced-motion support.
- Native `IntersectionObserver` proximity hints, lazy code-split 3D bundle, responsive WebGL quality, native image sizing, and React Three Fiber lifecycle cleanup conventions.

## Visual assets

The hero and graduation treatments use the exact Unsplash references supplied in the brief. The supplied Magnific career video page did not expose a stable direct video stream in the build environment; rather than ship a broken `<video>`, the site uses a cinematic animated career-ascent section and links the supplied clip as its visual reference.

## Important demo boundaries

Aurelia is fictional. Email addresses use the reserved `.example` domain, application/event/contact submissions stay in the browser, accreditation content explicitly avoids claiming real accreditation, and international visa guidance tells users to check current official rules.

## Key source files

- `src/App.tsx` — routes, pages, forms, search/filter workflows, GSAP behavior, SEO updates.
- `src/ThreeStage.tsx` — reusable R3F 3D scene system.
- `src/content.ts` — realistic bilingual university data.
- `src/i18n.tsx` — zero-reload EN/FR state.
- `src/styles.css` — responsive cinematic design system and accessibility behavior.
- `TEST_REPORT.md` — static audits completed in the build sandbox and the remaining runtime QA step.
