import { defineField, defineType } from 'sanity'

/** Port of Strapi component `site-components.optional-section`. */
export const optionalSection = defineType({
  name: 'optionalSection',
  title: 'Optional section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      title: 'Content',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: 'title' } },
})
