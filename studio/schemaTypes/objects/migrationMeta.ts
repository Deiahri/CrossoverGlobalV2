import { defineField, defineType } from 'sanity'

/**
 * Provenance from the Strapi import. Kept small and hidden — it exists for
 * debugging, redirect checks, and re-running the migration, not for editors.
 */
export const migrationMeta = defineType({
  name: 'migrationMeta',
  title: 'Migration metadata',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: 'sourceSystem', type: 'string', title: 'Source system' }),
    defineField({ name: 'sourceId', type: 'string', title: 'Strapi documentId' }),
    defineField({ name: 'sourceType', type: 'string', title: 'Strapi collection' }),
    defineField({ name: 'legacyUrl', type: 'string', title: 'Legacy URL path' }),
    defineField({ name: 'migratedAt', type: 'datetime', title: 'Migrated at' }),
  ],
})
