import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Maps Strapi model name → { collection tag, individual tag prefix, list path, item path prefix }
const MODEL_MAP: Record<string, { collection: string; prefix: string; listPath: string; itemPathPrefix: string }> = {
  project:     { collection: 'projects',     prefix: 'project',     listPath: '/projects',    itemPathPrefix: '/projects/' },
  sponsorship: { collection: 'sponsorships', prefix: 'sponsorship', listPath: '/sponsorship', itemPathPrefix: '/sponsorship/' },
  article:     { collection: 'articles',     prefix: 'article',     listPath: '/good-news',   itemPathPrefix: '/good-news/' },
  supporter:   { collection: 'supporters',   prefix: 'supporter',   listPath: '/',            itemPathPrefix: '/' },
}

export async function POST(req: NextRequest) {
  // Optional secret validation
  const secret = process.env.WEBHOOK_SECRET
  if (secret) {
    const incoming = req.headers.get('x-webhook-secret')
    if (incoming !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let body: { model?: string; entry?: { slug?: string } }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { model, entry } = body

  if (!model) {
    return NextResponse.json({ error: 'Missing model' }, { status: 400 })
  }

  const mapping = MODEL_MAP[model]
  if (!mapping) {
    return NextResponse.json({ revalidated: false, reason: `Unknown model: ${model}` })
  }

  const revalidated: string[] = []

  // Always revalidate the collection (data cache + full route cache)
  revalidateTag(mapping.collection, 'max')
  revalidatePath(mapping.listPath)
  revalidated.push(mapping.collection)

  // Revalidate the specific item page if slug is present
  const slug = entry?.slug
  if (slug) {
    const itemTag = `${mapping.prefix}_${slug}`
    revalidateTag(itemTag, 'max')
    revalidatePath(`${mapping.itemPathPrefix}${slug}`)
    revalidated.push(itemTag)
  }

  return NextResponse.json({ revalidated: true, tags: revalidated })
}
