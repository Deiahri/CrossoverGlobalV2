'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../_hooks/useInView'

export type RevealVariant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'fade'

const VARIANTS: Record<RevealVariant, { hidden: CSSProperties; visible: CSSProperties }> = {
  fadeUp: {
    hidden: { opacity: 0, transform: 'translateY(28px)' },
    visible: { opacity: 1, transform: 'none' },
  },
  fadeLeft: {
    hidden: { opacity: 0, transform: 'translateX(-36px)' },
    visible: { opacity: 1, transform: 'none' },
  },
  fadeRight: {
    hidden: { opacity: 0, transform: 'translateX(36px)' },
    visible: { opacity: 1, transform: 'none' },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  /** Stagger delay in ms */
  delay?: number
  /** Transition duration in ms */
  duration?: number
  className?: string
}

export default function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 600,
  className,
}: RevealProps) {
  const { ref, inView } = useInView()
  const state = inView ? VARIANTS[variant].visible : VARIANTS[variant].hidden

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          ...state,
          height: '100%',
          transition: `opacity ${duration}ms var(--ease-out), transform ${duration}ms var(--ease-out)`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
