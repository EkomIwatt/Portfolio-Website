# CLAUDE.md — Project Constitution

Portfolio of **Ekomobong Iwatt** — Computer Engineering student @ University of Lagos
(software + embedded). This repo is being rebranded from a light, hand-written static
site into a **dark "professional vibecoder"** site built with Astro.

**This file is law.** It overrides default behavior. When in doubt, follow it. The live,
detailed plan is at `~/.claude/plans/unified-wandering-lantern.md`; visual reference is
`.claude/inspiration/` (wibify.md spec + screenshots + candidate components).

---

## 1. Positioning & voice
- **Proud, professional "vibecoder."** AI-accelerated building is framed as a real edge
  (velocity + judgment), named openly in copy — never as a disclaimer or apology.
- Audience is **recruiters / hiring**. CTA is role-oriented ("Let's talk" = hire me).
  Keep the résumé/CV prominent. Frame the Unilag/CompEng identity as *fresh perspective + speed*.
- North-star aesthetic reference: **wibify.agency** — borrow *structure & rhythm* (numbered
  sections, big confident type, surgical accent, scroll reveals that also fade out), NOT its
  colors or copy. This must read as **Ekom's**, not a clone.

## 2. HONESTY RULE (non-negotiable)
Ekom is a student. **No fabricated metrics, testimonials, logos, or social proof — ever.**
- "Proof" uses only **real** numbers: Lighthouse scores of this site, # projects shipped,
  blog posts written, GitHub activity, technologies, years learning.
- Keep the existing "coming-soon / in-progress" honesty pattern for unfinished work.
- The saved candidate components ship with fake testimonials + pravatar/Unsplash images —
  strip ALL of that; repurpose only the *mechanics* for real content.

## 3. Design tokens (locked direction; exact crimson tuned in Stage 1)
- **Color:** near-black base (`~#0A0A0A`, layered `#0D0D0D`/`#141414` cards, hairline borders
  `~#262626`); text white `~#F5F5F5` / grey `~#8A8A8A`; **crimson** signature accent
  (`~#D7263D`, tune in Stage 1) + **navy** secondary (`~#1B2A4A`), both drawn from Ekom's
  studio portraits. Accent used **surgically** (logo, one italic word per heading, mono labels,
  metrics, links, focus rings). Must clear **WCAG AA** on near-black.
- **Type — three voices:** **Geist** (display sans) + **Fraunces italic** (the one emphasis
  word per heading only) + **Geist Mono** (eyebrows, section numbers, labels). Self-host via
  **Fontsource**, not a CDN. No Inter/Roboto/Arial defaults.
- **Motion:** scroll reveals (in + out), hover accent-swap + arrow nudge, metric counters,
  radial-glow / dotted-grid / grain atmosphere. **Everything behind `prefers-reduced-motion`**
  with a static fallback.

## 4. Quality bar — "The $10K Checklist" (Definition-of-Done lens for every visual stage)
1. Point of view, not a template — commit to dark/crimson editorial, execute without flinching.
2. Typography does work — the three-voice trio carries hierarchy; nothing defaulted.
3. Restrained color — 3–5 colors used consistently. No rainbow.
4. Hierarchy that breathes — whitespace + scale + contrast; clear primary/secondary/tertiary.
5. Imagery with intent — Ekom's commissioned portraits + art-directed assets; no stock.
6. Motion that whispers — hand-crafted micro-interactions, NOT generic AOS-fade-up slop.
7. Mobile designed, not shrunk — distinct phone layout decisions.
8. The invisible expensive stuff — sub-2s load, WCAG AA, keyboard nav, semantic HTML, real meta.

## 5. Information architecture (homepage)
Floating nav pill → Hero → `[01]` Selected Work → `[02]` How I Build → `[03]` Proof/By the
numbers → `[04]` Stack/Capabilities → `[05]` About → `[06]` Achievements/Experience →
`[07]` Certificates & Awards (interactive card stack) → `[08]` Writing → Contact ("Let's talk").
No FAQ (recruiter audience). Numbering finalized in Stage 2.

## 6. Engineering rules
- Prefer the **simplest** solution. No duplication — reuse existing components/code before
  adding new. When replacing a pattern, **remove the old one** (no dead duplicate logic).
- Only change what's **requested or clearly related**; don't wander into unrelated code.
- Keep files **≤ 200–300 lines**; decompose past that (Astro components).
- **Mock/fake data only in tests** — never in dev/prod.
- **Never overwrite `.env`** without asking (relevant: Formspree config).
- Always consider **ripple effects**. Don't re-architect working features unprompted.
- Write tests for major functionality — pragmatic for a static marketing site: cover the
  contact form + build/link checks, not exhaustive units.
- Windows dev box: use `python`, NOT `python3` (the latter is a broken Store shim).

## 7. Tech stack (as built in Stage 0)
- **Astro 5** (static output), **Tailwind v4** (CSS-first via `@tailwindcss/vite` +
  `@theme` in `src/styles/global.css` — there is **no `tailwind.config.js`**),
  **@astrojs/react** (React 19 islands), **@astrojs/sitemap**.
- **Zero-JS baseline:** ship no client JS by default. Hydrate islands only with
  `client:visible` (e.g. the certificate card stack). Verified: non-island pages emit no
  `<script>`.
- **Images:** `astro:assets` `<Image>` for responsive/optimized output.
- **Contact:** Formspree (no client-side keys). Needs Ekom's form ID before Stage 2 wiring.
- **Fonts:** Fontsource self-hosted.

## 8. Deploy rules
- Host: **GitHub Pages**, project site `https://ekomiwatt.github.io/Portfolio-Website/`.
  `astro.config.mjs` sets `site` + `base: '/Portfolio-Website'`.
- **All internal links/assets must respect `base`** — use `import.meta.env.BASE_URL` or
  Astro's path helpers, never a hardcoded leading `/`.
- CI: `.github/workflows/deploy.yml`. Build runs on the rebrand branch; **deploy is gated to
  `main`**. Pages "Source" stays "Deploy from a branch" until **Stage 5 cutover** — do not
  flip it early. Don't break the live site.

## 9. Do-not-touch (until their stage)
- The legacy static site (`index.html`, `css/`, `js/`, `cv.html`, `blog1.html`, `blog2.html`,
  `404.html`, `scripts/`) stays live and **untouched** until the Stage 5 cutover / Stage 6
  cleanup. New work lives under `src/`.
- `astro.config.mjs` `site`/`base` values — do not change without reason.
- Don't commit or push unless Ekom asks.

## 10. Workflow / process
- Work proceeds in **stages**; each stage's **Verify** line in the plan is its Definition of
  Done. **No stage starts until the previous is approved.** No gold-plating.
- Invoke the `frontend-design` (aesthetic) + `ui-ux-pro-max` (layout/type/palette) skills
  during design/build stages.
- Keep the plan file as the live source of truth; update it as decisions change.
