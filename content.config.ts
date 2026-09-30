import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: { include: 'journal/*.md', prefix: '/journal' },
      schema: z.object({ date: z.string(), category: z.string() })
    })
  }
})
