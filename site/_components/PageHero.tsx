interface PageHeroProps {
  title: string
  subtitle?: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-brand-950 border-b border-border py-30 sm:py-40" aria-label="Page header">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-300">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
