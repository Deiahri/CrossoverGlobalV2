import { client } from '@/sanity/client'
import {
  ARTICLE_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLES_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECTS_QUERY,
  SPONSORSHIP_QUERY,
  SPONSORSHIP_SLUGS_QUERY,
  SPONSORSHIPS_QUERY,
  SUPPORTERS_QUERY,
} from '@/sanity/queries'
import type { Article, Project, Sponsorship, Supporter } from './types'

/**
 * Cache tags are unchanged from the Strapi implementation — `app/api/on-update`
 * still revalidates exactly these strings.
 */
function query<T>(q: string, tags: string[], params: Record<string, unknown> = {}): Promise<T> {
  return client.fetch<T>(q, params, { next: { tags } })
}

/**
 * Slug lists feed generateStaticParams at build time, where a stale CDN edge
 * would silently drop a newly published page from the build.
 */
function queryFresh<T>(q: string, tags: string[]): Promise<T> {
  return client.withConfig({ useCdn: false }).fetch<T>(q, {}, { next: { tags } })
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export async function getProjects(): Promise<Project[]> {
  return query<Project[]>(PROJECTS_QUERY, ['projects'])
}

export async function getProjectSlugs(): Promise<string[]> {
  const slugs = await queryFresh<string[]>(PROJECT_SLUGS_QUERY, ['projects'])
  return slugs.filter(Boolean)
}

export async function getProject(slug: string): Promise<Project | null> {
  return query<Project | null>(PROJECT_QUERY, ['project', `project_${slug}`], { slug })
}

// ---------------------------------------------------------------------------
// Sponsorships
// ---------------------------------------------------------------------------

export async function getSponsorships(): Promise<Sponsorship[]> {
  return query<Sponsorship[]>(SPONSORSHIPS_QUERY, ['sponsorships'])
}

export async function getSponsorshipSlugs(): Promise<string[]> {
  const slugs = await queryFresh<string[]>(SPONSORSHIP_SLUGS_QUERY, ['sponsorships'])
  return slugs.filter(Boolean)
}

export async function getSponsorship(slug: string): Promise<Sponsorship | null> {
  return query<Sponsorship | null>(SPONSORSHIP_QUERY, ['sponsorship', `sponsorship_${slug}`], {
    slug,
  })
}

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

export async function getArticles(): Promise<Article[]> {
  return query<Article[]>(ARTICLES_QUERY, ['articles'])
}

export async function getArticleSlugs(): Promise<string[]> {
  const slugs = await queryFresh<string[]>(ARTICLE_SLUGS_QUERY, ['articles'])
  return slugs.filter(Boolean)
}

export async function getArticle(slug: string): Promise<Article | null> {
  return query<Article | null>(ARTICLE_QUERY, ['article', `article_${slug}`], { slug })
}

// ---------------------------------------------------------------------------
// Supporters
// ---------------------------------------------------------------------------

export async function getSupporters(): Promise<Supporter[]> {
  return query<Supporter[]>(SUPPORTERS_QUERY, ['supporters'])
}
