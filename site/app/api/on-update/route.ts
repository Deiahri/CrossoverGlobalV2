import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Maps Strapi model name → { singular tag (item fetches), plural tag (list fetches) }
const MODEL_MAP: Record<string, { singular: string; plural: string }> = {
  project:     { singular: 'project',     plural: 'projects'     },
  sponsorship: { singular: 'sponsorship', plural: 'sponsorships' },
  article:     { singular: 'article',     plural: 'articles'     },
  supporter:   { singular: 'supporter',   plural: 'supporters'   },
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

  // Always revalidate both list and item-level tags
  revalidateTag(mapping.plural, 'max')
  revalidateTag(mapping.singular, 'max')
  revalidated.push(mapping.plural, mapping.singular)

  // Revalidate the specific item if slug is present
  const slug = entry?.slug
  if (slug) {
    const slugTag = `${mapping.singular}_${slug}`
    revalidateTag(slugTag, 'max')
    revalidated.push(slugTag)
  }

  return NextResponse.json({ revalidated: true, tags: revalidated })
}
