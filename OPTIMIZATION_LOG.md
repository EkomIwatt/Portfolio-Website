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

- [x] **Stage 0** — Branch + log + baseline
- [x] **Stage 1** — Bug fixes & dead code cleanup
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

### 2026-05-28 — Stage 1: bug fixes, dead-code cleanup, favicon

**Files touched:** `index.html`, `cv.html`, `blog1.html`, `assets/favicon.svg` (new), `ls` (deleted).

**Fixes**
- `index.html` — `t ext-deepBlue` → `text-deepBlue` on the hero blurb (typo was breaking the intended color class).
- `index.html` — `pr-18` → `pr-16` on the hero wrapper (`pr-18` isn't a default Tailwind class; was silently ignored).
- `index.html` — desktop nav now includes a `#projects` link; mobile nav `#education` (broken link, no such section) → `#certificates` to mirror desktop. Desktop and mobile menus now point at the same set of real section IDs: Home, Projects, Achievements, Qualifications, Blog, Hire Me.
- `index.html` — blog cards on the home page: outer `<p>` wrapping two inner `<p>` elements was invalid HTML. Changed the wrapper to `<div>` so the inner paragraphs are legal. Also moved the stray `</article>` close for the IES Buildathon card inside a proper wrapper.
- `blog1.html` — `<p clas>` → `<p>` (typo).
- `blog1.html` — footer "Get in Touch" was a `<div id="contactBtn">` nested inside an `<a>`, which (a) duplicated the index.html ID and (b) used `float-right` twice. Collapsed to a single `<a>` with the styling. Cleaner, no duplicate ID, no nested interactive element.

**Hidden (HTML-commented, not deleted)**
- `index.html` — the two placeholder "Cool Project" cards in the Featured Projects grid.
- `index.html` — the three "Coming Soon..." certificate cards (4–6). Two of them linked to the same C++ Udemy credential as card #3, which was misleading visitors.
- `index.html` — the two "Cool Topic" Lorem Ipsum blog cards.

All restorations are one-line operations — markup is preserved verbatim inside the comments with a note pointing at this log.

**Added**
- `assets/favicon.svg` — small 64×64 rounded-square mark with "EI" initials in the site palette plus an accent dot (matches the logo-dot canvas animation in the navbar).
- `<link rel="icon">` references in `index.html`, `cv.html`, `blog1.html`.
- `<meta name="theme-color">` added to `cv.html` and `blog1.html` (already present on `index.html`).

**Removed**
- Stray empty `ls` file at repo root.

**Decisions**
- Placeholders were *commented out* rather than deleted. They represent real intent (more projects, more credentials, more posts coming) and reproducing the visual treatment from scratch later would be wasted work. The HTML comments include a note pointing at this log so the next person editing the file knows where the context lives.
- `blog2.html` was **not touched this stage** — OneDrive's cloud-file provider errored on every read/copy attempt (process running, but file marked offline-only). Once it syncs, it needs the same favicon + theme-color additions and the same audit pass blog1 just got. Tracked as a follow-up under Stage 2/3.
- Did not delete the duplicate `id="contactBtn"` references entirely — the one on `index.html` is functional (drives the EmailJS popup), only the blog1 duplicate was problematic.

**Commit:** _(filled in after `git commit`)_

<!-- Append new entries above this comment. -->
