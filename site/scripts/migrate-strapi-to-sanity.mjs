#!/usr/bin/env node
/**
 * Phase 3 — import the Strapi backup into Sanity.
 *
 *   node --env-file=.env scripts/migrate-strapi-to-sanity.mjs [--dry-run] [--live]
 *
 *   --dry-run  transform and report, upload/write nothing
 *   --live     read from Strapi Cloud instead of ./backup (default: backup)
 *
 * Idempotent and resumable:
 *   - asset uploads are cached in scripts/.asset-map.json
 *   - documents use deterministic _ids and createOrReplace
 * Re-run it as often as you like; the last run before DNS cutover wins.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createReadStream, existsSync } from 'node:fs'
import path from 'node:path'
import { createClient } from '@sanity/client'

import { resetKeys, strapiBlocksToPortableText } from './strapi-to-portable-text.mjs'

const DRY_RUN = process.argv.includes('--dry-run')
const LIVE = process.argv.includes('--live')

const BACKUP = path.resolve('backup')
const ASSET_MAP_PATH = path.resolve('scripts/.asset-map.json')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!DRY_RUN && (!projectId || !token)) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.\n' +
      'Create an Editor token at https://sanity.io/manage and add both to site/.env.',
  )
  process.exit(1)
}

const client =
  DRY_RUN && !projectId
    ? null
    : createClient({
        projectId,
        dataset,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-08-27',
        token,
        useCdn: false,
      })

// ---------------------------------------------------------------------------
// Source loading
// ---------------------------------------------------------------------------

const POPULATE = {
  projects:
    'populate[image]=true&populate[content][populate][media]=true&populate[impacts][populate][media]=true&populate[post_project_photos]=true',
  sponsorships: 'populate[image]=true&populate[optional_sections]=true',
  articles: 'populate[featured_image]=true&populate[content][populate][media]=true',
  supporters: 'populate[img]=true',
}

async function loadCollection(type) {
  if (!LIVE) {
    const published = JSON.parse(await readFile(path.join(BACKUP, `${type}.json`), 'utf8'))
    const drafts = JSON.parse(await readFile(path.join(BACKUP, `${type}.draft.json`), 'utf8'))
    return { published, drafts }
  }
  const base = process.env.NEXT_PUBLIC_STRAPI_URL
  const strapiToken = process.env.STRAPI_API_TOKEN
  const get = async (status) => {
    const qs = `${POPULATE[type]}&pagination[limit]=100${status ? `&status=${status}` : ''}`
    const res = await fetch(`${base}/api/${type}?${qs}`, {
      headers: { authorization: `Bearer ${strapiToken}` },
    })
    if (!res.ok) throw new Error(`GET /api/${type} → ${res.status}`)
    return (await res.json()).data ?? []
  }
  return { published: await get(null), drafts: await get('draft') }
}

// ---------------------------------------------------------------------------
// Assets
// ---------------------------------------------------------------------------

let assetMap = {}
let manifest = {}

async function loadAssetMap() {
  if (existsSync(ASSET_MAP_PATH)) {
    assetMap = JSON.parse(await readFile(ASSET_MAP_PATH, 'utf8'))
  }
  const manifestPath = path.join(BACKUP, 'assets', 'manifest.json')
  if (existsSync(manifestPath)) {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  }
}

async function saveAssetMap() {
  if (DRY_RUN) return
  await mkdir(path.dirname(ASSET_MAP_PATH), { recursive: true })
  await writeFile(ASSET_MAP_PATH, JSON.stringify(assetMap, null, 2))
}

/** Collect every distinct original media object, keyed by Strapi documentId. */
function collectMedia(node, into) {
  if (Array.isArray(node)) {
    for (const v of node) collectMedia(v, into)
    return
  }
  if (node && typeof node === 'object') {
    if (typeof node.url === 'string' && node.mime && node.documentId && node.hash) {
      into.set(node.documentId, node)
    }
    for (const [k, v] of Object.entries(node)) {
      if (k === 'formats') continue
      collectMedia(v, into)
    }
  }
}

const isImage = (mime) => typeof mime === 'string' && mime.startsWith('image/')

async function uploadAsset(media) {
  const cached = assetMap[media.documentId]
  if (cached) return cached

  const kind = isImage(media.mime) ? 'image' : 'file'
  const entry = manifest[media.documentId]
  const localPath = entry ? path.join(BACKUP, 'assets', entry.file) : null

  let body
  if (localPath && existsSync(localPath)) {
    body = createReadStream(localPath)
  } else {
    const url = media.url.startsWith('http')
      ? media.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`download ${media.name} → ${res.status}`)
    body = Buffer.from(await res.arrayBuffer())
  }

  const asset = await client.assets.upload(kind, body, {
    filename: media.name,
    contentType: media.mime,
  })
  assetMap[media.documentId] = asset._id
  await saveAssetMap()
  return asset._id
}

// ---------------------------------------------------------------------------
// Field transforms
// ---------------------------------------------------------------------------

let keySeed = 0
const nextKey = () => `m${(keySeed += 1).toString(36)}`

function imageRef(media, label) {
  if (!media) return undefined
  const assetId = assetMap[media.documentId]
  if (!assetId) return undefined
  if (!isImage(media.mime)) {
    console.warn(`  ! ${label}: expected an image, got ${media.mime} — skipped`)
    return undefined
  }
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
    alt: media.alternativeText ?? '',
  }
}

/** One Strapi media array -> the imageItem | fileItem union. */
function mediaItems(list) {
  if (!Array.isArray(list) || list.length === 0) return undefined
  const out = []
  for (const media of list) {
    const assetId = assetMap[media.documentId]
    if (!assetId) continue
    if (isImage(media.mime)) {
      out.push({
        _type: 'imageItem',
        _key: nextKey(),
        asset: { _type: 'reference', _ref: assetId },
        alt: media.alternativeText ?? '',
        caption: media.caption ?? undefined,
      })
    } else {
      out.push({
        _type: 'fileItem',
        _key: nextKey(),
        file: { _type: 'file', asset: { _type: 'reference', _ref: assetId } },
        alt: media.alternativeText ?? '',
        caption: media.caption ?? undefined,
      })
    }
  }
  return out.length ? out : undefined
}

const blocks = (value) =>
  strapiBlocksToPortableText(value, (img) => assetMap[img?.documentId] ?? null)

const contentSections = (list) =>
  Array.isArray(list) && list.length
    ? list.map((section) => ({
        _type: 'contentSection',
        _key: nextKey(),
        media: mediaItems(section.media),
        text: blocks(section.text),
        youtubeUrl: section.youtubeURL || undefined,
      }))
    : undefined

const MIGRATED_AT = new Date().toISOString()

/** Provenance for debugging, redirects and reruns. */
const meta = (d, sourceType, legacyUrl) => ({
  _type: 'migrationMeta',
  sourceSystem: 'strapi',
  sourceId: d.documentId,
  sourceType,
  legacyUrl,
  migratedAt: MIGRATED_AT,
})

/** Strip undefined so createOrReplace doesn't write empty keys. */
const clean = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined))

const TRANSFORMS = {
  projects: (d) =>
    clean({
      _type: 'project',
      _id: `project-${d.documentId}`,
      title: d.title,
      slug: { _type: 'slug', current: d.slug },
      image: imageRef(d.image, `project ${d.slug} image`),
      desc: d.desc,
      location: d.location,
      content: contentSections(d.content),
      donorboxCode: d.donorbox_code,
      donorboxWall: d.donorbox_wall || undefined,
      bibleVerseContent: d.bible_verse_content || undefined,
      bibleVerseCv: d.bible_verse_cv || undefined,
      amountRaised: d.amount_raised ?? undefined,
      impacts:
        Array.isArray(d.impacts) && d.impacts.length
          ? d.impacts.map((i) => ({
              _type: 'projectImpact',
              _key: nextKey(),
              quantity: i.quantity ?? undefined,
              verb: i.verb,
              description: i.description ?? undefined,
              media: mediaItems(i.media),
            }))
          : undefined,
      postProjectPhotos: mediaItems(d.post_project_photos),
      complete: Boolean(d.complete),
      completionDate: d.completion_date ?? undefined,
      completionNotes: d.completion_notes || undefined,
      legacyCreatedAt: d.createdAt,
      migration: meta(d, 'project', `/projects/${d.slug}`),
    }),

  sponsorships: (d) =>
    clean({
      _type: 'sponsorship',
      _id: `sponsorship-${d.documentId}`,
      title: d.title,
      slug: { _type: 'slug', current: d.slug },
      sponsee: d.sponsee,
      country: d.country,
      shortDesc: d.short_desc,
      image: imageRef(d.image, `sponsorship ${d.slug} image`),
      sponseeDesc: blocks(d.sponsee_desc),
      sponseeRequestDesc: blocks(d.sponsee_request_desc),
      sponseeRequestVideo: d.sponsee_request_video || undefined,
      donorboxCode: d.donorbox_code,
      encouragement: d.encouragement,
      optionalSections:
        Array.isArray(d.optional_sections) && d.optional_sections.length
          ? d.optional_sections.map((s) => ({
              _type: 'optionalSection',
              _key: nextKey(),
              title: s.title,
              content: blocks(s.content),
            }))
          : undefined,
      complete: Boolean(d.complete),
      legacyCreatedAt: d.createdAt,
      migration: meta(d, 'sponsorship', `/sponsorship/${d.slug}`),
    }),

  articles: (d) =>
    clean({
      _type: 'article',
      _id: `article-${d.documentId}`,
      title: d.title,
      slug: { _type: 'slug', current: d.slug },
      desc: d.desc || undefined,
      featuredImage: imageRef(d.featured_image, `article ${d.slug} image`),
      publishDate: d.publish_date ?? d.createdAt,
      author: d.author || undefined,
      content: contentSections(d.content),
      legacyCreatedAt: d.createdAt,
      migration: meta(d, 'article', `/good-news/${d.slug}`),
    }),

  supporters: (d) =>
    clean({
      _type: 'supporter',
      _id: `supporter-${d.documentId}`,
      title: d.title,
      image: imageRef(d.img, `supporter ${d.title} image`),
      description: d.description,
      website: d.website,
      legacyCreatedAt: d.createdAt,
      migration: meta(d, 'supporter', null),
    }),
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Sanity runs `validation:` rules in Studio and in `sanity documents validate`,
 * NOT on client writes — so anything missing here would import silently and
 * only surface as a red field the next time an editor opens the document.
 */
const REQUIRED = {
  project: ['title', 'slug', 'desc', 'location', 'donorboxCode'],
  sponsorship: [
    'title', 'slug', 'sponsee', 'country', 'shortDesc', 'image',
    'sponseeDesc', 'sponseeRequestDesc', 'encouragement', 'donorboxCode',
  ],
  article: ['title', 'slug', 'publishDate'],
  supporter: ['title', 'image', 'description', 'website'],
}

function validate(docs) {
  const issues = []
  const slugsByType = new Map()

  for (const { doc } of docs) {
    for (const field of REQUIRED[doc._type] ?? []) {
      const value = doc[field]
      const empty =
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      if (empty) issues.push(`${doc._id}: missing required field "${field}"`)
    }

    // Sanity has no database-level uniqueness; Strapi only enforced it on
    // project.slug, so duplicates could arrive from articles/sponsorships.
    const slug = doc.slug?.current
    if (slug) {
      const key = doc._type
      if (!slugsByType.has(key)) slugsByType.set(key, new Map())
      const seen = slugsByType.get(key)
      if (seen.has(slug)) {
        issues.push(`${doc._type} slug "${slug}" is used by both ${seen.get(slug)} and ${doc._id}`)
      } else {
        seen.set(slug, doc._id)
      }
    }
  }
  return issues
}

// ---------------------------------------------------------------------------

async function main() {
  console.log(
    `Source: ${LIVE ? process.env.NEXT_PUBLIC_STRAPI_URL : './backup'}` +
      `  →  Sanity ${projectId ?? '(unset)'}/${dataset}${DRY_RUN ? '  [DRY RUN]' : ''}\n`,
  )

  await loadAssetMap()

  const sources = {}
  const media = new Map()
  for (const type of Object.keys(POPULATE)) {
    sources[type] = await loadCollection(type)
    collectMedia(sources[type].published, media)
    collectMedia(sources[type].drafts, media)
  }

  // --- assets ---
  const pending = [...media.values()].filter((m) => !assetMap[m.documentId])
  console.log(`Assets: ${media.size} total, ${pending.length} to upload`)
  if (DRY_RUN) {
    // Stand in for the real asset IDs so the transformed documents — and the
    // validation below — look exactly like a real run.
    for (const m of pending) {
      assetMap[m.documentId] = `${isImage(m.mime) ? 'image' : 'file'}-dryrun-${m.hash}`
    }
  } else {
    let done = 0
    for (const m of pending) {
      await uploadAsset(m)
      done += 1
      if (done % 5 === 0 || done === pending.length) {
        console.log(`  uploaded ${done}/${pending.length}`)
      }
    }
  }

  // --- documents ---
  resetKeys()
  keySeed = 0

  const docs = []
  for (const [type, transform] of Object.entries(TRANSFORMS)) {
    const { published, drafts } = sources[type]
    const publishedIds = new Set(published.map((d) => d.documentId))

    for (const d of published) docs.push({ doc: transform(d), draft: false })
    // Entries that exist only as drafts were never published in Strapi.
    for (const d of drafts) {
      if (!publishedIds.has(d.documentId)) docs.push({ doc: transform(d), draft: true })
    }
    console.log(
      `  ${type.padEnd(13)} ${published.length} published` +
        `, ${drafts.filter((d) => !publishedIds.has(d.documentId)).length} draft-only`,
    )
  }

  const issues = validate(docs)
  if (issues.length) {
    console.error(`\n${issues.length} validation issue(s) — nothing was written:`)
    for (const i of issues) console.error(`  ✗ ${i}`)
    process.exit(1)
  }
  console.log(`\nValidation: ${docs.length} documents OK`)

  if (DRY_RUN) {
    console.log(`\n[dry run] would write ${docs.length} documents. Sample:`)
    console.log(JSON.stringify(docs[0]?.doc, null, 2).slice(0, 1400))
    return
  }

  // Chunked to stay under the 4 MB mutation body cap.
  const CHUNK = 5
  let written = 0
  for (let i = 0; i < docs.length; i += CHUNK) {
    const tx = client.transaction()
    for (const { doc, draft } of docs.slice(i, i + CHUNK)) {
      tx.createOrReplace(draft ? { ...doc, _id: `drafts.${doc._id}` } : doc)
    }
    await tx.commit()
    written += Math.min(CHUNK, docs.length - i)
    console.log(`  wrote ${written}/${docs.length}`)
  }

  console.log(`\nDone. ${written} documents, ${Object.keys(assetMap).length} assets in Sanity.`)
}

main().catch((err) => {
  console.error(`\nMigration failed: ${err.message}`)
  process.exit(1)
})
