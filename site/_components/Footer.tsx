import Link from 'next/link'
import { RiCrosshairLine, RiHeartLine, RiExternalLinkLine, RiYoutubeLine } from 'react-icons/ri'

const HELP_LINKS = [
  { href: '/projects', label: 'Donate to a Project' },
  { href: '/sponsorship', label: 'Sponsor a Child' },
]

const LEARN_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/good-news', label: 'Good News' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand + blurb */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-lg mb-3 hover:text-neutral-200 transition-colors"
              style={{ transitionDuration: 'var(--duration-fast)' }}
            >
              <RiCrosshairLine className="w-5 h-5 shrink-0 text-brand-400" aria-hidden />
              Crossover Global
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400">
              A 501(c)(3) charitable organization providing life assistance to brothers
              and sisters in need — grounded in Christian teachings.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.youtube.com/@CrossoverGlobal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Crossover Global on YouTube"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-700 text-neutral-300 hover:bg-red-600 hover:text-white transition-colors"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                <RiYoutubeLine className="w-4 h-4" aria-hidden />
              </a>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
              <RiHeartLine className="w-3.5 h-3.5 text-brand-400" aria-hidden />
              Listed on Charity Navigator
            </div>
          </div>

          {/* How to Help */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
              How to Help
            </h3>
            <ul className="space-y-2">
              {HELP_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-300 hover:text-white transition-colors"
                    style={{ transitionDuration: 'var(--duration-fast)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn More */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
              Learn More
            </h3>
            <ul className="space-y-2">
              {LEARN_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-300 hover:text-white transition-colors"
                    style={{ transitionDuration: 'var(--duration-fast)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
              Legal
            </h3>
            <div className="space-y-2 text-sm text-neutral-400">
              <p>
                <span className="font-medium text-neutral-300">Crossover Global</span>
                <br />
                501(c)(3) Tax-Exempt Charitable Organization
              </p>
              <p>
                EIN: <span className="font-mono text-neutral-300">81-3269633</span>
              </p>
              <a
                href="https://www.charitynavigator.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 transition-colors text-xs mt-1"
                style={{ transitionDuration: 'var(--duration-fast)' }}
              >
                Charity Navigator <RiExternalLinkLine className="w-3 h-3" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Crossover Global. All rights reserved.</p>
          <p>Donations are tax-deductible to the extent permitted by law.</p>
        </div>
      </div>
    </footer>
  )
}
