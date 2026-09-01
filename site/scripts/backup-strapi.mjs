#!/usr/bin/env node
/**
 * Phase 0 — snapshot everything in Strapi Cloud to disk.
 *
 * Strapi Cloud's free plan is being removed; free projects are deleted after
 * 2026-09-01. This dumps every document (published + draft) and every original
 * media file so the Sanity migration has a source that survives the cutoff.
 *
 *   node --env-file=.env scripts/backup-strapi.mjs
 *
 * Output (gitignored):
 *   backup/<type>.json          published entries, deep-populated
 *   backup/<type>.draft.json    draft entries, deep-populated
 *   backup/assets/<hash><ext>   original files (no Strapi format derivatives)
 *   backup/assets/manifest.json documentId -> { file, mime, name, size, url }
 *   backup/meta.json            run metadata + counts
 */

import { mkdir, writeFile, stat } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import path from 'node:path'

const BASE = process.env.NEXT_PUBLIC_STRAPI_URL
const TOKEN = process.env.STRAPI_API_TOKEN

if (!BASE || !TOKEN) {
  console.error('Missing NEXT_PUBLIC_STRAPI_URL or STRAPI_API_TOKEN. Run with: node --env-file=.env scripts/backup-strapi.mjs')
  process.exit(1)
}

const OUT = path.resolve('backup')
const ASSETS = path.join(OUT, 'assets')
const DOWNLOAD_CONCURRENCY = 4

/**
 * Deep-populate params per collection. These mirror lib/api.ts, plus
 * `post_project_photos` — defined in the Strapi schema but never queried by the
 * site, so it would otherwise be lost.
 */
const COLLECTIONS = {
  projects:
    'populate[image]=true&populate[content][populate][media]=true&populate[impacts][populate][media]=true&populate[post_project_photos]=true',
  sponsorships: 'populate[image]=true&populate[optional_sections]=true',
  articles: 'populate[featured_image]=true&populate[content][populate][media]=true',
  supporters: 'populate[img]=true',
}

async function fetchAll(type, populate, status) {
  const out = []
  let page = 1
  for (;;) {
    const qs = [
      populate,
      `pagination[page]=${page}`,
      'pagination[pageSize]=100',
      status ? `status=${status}` : '',
    ]
      .filter(Boolean)
      .join('&')

    const res = await fetch(`${BASE}/api/${type}?${qs}`, {
      headers: { authorization: `Bearer ${TOKEN}` },
    })
    if (!res.ok) {
      throw new Error(`GET /api/${type} (page ${page}, status=${status ?? 'published'}) → ${res.status} ${res.statusText}`)
    }
    const json = await res.json()
    out.push(...(json.data ?? []))

    const p = json.meta?.pagination
    if (!p || page >= p.pageCount) return out
    page += 1
  }
}

/**
 * Walk a document tree collecting original media objects, keyed by documentId.
 * Skips the `formats` sub-object — those are Strapi's thumbnail_/small_/
 * medium_/large_ derivatives, which Sanity regenerates on demand.
 */
function collectAssets(node, into) {
  if (Array.isArray(node)) {
    for (const v of node) collectAssets(v, into)
    return
  }
  if (node && typeof node === 'object') {
    if (typeof node.url === 'string' && node.mime && node.hash && node.documentId) {
      into.set(node.documentId, {
        url: node.url,
        mime: node.mime,
        hash: node.hash,
        ext: node.ext ?? '',
        name: node.name ?? node.hash,
        size: node.size ?? 0, // Strapi reports KB
      })
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === 'formats') continue
      collectAssets(value, into)
    }
  }
}

async function download(asset, dest) {
  try {
    const existing = await stat(dest)
    if (existing.size > 0) return { skipped: true, bytes: existing.size }
  } catch {
    // not downloaded yet
  }

  const url = asset.url.startsWith('http') ? asset.url : `${BASE}${asset.url}`
  const res = await fetch(url)
  if (!res.ok || !res.body) {
    throw new Error(`asset ${asset.name} → ${res.status} ${res.statusText}`)
  }
  await pipeline(res.body, createWriteStream(dest))
  const { size } = await stat(dest)
  return { skipped: false, bytes: size }
}

async function runPool(items, limit, worker) {
  const queue = [...items]
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    for (;;) {
      const item = queue.shift()
      if (!item) return
      await worker(item)
    }
  })
  await Promise.all(workers)
}

async function main() {
  await mkdir(ASSETS, { recursive: true })
  console.log(`Backing up ${BASE}\n`)

  const assets = new Map()
  const counts = {}

  for (const [type, populate] of Object.entries(COLLECTIONS)) {
    const published = await fetchAll(type, populate, null)
    const drafts = await fetchAll(type, populate, 'draft')

    await writeFile(path.join(OUT, `${type}.json`), JSON.stringify(published, null, 2))
    await writeFile(path.join(OUT, `${type}.draft.json`), JSON.stringify(drafts, null, 2))

    collectAssets(published, assets)
    collectAssets(drafts, assets)

    counts[type] = { published: published.length, drafts: drafts.length }
    console.log(`  ${type.padEnd(13)} ${published.length} published, ${drafts.length} draft`)
  }

  console.log(`\nDownloading ${assets.size} original assets…`)
  const manifest = {}
  let downloaded = 0
  let skipped = 0
  let bytes = 0
  let failed = 0

  await runPool([...assets.entries()], DOWNLOAD_CONCURRENCY, async ([documentId, asset]) => {
    const file = `${asset.hash}${asset.ext}`
    const dest = path.join(ASSETS, file)
    try {
      const result = await download(asset, dest)
      manifest[documentId] = { file, mime: asset.mime, name: asset.name, size: asset.size, url: asset.url }
      bytes += result.bytes
      if (result.skipped) skipped += 1
      else downloaded += 1
      const total = downloaded + skipped
      if (total % 10 === 0) console.log(`    ${total}/${assets.size}…`)
    } catch (err) {
      failed += 1
      console.error(`    FAILED ${asset.name}: ${err.message}`)
    }
  })

  await writeFile(path.join(ASSETS, 'manifest.json'), JSON.stringify(manifest, null, 2))
  await writeFile(
    path.join(OUT, 'meta.json'),
    JSON.stringify({ source: BASE, takenAt: new Date().toISOString(), counts, assetCount: assets.size, bytes }, null, 2),
  )

  console.log(
    `\nDone. ${downloaded} downloaded, ${skipped} already present, ${failed} failed — ${(bytes / 1024 / 1024).toFixed(1)} MB in backup/assets/`,
  )
  if (failed > 0) process.exitCode = 1
}

main().catch((err) => {
  console.error(`\nBackup failed: ${err.message}`)
  process.exit(1)
})
