import type { BlocksContent } from '@strapi/blocks-react-renderer'

// ---------------------------------------------------------------------------
// Strapi base types
// ---------------------------------------------------------------------------

export interface StrapiMedia {
  url: string
  mime: string // e.g. "image/jpeg", "video/mp4", "audio/mpeg"
  alternativeText?: string | null
  caption?: string | null
  width?: number
  height?: number
  size?: number
  hash?: string
  ext?: string
  name?: string
  documentId?: string
  provider?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

/** Narrowed media types */
export type StrapiPhoto = StrapiMedia & { mime: `image/${string}` }
export type StrapiVideo = StrapiMedia & { mime: `video/${string}` }
export type StrapiAudio = StrapiMedia & { mime: `audio/${string}` }

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------

export interface ProjectImpact {
  quantity: string
  verb: string
  description: string
  media: StrapiMedia[]
}

export interface Project {
  slug: string
  title: string
  image: StrapiPhoto
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
  content: BlocksContent
}

export interface Sponsorship {
  slug: string
  title: string
  sponsee: string // person's name
  country: string
  short_desc: string // short card desc
  image: StrapiPhoto
  sponsee_desc: BlocksContent
  sponsee_request_desc: BlocksContent // itemized costs / needs
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
  img: StrapiPhoto
  title: string
  description: string
  website: string
}

// ---------------------------------------------------------------------------
// Article (Good News)
// ---------------------------------------------------------------------------

export interface ArticleSection {
  media: StrapiMedia
  youtubeURL?: string
  text: BlocksContent
}

export interface Article {
  slug: string
  title: string
  desc: string
  featured_image: StrapiPhoto
  content: ArticleSection[]
  publish_date: string // ISO date string
  author?: string
}
