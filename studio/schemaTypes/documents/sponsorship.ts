import { defineField, defineType } from 'sanity'
import { donorboxField, imageField, legacyCreatedAt, migrationField, slugField } from './shared'

export const sponsorship = defineType({
  name: 'sponsorship',
  title: 'Sponsorship',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main', default: true },
    { name: 'content', title: 'Content' },
    { name: 'giving', title: 'Giving' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
    { ...slugField('title'), group: 'main' },
    defineField({
      name: 'sponsee',
      type: 'string',
      title: 'Sponsee name',
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'country',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'shortDesc',
      type: 'text',
      title: 'Short description',
      rows: 3,
      description: 'Shown on the sponsorship card.',
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
    { ...imageField('image', 'Cover image', true), group: 'main' },
    defineField({
      name: 'sponseeDesc',
      type: 'blockContent',
      title: 'About the sponsee',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'sponseeRequestDesc',
      type: 'blockContent',
      title: 'Needs / itemised costs',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'sponseeRequestVideo',
      type: 'url',
      title: 'Request video (YouTube)',
      group: 'content',
    }),
    defineField({
      name: 'optionalSections',
      type: 'array',
      title: 'Optional sections',
      of: [{ type: 'optionalSection' }],
      group: 'content',
    }),
    defineField({
      name: 'encouragement',
      type: 'string',
      title: 'Encouragement',
      description: 'Short call-to-action shown above the donate widget.',
      validation: (Rule) => Rule.required(),
      group: 'giving',
    }),
    { ...donorboxField('donorboxCode', 'Donorbox embed', true), group: 'giving' },
    defineField({
      name: 'complete',
      type: 'boolean',
      title: 'Sponsored',
      initialValue: false,
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
    { ...legacyCreatedAt, group: 'main' },
    { ...migrationField, group: 'main' },
  ],
  orderings: [
    {
      title: 'Site order (available first, newest first)',
      name: 'siteOrder',
      by: [
        { field: 'complete', direction: 'asc' },
        { field: 'legacyCreatedAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', sponsee: 'sponsee', country: 'country', complete: 'complete', media: 'image' },
    prepare: ({ title, sponsee, country, complete, media }) => ({
      title,
      subtitle: [sponsee, country, complete ? 'Sponsored' : 'Available'].filter(Boolean).join(' · '),
      media,
    }),
  },
})
