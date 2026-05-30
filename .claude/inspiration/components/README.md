# Candidate components — reference library

Raw React/TSX components Ekom found and liked, saved here as **inspiration / source to
adapt**, NOT drop-in code. Saved 2026-05-30. They originate from "21st.dev"-style
shadcn integration prompts (each shipped with `i.pravatar.cc` / Unsplash placeholders and
fake testimonial copy).

> **Use at discretion** during Stages 2–3 of the rebrand (plan:
> `~/.claude/plans/unified-wandering-lantern.md`). Nothing here is committed to yet.

> **Scope:** the "Best fit" column below is a *starting suggestion*, not a cage. Any mechanic
> here can be repurposed for ANY section (e.g. a card-shuffle for Selected Work, a carousel for
> Writing, a background for any band) if it serves that section better.

> **Primary reference is [wibify.agency](https://wibify.agency/en)** (spec: `../wibify.md`,
> shots: `../assets/`). When these found components and the wibify aesthetic disagree, **wibify
> wins** — its structure/rhythm (numbered sections, big type, surgical accent, scroll reveals
> that also fade OUT) is the north star; these components are raw material to bend toward it.

## Non-negotiable adaptations (apply to ALL before any use)

These collide with the plan's locked guardrails — fix on the way in, every time:

1. **Honesty** — strip ALL fake testimonials/quotes/avatars. Ekom is a student; no invented
   social proof. Repurpose the *mechanics* for **real** content (certificates, projects, proof
   numbers).
2. **Imagery** ($10K #5) — no `pravatar` / Unsplash. Use real cert/issuer assets or Ekom's
   own portraits; otherwise omit the image.
3. **Palette** ($10K #3) — re-theme every `slate-*` / `indigo` / `purple` / shadcn default to
   our tokens: near-black base, **crimson** accent, **navy** secondary.
4. **Motion** ($10K #6) — gate every animation behind `prefers-reduced-motion`; provide a
   static fallback. No autoplay-by-default; no infinite loops that tank Lighthouse/battery.
5. **Stack** — these are Next.js/`"use client"` components. In our Astro build they become
   `@astrojs/react` islands hydrated `client:visible` to protect the zero-JS baseline. Convert
   `<style jsx>` (Next-only) to a CSS module or Tailwind. Plan uses the `motion` package
   (framer-motion successor).
6. **Size** — keep each adapted component ≤200–300 lines.

## The components

| File | What it is | Best fit in plan | Verdict |
|---|---|---|---|
| `testimonial-cards.tsx` | framer-motion **drag-to-shuffle** 3-card stack | **[07] Certificates** | Good mechanic; **no built-in a11y** — must add prev/next + arrow keys + reduced-motion grid fallback + click-vs-drag for "View Credential" links |
| `stagger-testimonials.tsx` | Clip-path **notched cards**, click-to-center, prev/next buttons; uses shadcn semantic tokens | **[07] Certificates** (alt) | Themes to crimson cleanly via CSS vars; "techy" notched look fits; needs keyboard nav + reduced-motion |
| `circular-testimonials.tsx` | **3D carousel** w/ arrows, **arrow-key nav**, autoplay, blur-in word animation | **[07] Certificates** (alt) | **Strongest a11y baseline** of the three; but Next-only `<style jsx>` to convert, autoplay → off/pausable |
| `background-paths.tsx` | Animated **SVG floating lines** hero bg + letter-by-letter title | **Hero** atmosphere | Lightweight (SVG, no canvas); letter animation suits the hero headline; recolor + reduced-motion |
| `shader-background.tsx` | Fullscreen **WebGL plasma** shader bg | **Hero** atmosphere (alt) | Most striking but heaviest (continuous rAF). Recolor shader constants to crimson/navy; **must** stop loop on reduced-motion + offscreen. Use only if it doesn't cost the Lighthouse 100s |

## Decisions deferred to build time

- **Certificates [07]:** pick ONE of the three card mechanics. Leaning `circular-testimonials`
  (best a11y) or the drag-shuffle for tactile feel — decide in Stage 2 with real cert data in hand.
- **Hero atmosphere:** `background-paths` is the safer/cheaper pick for the proof-of-perf story;
  `shader-background` only if it survives the Lighthouse budget. Could also fold into the plan's
  existing "radial-glow / dotted-grid / grain" idea instead.
- `button.tsx` (shadcn) is a dependency of `background-paths`; we already get an equivalent via
  our own button styles — don't pull in shadcn just for it unless we adopt shadcn wholesale.
