/**
 * Section content for the homepage. Real where it exists; PLACEHOLDER where it
 * depends on work Ekom ships post-rebrand. All placeholders tracked in
 * /PLACEHOLDERS.md (the cutover gate). Nothing fabricated goes live.
 */
import type { ImageMetadata } from 'astro';
import portfolioV1Shot from '../assets/projects/portfolio-v1.png';
import queryllShot from '../assets/projects/queryll.png';
import swarmShot from '../assets/projects/swarm.png'; // diagram drawn for the site (Swarm has no UI)
import ledgerliteShot from '../assets/projects/ledgerlite.png'; // demo account, sample data

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
  featured?: boolean; // shown on the homepage [01]; everything shows on /projects
}
// Sourced from MASTER-CV.md + SmartPump_Project_Brief.md via /update-portfolio.
// Queryll, Swarm and TaskFlow repos are private → no code links (Contact instead).
// SmartPump: no code link and no app screenshots (client IP, per the brief).
const walkthrough = `${import.meta.env.BASE_URL}/#contact`;
export const projects: Project[] = [
  {
    name: 'SmartPump',
    blurb:
      'Android kiosk app and Arduino firmware that turn a fuel dispenser into a self-service, ' +
      'cashless pump: Paystack QR payments, a checksummed USB-serial protocol, and fuel cut off ' +
      'on the exact pulse paid for. Contract work for Balanceè. Pre-launch, and validated with ' +
      'a real paid sale on production.',
    tags: ['Kotlin', 'Jetpack Compose', 'Arduino', 'Paystack'],
    year: '2026',
    href: walkthrough,
    cta: 'Code walkthrough on request',
    featured: true,
  },
  {
    name: 'Queryll',
    blurb:
      'Document Q&A over your own PDFs: structure-aware chunking, Voyage embeddings, pgvector ' +
      'retrieval, and streamed Claude answers whose citations resolve to the exact source ' +
      'passage. Three processes sharing only Postgres. 441 tests.',
    tags: ['Python', 'FastAPI', 'pgvector', 'Claude API'],
    year: '2026',
    href: walkthrough,
    cta: 'Code walkthrough on request',
    image: queryllShot,
    featured: true,
  },
  {
    name: 'Swarm',
    blurb:
      'My workflow for running several Claude Code agents as one team: interfaces frozen ' +
      'before any code exists, one agent per git worktree, and a merge phase that proves the ' +
      'contracts held. It shipped the four apps here and caught three integration bugs that ' +
      '~1,250 passing tests missed.',
    tags: ['Claude Code', 'Multi-agent', 'Git worktrees'],
    year: '2026',
    href: walkthrough,
    cta: 'Ask me how it works',
    image: swarmShot,
    featured: true,
  },
  {
    name: 'LedgerLite',
    blurb:
      'Private expense tracker with monthly budgets and three charts, on argon2 and rotating ' +
      'httpOnly refresh-cookie auth with every query scoped to the signed-in user. 339 tests. ' +
      'Built with Swarm. Free-tier hosting, so the first load can take a minute.',
    tags: ['FastAPI', 'React', 'Postgres', 'Auth'],
    year: '2026',
    href: 'https://ledger-lite-amber.vercel.app',
    cta: 'View live site',
    image: ledgerliteShot,
    featured: true,
  },
  {
    name: 'TaskFlow',
    blurb:
      'Real-time collaborative kanban: optimistic, keyboard-accessible drag-and-drop, ' +
      'fractional ordering keys, and live sync across clients over one WebSocket. 431 tests. ' +
      'Built with Swarm. Free-tier hosting, so the first load can take a minute.',
    tags: ['FastAPI', 'WebSockets', 'React', 'Postgres'],
    year: '2026',
    href: 'https://taskflow-nu-sand-60.vercel.app',
    cta: 'View live site',
  },
  {
    name: 'Snipp',
    blurb:
      'URL shortener with Base62 codes, a clean 302 redirect path and a click-analytics ' +
      'dashboard, deployed across Vercel, Render and Neon. The first Swarm build.',
    tags: ['FastAPI', 'React', 'Postgres'],
    year: '2026',
    href: 'https://snipp-kappa.vercel.app',
    cta: 'View live site',
  },
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
];

// [02] HOW I BUILD -----------------------------------------------------------
export interface Step {
  num: string;
  title: string;
  body: string;
}
// PLACEHOLDER: invented workflow — refine to Ekom's real process.
export const processSteps: Step[] = [
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
  { value: '8', label: 'Projects built' }, // the 7 in `projects` + this portfolio
  // Snipp 45 + LedgerLite 339 + TaskFlow 431 + Queryll 441 + SmartPump 605 unit / 27 device = 1,888
  { value: '1800+', label: 'Automated tests' },
  { value: '3', label: 'Live deployments' }, // LedgerLite, Snipp, TaskFlow; verified 2026-10-02
];

// [04] STACK / CAPABILITIES --------------------------------------------------
export interface StackGroup {
  label: string;
  items: string[];
}
// Tier-1/2 skills from MASTER-CV.md §5 only (Rust dropped: nothing shipped in it yet).
export const stack: StackGroup[] = [
  { label: 'Languages', items: ['Kotlin', 'Python', 'TypeScript', 'C++', 'C', 'SQL'] },
  { label: 'Web & backend', items: ['FastAPI', 'React', 'Postgres', 'pgvector', 'WebSockets', 'Astro', 'Tailwind'] },
  { label: 'Mobile & embedded', items: ['Android', 'Jetpack Compose', 'Room', 'Arduino', 'AVR', 'USB serial'] },
  { label: 'AI & tooling', items: ['Claude API', 'Claude Code', 'RAG', 'Docker', 'Git', 'Vercel / Render'] },
];

// [05] ABOUT -----------------------------------------------------------------
export const about = {
  lead: 'I am a',
  accent: 'builder',
  tail: ' first',
  body: [
    'I am a Computer Engineering student at the University of Lagos, working where software ' +
      'meets hardware. Under contract, I built the Android app and Arduino firmware for a ' +
      'cashless fuel pump. On my own time, I shipped four full-stack apps in four months.',
    'I build AI-accelerated, on purpose. I design the system and freeze the interfaces, let ' +
      'agents do the typing, then verify every boundary myself. That is where the bugs that ' +
      'pass every test tend to hide.',
  ],
};

// [06] EXPERIENCE / ACHIEVEMENTS ---------------------------------------------
export interface TimelineEntry {
  year: string;
  title: string;
  org: string;
  body: string;
}
// All real (MASTER-CV.md §7 + the Balanceè engagement letter). Newest first.
export const timeline: TimelineEntry[] = [
  {
    year: '2026—now',
    title: 'Android Developer (Contract)',
    org: 'Balanceè Tech Solutions',
    body:
      'Sole developer of SmartPump, an Android + Arduino system that makes fuel pumps ' +
      'self-service and cashless. 600+ automated tests, crash- and power-cut-safe by design.',
  },
  {
    year: '2025—now',
    title: 'Financial Secretary (elected)',
    org: 'SEES, University of Lagos',
    body:
      'Run the finances of the electrical & electronics engineering students’ society across six ' +
      'annual programmes, and lead corporate sponsorship outreach.',
  },
  {
    year: '2023—now',
    title: 'Class Representative',
    org: 'Computer Engineering, University of Lagos',
    body: 'Liaison between faculty and a 100+ student cohort since first year.',
  },
  {
    year: '2023—2028',
    title: 'B.Sc. Computer Engineering',
    org: 'University of Lagos',
    body: 'Software and embedded systems coursework, with projects built alongside the curriculum.',
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
// Real certificates; titles, dates and links read from the PDFs in EKOM\Certs.
export const certificates: Certificate[] = [
  {
    title: 'Beginning C++ Programming',
    issuer: 'Udemy',
    year: '2025',
    href: 'https://www.udemy.com/certificate/UC-385df29e-18b7-4ea4-9db9-e8fc3af13bd4/',
  },
  {
    title: 'Crash Course on Python',
    issuer: 'Google · Coursera',
    year: '2025',
    href: 'https://coursera.org/verify/KJHRH6B5ZTL4',
  },
  {
    title: 'The Complete C Programming Course',
    issuer: 'Udemy',
    year: '2025',
    href: 'https://www.udemy.com/certificate/UC-bd383c1f-92de-482d-962d-65ce405f5495/',
  },
  // Real cert with no public credential link — card renders without "View credential".
  { title: 'Embedded Systems Design', issuer: 'ECX', year: '2025' },
  // Honest in-progress marker (matches the legacy "currently studying" pattern).
  { title: 'Currently studying', issuer: 'In progress', year: '', inProgress: true },
];

// [08] WRITING ---------------------------------------------------------------
// Posts now live in the `blog` content collection (src/content/blog/*.md) and
// are read directly by Writing.astro / the /blog pages. No placeholder data here.
