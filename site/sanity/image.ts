import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from './env'

const builder = createImageUrlBuilder({ projectId, dataset })

/**
 * Build a transformed CDN URL, e.g. `urlFor(img).width(800).auto('format').url()`.
 * Serving right-sized images keeps bandwidth well inside the free tier's
 * 100 GB/month.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
