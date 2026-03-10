// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio-sage-two-43.vercel.app',
  output: 'server',
  security: {
    checkOrigin: false
  },
  integrations: [preact(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});