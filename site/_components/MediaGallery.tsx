'use client'

import { useState } from 'react'
import { RiPlayCircleLine } from 'react-icons/ri'
import type { StrapiMedia } from '../lib/types'
import { resolveStrapiMediaUrl } from '@/lib/tools'
import Lightbox from './Lightbox'

interface MediaGalleryProps {
  items: StrapiMedia[]
  heading?: string
}

export default function MediaGallery({ items, heading }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!items || items.length === 0) return null

  const total = items.length

  return (
    <section aria-label={heading ?? 'Media gallery'}>
      {heading && (
        <h2 className="mb-6 text-2xl font-bold text-foreground">{heading}</h2>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-square group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={item.alternativeText ?? (item.mime.startsWith('video/') ? `Video ${i + 1}` : `Photo ${i + 1}`)}
          >
            {item.mime.startsWith('video/') ? (
              <>
                <video
                  src={item.url}
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                  tabIndex={-1}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                  <RiPlayCircleLine className="w-10 h-10 text-white drop-shadow" />
                </div>
              </>
            ) : (
              <img
                src={resolveStrapiMediaUrl(item.url)}
                alt={item.alternativeText ?? `Photo ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                style={{ transitionDuration: 'var(--duration-slow)' }}
              />
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + total) % total)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % total)}
          onJump={setLightboxIndex}
        />
      )}
    </section>
  )
}
