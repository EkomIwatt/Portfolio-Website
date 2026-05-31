/**
 * Central content for the homepage. Real copy where it exists; everything that
 * depends on shipped work is a clearly-marked PLACEHOLDER and tracked in
 * /PLACEHOLDERS.md. Nothing fabricated ships — placeholders are replaced with
 * real content before the Stage 5 cutover (the cutover gate).
 *
 * PLACEHOLDER markers below = temporary scaffolding (Ekom is building the real
 * projects after this rebrand, then documenting each here).
 */

export const site = {
  name: 'Ekomobong Iwatt',
  logo: 'ekom', // rendered with a crimson period: ekom.
  role: 'Software Engineer',
  location: 'Lagos, Nigeria',
  email: 'ekomzwatt@gmail.com', // real (from CV)
  status: 'Open to internships & new-grad roles',
  socials: {
    github: 'https://github.com/EkomIwatt',
    linkedin: 'https://linkedin.com/in/ekomiwatt', // real (from CV)
    x: 'https://x.com/yr_Ekom', // ported from legacy meta
  },
  twitterHandle: '@yr_Ekom', // for twitter:site / twitter:creator
  // Floating contact channels (bottom-right FABs).
  whatsapp: 'https://wa.me/2340000000000', // PLACEHOLDER: real WhatsApp number
  phone: 'tel:+2340000000000', // PLACEHOLDER: real phone number
  // Dark-theme résumé page (Stage 4). A downloadable PDF can replace this later.
  resumeUrl: `${import.meta.env.BASE_URL}/cv`,
  // PLACEHOLDER: Formspree form id (create at formspree.io) → endpoint below.
  formspreeId: 'your-form-id',
};

export interface NavLink {
  label: string;
  href: string;
  num: string;
}

export const navLinks: NavLink[] = [
  { label: 'Work', href: '#work', num: '01' },
  { label: 'Process', href: '#process', num: '02' },
  { label: 'Stack', href: '#stack', num: '04' },
  { label: 'About', href: '#about', num: '05' },
  { label: 'Writing', href: '#writing', num: '08' },
];

export const hero = {
  eyebrow: 'Computer Engineering · University of Lagos',
  // Headline renders as: lead + <italic crimson accent> + tail + crimson period
  headline: {
    lead: 'I build software that',
    accent: 'ships',
    tail: '',
  },
  sub:
    'Software engineer in the making — AI-accelerated, engineering-grounded. ' +
    'I move from idea to working product fast, then document every build in the open.',
  ctas: {
    primary: { label: "Let's talk", href: '#contact' },
    secondary: { label: 'View résumé', href: `${import.meta.env.BASE_URL}/cv` },
  },
  // Mono "spec line" under the hero — real where possible.
  spec: [
    { k: 'Focus', v: 'Software + embedded' },
    { k: 'Based', v: 'Lagos, NG' },
    { k: 'Status', v: 'Available' },
  ],
};
