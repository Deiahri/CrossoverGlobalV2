import type { BlocksContent } from '@strapi/blocks-react-renderer'

// ---------------------------------------------------------------------------
// Strapi base types
// ---------------------------------------------------------------------------

export interface StrapiMedia {
  url: string
  mime: string // e.g. "image/jpeg", "video/mp4"
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
  image: StrapiMedia
  desc: string // short card desc
  location: string
  overview_video?: StrapiMedia
  long_desc: BlocksContent
  goals: BlocksContent
  pre_project_photos: StrapiMedia[]
  donorbox_code: string // raw Donorbox HTML embed (donate widget)
  donorbox_wall?: string // raw Donorbox donor wall HTML
  bible_verse_content: string
  bible_verse_cv: string // citation, e.g. "2 Timothy 1:7"
  amount_raised?: string // e.g. "$524.33"
  impacts: ProjectImpact[]
  post_project_photos: StrapiMedia[]
  complete: boolean
  completion_date?: string // ISO date string
  completion_notes?: string
}

// ---------------------------------------------------------------------------
// Sponsorship
// ---------------------------------------------------------------------------

export interface SponsorshipShareLink {
  icon: string // icon filename, e.g. "whatsapp.svg"
  url: string
}

export interface SponsorshipOptionalSection {
  title: string
  content: BlocksContent
}

export interface Sponsorship {
  slug: string
  title: string
  sponsee: string // person's name
  country: string
  desc: string // short card desc
  image: StrapiMedia
  sponsee_desc: BlocksContent
  sponsee_request_desc: BlocksContent // itemized costs / needs
  sponsee_request_video?: string // YouTube embed URL
  donorbox_code: string // raw Donorbox HTML embed
  encouragement: string // brief call-to-action text above donate widget
  share_links: SponsorshipShareLink[]
  optional_sections: SponsorshipOptionalSection[]
  complete: boolean
}

// ---------------------------------------------------------------------------
// Article (Good News)
// ---------------------------------------------------------------------------

export interface Article {
  slug: string
  title: string
  desc: string
  featured_image: StrapiMedia
  content: BlocksContent
  publish_date: string // ISO date string
  author?: string
}
