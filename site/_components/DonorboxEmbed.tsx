'use client'

import { useEffect, useState } from 'react'

interface DonorboxEmbedProps {
  html: string
  id?: string
}

export default function DonorboxEmbed({ html, id }: DonorboxEmbedProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!html || !mounted) return null
  return (
    <div
      id={id}
      style={{
        maxWidth: '25rem',
        width: '100%',
        margin: 'auto',
        backgroundColor: 'white',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
