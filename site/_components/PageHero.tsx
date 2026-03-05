'use client'

import { useEffect, useState } from 'react'

interface PageHeroProps {
  title: string
  subtitle?: string
}

function useMount() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return mounted
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  const mounted = useMount()

  return (
    <section className="bg-brand-950 border-b border-border py-14 sm:py-18" aria-label="Page header">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className="text-4xl font-bold tracking-tight sm:text-5xl text-white"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 600ms var(--ease-out), transform 600ms var(--ease-out)',
            transitionDelay: '0ms',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-300"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 600ms var(--ease-out), transform 600ms var(--ease-out)',
              transitionDelay: '150ms',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
