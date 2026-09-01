#!/usr/bin/env node
/**
 * Compare the Strapi backup against what actually landed in Sanity.
 *
 *   node --env-file=.env scripts/verify-migration.mjs
 *
 * Exits non-zero on any mismatch. Checks slug sets, scalar fields, section and
 * media counts, and the plain-text rendering of every rich-text field — the
 * last one is what catches a broken blocks -> Portable Text conversion.
 */

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@sanity/client'

const BACKUP = path.resolve('backup')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-08-27',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: 'published',
})

const problems = []
const check = (label, a, b) => {
  const norm = (v) => (v === null || v === undefined || v === '' ? null : v)
  if (JSON.stringify(norm(a)) !== JSON.stringify(norm(b))) {
    problems.push(`${label}: strapi=${JSON.stringify(a)} sanity=${JSON.stringify(b)}`)
  }
}

/** Flatten Strapi blocks to plain text. */
function strapiText(blocks) {
  if (!Array.isArray(blocks)) return ''
  // Strapi nests list items inside a `list` node; Portable Text emits each item
  // as its own block. Join list children with a newline so both flatteners agree.
  const walk = (n) =>
    n.text !== undefined
      ? n.text
      : (n.children ?? []).map(walk).join(n.type === 'list' ? '\n' : '')
  return blocks.map(walk).join('\n').replace(/\s+/g, ' ').trim()
}

/** Flatten Portable Text to plain text. */
function ptText(blocks) {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((b) => (b._type === 'block' ? (b.children ?? []).map((c) => c.text ?? '').join('') : ''))
    .join('\n')
    .replace(/\s+/g, ' ')
    .trim()
}

const countMedia = (list) => (Array.isArray(list) ? list.length : 0)

async function main() {
  const load = async (t) => JSON.parse(await readFile(path.join(BACKUP, `${t}.json`), 'utf8'))

  // --- projects ---
  const sProjects = await load('projects')
  const nProjects = await client.fetch(
    `*[_type=="project"]{ "slug": slug.current, title, desc, location, complete, amountRaised,
       "hasImage": defined(image.asset), content[]{ "m": count(media), text }, impacts[]{ verb, quantity, "m": count(media) } }`,
  )
  check('project count', sProjects.length, nProjects.length)
  for (const sp of sProjects) {
    const np = nProjects.find((p) => p.slug === sp.slug)
    if (!np) {
      problems.push(`project ${sp.slug}: MISSING in Sanity`)
      continue
    }
    check(`project ${sp.slug}.title`, sp.title, np.title)
    check(`project ${sp.slug}.desc`, sp.desc, np.desc)
    check(`project ${sp.slug}.location`, sp.location, np.location)
    check(`project ${sp.slug}.complete`, Boolean(sp.complete), Boolean(np.complete))
    check(`project ${sp.slug}.amount_raised`, sp.amount_raised ?? null, np.amountRaised ?? null)
    check(`project ${sp.slug}.image`, Boolean(sp.image), Boolean(np.hasImage))
    check(`project ${sp.slug}.content.length`, (sp.content ?? []).length, (np.content ?? []).length)
    ;(sp.content ?? []).forEach((sec, i) => {
      const nsec = (np.content ?? [])[i]
      if (!nsec) return
      check(`project ${sp.slug}.content[${i}].media`, countMedia(sec.media), nsec.m ?? 0)
      check(`project ${sp.slug}.content[${i}].text`, strapiText(sec.text), ptText(nsec.text))
    })
    check(`project ${sp.slug}.impacts.length`, (sp.impacts ?? []).length, (np.impacts ?? []).length)
  }

  // --- sponsorships ---
  const sSponsorships = await load('sponsorships')
  const nSponsorships = await client.fetch(
    `*[_type=="sponsorship"]{ "slug": slug.current, title, sponsee, country, shortDesc, complete,
       "hasImage": defined(image.asset), sponseeDesc, sponseeRequestDesc, encouragement,
       optionalSections[]{ title, content } }`,
  )
  check('sponsorship count', sSponsorships.length, nSponsorships.length)
  for (const ss of sSponsorships) {
    const ns = nSponsorships.find((x) => x.slug === ss.slug)
    if (!ns) {
      problems.push(`sponsorship ${ss.slug}: MISSING in Sanity`)
      continue
    }
    check(`sponsorship ${ss.slug}.title`, ss.title, ns.title)
    check(`sponsorship ${ss.slug}.sponsee`, ss.sponsee, ns.sponsee)
    check(`sponsorship ${ss.slug}.country`, ss.country, ns.country)
    check(`sponsorship ${ss.slug}.short_desc`, ss.short_desc, ns.shortDesc)
    check(`sponsorship ${ss.slug}.encouragement`, ss.encouragement, ns.encouragement)
    check(`sponsorship ${ss.slug}.image`, Boolean(ss.image), Boolean(ns.hasImage))
    check(`sponsorship ${ss.slug}.sponsee_desc`, strapiText(ss.sponsee_desc), ptText(ns.sponseeDesc))
    check(
      `sponsorship ${ss.slug}.sponsee_request_desc`,
      strapiText(ss.sponsee_request_desc),
      ptText(ns.sponseeRequestDesc),
    )
    check(
      `sponsorship ${ss.slug}.optional_sections.length`,
      (ss.optional_sections ?? []).length,
      (ns.optionalSections ?? []).length,
    )
    ;(ss.optional_sections ?? []).forEach((sec, i) => {
      const nsec = (ns.optionalSections ?? [])[i]
      if (!nsec) return
      check(`sponsorship ${ss.slug}.optional[${i}].title`, sec.title, nsec.title)
      check(`sponsorship ${ss.slug}.optional[${i}].content`, strapiText(sec.content), ptText(nsec.content))
    })
  }

  // --- articles ---
  const sArticles = await load('articles')
  const nArticles = await client.fetch(
    `*[_type=="article"]{ "slug": slug.current, title, desc, author, publishDate,
       "hasImage": defined(featuredImage.asset), content[]{ "m": count(media), text } }`,
  )
  check('article count', sArticles.length, nArticles.length)
  for (const sa of sArticles) {
    const na = nArticles.find((x) => x.slug === sa.slug)
    if (!na) {
      problems.push(`article ${sa.slug}: MISSING in Sanity`)
      continue
    }
    check(`article ${sa.slug}.title`, sa.title, na.title)
    check(`article ${sa.slug}.desc`, sa.desc, na.desc)
    check(`article ${sa.slug}.author`, sa.author, na.author)
    check(`article ${sa.slug}.content.length`, (sa.content ?? []).length, (na.content ?? []).length)
    ;(sa.content ?? []).forEach((sec, i) => {
      const nsec = (na.content ?? [])[i]
      if (!nsec) return
      check(`article ${sa.slug}.content[${i}].media`, countMedia(sec.media), nsec.m ?? 0)
      check(`article ${sa.slug}.content[${i}].text`, strapiText(sec.text), ptText(nsec.text))
    })
  }

  // --- supporters ---
  const sSupporters = await load('supporters')
  const nSupporters = await client.fetch(
    `*[_type=="supporter"]{ title, description, website, "hasImage": defined(image.asset) }`,
  )
  check('supporter count', sSupporters.length, nSupporters.length)
  for (const ss of sSupporters) {
    const ns = nSupporters.find((x) => x.title === ss.title)
    if (!ns) {
      problems.push(`supporter ${ss.title}: MISSING in Sanity`)
      continue
    }
    check(`supporter ${ss.title}.description`, ss.description, ns.description)
    check(`supporter ${ss.title}.website`, ss.website, ns.website)
    check(`supporter ${ss.title}.image`, Boolean(ss.img), Boolean(ns.hasImage))
  }

  // --- assets ---
  const assetCount = await client.fetch(
    `count(*[_type in ["sanity.imageAsset","sanity.fileAsset"]])`,
  )
  console.log(`Assets in Sanity: ${assetCount}`)

  if (problems.length) {
    console.error(`\n${problems.length} mismatch(es):`)
    for (const p of problems) console.error(`  ✗ ${p}`)
    process.exit(1)
  }
  console.log('\nAll checks passed — Strapi and Sanity content match.')
}

main().catch((err) => {
  console.error(`Verification failed: ${err.message}`)
  process.exit(1)
})
