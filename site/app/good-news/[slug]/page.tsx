import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getArticle, getArticleSlugs } from '../../../lib/api'
import RichText from '../../../_components/RichText'
import { RiArrowLeftLine, RiCalendarLine, RiUserLine } from 'react-icons/ri'
import { resolveStrapiImageUrl } from '@/lib/tools'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.desc,
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const formattedDate = new Date(article.publish_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article>
      {/* Back link */}
      <div className="mt-12 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/good-news"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary transition-colors"
          style={{ transitionDuration: 'var(--duration-fast)' }}
        >
          <RiArrowLeftLine className="w-4 h-4" aria-hidden />
          All Articles
        </Link>
      </div>

      {/* Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-fg mb-4">
          <span className="flex items-center gap-1.5">
            <RiCalendarLine className="w-4 h-4" aria-hidden />
            <time dateTime={article.publish_date}>{formattedDate}</time>
          </span>
          {article.author && (
            <span className="flex items-center gap-1.5">
              <RiUserLine className="w-4 h-4" aria-hidden />
              {article.author}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-muted-fg leading-relaxed">{article.desc}</p>
      </div>

      {/* Featured image */}
      <div className="mx-auto relative aspect-video max-w-7xl overflow-hidden bg-neutral-200 max-h-[50vh]">
        <img
          src={resolveStrapiImageUrl(article.featured_image.url)}
          alt={article.featured_image.alternativeText ?? article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article body */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        {article.content && <RichText content={article.content} />}
      </div>

      {/* Bottom back link */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12 border-t border-border pt-8">
        <Link
          href="/good-news"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          style={{ transitionDuration: 'var(--duration-fast)' }}
        >
          <RiArrowLeftLine className="w-4 h-4" aria-hidden />
          Back to Good News
        </Link>
      </div>
    </article>
  )
}
