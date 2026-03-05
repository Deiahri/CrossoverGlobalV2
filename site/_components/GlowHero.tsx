import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface GlowHeroProps {
  title: string
  subtitle?: string
  icons?: ReactNode[]
}

// Predefined scatter positions — icons cycle through these in order
const POSITIONS = [
  { top: '22%', left:  '7%', size: '2rem',    opacity: 0.14, duration:  '7s', delay:  '0s'  },
  { top: '14%', left: '82%', size: '2.5rem',  opacity: 0.12, duration:  '9s', delay: '1.2s' },
  { top: '62%', left:  '5%', size: '1.75rem', opacity: 0.10, duration:  '8s', delay: '0.6s' },
  { top: '58%', left: '87%', size: '2rem',    opacity: 0.13, duration: '10s', delay:  '2s'  },
  { top: '35%', left: '92%', size: '1.5rem',  opacity: 0.10, duration:  '6s', delay:  '3s'  },
  { top: '75%', left: '20%', size: '1.5rem',  opacity: 0.09, duration: '11s', delay: '1.8s' },
  { top: '20%', left: '55%', size: '1.25rem', opacity: 0.08, duration: '8.5s',delay: '0.3s' },
  { top: '78%', left: '72%', size: '1rem',    opacity: 0.08, duration: '7.5s',delay: '2.5s' },
]

export default function GlowHero({ title, subtitle, icons }: GlowHeroProps) {
  return (
    <section
      className="relative bg-brand-950 overflow-hidden border-b border-border py-28 sm:py-28"
      aria-label="Page header"
    >
      <style>{`
        @keyframes glow-hero-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-10px) rotate(4deg); }
          66%       { transform: translateY(-5px) rotate(-3deg); }
        }
      `}</style>

      {/* Primary radial glow — centered */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 30%, rgba(58,87,245,0.22) 0%, rgba(58,87,245,0.06) 50%, transparent 75%)',
        }}
        aria-hidden
      />

      {/* Secondary softer glow — offset */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 75% 60%, rgba(105,125,255,0.10) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      {/* Floating icons */}
      {icons?.map((icon, i) => {
        const pos = POSITIONS[i % POSITIONS.length]
        return (
          <span
            key={i}
            aria-hidden
            className="pointer-events-none absolute text-brand-300"
            style={{
              top: pos.top,
              left: pos.left,
              fontSize: pos.size,
              opacity: pos.opacity,
              animation: `glow-hero-float ${pos.duration} ease-in-out infinite`,
              animationDelay: pos.delay,
              display: 'flex',
            }}
          >
            {icon}
          </span>
        )
      })}

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal variant="fadeUp" delay={0}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal variant="fadeUp" delay={150}>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-brand-300">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
