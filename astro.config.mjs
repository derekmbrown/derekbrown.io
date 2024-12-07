import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"
import { remarkHeadingId } from 'remark-custom-heading-id'
import remarkCodeTitles from 'remark-code-titles'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  integrations: [ tailwind(), sitemap()],
  site: 'https://derekbrown.io',
  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [ remarkHeadingId, remarkCodeTitles ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
  },
  trailingSlash: 'never'
});