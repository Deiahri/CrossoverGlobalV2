import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Strapi's `media` fields accepted images, videos and audio in a single array.
 * Sanity separates `image` assets (transformable, CDN-derived) from `file`
 * assets (served as-is), so one Strapi field becomes an array of two member
 * types. The GROQ layer in `sanity/queries.ts` flattens both back into the
 * `{ url, mime, alternativeText, width, height }` shape the UI already branches
 * on via `mime.startsWith('video/')`.
 */
export const imageItem = defineType({
  name: 'imageItem',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
  ],
})

export const fileItem = defineType({
  name: 'fileItem',
  title: 'Video or file',
  type: 'object',
  fields: [
    defineField({
      name: 'file',
      type: 'file',
      title: 'File',
      description:
        'Video here is served as a raw download with no adaptive streaming, and counts ' +
        'against a hard 100 GB/month bandwidth cap — exceeding it blocks ALL assets, ' +
        'images included. Keep clips small, or prefer the YouTube URL field on content ' +
        'sections. See docs/video-hosting-risk.md.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
  ],
  preview: {
    select: { title: 'caption', subtitle: 'file.asset.originalFilename' },
    prepare: ({ title, subtitle }) => ({ title: title || subtitle || 'File', subtitle }),
  },
})

export const mediaItems = defineType({
  name: 'mediaItems',
  title: 'Media',
  type: 'array',
  of: [defineArrayMember({ type: 'imageItem' }), defineArrayMember({ type: 'fileItem' })],
  options: { layout: 'grid' },
})
