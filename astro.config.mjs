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
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});