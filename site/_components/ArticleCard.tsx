import Link from 'next/link'
import { RiArrowRightLine } from 'react-icons/ri'
import type { Article } from '../lib/types'
import { resolveStrapiMediaUrl } from '@/lib/tools'

type ArticleCardProps = Article;

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
      className="group flex gap-5 p-5 rounded-xl border border-border bg-surface hover:bg-surface-raised hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer"
      style={{ transitionDuration: 'var(--duration-fast)' }}
    >
      {/* Thumbnail */}
      <div className="hidden sm:block shrink-0 w-40 h-28 rounded-lg overflow-hidden bg-neutral-100">
        <img
          src={resolveStrapiMediaUrl(featured_image?.url || '')}
          alt={featured_image?.alternativeText ?? title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          style={{ transitionDuration: 'var(--duration-slow)' }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 min-w-0 flex-1">
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
        <span className="mt-auto pt-1 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity" style={{ transitionDuration: 'var(--duration-fast)' }}>
          Read more <RiArrowRightLine className="transition-transform group-hover:translate-x-0.5" style={{ transitionDuration: 'var(--duration-fast)' }} />
        </span>
      </div>
    </Link>
  )
}
