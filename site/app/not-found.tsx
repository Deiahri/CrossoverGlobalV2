'use client'

import { useEffect, useState } from 'react'
import Button from '@/_components/Button'
import { RiArrowLeftLine, RiHeartLine } from 'react-icons/ri'

const STAGGER = [0, 150, 300, 450]

function useMount() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return mounted
}

function fadeUp(mounted: boolean, delay: number): React.CSSProperties {
  return {
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : 'translateY(1.5rem)',
    transition: `opacity 700ms var(--ease-out), transform 700ms var(--ease-out)`,
    transitionDelay: `${delay}ms`,
  }
}

export default function NotFound() {
  const mounted = useMount()

  return (
    <section
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-brand-950"
      aria-label="Page not found"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, var(--brand-700) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 70%, var(--brand-900) 0%, transparent 60%)',
        }}
        aria-hidden
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2.5rem, var(--brand-400) 2.5rem, var(--brand-400) calc(2.5rem + 1px)), repeating-linear-gradient(90deg, transparent, transparent 2.5rem, var(--brand-400) 2.5rem, var(--brand-400) calc(2.5rem + 1px))',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center text-white">
        {/* 404 label */}
        <p
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-400"
          style={fadeUp(mounted, STAGGER[0])}
        >
          404 — Page Not Found
        </p>

        <h1
          className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          style={fadeUp(mounted, STAGGER[1])}
        >
          This page seems
          <br />
          <span className="text-brand-300">lost in the field.</span>
        </h1>

        <p
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-brand-100"
          style={fadeUp(mounted, STAGGER[2])}
        >
          The page you&apos;re looking for doesn&apos;t exist. Head back home or explore how you can make a difference.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4"
          style={fadeUp(mounted, STAGGER[3])}
        >
          <Button href="/" variant="ghost" size="lg" className="border-white/40 text-white hover:bg-white/10 hover:border-white/60">
            <RiArrowLeftLine className="h-5 w-5" aria-hidden />
            Go Home
          </Button>
          <Button href="/give" variant="donate" size="lg">
            <RiHeartLine className="h-5 w-5" aria-hidden />
            Give Now
          </Button>
        </div>
      </div>
    </section>
  )
}
