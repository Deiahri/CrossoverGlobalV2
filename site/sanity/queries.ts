import { defineQuery } from 'next-sanity'

/**
 * GROQ projections deliberately rename fields back to the snake_case shape the
 * existing components consume (`url`, `mime`, `alternativeText`, `desc`,
 * `amount_raised`, …). That keeps `lib/types.ts` and every call site unchanged
 * across the Strapi -> Sanity move.
 */

/** Flattens the imageItem | fileItem union into one media shape. */
const MEDIA = /* groq */ `{
  _type == "imageItem" => {
    "url": asset->url,
    "mime": asset->mimeType,
    "alternativeText": alt,
    "caption": caption,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  },
  _type == "fileItem" => {
    "url": file.asset->url,
    "mime": file.asset->mimeType,
    "alternativeText": alt,
    "caption": caption
  }
}`

/** A plain (non-array) image field. */
const IMAGE = /* groq */ `{
  "url": asset->url,
  "mime": asset->mimeType,
  "alternativeText": alt,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`

const CONTENT_SECTIONS = /* groq */ `content[]{
  "youtubeURL": youtubeUrl,
  text,
  "media": media[]${MEDIA}
}`

/** Strapi ordered by createdAt; legacyCreatedAt preserves that. */
const CREATED = /* groq */ `coalesce(legacyCreatedAt, _createdAt)`

// --- Projects ---------------------------------------------------------------

export const PROJECTS_QUERY = defineQuery(/* groq */ `
*[_type == "project" && defined(slug.current)]
  | order(complete asc, ${CREATED} desc) [0...100] {
    "slug": slug.current,
    title,
    desc,
    location,
    complete,
    "amount_raised": amountRaised,
    "image": image${IMAGE}
  }`)

export const PROJECT_SLUGS_QUERY = defineQuery(/* groq */ `
*[_type == "project" && defined(slug.current)].slug.current`)

export const PROJECT_QUERY = defineQuery(/* groq */ `
*[_type == "project" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  desc,
  location,
  complete,
  "amount_raised": amountRaised,
  "image": image${IMAGE},
  ${CONTENT_SECTIONS},
  "donorbox_code": donorboxCode,
  "donorbox_wall": donorboxWall,
  "bible_verse_content": bibleVerseContent,
  "bible_verse_cv": bibleVerseCv,
  "completion_date": completionDate,
  "completion_notes": completionNotes,
  "impacts": impacts[]{
    quantity,
    verb,
    description,
    "media": media[]${MEDIA}
  },
  "post_project_photos": postProjectPhotos[]${MEDIA}
}`)

// --- Sponsorships -----------------------------------------------------------

export const SPONSORSHIPS_QUERY = defineQuery(/* groq */ `
*[_type == "sponsorship" && defined(slug.current)]
  | order(complete asc, ${CREATED} desc) [0...100] {
    "slug": slug.current,
    title,
    sponsee,
    country,
    "short_desc": shortDesc,
    complete,
    "image": image${IMAGE}
  }`)

export const SPONSORSHIP_SLUGS_QUERY = defineQuery(/* groq */ `
*[_type == "sponsorship" && defined(slug.current)].slug.current`)

export const SPONSORSHIP_QUERY = defineQuery(/* groq */ `
*[_type == "sponsorship" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  sponsee,
  country,
  "short_desc": shortDesc,
  complete,
  "image": image${IMAGE},
  "sponsee_desc": sponseeDesc,
  "sponsee_request_desc": sponseeRequestDesc,
  "sponsee_request_video": sponseeRequestVideo,
  "donorbox_code": donorboxCode,
  encouragement,
  "optional_sections": optionalSections[]{ title, content }
}`)

// --- Articles ---------------------------------------------------------------

export const ARTICLES_QUERY = defineQuery(/* groq */ `
*[_type == "article" && defined(slug.current)]
  | order(publishDate desc) [0...100] {
    "slug": slug.current,
    title,
    desc,
    author,
    "publish_date": publishDate,
    "featured_image": featuredImage${IMAGE}
  }`)

export const ARTICLE_SLUGS_QUERY = defineQuery(/* groq */ `
*[_type == "article" && defined(slug.current)].slug.current`)

export const ARTICLE_QUERY = defineQuery(/* groq */ `
*[_type == "article" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  desc,
  author,
  "publish_date": publishDate,
  "featured_image": featuredImage${IMAGE},
  ${CONTENT_SECTIONS}
}`)

// --- Supporters -------------------------------------------------------------

export const SUPPORTERS_QUERY = defineQuery(/* groq */ `
*[_type == "supporter"] | order(${CREATED} asc) [0...100] {
  title,
  description,
  website,
  "img": image${IMAGE}
}`)
