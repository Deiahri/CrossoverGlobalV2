import { resolveStrapiMediaUrl } from "./tools";
import type { Article, Project, Sponsorship, Supporter } from "./types";

const NEXT_PUBLIC_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

// ---------------------------------------------------------------------------
// Post-processing — resolve Strapi media URLs recursively
// ---------------------------------------------------------------------------

function postProcess<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(postProcess) as unknown as T
  }
  if (value !== null && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    if (typeof obj['url'] === 'string') {
      obj['url'] = resolveStrapiMediaUrl(obj['url'])
    }
    for (const key of Object.keys(obj)) {
      obj[key] = postProcess(obj[key])
    }
  }
  return value
}

// ---------------------------------------------------------------------------
// Low-level fetch helper
// ---------------------------------------------------------------------------

interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function strapiList<T>(path: string, tags: string[]): Promise<T[]> {
  try {
    const res = await fetch(`${NEXT_PUBLIC_STRAPI_URL}/api${path}`, {
      cache: 'force-cache',
      next: { tags },
      headers: {
        authorization: `Bearer ${process.env.STRAPI_API_TOKEN!}`,
        'Content-Type': 'application/json'
      }
    });
    const json: StrapiListResponse<T> = await res.json();
    return (json.data ?? []).map(postProcess);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

const PROJECT_CARD_FIELDS =
  "fields[0]=slug&fields[1]=title&fields[2]=desc&fields[3]=location&fields[4]=complete&fields[5]=amount_raised";

export async function getProjects(): Promise<Project[]> {
  return strapiList<Project>(
    `/projects?${PROJECT_CARD_FIELDS}&populate[image]=true&sort[0]=complete:asc&sort[1]=createdAt:desc&pagination[limit]=100`,
    ["projects"],
  );
}

export async function getProjectSlugs(): Promise<string[]> {
  const items = await strapiList<{ slug: string }>(
    "/projects?fields[0]=slug&pagination[limit]=100",
    ["projects"],
  );
  return items.map((p) => p.slug).filter(Boolean);
}

export async function getProject(slug: string): Promise<Project | null> {
  const items = await strapiList<Project>(
    `/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[image]=true&populate[content][populate][media]=true&populate[impacts][populate][media]=true&pagination[limit]=1`,
    ["projects", `project_${slug}`],
  );
  return items[0] ?? null;
}

// ---------------------------------------------------------------------------
// Sponsorships
// ---------------------------------------------------------------------------

const SPONSORSHIP_CARD_FIELDS =
  "fields[0]=slug&fields[1]=title&fields[2]=short_desc&fields[3]=country&fields[4]=sponsee&fields[5]=complete";

export async function getSponsorships(): Promise<Sponsorship[]> {
  return strapiList<Sponsorship>(
    `/sponsorships?${SPONSORSHIP_CARD_FIELDS}&populate[image]=true&sort[0]=complete:asc&sort[1]=createdAt:desc&pagination[limit]=100`,
    ["sponsorships"],
  );
}

export async function getSponsorshipSlugs(): Promise<string[]> {
  const items = await strapiList<{ slug: string }>(
    "/sponsorships?fields[0]=slug&pagination[limit]=100",
    ["sponsorships"],
  );
  return items.map((s) => s.slug).filter(Boolean);
}

export async function getSponsorship(
  slug: string,
): Promise<Sponsorship | null> {
  const items = await strapiList<Sponsorship>(
    `/sponsorships?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[image]=true&populate[optional_sections]=true&pagination[limit]=1`,
    ["sponsorships", `sponsorship_${slug}`],
  );
  return items[0] ?? null;
}

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

const ARTICLE_CARD_FIELDS =
  "fields[0]=slug&fields[1]=title&fields[2]=desc&fields[3]=publish_date&fields[4]=author";

export async function getArticles(): Promise<Article[]> {
  return strapiList<Article>(
    `/articles?${ARTICLE_CARD_FIELDS}&populate[featured_image]=true&sort[0]=publish_date:desc&pagination[limit]=100`,
    ["articles"],
  );
}

export async function getArticleSlugs(): Promise<string[]> {
  const items = await strapiList<{ slug: string }>(
    "/articles?fields[0]=slug&pagination[limit]=100",
    ["articles"],
  );
  return items.map((a) => a.slug).filter(Boolean);
}

export async function getArticle(slug: string): Promise<Article | null> {
  const items = await strapiList<Article>(
    `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[featured_image]=true&populate[content][populate][media]=true&pagination[limit]=1`,
    ["articles", `article_${slug}`],
  );
  return items[0] ?? null;
}

// ---------------------------------------------------------------------------
// Supporters
// ---------------------------------------------------------------------------

export async function getSupporters(): Promise<Supporter[]> {
  return strapiList<Supporter>(
    `/supporters?populate[img]=true&sort[0]=createdAt:asc&pagination[limit]=100`,
    ["supporters"],
  );
}
