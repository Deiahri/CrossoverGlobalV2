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
  return (
    <Link
      href={`/good-news/${slug}`}
      className="group flex gap-6 py-8"
    >
      {/* Thumbnail */}
      <div className="hidden sm:block flex-shrink-0 w-44 h-28 rounded-lg overflow-hidden bg-neutral-100">
        <img
          src={resolveStrapiImageUrl(featured_image.url)}
          alt={featured_image.alternativeText ?? title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          style={{ transitionDuration: 'var(--duration-slow)' }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-2 text-xs text-muted-fg">
          <time dateTime={publish_date}>{formatDate(publish_date)}</time>
          {author && (
            <>
              <span aria-hidden>·</span>
              <span>{author}</span>
            </>
          )}
        </div>
        <h3
          className="text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors"
          style={{ transitionDuration: 'var(--duration-fast)' }}
        >
          {title}
        </h3>
        <p className="text-sm text-muted-fg leading-relaxed line-clamp-2">{desc}</p>
      </div>
    </Link>
  )
}
