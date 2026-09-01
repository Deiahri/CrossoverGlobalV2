import { defineField, defineType } from 'sanity'

/** Port of Strapi component `site-components.content-and-image`. */
export const contentSection = defineType({
  name: 'contentSection',
  title: 'Content section',
  type: 'object',
  fields: [
    defineField({ name: 'media', type: 'mediaItems', title: 'Media' }),
    defineField({ name: 'text', type: 'blockContent', title: 'Text' }),
    defineField({
      name: 'youtubeUrl',
      type: 'url',
      title: 'YouTube URL',
      description: 'Full watch or youtu.be link — the embed URL is derived automatically.',
    }),
  ],
  preview: {
    select: { text: 'text', media: 'media.0.asset' },
    prepare: ({ text, media }) => {
      const first = Array.isArray(text)
        ? text.find((b) => b?._type === 'block')?.children?.map((c: { text?: string }) => c.text ?? '').join('')
        : null
      return { title: first?.slice(0, 60) || 'Content section', media }
    },
  },
})
