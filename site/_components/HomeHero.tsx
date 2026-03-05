'use client'

import { useEffect, useState } from 'react'
import Button from './Button'
import { RiArrowRightLine, RiHeartLine } from 'react-icons/ri'

const STAGGER = [0, 150, 300, 450]

function useMount() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return mounted
}

function heroStyle(mounted: boolean, delay: number): React.CSSProperties {
  return {
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 700ms var(--ease-out), transform 700ms var(--ease-out)`,
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform',
  }
}

export default function HomeHero() {
  const mounted = useMount()

  return (
    <section
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-brand-950"
      aria-label="Mission hero"
    >
      {/* Background gradient texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, var(--brand-700) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 70%, var(--brand-900) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      {/* Subtle cross-hatch texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 40px, var(--brand-400) 40px, var(--brand-400) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, var(--brand-400) 40px, var(--brand-400) 41px)',
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-white">
        {/* Headline */}
        <h1
          className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          style={heroStyle(mounted, STAGGER[0])}
        >
          Providing Life Assistance
          <br />
          <span className="text-brand-300">Where It Matters Most</span>
        </h1>

        {/* Mission statement */}
        <p
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-brand-100 sm:text-xl"
          style={heroStyle(mounted, STAGGER[1])}
        >
          Supporting widows, orphans, missionaries, and underprivileged communities in Nigeria.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={heroStyle(mounted, STAGGER[2])}
        >
          <Button
            href="/projects"
            variant="donate"
            size="lg"
            className="w-full sm:w-auto"
          >
            <RiHeartLine className="w-5 h-5" aria-hidden />
            Give Now
          </Button>
          <Button
            href="/about"
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 hover:border-white/60"
          >
            Learn More
            <RiArrowRightLine className="w-5 h-5" aria-hidden />
          </Button>
        </div>

        {/* Trust signal */}
        <p
          className="mt-10 text-xs text-brand-400 tracking-wide uppercase"
          style={heroStyle(mounted, STAGGER[3])}
        >
          Listed on Charity Navigator · EIN 81-3269633
        </p>
      </div>
    </section>
  )
}
