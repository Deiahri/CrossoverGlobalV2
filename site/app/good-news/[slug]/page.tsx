import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticle, getArticleSlugs } from '../../../lib/api'
import RichText from '../../../_components/RichText'
import YoutubeEmbed from '../../../_components/YoutubeEmbed'
import Reveal from '../../../_components/Reveal'
import { RiArrowLeftLine, RiCalendarLine, RiUserLine } from 'react-icons/ri'
import { resolveStrapiMediaUrl } from '@/lib/tools'

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
      {/* Header */}
      <div className="bg-brand-950 border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-24 py-32 lg:py-24">
          <Link
            href="/good-news"
            className="inline-flex items-center gap-1.5 text-sm text-blue-300 hover:text-white mb-8 transition-colors"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            <RiArrowLeftLine className="w-4 h-4" aria-hidden />
            All Articles
          </Link>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            {/* Featured image */}
            <Reveal variant="fadeLeft" className="relative w-full max-w-xs mx-auto lg:mx-0 lg:w-64 shrink-0">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-md bg-neutral-100">
                <img
                  src={resolveStrapiMediaUrl(article.featured_image.url)}
                  alt={article.featured_image.alternativeText ?? article.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </Reveal>

            {/* Header info */}
            <div className="flex-1">
              <Reveal variant="fadeUp" delay={0}>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2">Good News</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-blue-200 mb-3">
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
              </Reveal>
              <Reveal variant="fadeUp" delay={100}>
                <h1 className="text-3xl font-bold text-white sm:text-4xl leading-tight mb-4">
                  {article.title}
                </h1>
              </Reveal>
              <Reveal variant="fadeUp" delay={200}>
                <p className="text-base text-white leading-relaxed max-w-xl">
                  {article.desc}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      {article.content?.map((section, i) => (
        <Reveal key={i} variant="fadeUp" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          {section.media && (
            <div className="mb-6 overflow-hidden rounded-lg">
              {section.media.mime.startsWith('video/') ? (
                <video
                  src={resolveStrapiMediaUrl(section.media.url)}
                  controls
                  className="w-full rounded-lg"
                  aria-label={section.media.alternativeText ?? undefined}
                />
              ) : section.media.mime.startsWith('audio/') ? (
                <audio
                  src={section.media.url}
                  controls
                  className="w-full"
                  aria-label={section.media.alternativeText ?? undefined}
                />
              ) : (
                <img
                  src={resolveStrapiMediaUrl(section.media.url)}
                  alt={section.media.alternativeText ?? ''}
                  className="w-full rounded-lg object-cover"
                />
              )}
            </div>
          )}
          {section.youtubeURL && (
            <div className="mb-6">
              <YoutubeEmbed url={section.youtubeURL} />
            </div>
          )}
          {section.text && <RichText content={section.text} />}
        </Reveal>
      ))}

      {/* Bottom back link */}
      <Reveal variant="fadeUp" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12 border-t border-border pt-8">
        <Link
          href="/good-news"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          style={{ transitionDuration: 'var(--duration-fast)' }}
        >
          <RiArrowLeftLine className="w-4 h-4" aria-hidden />
          Back to Good News
        </Link>
      </Reveal>
    </article>
  )
}
