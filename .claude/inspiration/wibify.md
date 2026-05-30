# Inspiration — wibify.agency

**Source:** https://wibify.agency/en
**Saved:** 2026-05-30
**Why saved:** Reference aesthetic for rebranding this portfolio into a **professional "vibecoder"** site.

> Visual spec below derived from 12 screenshots in `./assets/` (read 2026-05-30).
> Note: the site uses heavy scroll-triggered reveal/disappear animations — static
> shots don't capture motion timing, easing, or hover transitions. Treat the spec as
> layout/color/type truth; treat motion as "infer + tune live."

## What it is
A German digital design studio (Bocholt, founded 2025, founder Kerim Bilin). Builds
websites, branding, software, and mobile apps. Tagline: *"We build digital products for
ambitious brands."* Positions itself through polish, speed, and hard performance metrics.

## Structure
- **Services (4):** Websites · Branding · Software · Mobile Apps
- **Process (4 phases):** Strategy → Design → Build → Launch & Care
- **Trust signals:** 5.0 Google rating (21 reviews), 7.5M+ users reached,
  100 PageSpeed / full Lighthouse 100s, transparent fixed pricing (from €1,490, no hourly billing)
- **Tech credibility:** name-drops Next.js 16, React 19, TypeScript
- **CTAs:** "Start a project", contact form, phone/email, portfolio case studies

## Visual spec (from screenshots)

**Color** (sample exact hex from screenshots before using):
- Background: near-black `~#0A0A0A` (sections alternate to `~#0D0D0D`/`#111`)
- Accent: single acid lime-green `~#C2F04E` (chartreuse, leans yellow) — used *surgically*:
  logo mark, ONE italic word per headline, mono labels, key metric numbers, chart line, link underlines, focus states
- Text: white `~#F5F5F5` primary, muted grey `~#8A8A8A` secondary/labels
- Card surfaces: `~#141414` with thin `1px` low-contrast borders `~#262626`
- Atmosphere: green radial glows bleeding from edges, faint dotted-grid textures, subtle grain

**Typography** — the signature pairing is three voices:
1. **Display sans** — large, bold, tight tracking, upright (grotesque; e.g. Neue Montreal / Inter Tight / a grotesk)
2. **Italic serif** — high-contrast elegant italic (Reckless / GT Sectra / PP Editorial vibe) used ONLY for the one emphasized word per heading
3. **Monospace** — all eyebrows, section numbers, form labels, tag-chips, footer meta (uppercase, letter-spaced)
   - Signature headline move: `Bold upright sans` + `*italic serif accent word*` + `.`
   - Examples: "What we've *built*." · "Four *disciplines*. One team." · "From *briefing* to *launch*." · "Let's *talk*." · "Answers *up front*."

**Layout / components:**
- Floating **rounded nav pill**, centered top: logo + "Start a project →" button + hamburger
- Bracketed **numbered section eyebrows**: `[02] SELECTED WORK / 2024 — 2026`
- **Selected-work list**: full-width rows — big project name (left) · mono tags `WEBSEITE · BRANDING` (right) · year · arrow; hover swaps name + row to lime
- **Service cards**: dark, thin-bordered, with mono tag-chips inside (`WEB APPS & DASHBOARDS`, `INTERNAL TOOLS`)
- **Metrics band**: oversized numbers ("93 Mio / 3 Mio / 1 Mrd+") + small mono labels + lime area/line chart
- **FAQ accordion**: numbered `01–06`, `+` toggle icons, hairline dividers
- **"Verify our claims"** tech-stack grid: cards naming Next.js 16, React 19, TypeScript, Vercel, Core Web Vitals, Schema.org, llms-full.txt
- **Footer**: oversized logo + "Digital Design Studio from *Bocholt*." (italic serif), then mono columns (Contact / Sitemap / Legal / Social)
- **Floating action buttons** bottom-right (WhatsApp / phone / chat)
- Visual assets: 3D isometric "blueprint" render, dark architectural photography with lime rim-lighting

**Motion (infer + tune live):**
- Scroll-triggered reveals (fade/slide-up, staggered); elements fade OUT on scroll-away too
- Hover: color swap to lime + arrow nudge on work rows / buttons
- Likely smooth-scroll, marquee or counter animations on metrics

## Design cues to borrow
- Clean, minimalist layout with generous whitespace
- **Numbered section labels** (`[01]`–`[07]`) — editorial, technical feel
- Big confident typography as the primary visual element
- Real project/studio photography over stock
- Metrics-forward proof (PageSpeed/Lighthouse 100s) used as a credibility hook
- Transparent, plain-language pricing/offer framing

## How to adapt for a "professional vibecoder" portfolio
- Lead with an outcome-driven tagline (e.g. "I ship production products, fast — built with AI").
- Mirror the **numbered-section** rhythm for Work / Process / Stack / Contact.
- Replace agency "Services" with **what I build** (apps, sites, tools) + **how** (AI-assisted / vibe-coded workflow as a selling point, not a disclaimer).
- Keep the **metrics-as-proof** pattern: shipped projects, users reached, performance scores, time-to-ship.
- Show a transparent **process** section (Strategy → Design → Build → Launch) to read as professional, not hobbyist.
- Tech-stack credibility band (the actual tools/models/frameworks used).
- Minimalist, dark-or-high-contrast type-driven aesthetic; photography/screenshots of real shipped work.

## When building, pair with
- `frontend-design` skill for the bold, non-generic aesthetic direction
- `ui-ux-pro-max` skill for layout patterns, palette, and typography recommendations
