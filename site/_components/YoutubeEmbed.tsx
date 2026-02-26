'use client'

interface YoutubeEmbedProps {
  url: string
  title?: string
}

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url)
    // Already an embed URL
    if (u.pathname.startsWith('/embed/')) return url
    // youtu.be/VIDEO_ID
    if (u.hostname === 'youtu.be') return `https://www.youtube.com/embed${u.pathname}`
    // youtube.com/watch?v=VIDEO_ID
    const v = u.searchParams.get('v')
    if (v) return `https://www.youtube.com/embed/${v}`
  } catch {
    // fall through
  }
  return url
}

export default function YoutubeEmbed({ url, title = 'Video' }: YoutubeEmbedProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingTop: '56.25%' }}>
      <iframe
        src={toEmbedUrl(url)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  )
}
