import type { SchemaTypeDefinition } from 'sanity'

import { blockContent } from './objects/blockContent'
import { contentSection } from './objects/contentSection'
import { fileItem, imageItem, mediaItems } from './objects/mediaItems'
import { migrationMeta } from './objects/migrationMeta'
import { optionalSection } from './objects/optionalSection'
import { projectImpact } from './objects/projectImpact'

import { article } from './documents/article'
import { project } from './documents/project'
import { sponsorship } from './documents/sponsorship'
import { supporter } from './documents/supporter'

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  project,
  sponsorship,
  article,
  supporter,
  // objects
  blockContent,
  mediaItems,
  imageItem,
  fileItem,
  contentSection,
  projectImpact,
  optionalSection,
  migrationMeta,
]
