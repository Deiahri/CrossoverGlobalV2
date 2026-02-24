interface BibleVerseProps {
  content: string
  cv: string // citation, e.g. "2 Timothy 1:7"
}

export default function BibleVerse({ content, cv }: BibleVerseProps) {
  return (
    <section
      className="relative rounded-2xl bg-accent border border-brand-200 px-8 py-10 text-center"
      aria-label="Bible verse"
    >
      {/* Large decorative quote mark */}
      <span
        className="absolute -top-5 left-8 text-8xl font-serif leading-none text-brand-200 select-none pointer-events-none"
        aria-hidden
      >
        &ldquo;
      </span>

      <blockquote className="relative">
        <p className="text-lg italic leading-relaxed text-foreground sm:text-xl lg:text-2xl">
          {content}
        </p>
        <footer className="mt-4">
          <cite className="not-italic text-sm font-semibold text-primary tracking-wide">
            — {cv}
          </cite>
        </footer>
      </blockquote>
    </section>
  )
}
