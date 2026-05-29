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
- [x] **Stage 2** — SEO & metadata
- [x] **Stage 3** — Accessibility pass
- [x] **Stage 4** — Performance & assets (image compression is the headline)
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

**Commit:** `74caa6e`

### 2026-05-28 — Stage 1b: restore placeholders with honest WIP styling

**Trigger:** browser check after Stage 1 showed the Featured Projects section looking blank (1 card in a 3-col grid) and the Certificates/Blog sections looking sparse. User picked "Restore placeholders, mark as 'In Progress'" for all three.

**Files touched:** `index.html`.

**Changes**
- Un-commented the 2 project, 3 certificate, and 2 blog placeholder cards.
- Re-styled every restored card with a consistent honest-WIP treatment:
  - `border-2 border-dashed border-gray-300` (dashed outline instead of solid)
  - Background and image area lightened with `/60–/70` opacity
  - Title color softened to `text-deepBlue/70`
  - Amber pill badge in the corner: **In Progress** on project + certificate cards, **Drafting** on blog cards
  - All footer CTAs replaced with a non-link `Coming Soon` label (gray, no `href`) so visitors can't click a dead link
  - Lorem Ipsum copy replaced with one-line honest blurbs ("Currently building…", "Working through the coursework now…", "Notes are scattered, the outline is forming…")
- Tech-stack chips kept (Django/Docker/AWS, React Native/Firebase/Redux) but muted to `text-gray-500` so they read as *intent*, not *delivered*.

**Decisions**
- Three different verbs felt right ("In Progress" for code, "Currently Studying" for credentials, "Drafting" for posts) but all share the same amber badge color and dashed border so the WIP language reads as one visual system.
- Removed `group-hover:` lift effects on these cards — they were inviting clicks on cards that don't go anywhere.
- Did not remove the original `delay-100/200/300` reveal classes — the stagger still works.

**Commit:** `cf4cbb0`

### 2026-05-29 — Stage 2: SEO & metadata

**Files touched:** `index.html`, `cv.html`, `blog1.html`, `robots.txt` (new), `sitemap.xml` (new).

**Added on every page**
- `<meta name="description">`, `<meta name="author">`
- `<link rel="canonical">` pointing at the GitHub Pages URL
- Full Open Graph block (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`, `og:locale`)
- Twitter Card block (`summary_large_image` on home + blog, `summary` on cv)
- Sharper page titles ("Ekomobong Iwatt — Software Engineer & Computer Engineering Student", "Resume — Ekomobong Iwatt", "Hello, World! — Building My Portfolio in Public")

**JSON-LD structured data**
- `index.html` — `Person` schema with `jobTitle`, `alumniOf` (UNILAG), `knowsAbout` (the core-tech list), and `sameAs` links to GitHub / LinkedIn / X.
- `blog1.html` — `BlogPosting` schema with `headline`, `datePublished`, `dateModified`, `author`, `mainEntityOfPage`.

**Semantic dates**
- Replaced bare year strings with `<time datetime="…">` in the Milestones & Experience timeline (index.html) and in the Experience & Leadership section (cv.html).
- `blog1.html` — wrapped "January 23, 2026" in `<time datetime="2026-01-23">`.

**New files**
- `robots.txt` — `Allow: /`, points at sitemap.
- `sitemap.xml` — four URLs (`/`, `/cv.html`, `/blog1.html`, `/blog2.html`) with `lastmod`, `changefreq`, `priority`. blog2's `lastmod` was inferred from its last main-branch commit (2026-04-18).

**Bonus cleanup**
- Two giant `https://www.google.com/search?…` URLs in the Milestones section (SEES Unilag and IEEE Unilag affiliations) were carrying ~600 chars of session/tracking params each. Trimmed to `?q=<term>` only — same destination, vastly less HTML noise.

**Decisions**
- `og:image` and `twitter:image` point at `assets/profile_img.jpg` as a stopgap. A proper 1200×630 social card is a Stage 6 deliverable; flagging here so it doesn't get forgotten.
- Did **not** add a separate `Resume` schema on `cv.html` — the page renders the same person already described by the `Person` schema on the home page, and the `og:type=profile` + canonical handle social previews. Adding a duplicate `Person` block would split the entity in Google's eyes.
- Twitter handle `@yr_Ekom` taken from the footer link on `index.html`. If it's wrong, it's a one-line fix in three places.
- `blog2.html` still **not touched** — OneDrive cloud-file provider still erroring. The page is in `sitemap.xml` so search engines can still discover it, but it's missing all the meta tags and JSON-LD until it can be opened. Right-click → "Always keep on this device" in Explorer to fix.

**Commit:** `4a5eebc`

### 2026-05-29 — Stage 3: accessibility pass

**Files touched:** `css/style.css`, `js/script.js`, `index.html`, `cv.html`, `blog1.html`.

**css/style.css**
- `:focus-visible` ring (`outline: 2px solid #94B4C1`) globally; switches to warm cream inside `nav`, `.bg-deepBlue`, and `footer` so it contrasts on the dark surfaces.
- `.skip-link` styling — pinned top-left, hidden via `translate(-200%)` until focused.
- `@media (prefers-reduced-motion: reduce)` — zeroes animation/transition durations site-wide and forces `.reveal*` into their final state.
- `.sr-only` defensive fallback (Tailwind already ships one, but if the CDN ever fails the form labels still stay invisible-but-readable).

**Stylesheet linkage**
- `cv.html` and `blog1.html` now load `css/style.css`. Previously only `index.html` did, so accessibility CSS would have been missing from those pages otherwise.

**index.html — landmarks & ARIA**
- Skip-link as the first focusable element in `<body>`.
- Added `<main id="main">` wrapping all content between `</nav>` and `<footer>` (skip-link target).
- `<nav aria-label="Primary">` on the navbar.
- Mobile-menu drawer: `role="dialog" aria-modal="true" aria-label="Site navigation"`.
- Hamburger button: `type="button"`, `aria-label="Open menu"`, `aria-expanded="false"`, `aria-controls="mobile-menu"`. JS now flips `aria-expanded` and `aria-label` to "Close menu" when the drawer opens.
- Close-menu button: `aria-label="Close menu"`.
- EI logo wrapper promoted from `<span>` to `<a href="#home" aria-label="Ekomobong Iwatt — home">` — keyboard users couldn't activate it before.
- Logo canvas got `aria-hidden="true"`.

**index.html — form & buttons**
- "Get in Touch" CTA was a `<div id="contactBtn">` — now a real `<button>`. Reachable by Tab, activates with Enter/Space.
- Popup close button was a `<span type="button">` (which does nothing) — now a real `<button aria-label="Close contact form">`.
- Contact form: added `<label for="…" class="sr-only">` for each input + textarea so screen readers stop relying on the disappearing-on-focus placeholder. Also gave inputs `autocomplete="name"` / `"email"`.
- `<form aria-labelledby="contactFormTitle">` + a visually-hidden `<h2 id="contactFormTitle">Send me a message</h2>`.
- Send button's inner `<p>` (a block element inside a button — invalid) → `<span>`.

**index.html — semantic tags & icon hiding**
- Footer social links wrapped in `<ul aria-label="Social links">` with `<li>` items (was a div with `<p>` for labels). Repeated `<p>` for "GitHub" / "LinkedIn" labels → `<span>`.
- Every decorative `<i class="fa…">` icon and decorative `<svg>` on the page now carries `aria-hidden="true"` (~30 elements across project cards, certificates, "Why work with me", footer socials, and CTA arrows).
- Hero portrait wrapper (CSS `background-image`): added `role="img" aria-label="Portrait of Ekomobong Iwatt"`; inner decorative divs get `aria-hidden="true"`.
- `#background` decorative wrapper got `aria-hidden="true"`.

**cv.html**
- Skip-link added.
- `<main id="main">` (the page already had `<main>`, just gave it an id).
- "Download PDF" button: added `type="button"` (default for `<button>` in a form is `submit` and even outside a form it's safer to be explicit).
- `aria-hidden="true"` on every Font Awesome icon (envelope, linkedin, github, map-marker, check-circle, external-link, download, arrow-left).

**blog1.html**
- Skip-link added.
- `<nav aria-label="Primary">` on the top bar.
- `<main id="main">` (gave the existing `<main>` an id).
- About-author profile portrait wrapper: `role="img" aria-label="Portrait of Ekomobong Iwatt"`; the inner image-only div is `aria-hidden`.

**js/script.js**
- `toggleMenu()` now flips `aria-expanded` ("true"/"false") and `aria-label` ("Open menu" / "Close menu") on the hamburger button each toggle.
- Logo-dot canvas animation skipped entirely when `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.

**Decisions**
- Did **not** rewrite CSS-background images as `<img>` elements — that's a Stage 4 deliverable (where they become `<picture>` with srcset and WebP). For now they get `role="img"` + `aria-label` so screen readers describe them.
- Kept the existing `.reveal` opacity-0 entry animation visible to motion-tolerant users — only forced final state inside the `prefers-reduced-motion` query.
- `cv.html`'s decorative "circle" SVGs in the certificate cards already lived inside index.html, not cv.html, so cv only needed FA icon tagging.
- Did **not** touch `blog2.html` — still OneDrive cloud-only. Skip-link + style.css link + main id + portrait aria need to be applied next session.

**Commit:** `e20f80a`

### 2026-05-29 — Stage 4: performance & assets

**Files touched:** `scripts/optimize_images.py` (new), `assets/*.{webp,jpg}` (new), `css/style.css`, `index.html`, `cv.html`, `blog1.html`, `js/script.js`.

**Image compression (user chose "keep originals, add compressed siblings")**
- New `scripts/optimize_images.py` — Pillow-based, reads `SOURCES` table, writes JPEG + WebP at two widths each. Re-runnable; outputs are deterministic.
- Source `assets/image1.jpg` (3868×4544, 2,729 KB) → four siblings:
  - `image1-w1600.webp` 38 KB
  - `image1-w1600.jpg` 89 KB
  - `image1-w800.webp` 13 KB
  - `image1-w800.jpg` 27 KB
- Source `assets/project1.png` (1914×840, 878 KB) → four siblings:
  - `project1-w1200.webp` 66 KB, `-w1200.jpg` 106 KB
  - `project1-w768.webp` 31 KB, `-w768.jpg` 47 KB
- Originals untouched.

**CSS rewiring**
- `#background::before`, `.hero-portrait-mobile` (new class), `.proj-preview-portfolio` (new class) all use `image-set()` with a `url()` fallback declaration above, plus a `-webkit-image-set` line for Safari. WebP-capable browsers pick the small file; everyone else gets the JPEG.
- Hero portrait CSS class layered with the existing rounded-pill / shimmer treatment — visual result is unchanged.

**HTML rewiring**
- `index.html` mobile portrait pill: inline `style="background-image: url(assets/image1.jpg)"` → class `.hero-portrait-mobile`.
- `index.html` Portfolio project card: inline `style="background-image: url(./assets/project1.png)"` → class `.proj-preview-portfolio` on a dedicated layer; the gradient overlay is now a separate sibling div (cleaner z-stacking, both `aria-hidden`).

**Critical-path optimisations**
- Added `<link rel="preconnect">` for `cdn.tailwindcss.com`, `cdnjs.cloudflare.com`, `fonts.googleapis.com`, `fonts.gstatic.com` on `index.html` and `cv.html`. `blog1.html` gets only Tailwind + fonts (no Font Awesome on that page).
- Added `<link rel="preload" as="image">` on `index.html` for the hero portrait, gated by `media` so mobile downloads only `image1-w800.webp` and desktop only `image1-w1600.webp`.
- Removed the eager `<script src="…emailjs…">` from `index.html` head.

**Lazy-loading EmailJS** (`js/script.js`)
- New `loadEmailJS()` memoised promise — injects the 50 KB SDK on demand and `emailjs.init()`s it.
- First call happens when the user clicks "Get in Touch" (so the SDK is already in flight while they're typing).
- The send handler awaits the loader before calling `sendForm`; if the SDK never loaded, `sendForm` won't run and the failure path surfaces a normal alert.

**Page-weight impact for index.html (first load)**
- Before: hero JPEG 2,729 KB + project PNG 878 KB + EmailJS ~50 KB ≈ **3,657 KB**.
- After, modern browser on desktop: hero WebP 38 KB + project WebP 31 KB + EmailJS deferred = **69 KB**.
- After, mobile: 13 KB + 31 KB = **44 KB**.
- ~50× reduction on the three biggest payloads.

**Decisions**
- Used `image-set()` rather than restructuring to `<picture>` + `<source>` so the existing background-based design (rounded pill shape, hover overlays, gradient) keeps working unchanged. `<picture>` would have meant rewriting the cards.
- Two widths per source rather than three — covers mobile vs. desktop comfortably for these specific render sizes; adding more would mean more bytes to commit for diminishing returns.
- Kept the EmailJS public key in `js/script.js`. It is *public* by design (any visitor's browser sees it), so checking it in is fine; restricting domains in the EmailJS dashboard is the real security control.
- Did **not** address the Tailwind CDN dev build (it still ships ~3 MB uncached). Moving to a built `dist/tailwind.css` requires a Node build step that didn't exist on this project; that's a Stage 5 (maintainability) candidate or a future call.
- `blog2.html` still untouched — OneDrive cloud-only. When it syncs, it needs preconnect tags and (if it uses image1/project1) the same class swap.

**Commit:** `197a723`

### 2026-05-29 — blog2.html catch-up (Stages 1–4 backfill)

**Files touched:** `blog2.html`, `sitemap.xml`.

**Trigger:** OneDrive cloud-file provider finally hydrated `blog2.html`, unblocking the catch-up flagged at the end of every prior stage entry.

**Stage 1 bug fixes** (same two defects that were on blog1)
- Footer `<p clas>` → `<p>` (attribute typo, was a no-op).
- Footer: collapsed `<a><div id="contactBtn" class="float-right … float-right">Get in Touch</div></a>` to a single `<a>` with the styling. Removed duplicate `id="contactBtn"` (the canonical one is on `index.html`'s EmailJS trigger button), the duplicated `float-right` class, and the nested non-button div inside an anchor.

**Stage 1 additions**
- Favicon: `<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">` + alternate icon.
- `<meta name="theme-color" content="#213448">`.

**Stage 2 — SEO & metadata**
- `<meta name="description">`, `<meta name="author">`, canonical link.
- Full Open Graph block (`og:type=article`, title/description/url/image, `og:locale`, `article:published_time=2026-04-17`, `article:section=Solder, Sparks, and Sockets`).
- Twitter Card block (`summary_large_image`).
- Sharper page title: `Pit Wall: Surviving the IES Buildathon` → `Pit Wall — Surviving the IES Buildathon` (em-dash to match blog1's pattern).
- `BlogPosting` JSON-LD with `headline`, `datePublished` / `dateModified` (`2026-04-17`), `author`, `publisher`, `mainEntityOfPage`.
- Wrapped "April 17, 2026" in `<time datetime="2026-04-17">`.

**Stage 3 — accessibility**
- `<link rel="stylesheet" href="css/style.css">` added so the page picks up the global focus rings, skip-link styling, and `prefers-reduced-motion` block. (Was missing — page had only its own inline `<style>`.)
- Skip-link as the first focusable element in `<body>`.
- `<nav aria-label="Primary">` on the top bar.
- `<main id="main">` (skip-link target).
- About-author profile portrait wrapper: `role="img" aria-label="Portrait of Ekomobong Iwatt"`; inner image-only div is `aria-hidden="true"`.
- No Font Awesome icons on this page, so no `aria-hidden` icon sweep was needed.

**Stage 4 — performance**
- `<link rel="preconnect">` for `cdn.tailwindcss.com`, `fonts.googleapis.com`, `fonts.gstatic.com` (no Font Awesome on this page, so no `cdnjs.cloudflare.com` hint).
- No image-set rewiring required: blog2 doesn't use `image1.jpg` or `project1.png`. The only image is `profile_img.jpg` (60 KB), kept as-is — out of scope for Stage 4's compression pass.
- No EmailJS on this page, so no lazy-load work.

**sitemap.xml**
- blog2 `lastmod`: `2026-04-18` → `2026-04-17`. The Stage 2 value was a stopgap inferred from a git commit date because the file couldn't be opened; now that the actual publish date is authoritative via the BlogPosting JSON-LD, aligned to it. Matches blog1's `lastmod = publish date` convention (content unchanged today, only meta/a11y additions).

**Decisions**
- Preserved blog2's unique `pre code` / inline-`code` styling (it has code blocks; blog1 doesn't) — left the inline `<style>` block intact and just added `<link rel="stylesheet" href="css/style.css">` above it. The global stylesheet doesn't conflict.
- Used the existing badge text "Solder, Sparks, and Sockets" as `og:article:section` to mirror blog1's pattern (which used "Blue, Cream, and Code").
- `og:image` / `twitter:image` point at `profile_img.jpg` — same stopgap as the other pages until the proper 1200×630 social card lands in Stage 6.
- This entry intentionally folds four stages into one commit because the prior-stage commits already exist for the other pages; isolating blog2 per-stage would mean four commits all touching the same file with no independent revert value.

**Commit:** `9b55282`

<!-- Append new entries above this comment. -->
