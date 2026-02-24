import Image from 'next/image'
import Link from 'next/link'
import { RiMapPin2Line } from 'react-icons/ri'
import Badge from './Badge'
import type { Project } from '../lib/types'

type ProjectCardProps = Pick<Project, 'slug' | 'title' | 'image' | 'desc' | 'location' | 'complete' | 'amount_raised'>

export default function ProjectCard({ slug, title, image, desc, location, complete, amount_raised }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-border bg-surface shadow-sm hover:shadow-md transition-shadow"
      style={{ transitionDuration: 'var(--duration-normal)' }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-neutral-100">
        <Image
          src={image.url}
          alt={image.alternativeText ?? title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
          style={{ transitionDuration: 'var(--duration-slow)' }}
        />
        <div className="absolute top-3 left-3">
          <Badge label={complete ? 'Completed' : 'Active'} variant={complete ? 'completed' : 'active'} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
          {title}
        </h3>
        <p className="text-sm text-muted-fg leading-relaxed line-clamp-2">
          {desc}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
          <span className="flex items-center gap-1 text-xs text-muted-fg">
            <RiMapPin2Line className="w-3.5 h-3.5 shrink-0" aria-hidden />
            {location}
          </span>
          {amount_raised && (
            <span className="text-xs font-semibold text-primary">
              {amount_raised} raised
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
