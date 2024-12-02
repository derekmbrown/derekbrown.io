import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const notes = await getCollection('notes')
  notes.sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate))

  return rss({
    xmlns: ({ atom: 'http://www.w3.org/2005/Atom' }),
    customData: 
      `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    title: 'Derek Brown\'s Notes',
    description: 'Notes from Derek Brown.',
    site: context.site,
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.pubDate,
      link: `/note/${note.slug}/`
    }))
  })
}