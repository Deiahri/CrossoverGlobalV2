import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getSponsorship, getSponsorshipSlugs } from '../../../lib/api'
import Badge from '../../../_components/Badge'
import RichText from '../../../_components/RichText'
import YoutubeEmbed from '../../../_components/YoutubeEmbed'
import DonorboxEmbed from '../../../_components/DonorboxEmbed'
import ShareLinks from '../../../_components/ShareLinks'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getSponsorshipSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const s = await getSponsorship(slug)
  if (!s) return {}
  return {
    title: s.title,
    description: s.desc,
  }
}

export default async function SponsorshipDetailPage({ params }: PageProps) {
  const { slug } = await params
  const s = await getSponsorship(slug)
  if (!s) notFound()

  return (
    <article>
      {/* Header */}
      <div className="bg-accent border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Portrait */}
            <div className="relative w-full max-w-xs mx-auto lg:mx-0 lg:w-64 shrink-0">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-md bg-neutral-100">
                <Image
                  src={s.image.url}
                  alt={s.image.alternativeText ?? s.sponsee}
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>

            {/* Header info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge label={s.country} variant="country" />
                {s.complete && <Badge label="Sponsored" variant="completed" />}
              </div>
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-fg mb-1">{s.sponsee}</p>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl leading-tight mb-4">
                {s.title}
              </h1>
              <p className="text-base text-muted-fg leading-relaxed max-w-xl">{s.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Bio */}
        {s.sponsee_desc && (
          <section aria-labelledby="bio-heading">
            <h2 id="bio-heading" className="text-2xl font-bold text-foreground mb-4">About {s.sponsee}</h2>
            <RichText content={s.sponsee_desc} />
          </section>
        )}

        {/* Video */}
        {s.sponsee_request_video && (
          <YoutubeEmbed url={s.sponsee_request_video} title={`${s.sponsee} sponsorship video`} />
        )}

        {/* Needs / itemized request */}
        {s.sponsee_request_desc && (
          <section aria-labelledby="needs-heading">
            <h2 id="needs-heading" className="text-2xl font-bold text-foreground mb-4">Support Needs</h2>
            <RichText content={s.sponsee_request_desc} />
          </section>
        )}

        {/* Optional sections */}
        {s.optional_sections?.map((section, i) => (
          <section key={i} aria-labelledby={`optional-${i}`}>
            <h2 id={`optional-${i}`} className="text-2xl font-bold text-foreground mb-4">
              {section.title}
            </h2>
            <RichText content={section.content} />
          </section>
        ))}

        {/* Encouragement + Donate */}
        {!s.complete && (
          <section aria-labelledby="donate-heading" className="rounded-2xl bg-accent border border-brand-200 p-8 text-center">
            {s.encouragement && (
              <p className="text-lg text-foreground font-medium mb-6 leading-relaxed">
                {s.encouragement}
              </p>
            )}
            <h2 id="donate-heading" className="text-2xl font-bold text-foreground mb-6">
              Sponsor {s.sponsee}
            </h2>
            <DonorboxEmbed html={s.donorbox_code} />
          </section>
        )}

        {/* Share */}
        {s.share_links?.length > 0 && (
          <ShareLinks links={s.share_links} />
        )}
      </div>
    </article>
  )
}
