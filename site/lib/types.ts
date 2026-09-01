import type { PortableTextBlock } from '@portabletext/react'

/** Rich text, stored as Portable Text. */
export type RichTextContent = PortableTextBlock[]

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------

export interface MediaAsset {
  url: string
  mime: string // e.g. "image/jpeg", "video/mp4", "audio/mpeg"
  alternativeText?: string | null
  caption?: string | null
  width?: number
  height?: number
  size?: number
  ext?: string
  name?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

/** Narrowed media types */
export type PhotoAsset = MediaAsset & { mime: `image/${string}` }
export type VideoAsset = MediaAsset & { mime: `video/${string}` }
export type AudioAsset = MediaAsset & { mime: `audio/${string}` }

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------

export interface ProjectImpact {
  quantity: string
  verb: string
  description: string
  media: MediaAsset[]
}

export interface Project {
  slug: string
  title: string
  image: PhotoAsset
  desc: string // short card desc
  location: string
  content: ArticleSection[]
  donorbox_code: string // raw Donorbox HTML embed (donate widget)
  donorbox_wall?: string // raw Donorbox donor wall HTML
  bible_verse_content: string
  bible_verse_cv: string // citation, e.g. "2 Timothy 1:7"
  amount_raised?: number // e.g. 524.33
  impacts?: ProjectImpact[]
  complete: boolean
  completion_date?: string // ISO date string
  completion_notes?: string
}

// ---------------------------------------------------------------------------
// Sponsorship
// ---------------------------------------------------------------------------

export interface SponsorshipOptionalSection {
  title: string
  content: RichTextContent
}

export interface Sponsorship {
  slug: string
  title: string
  sponsee: string // person's name
  country: string
  short_desc: string // short card desc
  image: PhotoAsset
  sponsee_desc: RichTextContent
  sponsee_request_desc: RichTextContent // itemized costs / needs
  sponsee_request_video?: string // YouTube embed URL
  donorbox_code: string // raw Donorbox HTML embed
  encouragement: string // brief call-to-action text above donate widget
  optional_sections: SponsorshipOptionalSection[]
  complete: boolean
}

// ---------------------------------------------------------------------------
// Supporter
// ---------------------------------------------------------------------------

export interface Supporter {
  img: PhotoAsset
  title: string
  description: string
  website: string
}

// ---------------------------------------------------------------------------
// Article (Good News)
// ---------------------------------------------------------------------------

export interface ArticleSection {
  media: MediaAsset[]
  youtubeURL?: string
  text: RichTextContent
}

export interface Article {
  slug: string
  title: string
  desc: string
  featured_image?: PhotoAsset
  content: ArticleSection[]
  publish_date: string // ISO date string
  author?: string
}
