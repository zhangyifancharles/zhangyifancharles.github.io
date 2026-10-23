import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { deploymentLocation } from './scripts/deployment.mjs';
import remarkSiteLinks from './scripts/remark-site-links.mjs';
const location = deploymentLocation();
export default defineConfig({
  ...location,
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.match(/\/404\/?$/) })],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, [remarkSiteLinks, { base: location.base }]],
      rehypePlugins: [[rehypeKatex, { strict: 'warn', throwOnError: false }]],
    }),
    shikiConfig: { theme: 'github-light', wrap: false },
  },
});
