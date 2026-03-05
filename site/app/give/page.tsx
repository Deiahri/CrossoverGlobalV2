import type { Metadata } from 'next'
import Button from '../../_components/Button'
import DonorboxEmbed from '../../_components/DonorboxEmbed'
import {
  RiHandHeartLine,
  RiSparkling2Line,
  RiGroupLine,
  RiShieldCheckLine,
  RiExternalLinkLine,
  RiArrowRightLine,
  RiCheckLine,
} from 'react-icons/ri'

export const metadata: Metadata = {
  title: 'Give — Crossover Global',
  description:
    'Support Crossover Global with a general gift. Every dollar provides life assistance to widows, orphans, missionaries, and underprivileged communities around the world.',
}

const DONORBOX_HTML = `<script src="https://donorbox.org/widget.js" paypalExpress="true"></script><iframe src="https://donorbox.org/embed/all-projects-page-1?language=en" name="donorbox" allowpaymentrequest="allowpaymentrequest" seamless="seamless" frameborder="0" scrolling="no" height="900px" width="100%" style="max-width: 500px; min-width: 250px; max-height:none!important" allow="payment"></iframe>`

const IMPACT_POINTS = [
  'Widows equipped with financial independence',
  'Orphans and youth given education and hope',
  'Missionaries and churches in Nigeria supported',
  'Communities rebuilt after hardship',
]

const WAYS_TO_GIVE = [
  {
    icon: RiSparkling2Line,
    title: 'Fund a Specific Project',
    description:
      'Browse active initiatives — from clean water wells to rebuilding faith communities — and give directly to one.',
    cta: 'Browse Projects',
    href: '/projects',
  },
  {
    icon: RiGroupLine,
    title: 'Sponsor an Individual',
    description:
      'Commit to monthly support for a specific person — a widow, orphan, or student — giving them consistent care.',
    cta: 'Browse Sponsorships',
    href: '/sponsorship',
  },
  {
    icon: RiHandHeartLine,
    title: 'Learn More',
    description:
      'Want to understand the mission before giving? Read about who we are, what we do, and how funds are used.',
    cta: 'About Us',
    href: '/about',
  },
]

export default function GivePage() {
  return (
    <>
      {/* Hero — split layout */}
      <div className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-stretch min-h-[85vh]">

            {/* Left — content */}
            <div className="flex flex-col items-center lg:items-start justify-center py-24 lg:py-32 lg:pr-16 lg:w-1/2 xl:w-[55%] text-center lg:text-left">
              <h1 className="text-4xl font-bold text-white sm:text-5xl xl:text-6xl leading-tight mb-6">
                Every gift is life<br className="hidden sm:block" /> assistance.
              </h1>
              <blockquote className="border-l-0 lg:border-l-2 border-blue-400 lg:pl-5 mb-8 max-w-xl">
                <p className="text-blue-100 text-lg italic leading-relaxed">
                  "To provide life assistance to those of our brothers and sisters who need it."
                </p>
              </blockquote>
              <ul className="space-y-3 mb-10">
                {IMPACT_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-blue-200">
                    <RiCheckLine className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              {/* <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <Button href="/projects" variant="ghost" size="md" className="border-white/25 text-white hover:bg-white/10">
                  Browse Projects <RiArrowRightLine className="w-4 h-4" />
                </Button>
                <Button href="/sponsorship" variant="ghost" size="md" className="border-white/25 text-white hover:bg-white/10">
                  Sponsorships <RiArrowRightLine className="w-4 h-4" />
                </Button>
              </div> */}
            </div>

            {/* Right — donorbox widget */}
            <div className="lg:w-1/2 xl:w-[45%] flex items-center justify-center py-12 lg:py-24">
              <DonorboxEmbed html={DONORBOX_HTML} id="donorbox-general" />
            </div>

          </div>
        </div>
      </div>

      {/* Divider label */}
      <div className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Want to give to something specific?</h2>
            <p className="text-muted-fg text-base max-w-xl mx-auto">
              Your generosity can go directly to a named project or person if you prefer.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {WAYS_TO_GIVE.map(({ icon: Icon, title, description, cta, href }) => (
              <div key={title} className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-4">
                <Icon className="w-6 h-6 text-primary" />
                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-fg leading-relaxed">{description}</p>
                </div>
                <Button href={href} variant="ghost" size="sm" className="self-start">
                  {cta} <RiArrowRightLine className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust signals */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-fg">
            <span className="flex items-center gap-1.5">
              <RiShieldCheckLine className="w-4 h-4 text-primary shrink-0" />
              501(c)(3) Tax-Exempt Organization
            </span>
            <span className="flex items-center gap-1.5">
              <RiShieldCheckLine className="w-4 h-4 text-primary shrink-0" />
              EIN: 81-3269633
            </span>
            <a
              href="https://www.charitynavigator.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              <RiShieldCheckLine className="w-4 h-4 text-primary shrink-0" />
              Listed on Charity Navigator
              <RiExternalLinkLine className="w-3 h-3" />
            </a>
            <span>Your gift is tax-deductible to the extent allowed by law.</span>
          </div>
        </div>
      </div>
    </>
  )
}
