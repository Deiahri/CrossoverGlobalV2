import type { Metadata } from 'next'
import GlowHero from '../../_components/GlowHero'
import Button from '../../_components/Button'
import Reveal from '../../_components/Reveal'
import {
  RiHandHeartLine,
  RiGroupLine,
  RiHomeLine,
  RiUserHeartLine,
  RiSeedlingLine,
  RiShieldLine,
  RiGlobalLine,
  RiHeartLine,
  RiSparkling2Line,
  RiLeafLine,
} from 'react-icons/ri'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Crossover Global — a 501(c)(3) charitable organization providing life assistance grounded in Christian teachings.',
}

const SERVICES = [
  {
    icon: RiHomeLine,
    title: 'Rebuilding Faith Communities',
    desc: 'Financial assistance to restore and build churches and places of worship in underserved regions.',
  },
  {
    icon: RiUserHeartLine,
    title: 'Widows & Orphans',
    desc: 'Dedicated support for widows and orphans, giving them the resources and care they deserve.',
  },
  {
    icon: RiGroupLine,
    title: 'Missionaries & Churches',
    desc: 'Funding missionaries and underprivileged churches to sustain their ministry and outreach.',
  },
  {
    icon: RiHandHeartLine,
    title: 'Project Programs',
    desc: 'Community-focused projects that address material and spiritual needs in targeted areas.',
  },
  {
    icon: RiSeedlingLine,
    title: 'Youth Sponsorship',
    desc: 'Sponsorship programs that invest in the next generation through education and mentorship.',
  },
  {
    icon: RiShieldLine,
    title: 'Financial Independence',
    desc: 'Initiatives to help widows achieve financial independence and long-term stability.',
  },
]

export default function AboutPage() {
  return (
    <>
      <GlowHero
        title="About Crossover Global"
        subtitle="A faith-grounded organization dedicated to providing life assistance where it is needed most."
        icons={[
          <RiHandHeartLine />, <RiGlobalLine />, <RiSeedlingLine />,
          <RiGroupLine />, <RiHeartLine />, <RiLeafLine />,
          <RiSparkling2Line />, <RiSparkling2Line />,
        ]}
      />

      {/* Mission */}
      <section className="py-16 lg:py-24" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal variant="fadeUp" delay={0}>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Our Mission
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={100}>
            <h2
              id="mission-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight mb-6"
            >
              &ldquo;To provide life assistance to those of our brothers and sisters who need it.&rdquo;
            </h2>
          </Reveal>
          <Reveal variant="fadeUp" delay={220}>
            <p className="text-lg text-muted-fg leading-relaxed max-w-2xl mx-auto">
              Crossover Global is a 501(c)(3) tax-exempt charitable organization founded on Christian
              teachings. We believe humans need both spiritual nourishment and material support —
              so we work to address both, in communities that need it most.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface-raised py-16 lg:py-24" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="fadeUp" className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              What We Do
            </p>
            <h2
              id="services-heading"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              How We Serve
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} variant="fadeUp" delay={i * 80}>
                <div className="rounded-xl border border-border bg-surface p-7 shadow-sm h-full">
                  <div className="mb-4 inline-flex rounded-xl bg-accent p-3">
                    <Icon className="w-6 h-6 text-primary" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-fg leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16" aria-label="Organization credentials">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal variant="fadeUp">
            <div className="rounded-2xl border border-border bg-surface px-8 py-10 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-fg mb-3">
                Organization Details
              </p>
              <p className="text-2xl font-bold text-foreground mb-1">Crossover Global</p>
              <p className="text-muted-fg mb-4">
                501(c)(3) Tax-Exempt Charitable Organization
              </p>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm text-accent-fg font-medium">
                EIN: 81-3269633
              </div>
              <p className="mt-4 text-sm text-muted-fg">
                Donations are tax-deductible to the extent permitted by law.
                Listed on Charity Navigator.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent border-t border-border py-14" aria-label="Get involved">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal variant="fadeUp" delay={0}>
            <h2 className="text-3xl font-bold text-foreground mb-4">Get Involved</h2>
          </Reveal>
          <Reveal variant="fadeUp" delay={100}>
            <p className="text-lg text-muted-fg mb-8 leading-relaxed">
              Your generosity — through donations, sponsorships, or volunteering — makes our work possible.
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/projects" variant="donate" size="lg">
                Donate to a Project
              </Button>
              <Button href="/sponsorship" variant="donate" size="lg">
                Sponsor a Child
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
