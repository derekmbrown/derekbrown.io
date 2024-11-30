import { z, defineCollection } from 'astro:content'

const noteCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    tags: z.array(z.string()),
  })
})

export const collections = { 'notes': noteCollection }