import type { Article, Project, Sponsorship } from "./types";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

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

async function strapiList<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      // cache: "force-cache",
      headers: {
        authorization: `Bearer ${process.env.STRAPI_API_TOKEN!}`,
        'Content-Type': 'application/json'
      }
    });
    // console.log('bb', res, process.env.STRAPI_API_TOKEN);
    // if (!res.ok) return [];
    const json: StrapiListResponse<T> = await res.json();
    // console.log('hi', json);
    return json.data ?? [];
  } catch {
    // console.error('error', e);
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
  );
}

export async function getProjectSlugs(): Promise<string[]> {
  const items = await strapiList<{ slug: string }>(
    "/projects?fields[0]=slug&pagination[limit]=100",
  );
  return items.map((p) => p.slug).filter(Boolean);
}

export async function getProject(slug: string): Promise<Project | null> {
  const items = await strapiList<Project>(
    `/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[image]=true&populate[overview_video]=true&populate[pre_project_photos]=true&populate[post_project_photos]=true&populate[impacts][populate][media]=true&pagination[limit]=1`,
  );
  return items[0] ?? null;
}

// ---------------------------------------------------------------------------
// Sponsorships
// ---------------------------------------------------------------------------

const SPONSORSHIP_CARD_FIELDS =
  "fields[0]=slug&fields[1]=title&fields[2]=desc&fields[3]=country&fields[4]=sponsee&fields[5]=complete";

export async function getSponsorships(): Promise<Sponsorship[]> {
  return strapiList<Sponsorship>(
    `/sponsorships?${SPONSORSHIP_CARD_FIELDS}&populate[image]=true&sort[0]=complete:asc&sort[1]=createdAt:desc&pagination[limit]=100`,
  );
}

export async function getSponsorshipSlugs(): Promise<string[]> {
  const items = await strapiList<{ slug: string }>(
    "/sponsorships?fields[0]=slug&pagination[limit]=100",
  );
  return items.map((s) => s.slug).filter(Boolean);
}

export async function getSponsorship(
  slug: string,
): Promise<Sponsorship | null> {
  const items = await strapiList<Sponsorship>(
    `/sponsorships?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[image]=true&populate[share_links]=true&populate[optional_sections]=true&pagination[limit]=1`,
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
    // `/articles`,
    `/articles?${ARTICLE_CARD_FIELDS}&populate[featured_image]=true&sort[0]=publish_date:desc&pagination[limit]=100`,
  );
}

export async function getArticleSlugs(): Promise<string[]> {
  const items = await strapiList<{ slug: string }>(
    "/articles?fields[0]=slug&pagination[limit]=100",
  );
  return items.map((a) => a.slug).filter(Boolean);
}

export async function getArticle(slug: string): Promise<Article | null> {
  const items = await strapiList<Article>(
    `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[featured_image]=true&pagination[limit]=1`,
  );
  return items[0] ?? null;
}
