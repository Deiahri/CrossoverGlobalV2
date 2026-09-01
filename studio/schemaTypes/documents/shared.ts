import { defineField } from 'sanity'

/**
 * Strapi's `createdAt` carried across verbatim.
 *
 * The site orders projects/sponsorships by `createdAt desc` and supporters by
 * `createdAt asc`. Sanity's `_createdAt` would be the *migration* timestamp, so
 * ordering by it would scramble every list into import order. Order by this
 * instead. New documents fall back to `_createdAt` in the GROQ coalesce.
 */
export const legacyCreatedAt = defineField({
  name: 'legacyCreatedAt',
  type: 'datetime',
  title: 'Original creation date',
  description: 'Imported from Strapi. Controls list ordering — leave alone unless reordering.',
  readOnly: true,
  hidden: ({ currentUser }) => !currentUser?.roles?.some((r) => r.name === 'administrator'),
})

export const slugField = (source: string) =>
  defineField({
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    description: 'URL segment. Changing this breaks existing links.',
    options: { source, maxLength: 96 },
    validation: (Rule) => Rule.required(),
  })

export const imageField = (name: string, title: string, required = false) =>
  defineField({
    name,
    type: 'image',
    title,
    options: { hotspot: true },
    fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    validation: (Rule) => (required ? Rule.required() : Rule),
  })

export const donorboxField = (name: string, title: string, required = false) =>
  defineField({
    name,
    type: 'text',
    title,
    rows: 4,
    description:
      'Raw Donorbox embed HTML. This is injected into the page unmodified — paste only from donorbox.org.',
    validation: (Rule) => (required ? Rule.required() : Rule),
  })

/** Provenance from the Strapi import — hidden from editors. */
export const migrationField = defineField({
  name: 'migration',
  type: 'migrationMeta',
  title: 'Migration metadata',
  readOnly: true,
  hidden: ({ currentUser }) => !currentUser?.roles?.some((r) => r.name === 'administrator'),
})
