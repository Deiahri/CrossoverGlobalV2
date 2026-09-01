import { defineField, defineType } from 'sanity'

/** Port of Strapi component `site-components.project-impact`. */
export const projectImpact = defineType({
  name: 'projectImpact',
  title: 'Impact',
  type: 'object',
  fields: [
    defineField({
      name: 'quantity',
      type: 'string',
      title: 'Quantity',
      description: 'Rendered large, e.g. "120" or "3 villages".',
    }),
    defineField({
      name: 'verb',
      type: 'string',
      title: 'Verb',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
    defineField({ name: 'media', type: 'mediaItems', title: 'Media' }),
  ],
  preview: {
    select: { quantity: 'quantity', verb: 'verb', media: 'media.0.asset' },
    prepare: ({ quantity, verb, media }) => ({
      title: [quantity, verb].filter(Boolean).join(' ') || 'Impact',
      media,
    }),
  },
})
