'use client'

import { useState } from 'react'
import { RiFileCopyLine, RiCheckLine } from 'react-icons/ri'

interface CopyButtonProps {
  value: string
  label?: string
}

export default function CopyButton({ value, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (insecure context / denied) — value is still visible to select manually.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : `${label} ${value}`}
      className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-accent transition-colors"
      style={{ transitionDuration: 'var(--duration-fast)' }}
    >
      {copied ? <RiCheckLine className="h-3.5 w-3.5" aria-hidden /> : <RiFileCopyLine className="h-3.5 w-3.5" aria-hidden />}
      {copied ? 'Copied' : label}
    </button>
  )
}
