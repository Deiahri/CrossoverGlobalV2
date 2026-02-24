import Image from 'next/image'
import type { ProjectImpact } from '../lib/types'

interface ImpactGridProps {
  impacts: ProjectImpact[]
}

export default function ImpactGrid({ impacts }: ImpactGridProps) {
  if (!impacts || impacts.length === 0) return null

  return (
    <section aria-label="Project impact">
      <h2 className="mb-6 text-2xl font-bold text-foreground">Impact</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {impacts.map((impact, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-surface p-6 shadow-sm"
          >
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary leading-none">
                {impact.quantity}
              </span>
              <span className="text-sm font-semibold text-accent-fg uppercase tracking-wide">
                {impact.verb}
              </span>
            </div>
            <p className="text-sm text-muted-fg leading-relaxed">{impact.description}</p>

            {impact.media && impact.media.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {impact.media.slice(0, 3).map((m, j) => (
                  <div key={j} className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                    {m.mime.startsWith('video/') ? (
                      <video src={m.url} className="h-full w-full object-cover" preload="metadata" />
                    ) : (
                      <Image
                        src={m.url}
                        alt={m.alternativeText ?? ''}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
