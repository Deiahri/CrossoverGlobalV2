'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import Button from './Button'

const LOGO_SRC = 'https://www.crossoverglobal.org/images/logo.png'

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/sponsorship', label: 'Sponsorship' },
  { href: '/good-news', label: 'Good News' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors ${
        scrolled
          ? 'bg-white border-b border-border shadow-xs'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
      style={{ transitionDuration: 'var(--duration-normal)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">

          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 font-bold text-lg tracking-tight transition-colors ${
              scrolled
                ? 'text-primary hover:text-primary-hover'
                : 'text-white hover:text-white/90 drop-shadow-sm'
            }`}
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <Image
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              src={LOGO_SRC}
              alt="Crossover Global"
              width={180}
              height={40}
              className={`h-8 w-auto object-contain transition-[filter]`}
              style={{ transitionDuration: 'var(--duration-fast)' }}
              priority
            />
          </Link>

          {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 fixed left-1/2 -translate-x-1/2" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith(href)
                ? scrolled
                  ? 'text-primary bg-accent'
                  : 'text-white bg-white/20'
                : scrolled
                  ? 'text-neutral-600 hover:text-foreground hover:bg-surface-raised'
                  : 'text-white hover:text-white hover:bg-white/15'
              }`}
              style={{ transitionDuration: 'var(--duration-fast)' }}
              >
              {label}
              </Link>
            ))}
            </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/projects" variant="donate" size="sm">
              Give Now
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors ${
              scrolled
                ? 'text-neutral-600 hover:bg-surface-raised'
                : 'text-white hover:bg-white/15'
            }`}
            style={{ transitionDuration: 'var(--duration-fast)' }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span
              className="block transition-transform"
              style={{
                transitionDuration: 'var(--duration-normal)',
                transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              {open ? <RiCloseLine className="w-5 h-5" /> : <RiMenuLine className="w-5 h-5" />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav — absolutely positioned so it overlays content without pushing it down */}
      <div
        className="md:hidden absolute left-0 right-0 top-full bg-white border-t border-border shadow-md overflow-hidden"
        style={{
          maxHeight: open ? '24rem' : '0px',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: `max-height var(--duration-normal) var(--ease-out), opacity var(--duration-fast) var(--ease-out)`,
        }}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4 pt-2" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith(href)
                  ? 'text-primary bg-accent'
                  : 'text-neutral-600 hover:text-foreground hover:bg-surface-raised'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-3">
            <Button href="/projects" variant="donate" size="sm" className="w-full justify-center">
              Give Now
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
