import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import { remarkHeadingId } from 'remark-custom-heading-id'
import remarkCodeTitles from 'remark-code-titles'
import sitemap from '@astrojs/sitemap'
import icon from "astro-icon"
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), icon(), mdx(), react()],
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