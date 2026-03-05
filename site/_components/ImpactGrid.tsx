"use client";

import { useState } from 'react'
import type { ProjectImpact, StrapiMedia } from '../lib/types'
import { resolveStrapiMediaUrl } from '../lib/tools'
import Lightbox from './Lightbox'

interface ImpactGridProps {
  impacts: ProjectImpact[]
}

function MediaCluster({ media, onOpen }: { media: StrapiMedia[]; onOpen: (i: number) => void }) {
  const count = media.length

  if (count === 0) return null

  if (count === 1) {
    const m = media[0]
    return (
      <button
        onClick={() => onOpen(0)}
        className="w-full h-full overflow-hidden rounded-xl cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="View photo"
      >
        {m.mime.startsWith('video/') ? (
          <video src={resolveStrapiMediaUrl(m.url)} className="w-full h-full object-cover" preload="metadata" />
        ) : (
          <img src={resolveStrapiMediaUrl(m.url)} alt={m.alternativeText ?? ''} className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" />
        )}
      </button>
    )
  }

  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-2 h-full">
        {media.map((m, j) => (
          <button key={j} onClick={() => onOpen(j)} className="overflow-hidden rounded-xl cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`View photo ${j + 1}`}>
            {m.mime.startsWith('video/') ? (
              <video src={resolveStrapiMediaUrl(m.url)} className="w-full h-full object-cover" preload="metadata" />
            ) : (
              <img src={resolveStrapiMediaUrl(m.url)} alt={m.alternativeText ?? ''} className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" />
            )}
          </button>
        ))}
      </div>
    )
  }

  // 3+ images: big left, two stacked right
  const [first, second, third] = media
  const extra = count - 3
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {/* Big left */}
      <button onClick={() => onOpen(0)} className="row-span-2 overflow-hidden rounded-xl cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="View photo 1">
        {first.mime.startsWith('video/') ? (
          <video src={resolveStrapiMediaUrl(first.url)} className="w-full h-full object-cover" preload="metadata" />
        ) : (
          <img src={resolveStrapiMediaUrl(first.url)} alt={first.alternativeText ?? ''} className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" />
        )}
      </button>
      {/* Top right */}
      <button onClick={() => onOpen(1)} className="overflow-hidden rounded-xl cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="View photo 2">
        {second.mime.startsWith('video/') ? (
          <video src={resolveStrapiMediaUrl(second.url)} className="w-full h-full object-cover" preload="metadata" />
        ) : (
          <img src={resolveStrapiMediaUrl(second.url)} alt={second.alternativeText ?? ''} className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" />
        )}
      </button>
      {/* Bottom right — shows +extra overlay if more */}
      <button onClick={() => onOpen(2)} className="relative overflow-hidden rounded-xl cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={extra > 0 ? `View all ${count} photos` : 'View photo 3'}>
        {third.mime.startsWith('video/') ? (
          <video src={resolveStrapiMediaUrl(third.url)} className="w-full h-full object-cover" preload="metadata" />
        ) : (
          <img src={resolveStrapiMediaUrl(third.url)} alt={third.alternativeText ?? ''} className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" />
        )}
        {extra > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
            <span className="text-white text-lg font-bold">+{extra}</span>
          </div>
        )}
      </button>
    </div>
  )
}

export default function ImpactGrid({ impacts }: ImpactGridProps) {
  const [lightboxMedia, setLightboxMedia] = useState<StrapiMedia[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!impacts || impacts.length === 0) return null

  const openLightbox = (media: StrapiMedia[], index: number) => {
    setLightboxMedia(media)
    setLightboxIndex(index)
  }

  const closeLightbox = () => setLightboxMedia(null)
  const prev = () => setLightboxIndex((i) => (i - 1 + lightboxMedia!.length) % lightboxMedia!.length)
  const next = () => setLightboxIndex((i) => (i + 1) % lightboxMedia!.length)

  return (
    <>
      <section aria-label="Project impact">
        <h2 className="mb-8 text-4xl font-bold text-foreground">Impact</h2>
        <div className="flex flex-col">
          {impacts.map((impact, i) => {
            const flip = i % 2 !== 0
            const hasMedia = impact.media && impact.media.length > 0

            const textBlock = (
              <div className="flex flex-col justify-center py-2">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-6xl font-bold text-primary leading-none tracking-tight">
                    {impact.quantity}
                  </span>
                  <span className="text-base font-semibold text-accent-fg uppercase tracking-widest">
                    {impact.verb}
                  </span>
                </div>
                <p className="text-base text-muted-fg leading-relaxed max-w-sm">
                  {impact.description}
                </p>
              </div>
            )

            const mediaBlock = hasMedia ? (
              <div className="h-64 sm:h-72">
                <MediaCluster media={impact.media} onOpen={(j) => openLightbox(impact.media, j)} />
              </div>
            ) : null

            return (
              <div
                key={i}
                className={`flex flex-col gap-8 py-10 border-t border-border ${
                  hasMedia ? 'sm:grid sm:grid-cols-2 sm:items-center' : ''
                }`}
              >
                {flip && hasMedia ? (
                  <>{mediaBlock}{textBlock}</>
                ) : (
                  <>{textBlock}{mediaBlock}</>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {lightboxMedia && (
        <Lightbox
          items={lightboxMedia}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
          onJump={setLightboxIndex}
        />
      )}
    </>
  )
}
