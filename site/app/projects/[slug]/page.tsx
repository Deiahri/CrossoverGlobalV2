import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject, getProjectSlugs } from '../../../lib/api'
import { resolveStrapiMediaUrl } from '@/lib/tools'
import Badge from '../../../_components/Badge'
import BibleVerse from '../../../_components/BibleVerse'
import RichText from '../../../_components/RichText'
import ImpactGrid from '../../../_components/ImpactGrid'
import DonorboxEmbed from '../../../_components/DonorboxEmbed'
import Button from '../../../_components/Button'
import Reveal from '../../../_components/Reveal'
import { RiMapPin2Line, RiMoneyDollarCircleLine, RiCalendarLine, RiArrowDownLine, RiSparkling2Line } from 'react-icons/ri'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.desc,
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <article>
      {/* Header */}
      <div className="bg-brand-950 border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-24 py-32 lg:py-24">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            {/* Image */}
            <Reveal variant="fadeLeft" className="relative w-full max-w-xs mx-auto lg:mx-0 lg:w-64 shrink-0">
              <div className="aspect-square overflow-hidden rounded-2xl shadow-md bg-neutral-100">
                <img
                  src={resolveStrapiMediaUrl(project.image.url)}
                  alt={project.image.alternativeText ?? project.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </Reveal>

            {/* Header info */}
            <div className="flex-1">
              <Reveal variant="fadeUp" delay={0}>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2">Project</p>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge label={project.complete ? 'Completed' : 'Active'} variant={project.complete ? 'completed' : 'active'} />
                  {project.location && (
                    <span className="flex items-center gap-1.5 text-sm text-blue-300">
                      <RiMapPin2Line className="w-4 h-4 shrink-0" aria-hidden />
                      {project.location}
                    </span>
                  )}
                </div>
              </Reveal>
              <Reveal variant="fadeUp" delay={100}>
                <h1 className="text-3xl font-bold text-white sm:text-4xl leading-tight mb-4">
                  {project.title}
                </h1>
              </Reveal>
              <Reveal variant="fadeUp" delay={200}>
                <p className="text-base text-white leading-relaxed max-w-xl mb-6">
                  {project.desc}
                </p>
              </Reveal>
              {!project.complete && project.donorbox_code && (
                <Reveal variant="fadeUp" delay={300}>
                  <Button href="#donate-heading" variant="donate" size="md" className="self-start">
                    Donate <RiArrowDownLine className="h-4 w-4" aria-hidden />
                  </Button>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Meta row */}
        <Reveal variant="fadeUp">
          <div className="flex flex-wrap gap-4 text-sm text-muted-fg border-b border-border pb-8">
            {project.amount_raised != null && (
              <span className="flex items-center gap-1.5">
                <RiMoneyDollarCircleLine className="w-4 h-4 text-primary shrink-0" aria-hidden />
                {project.amount_raised.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} raised
              </span>
            )}
            {project.completion_date && (
              <span className="flex items-center gap-1.5">
                <RiCalendarLine className="w-4 h-4 text-primary shrink-0" aria-hidden />
                Completed {new Date(project.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
          </div>
        </Reveal>

        {/* Bible Verse */}
        {project.bible_verse_content && (
          <Reveal variant="fadeUp">
            <BibleVerse content={project.bible_verse_content} cv={project.bible_verse_cv} />
          </Reveal>
        )}

        {/* Content sections */}
        {project.content?.map((section, i) => (
          <Reveal key={i} variant="fadeUp">
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
                    src={resolveStrapiMediaUrl(section.media.url)}
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
            {section.text && <RichText content={section.text} />}
          </Reveal>
        ))}

        {/* Completion notes */}
        {project.completion_notes && (
          <Reveal variant="fadeUp">
            <section aria-labelledby="notes-heading">
              <h2 id="notes-heading" className="text-2xl font-bold text-foreground mb-4">Completion Notes</h2>
              <p className="text-base text-muted-fg leading-relaxed">{project.completion_notes}</p>
            </section>
          </Reveal>
        )}

        {/* Impact */}
        <Reveal variant="fadeUp">
          {project.impacts && project.impacts.length > 0 ? (
            <ImpactGrid impacts={project.impacts} />
          ) : (
            <section aria-label="Impact" className="rounded-2xl bg-surface-raised border border-border px-8 py-10 text-center">
              <RiSparkling2Line className="mx-auto mb-3 h-8 w-8 text-primary" aria-hidden />
              <h2 className="text-xl font-bold text-foreground mb-2">Impact in the Making</h2>
              <p className="text-base text-muted-fg max-w-md mx-auto leading-relaxed">
                Lives are being changed through this project. Stories of transformation will be shared here as they unfold — check back soon.
              </p>
            </section>
          )}
        </Reveal>

        {/* Donate + Donor wall */}
        {!project.complete && (project.donorbox_code || project.donorbox_wall) && (
          <Reveal variant="fadeUp">
            <section aria-labelledby="donate-heading">
              <h2 id="donate-heading" className="text-2xl font-bold text-foreground mb-6 text-center">
                Support This Project
              </h2>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {project.donorbox_code && (
                  <div className="flex-1 min-w-0">
                    <DonorboxEmbed html={project.donorbox_code} />
                  </div>
                )}
                {project.donorbox_wall && (
                  <div className="flex-1 min-w-0">
                    <DonorboxEmbed html={project.donorbox_wall} />
                  </div>
                )}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </article>
  )
}
