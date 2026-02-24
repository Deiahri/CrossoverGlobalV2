export default function SponsorStrip() {
  // Static placeholder — replace with real sponsor logos when available
  const placeholders = Array.from({ length: 6 }, (_, i) => `Supporter ${i + 1}`)

  return (
    <section className="border-y border-border bg-surface-raised py-10" aria-label="Our supporters">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-fg">
          Trusted by our supporters
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {placeholders.map((label) => (
            <div
              key={label}
              className="h-10 w-32 rounded-lg bg-neutral-200 flex items-center justify-center text-xs text-neutral-400 font-medium select-none"
              aria-label={label}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
