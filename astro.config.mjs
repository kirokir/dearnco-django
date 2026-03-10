// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://arjun-jayesh.com',
  output: 'server',
  integrations: [preact(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: node({
    mode: 'standalone'
  })
});