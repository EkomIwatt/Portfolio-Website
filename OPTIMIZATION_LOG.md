# Optimization & Improvement Log

> Branch: `optimize-improvements`
> Started: 2026-05-28
> Owner: Claude (Opus 4.7) working under Ekomobong Iwatt
> Purpose: persistent log so any new Claude session can pick this up without re-reading the entire codebase. Each entry is dated, scoped, and references commits + files touched.

---

## How to use this log

1. Every change set gets a new H2 entry under the matching stage, with a timestamp and the commit SHA (filled in after committing).
2. Each entry lists **files touched**, **what changed**, and **why**.
3. When a stage finishes, tick its checkbox in the plan below.
4. If a decision was made (e.g. "kept Lorem Ipsum cards hidden behind a coming-soon badge instead of deleting"), record it under **Decisions** at the bottom of the entry — it's the single most useful thing for future-Claude.

---

## Baseline snapshot (2026-05-28)

| File | Lines | Size | Notes |
|---|---|---|---|
| `index.html` | 747 | 55 KB | All content + 60-line inline Tailwind config |
| `cv.html` | 200 | 12 KB | Print-friendly resume |
| `blog1.html` | 170 | 11 KB | "Hello, World !" post |
| `blog2.html` | ? (cloud-only) | 28 KB | "The IES Buildathon". Not readable on 2026-05-28 — OneDrive cloud file provider was offline. Re-pin when sync resumes. |
| `css/style.css` | 130 | 3 KB | Animations, scrollbar, hero shimmer |
| `js/script.js` | 256 | 7 KB | Menu, scroll reveal, EmailJS, logo canvas |
| `assets/image1.jpg` | — | **2.73 MB** | Hero background. **Critical**: largest payload on the site. |
| `assets/project1.png` | — | 898 KB | Project card cover |
| `assets/profile_img.jpg` | — | 60 KB | About-author + mobile hero portrait |
| `ls` | 0 | 0 B | Stray empty file at repo root. Delete. |
| `README.md` | 1 line | 54 B | Only the live URL. |

External dependencies (all via CDN):
- Tailwind CSS (`cdn.tailwindcss.com`) — **development build**, ships a warning in console and is ~3 MB uncompressed.
- Font Awesome 6.0.0
- Google Fonts (Inter, Fira Code on cv/blog)
- EmailJS browser SDK v3

---

## Issues catalogued during the read-through

### Bugs / invalid markup
- `index.html:147` — typo `t ext-deepBlue` (space inside class name → the class never applies).
- `index.html` blog cards (~L541–593) — `<p>` nested inside `<p>` (invalid HTML); the outer `<p class="text-gray-600 mb-4">` is never properly closed before the inner block paragraphs.
- `index.html` mobile nav lists `#projects`, `#education`, `#achievements` but `#education` doesn't exist (the section is `#certificates`) and desktop nav uses a different set entirely. They should match.
- `index.html:117` — `pr-18` is not a default Tailwind class (max default is `pr-16`); silently ignored.
- `blog1.html:162` — typo `<p clas>` (should be `class`).
- `blog1.html:164` — duplicate `float-right` and inline `id="contactBtn"` on a non-button div; that ID is reused by `index.html` for the popup trigger so the JS handler would also fire here if `script.js` were loaded (it isn't, but the duplicate ID is still wrong).
- Stray `ls` file (0 bytes) at repo root — likely a typo'd shell command captured as a redirect.

### SEO
- No meta description, no Open Graph, no Twitter cards, no canonical URL on any page.
- No `robots.txt`, no `sitemap.xml`.
- Blog posts have no JSON-LD `Article` schema; index has no `Person` schema.
- Dates are plain text instead of `<time datetime="…">`.
- `cv.html`, `blog1.html`, `blog2.html` are missing `theme-color` and consistent favicon links.

### Accessibility
- Mobile menu button has no `aria-label`, no `aria-expanded`, no `aria-controls`.
- Decorative `<i class="fa…">` icons aren't `aria-hidden="true"`.
- Contact form inputs use `placeholder` as the only label — fails screen readers and disappears on focus.
- No skip-to-content link.
- Background image carries a portrait that has no text alternative anywhere.
- Animations don't honor `prefers-reduced-motion`.
- Focus styles rely on the browser default — invisible against the dark navbar.

### Performance
- `image1.jpg` at 2.73 MB is loaded as a CSS `background-image` on every visit; not lazy, no WebP, no responsive sizes.
- `project1.png` at 898 KB likewise.
- Tailwind CDN dev build runs JIT in the browser on every load.
- EmailJS SDK loads on every page even though only `index.html` uses it, and only after the user clicks "Get in Touch".
- No `preconnect` hints for the three font/icon hosts.

### Maintainability
- Tailwind theme config is duplicated verbatim in 4 HTML files. Any palette tweak requires 4 edits.
- Nav + footer markup is duplicated across pages with subtle drift (mobile menu items differ from desktop; blog pages have a different footer entirely).
- Repeated inline color classes for tag chips — would benefit from a `.chip` component class.

### Content
- Two project cards (#2, #3) and two blog cards (#3, #4) are still Lorem Ipsum placeholders.
- Three of six certificate cards say "Coming Soon..." but link to a real C++ credential — misleading.

---

## The plan

- [x] **Stage 0** — Branch + log + baseline (this commit)
- [ ] **Stage 1** — Bug fixes & dead code cleanup
- [ ] **Stage 2** — SEO & metadata
- [ ] **Stage 3** — Accessibility pass
- [ ] **Stage 4** — Performance & assets (image compression is the headline)
- [ ] **Stage 5** — Maintainability refactor (extract shared head/nav/footer)
- [ ] **Stage 6** — Polish & extras (404 page, scroll-to-top, OG image)

Each stage lands as its own commit (or small commit series) so any one of them can be reverted in isolation.

---

## Change log

### 2026-05-28 — Stage 0: branch + log created
- New branch `optimize-improvements` off `main` (`789bae8`).
- Added `OPTIMIZATION_LOG.md` (this file) with baseline snapshot, issue catalogue, and staged plan.
- No source files touched yet.

<!-- Append new entries above this comment. -->
