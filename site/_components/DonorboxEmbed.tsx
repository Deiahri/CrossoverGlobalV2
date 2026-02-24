'use client'

interface DonorboxEmbedProps {
  html: string
}

export default function DonorboxEmbed({ html }: DonorboxEmbedProps) {
  if (!html) return null

  return (
    <div
      className="w-full max-w-2xl mx-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
