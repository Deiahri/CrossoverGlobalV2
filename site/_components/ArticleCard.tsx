import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '../lib/types'
import { resolveStrapiImageUrl } from '@/lib/tools'

type ArticleCardProps = Pick<Article, 'slug' | 'title' | 'desc' | 'featured_image' | 'publish_date' | 'author'>

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ArticleCard({ slug, title, desc, featured_image, publish_date, author }: ArticleCardProps) {
  console.log('img', featured_image);
  return (
    <Link
      href={`/good-news/${slug}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-border bg-surface shadow-sm hover:shadow-md transition-shadow"
      style={{ transitionDuration: 'var(--duration-normal)' }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-neutral-100">
        <img
          src={resolveStrapiImageUrl(featured_image.url)}
          alt={featured_image.alternativeText ?? title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          style={{ transitionDuration: 'var(--duration-slow)' }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-fg">
          <time dateTime={publish_date}>{formatDate(publish_date)}</time>
          {author && (
            <>
              <span aria-hidden>·</span>
              <span>{author}</span>
            </>
          )}
        </div>
        <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors" style={{ transitionDuration: 'var(--duration-fast)' }}>
          {title}
        </h3>
        <p className="text-sm text-muted-fg leading-relaxed line-clamp-3">{desc}</p>
      </div>
    </Link>
  )
}
