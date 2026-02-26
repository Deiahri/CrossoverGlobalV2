'use client'

import type { ReactNode } from 'react'
import Button from './Button'

interface ScrollIntoViewButtonProps {
  targetId: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'donate'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ScrollIntoViewButton({ targetId, children, variant, size, className }: ScrollIntoViewButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={'cursor-pointer ' + className}
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
    >
      {children}
    </Button>
  )
}
