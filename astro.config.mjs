import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"
import { remarkHeadingId } from 'remark-custom-heading-id'
import remarkCodeTitles from "remark-code-titles";

// https://astro.build/config
export default defineConfig({
  integrations: [ tailwind() ],
  site: 'https://derekbrown.io',
  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [ remarkHeadingId, remarkCodeTitles ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
  },
});