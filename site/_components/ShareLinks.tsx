'use client'

import { useState } from 'react'
import { RiShareForwardLine, RiCheckLine, RiHeartLine } from 'react-icons/ri'

interface ShareLinksProps {
  title: string
  text?: string
  subheading?: string
  scrollTargetId?: string // when provided, renders a Donate button that scrolls to the given element
}

export default function ShareLinks({ title, text, subheading, scrollTargetId }: ShareLinksProps) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    try {
      await navigator.share({ title, text, url: window.location.href })
    } catch {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleDonate() {
    document.getElementById(scrollTargetId!)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      aria-label="Share this sponsorship"
      className="w-full rounded-2xl bg-brand-950 px-8 py-12 flex flex-col items-center text-center gap-4"
    >
      <h2 className="text-3xl font-bold text-white sm:text-4xl">Share this opportunity</h2>
      {subheading && (
        <p className="max-w-md text-base text-white/70 leading-relaxed">{subheading}</p>
      )}
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        {scrollTargetId && (
          <button
            onClick={handleDonate}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-fg hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
            style={{ transitionDuration: 'var(--duration-fast)' }}
          >
            <RiHeartLine className="shrink-0 text-base" aria-hidden />
            Donate
          </button>
        )}
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors shadow-sm cursor-pointer"
          style={{ transitionDuration: 'var(--duration-fast)' }}
        >
          {copied
            ? <><RiCheckLine className="shrink-0 text-base" aria-hidden />Copied!</>
            : <><RiShareForwardLine className="shrink-0 text-base" aria-hidden />Share</>
          }
        </button>
      </div>
    </section>
  )
}
