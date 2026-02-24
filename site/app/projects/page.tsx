import type { Metadata } from 'next'
import { getProjects } from '../../lib/api'
import PageHero from '../../_components/PageHero'
import ProjectCard from '../../_components/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Browse all active and completed Crossover Global projects — community initiatives making a lasting impact.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const active = projects.filter((p) => !p.complete)
  const completed = projects.filter((p) => p.complete)

  return (
    <>
      <PageHero
        title="Our Projects"
        subtitle="Community initiatives making a lasting impact — from rebuilding churches to supporting families in need."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">

        {/* Active */}
        {active.length > 0 && (
          <section aria-labelledby="active-heading">
            <h2 id="active-heading" className="text-2xl font-bold text-foreground mb-6">
              Active Projects
              <span className="ml-3 text-base font-normal text-muted-fg">({active.length})</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </section>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <section aria-labelledby="completed-heading">
            <h2 id="completed-heading" className="text-2xl font-bold text-foreground mb-6">
              Completed Projects
              <span className="ml-3 text-base font-normal text-muted-fg">({completed.length})</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completed.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-24 text-center text-muted-fg">
            <p className="text-xl font-semibold mb-2">No projects yet</p>
            <p className="text-sm">Our projects will appear here once they are published.</p>
          </div>
        )}
      </div>
    </>
  )
}
