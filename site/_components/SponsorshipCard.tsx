import Image from 'next/image'
import Link from 'next/link'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import Badge from './Badge'
import type { Sponsorship } from '../lib/types'

type SponsorshipCardProps = Pick<Sponsorship, 'slug' | 'title' | 'image' | 'desc' | 'country' | 'sponsee' | 'complete'>

export default function SponsorshipCard({ slug, title, image, desc, country, sponsee, complete }: SponsorshipCardProps) {
  return (
    <Link
      href={`/sponsorship/${slug}`}
      className="group relative flex flex-col rounded-xl overflow-hidden border border-border bg-surface shadow-sm hover:shadow-md transition-shadow"
      style={{ transitionDuration: 'var(--duration-normal)' }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={image.url}
          alt={image.alternativeText ?? sponsee}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
          style={{ transitionDuration: 'var(--duration-slow)' }}
        />
        <div className="absolute top-3 left-3">
          <Badge label={country} variant="country" />
        </div>
        {complete && (
          <div className="absolute inset-0 bg-neutral-900/60 flex items-center justify-center">
            <span className="flex items-center gap-2 bg-white/90 text-neutral-800 text-sm font-semibold px-4 py-2 rounded-full shadow">
              <RiCheckboxCircleLine className="w-4 h-4 text-green-600" aria-hidden />
              Sponsored
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-fg">{sponsee}</p>
        <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
          {title}
        </h3>
        <p className="text-sm text-muted-fg leading-relaxed line-clamp-2">{desc}</p>
      </div>
    </Link>
  )
}
