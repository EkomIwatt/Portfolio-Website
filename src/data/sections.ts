/**
 * Section content for the homepage. Real where it exists; PLACEHOLDER where it
 * depends on work Ekom ships post-rebrand. All placeholders tracked in
 * /PLACEHOLDERS.md (the cutover gate). Nothing fabricated goes live.
 */
import type { ImageMetadata } from 'astro';
import portfolioV1Shot from '../assets/projects/portfolio-v1.png';

// [01] SELECTED WORK ---------------------------------------------------------
export interface Project {
  name: string;
  blurb: string;
  tags: string[];
  year: string;
  href: string;
  wip?: boolean; // honest "in progress" treatment
  cta?: string; // link label override (defaults to "View project")
  image?: ImageMetadata; // optional card screenshot (else the abstract placeholder)
}
// Card 1 is real (the original hand-built portfolio, shipped Jan 2026); the two
// WIP cards are honest placeholders Ekom fills as he ships the next two builds.
export const projects: Project[] = [
  {
    name: 'Portfolio Website (v1)',
    blurb:
      'My first shipped site — a hand-built static portfolio in HTML, CSS, and vanilla JS ' +
      'with Tailwind. Designed, built, and deployed to GitHub Pages in 13 days, documented ' +
      'as I went.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind'],
    year: '2026',
    href: `${import.meta.env.BASE_URL}/v1/`, // the live archived original
    cta: 'View site',
    image: portfolioV1Shot,
  },
  {
    name: 'Project Two',
    blurb: 'A real build will replace this — documented end to end.',
    tags: ['React', 'Node'],
    year: '2026',
    href: '#',
    wip: true,
  },
  {
    name: 'Project Three',
    blurb: 'Embedded / firmware experiment. Coming soon.',
    tags: ['C++', 'Embedded'],
    year: '2026',
    href: '#',
    wip: true,
  },
];

// [02] HOW I BUILD -----------------------------------------------------------
export interface Step {
  num: string;
  title: string;
  body: string;
}
// PLACEHOLDER: invented workflow — refine to Ekom's real process.
export const process: Step[] = [
  { num: '01', title: 'Frame', body: 'Pin down the real problem and the smallest thing worth shipping. Scope ruthlessly.' },
  { num: '02', title: 'Prototype', body: 'AI-accelerated: move from idea to a working slice fast, then pressure-test it by hand.' },
  { num: '03', title: 'Ship', body: 'Production-grade by default — accessible, fast, tested where it matters. Then deploy.' },
  { num: '04', title: 'Document', body: 'Write up the build in the open: decisions, trade-offs, what I would do differently.' },
];

// [03] PROOF / BY THE NUMBERS ------------------------------------------------
export interface Metric {
  value: string;
  label: string;
}
// Real numbers, all verified. Lighthouse: 96 mobile / 100 desktop (Edge run,
// 2026-06) — shown as `96+` so it's honest across both, not desktop cherry-picked.
export const metrics: Metric[] = [
  { value: '96+', label: 'Lighthouse performance' }, // 96 mobile, 100 desktop
  { value: '2', label: 'Projects shipped' }, // v1 site (live) + this portfolio
  { value: '2', label: 'Articles written' }, // src/content/blog/*.md
  { value: '12+', label: 'Technologies' }, // distinct tools/languages in the Stack section
];

// [04] STACK / CAPABILITIES --------------------------------------------------
export interface StackGroup {
  label: string;
  items: string[];
}
export const stack: StackGroup[] = [
  { label: 'Languages', items: ['C++', 'Python', 'JavaScript', 'TypeScript', 'Rust'] },
  { label: 'Web', items: ['Astro', 'React', 'Tailwind', 'Node'] },
  { label: 'Embedded', items: ['Microcontrollers', 'C', 'RTOS basics'] },
  { label: 'Tooling', items: ['Git', 'Linux', 'AI-assisted dev'] },
];

// [05] ABOUT -----------------------------------------------------------------
export const about = {
  lead: 'I am a',
  accent: 'builder',
  tail: ' first',
  body: [
    'I am a Computer Engineering student at the University of Lagos, working across software ' +
      'and embedded systems. I lean into AI-accelerated workflows — not as a shortcut, but as ' +
      'leverage: it lets me move from idea to working product fast, then sharpen the result by hand.',
    'Fresh perspective, fast iteration, and a bias toward shipping. I document what I build so ' +
      'the work speaks for itself.',
  ],
};

// [06] EXPERIENCE / ACHIEVEMENTS ---------------------------------------------
export interface TimelineEntry {
  year: string;
  title: string;
  org: string;
  body: string;
}
// Education is real; PLACEHOLDER entries marked for real milestones.
export const timeline: TimelineEntry[] = [
  {
    year: '2023—now',
    title: 'B.Sc. Computer Engineering',
    org: 'University of Lagos',
    body: 'Software + embedded systems coursework; building projects alongside the curriculum.',
  },
  {
    year: '2026',
    title: 'Portfolio rebrand shipped', // PLACEHOLDER: swap for real milestones
    org: 'Self-directed',
    body: 'Designed and built this site end to end on a modern static stack.',
  },
];

// [07] CERTIFICATES & AWARDS -------------------------------------------------
export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  href?: string; // omit when there's no public credential link
  inProgress?: boolean; // honest "currently studying" card (no credential yet)
}
// Real certificates, ported from the legacy site (Stage 5). Issuer for the
// Python cert corrected to Coursera to match its credential link.
export const certificates: Certificate[] = [
  {
    title: 'C++ Development',
    issuer: 'Udemy',
    year: '2025',
    href: 'https://www.udemy.com/certificate/UC-385df29e-18b7-4ea4-9db9-e8fc3af13bd4/',
  },
  {
    title: 'Python Programming',
    issuer: 'Coursera',
    year: '2025',
    href: 'https://coursera.org/share/47660064544b3149f3c07c0dd39d2df9',
  },
  // Real cert with no public credential link — card renders without "View credential".
  { title: 'Embedded Systems Design', issuer: 'ECX', year: '2025' },
  // Honest in-progress marker (matches the legacy "currently studying" pattern).
  { title: 'Currently studying', issuer: 'In progress', year: '', inProgress: true },
];

// [08] WRITING ---------------------------------------------------------------
// Posts now live in the `blog` content collection (src/content/blog/*.md) and
// are read directly by Writing.astro / the /blog pages. No placeholder data here.
