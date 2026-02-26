import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProject, getProjectSlugs } from '../../../lib/api'
import Badge from '../../../_components/Badge'
import BibleVerse from '../../../_components/BibleVerse'
import RichText from '../../../_components/RichText'
import MediaGallery from '../../../_components/MediaGallery'
import ImpactGrid from '../../../_components/ImpactGrid'
import DonorboxEmbed from '../../../_components/DonorboxEmbed'
import Button from '../../../_components/Button'
import { RiMapPin2Line, RiMoneyDollarCircleLine, RiCalendarLine, RiArrowDownLine } from 'react-icons/ri'

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

  const postMedia = [
    ...(project.overview_video ? [project.overview_video] : []),
    ...(project.post_project_photos ?? []),
  ]

  return (
    <article>
      {/* Hero image */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-200 max-h-[60vh]">
        <Image
          src={project.image.url}
          alt={project.image.alternativeText ?? project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="mx-auto max-w-7xl">
            <Badge
              label={project.complete ? 'Completed' : 'Active'}
              variant={project.complete ? 'completed' : 'active'}
            />
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Short desc + donate CTA */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="flex-1 text-base text-muted-fg leading-relaxed">{project.desc}</p>
          {project.donorbox_code && (
            <Button href="#donate-heading" variant="donate" size="md" className="shrink-0 self-start sm:self-auto">
              Donate <RiArrowDownLine className="h-4 w-4" aria-hidden />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-fg border-b border-border pb-8">
          <span className="flex items-center gap-1.5">
            <RiMapPin2Line className="w-4 h-4 text-primary shrink-0" aria-hidden />
            {project.location}
          </span>
          {project.amount_raised && (
            <span className="flex items-center gap-1.5">
              <RiMoneyDollarCircleLine className="w-4 h-4 text-primary shrink-0" aria-hidden />
              {project.amount_raised} raised
            </span>
          )}
          {project.completion_date && (
            <span className="flex items-center gap-1.5">
              <RiCalendarLine className="w-4 h-4 text-primary shrink-0" aria-hidden />
              Completed {new Date(project.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
        </div>

        {/* Bible Verse */}
        {project.bible_verse_content && (
          <BibleVerse content={project.bible_verse_content} cv={project.bible_verse_cv} />
        )}

        {/* Overview */}
        {project.long_desc && (
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-2xl font-bold text-foreground mb-4">Overview</h2>
            <RichText content={project.long_desc} />
          </section>
        )}

        {/* Goals */}
        {project.goals && (
          <section aria-labelledby="goals-heading">
            <h2 id="goals-heading" className="text-2xl font-bold text-foreground mb-4">Goals</h2>
            <RichText content={project.goals} />
          </section>
        )}

        {/* Pre-project photos */}
        {project.pre_project_photos?.length > 0 && (
          <MediaGallery items={project.pre_project_photos} heading="Before" />
        )}

        {/* Completion notes */}
        {project.completion_notes && (
          <section aria-labelledby="notes-heading">
            <h2 id="notes-heading" className="text-2xl font-bold text-foreground mb-4">Completion Notes</h2>
            <p className="text-base text-muted-fg leading-relaxed">{project.completion_notes}</p>
          </section>
        )}

        {/* Impact */}
        {project.impacts?.length > 0 && (
          <ImpactGrid impacts={project.impacts} />
        )}

        {/* Post-project photos + video */}
        {postMedia.length > 0 && (
          <MediaGallery items={postMedia} heading="After" />
        )}

        {/* Donate */}
        {project.donorbox_code && (
          <section aria-labelledby="donate-heading">
            <h2 id="donate-heading" className="text-2xl font-bold text-foreground mb-6 text-center">
              Support This Project
            </h2>
            <DonorboxEmbed html={project.donorbox_code} />
          </section>
        )}

        {/* Donor wall */}
        {project.donorbox_wall && (
          <section aria-label="Donor wall">
            <DonorboxEmbed html={project.donorbox_wall} />
          </section>
        )}
      </div>
    </article>
  )
}
