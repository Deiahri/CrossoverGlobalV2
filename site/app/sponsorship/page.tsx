import type { Metadata } from 'next'
import { getSponsorships } from '../../lib/api'
import PageHero from '../../_components/PageHero'
import SponsorshipCard from '../../_components/SponsorshipCard'

export const metadata: Metadata = {
  title: 'Sponsorship',
  description:
    'Browse sponsorship opportunities — support individuals in need through education, nutrition, and more.',
}

export default async function SponsorshipPage() {
  const sponsorships = await getSponsorships()
  const active = sponsorships.filter((s) => !s.complete)
  const completed = sponsorships.filter((s) => s.complete)

  return (
    <>
      <PageHero
        title="Sponsorship Opportunities"
        subtitle="Your monthly support provides education, nutrition, healthcare, and hope to individuals who need it most."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">

        {/* Active */}
        {active.length > 0 && (
          <section aria-labelledby="active-sponsorships">
            <h2 id="active-sponsorships" className="text-2xl font-bold text-foreground mb-6">
              Available Sponsorships
              <span className="ml-3 text-base font-normal text-muted-fg">({active.length})</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((s) => (
                <SponsorshipCard key={s.slug} {...s} />
              ))}
            </div>
          </section>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <section aria-labelledby="sponsored-heading">
            <h2 id="sponsored-heading" className="text-2xl font-bold text-foreground mb-6">
              Already Sponsored
              <span className="ml-3 text-base font-normal text-muted-fg">({completed.length})</span>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completed.map((s) => (
                <SponsorshipCard key={s.slug} {...s} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {sponsorships.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-24 text-center text-muted-fg">
            <p className="text-xl font-semibold mb-2">No sponsorships yet</p>
            <p className="text-sm">Sponsorship opportunities will appear here once published.</p>
          </div>
        )}
      </div>
    </>
  )
}
