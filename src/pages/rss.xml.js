import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const notes = await getCollection('notes')
  notes.sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate))

  return rss({
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