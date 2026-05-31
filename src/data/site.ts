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
  email: 'ekomiwatt@example.com', // PLACEHOLDER: real contact email
  status: 'Open to internships & new-grad roles',
  socials: {
    github: 'https://github.com/EkomIwatt',
    linkedin: '#', // PLACEHOLDER: LinkedIn URL
  },
  // Floating contact channels (bottom-right FABs).
  whatsapp: 'https://wa.me/2340000000000', // PLACEHOLDER: real WhatsApp number
  phone: 'tel:+2340000000000', // PLACEHOLDER: real phone number
  // PLACEHOLDER: real résumé/CV file — wire the existing cv page or a PDF at cutover.
  resumeUrl: '#',
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
    secondary: { label: 'View résumé', href: '#contact' }, // wired to real CV at cutover
  },
  // Mono "spec line" under the hero — real where possible.
  spec: [
    { k: 'Focus', v: 'Software + embedded' },
    { k: 'Based', v: 'Lagos, NG' },
    { k: 'Status', v: 'Available' },
  ],
};
