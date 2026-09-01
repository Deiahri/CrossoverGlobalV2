import { defineField, defineType } from 'sanity'
import { imageField, legacyCreatedAt, migrationField, slugField } from './shared'

export const article = defineType({
  name: 'article',
  title: 'Good News article',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    slugField('title'),
    defineField({
      name: 'desc',
      type: 'text',
      title: 'Short description',
      rows: 3,
      description: 'Shown on the article card.',
    }),
    imageField('featuredImage', 'Featured image'),
    defineField({
      name: 'publishDate',
      type: 'datetime',
      title: 'Publish date',
      description: 'Controls ordering on /good-news.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'author', type: 'string' }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content sections',
      of: [{ type: 'contentSection' }],
    }),
    legacyCreatedAt,
    migrationField,
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', author: 'author', publishDate: 'publishDate', media: 'featuredImage' },
    prepare: ({ title, author, publishDate, media }) => ({
      title,
      subtitle: [publishDate ? new Date(publishDate).toLocaleDateString() : null, author]
        .filter(Boolean)
        .join(' · '),
      media,
    }),
  },
})
