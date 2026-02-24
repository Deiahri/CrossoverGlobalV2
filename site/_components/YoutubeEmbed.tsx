'use client'

interface YoutubeEmbedProps {
  url: string
  title?: string
}

export default function YoutubeEmbed({ url, title = 'Video' }: YoutubeEmbedProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingTop: '56.25%' }}>
      <iframe
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  )
}
