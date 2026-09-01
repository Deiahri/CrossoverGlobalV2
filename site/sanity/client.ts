import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from './env'

/**
 * Read-only client for the public site.
 *
 * `perspective: 'published'` matters: the free plan only offers public
 * datasets, so drafts are readable by anyone with the project ID. Pinning the
 * perspective keeps unpublished edits off the live site.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})
