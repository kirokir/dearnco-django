// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://dear.is-a.dev',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [preact(), mdx(), sitemap()],

  server: {
    host: '0.0.0.0',
    port: 10000,
  },

  vite: {
    plugins: [tailwindcss()]
  }
});