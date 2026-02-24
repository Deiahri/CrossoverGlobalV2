import type { ReactNode } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'ghost' | 'donate'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: Variant
  size?: Size
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  target?: string
  rel?: string
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-fg hover:bg-primary-hover active:scale-[0.98]',
  secondary:
    'bg-secondary text-secondary-fg hover:bg-secondary-hover active:scale-[0.98]',
  ghost:
    'bg-transparent text-primary border border-primary hover:bg-accent active:scale-[0.98]',
  donate:
    'bg-donate text-donate-fg hover:bg-donate-hover active:scale-[0.98]',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-md',
  md: 'px-5 py-2.5 text-base rounded-lg',
  lg: 'px-7 py-3.5 text-lg rounded-xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled,
  target,
  rel,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 font-semibold transition-all select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none'
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  const style = { transitionDuration: 'var(--duration-fast)', transitionTimingFunction: 'var(--ease-default)' }

  if (href) {
    return (
      <Link href={href} className={classes} style={style} target={target} rel={rel}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} style={style}>
      {children}
    </button>
  )
}
