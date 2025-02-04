import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const noteCollection = defineCollection({
  loader: glob({ pattern: '**/*.(md|mdx)', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.datetime(),
    tags: z.array(z.string()),
  })
})

export const collections = { 'notes': noteCollection }