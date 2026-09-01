import { defineField, defineType } from 'sanity'
import { imageField, legacyCreatedAt, migrationField } from './shared'

export const supporter = defineType({
  name: 'supporter',
  title: 'Supporter',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    { ...imageField('image', 'Logo', true) },
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'website',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    legacyCreatedAt,
    migrationField,
  ],
  orderings: [
    {
      title: 'Site order (oldest first)',
      name: 'siteOrder',
      by: [{ field: 'legacyCreatedAt', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'website', media: 'image' },
  },
})
