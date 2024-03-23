import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Derek Brown\'s Notes',
    description: 'Notes from Derek Brown.',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./notes/*.{md,mdx}'))
  })
}