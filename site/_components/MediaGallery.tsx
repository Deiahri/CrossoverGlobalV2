import Image from 'next/image'
import type { StrapiMedia } from '../lib/types'

interface MediaGalleryProps {
  items: StrapiMedia[]
  heading?: string
}

export default function MediaGallery({ items, heading }: MediaGalleryProps) {
  if (!items || items.length === 0) return null

  return (
    <section aria-label={heading ?? 'Media gallery'}>
      {heading && (
        <h2 className="mb-6 text-2xl font-bold text-foreground">{heading}</h2>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-square">
            {item.mime.startsWith('video/') ? (
              <video
                src={item.url}
                controls
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
                aria-label={item.alternativeText ?? `Video ${i + 1}`}
              />
            ) : (
              <Image
                src={item.url}
                alt={item.alternativeText ?? `Photo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover hover:scale-105 transition-transform"
                style={{ transitionDuration: 'var(--duration-slow)' }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
