# Portfolio — Ekomobong Iwatt

Personal portfolio of **Ekomobong Iwatt**, Computer Engineering student at the
University of Lagos (software + embedded). A dark, editorial "professional
vibecoder" site.

**Live:** https://ekomiwatt.github.io/Portfolio-Website/

## Stack

- **Astro 5** (static output) — zero-JS baseline; islands hydrate only where needed
- **Tailwind v4** — CSS-first via `@theme` in `src/styles/global.css` (no `tailwind.config.js`)
- **React 19** islands (`@astrojs/react`), hydrated `client:visible`
- **@astrojs/sitemap**
- Self-hosted fonts via **Fontsource** (Geist, Geist Mono, Fraunces)
- Optimized images via **astro:assets**
- Contact via **Formspree** (no client-side keys)

## Local development

Requires Node 18+.

```bash
npm install
npm run dev      # dev server (served under /Portfolio-Website)
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

## The original site (v1)

The first hand-built version of this site (HTML, CSS, vanilla JS, Tailwind) is
preserved verbatim and ships alongside the new build at:

**https://ekomiwatt.github.io/Portfolio-Website/v1/**

Its source lives in `public/v1/`. The story of building it is in the
[Hello, World blog post](https://ekomiwatt.github.io/Portfolio-Website/blog/hello-world).

## Deploy

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) — builds on the
rebrand branch, deploys from `main`. Internal links/assets respect the
`/Portfolio-Website` base path.
