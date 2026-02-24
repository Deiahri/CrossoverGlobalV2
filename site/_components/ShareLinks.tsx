import type { SponsorshipShareLink } from '../lib/types'

interface ShareLinksProps {
  links: SponsorshipShareLink[]
}

export default function ShareLinks({ links }: ShareLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <div aria-label="Share this sponsorship">
      <p className="mb-3 text-sm font-semibold text-foreground">Share this opportunity</p>
      <div className="flex flex-wrap gap-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-foreground hover:bg-surface-raised hover:border-border-strong transition-colors shadow-xs"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={link.icon}
              alt=""
              width={18}
              height={18}
              className="shrink-0"
              aria-hidden
            />
            Share
          </a>
        ))}
      </div>
    </div>
  )
}
