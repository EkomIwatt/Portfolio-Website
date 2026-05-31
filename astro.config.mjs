// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site lives at https://ekomiwatt.github.io/Portfolio-Website/
// `base` must wrap every internal link/asset path — use import.meta.env.BASE_URL,
// never a hardcoded leading "/". Integrations (react, sitemap, tailwind) are added
// by `astro add` in Stage 0.
export default defineConfig({
  site: 'https://ekomiwatt.github.io',
  base: '/Portfolio-Website',
  integrations: [
    react(),
    // Keep noindex dev/stub routes out of the sitemap (throwaway /swatch tuning
    // page + the "coming soon" /projects stub). Drop these filters once the real
    // catalogue ships and /swatch is deleted at cutover.
    sitemap({
      filter: (page) => !page.includes('/swatch') && !page.includes('/projects'),
    }),
  ],

  vite: {
    // Dedupe React so Vite's dev dep-cache can't load two copies — a duplicate
    // React nulls the hook dispatcher and crashes every island on mount in dev
    // ("Cannot read properties of null (reading 'useRef')"). No effect on the
    // production bundle. Fixes the aurora (CrimsonField) + cert stack in dev.
    resolve: { dedupe: ['react', 'react-dom'] },
    plugins: [tailwindcss()],
  },
});