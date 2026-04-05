// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://dear.is-a.dev',
  output: 'static',
  integrations: [preact(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});