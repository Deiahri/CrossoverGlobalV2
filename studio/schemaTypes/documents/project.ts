import { defineField, defineType } from 'sanity'
import { donorboxField, imageField, legacyCreatedAt, migrationField, slugField } from './shared'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main', default: true },
    { name: 'content', title: 'Content' },
    { name: 'giving', title: 'Giving' },
    { name: 'completion', title: 'Completion' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
    { ...slugField('title'), group: 'main' },
    { ...imageField('image', 'Cover image'), group: 'main' },
    defineField({
      name: 'desc',
      type: 'text',
      title: 'Short description',
      rows: 3,
      description: 'Shown on the project card.',
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'location',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content sections',
      of: [{ type: 'contentSection' }],
      group: 'content',
    }),
    defineField({
      name: 'bibleVerseContent',
      type: 'text',
      title: 'Bible verse',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'bibleVerseCv',
      type: 'string',
      title: 'Bible verse citation',
      description: 'e.g. "2 Timothy 1:7"',
      group: 'content',
    }),
    defineField({
      name: 'impacts',
      type: 'array',
      title: 'Impacts',
      of: [{ type: 'projectImpact' }],
      group: 'content',
    }),
    defineField({
      name: 'postProjectPhotos',
      type: 'mediaItems',
      title: 'Post-project photos',
      group: 'content',
    }),
    { ...donorboxField('donorboxCode', 'Donorbox embed', true), group: 'giving' },
    { ...donorboxField('donorboxWall', 'Donorbox donor wall'), group: 'giving' },
    defineField({
      name: 'amountRaised',
      type: 'number',
      title: 'Amount raised (USD)',
      validation: (Rule) => Rule.min(0),
      group: 'giving',
    }),
    defineField({
      name: 'complete',
      type: 'boolean',
      title: 'Complete',
      initialValue: false,
      validation: (Rule) => Rule.required(),
      group: 'completion',
    }),
    defineField({
      name: 'completionDate',
      type: 'datetime',
      title: 'Completion date',
      group: 'completion',
    }),
    defineField({
      name: 'completionNotes',
      type: 'text',
      title: 'Completion notes',
      rows: 4,
      group: 'completion',
    }),
    { ...legacyCreatedAt, group: 'main' },
    { ...migrationField, group: 'main' },
  ],
  orderings: [
    {
      title: 'Site order (active first, newest first)',
      name: 'siteOrder',
      by: [
        { field: 'complete', direction: 'asc' },
        { field: 'legacyCreatedAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', location: 'location', complete: 'complete', media: 'image' },
    prepare: ({ title, location, complete, media }) => ({
      title,
      subtitle: [location, complete ? 'Complete' : 'Active'].filter(Boolean).join(' · '),
      media,
    }),
  },
})
