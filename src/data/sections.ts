/**
 * Section content for the homepage. Real where it exists; PLACEHOLDER where it
 * depends on work Ekom ships post-rebrand. All placeholders tracked in
 * /PLACEHOLDERS.md (the cutover gate). Nothing fabricated goes live.
 */

// [01] SELECTED WORK ---------------------------------------------------------
export interface Project {
  name: string;
  blurb: string;
  tags: string[];
  year: string;
  href: string;
  wip?: boolean; // honest "in progress" treatment
}
// PLACEHOLDER: real projects land here (with case studies) as Ekom ships them.
export const projects: Project[] = [
  {
    name: 'This portfolio',
    blurb: 'Astro + Tailwind, zero-JS baseline, Lighthouse-tuned. The first shipped thing.',
    tags: ['Astro', 'Tailwind', 'TypeScript'],
    year: '2026',
    href: '#',
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
  {
    name: 'Project Four',
    blurb: 'A fourth highlight build — documented end to end. Coming soon.',
    tags: ['Python', 'Tooling'],
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
// PLACEHOLDER: ALL DUMMY. Replace with real Lighthouse, project, post, GitHub numbers.
export const metrics: Metric[] = [
  { value: '100', label: 'Lighthouse performance' },
  { value: '6+', label: 'Projects shipped' },
  { value: '12', label: 'Articles written' },
  { value: '8', label: 'Technologies' },
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
  href: string;
}
// PLACEHOLDER: sample certs — replace with real issuer/title/year/credential links.
export const certificates: Certificate[] = [
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2025', href: '#' },
  { title: 'Python for Everybody', issuer: 'Coursera', year: '2025', href: '#' },
  { title: 'CS50x', issuer: 'HarvardX', year: '2024', href: '#' },
  { title: 'Git & GitHub', issuer: 'Google', year: '2024', href: '#' },
];

// [08] WRITING ---------------------------------------------------------------
// Posts now live in the `blog` content collection (src/content/blog/*.md) and
// are read directly by Writing.astro / the /blog pages. No placeholder data here.
