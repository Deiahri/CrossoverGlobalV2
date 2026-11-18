'use client'

import { useEffect, useRef, useState } from 'react'

interface DonorboxEmbedProps {
  html: string
  id?: string
}

/**
 * Renders a raw Donorbox snippet. Scripts inside dangerouslySetInnerHTML never
 * execute, so Donorbox's widget.js can't resize the iframe. Instead we listen
 * for the height messages each Donorbox iframe posts ({ from: 'dbox', height })
 * and size that iframe to its real content, so it neither overflows nor leaves
 * a gap as donors move between steps.
 */
export default function DonorboxEmbed({ html, id }: DonorboxEmbedProps) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    function onMessage(e: MessageEvent) {
      if (e.origin !== 'https://donorbox.org') return
      let data: unknown = e.data
      if (typeof data === 'string') {
        try { data = JSON.parse(data) } catch { return }
      }
      const { from, height } = (data ?? {}) as { from?: string; height?: number }
      if (from !== 'dbox' || typeof height !== 'number' || height <= 0) return
      ref.current?.querySelectorAll('iframe').forEach((iframe) => {
        if (iframe.contentWindow === e.source) iframe.style.height = `${Math.ceil(height)}px`
      })
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [mounted])

  if (!html || !mounted) return null
  return (
    <div
      ref={ref}
      id={id}
      style={{
        maxWidth: '25rem',
        width: '100%',
        margin: 'auto',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
