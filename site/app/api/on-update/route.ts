import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Maps document _type → { singular tag (item fetches), plural tag (list fetches) }
const MODEL_MAP: Record<string, { singular: string; plural: string }> = {
  project:     { singular: 'project',     plural: 'projects'     },
  sponsorship: { singular: 'sponsorship', plural: 'sponsorships' },
  article:     { singular: 'article',     plural: 'articles'     },
  supporter:   { singular: 'supporter',   plural: 'supporters'   },
}

type WebhookPayload = { model?: string; slug?: string }

/**
 * Sanity GROQ-powered webhook receiver.
 *
 * Configure at sanity.io/manage → API → Webhooks:
 *   URL        POST <origin>/api/on-update
 *   Filter     _type in ["project","sponsorship","article","supporter"]
 *   Projection {"model": _type, "slug": slug.current}
 *   Secret     same value as SANITY_REVALIDATE_SECRET
 *
 * The third `parseBody` argument waits for Content Lake consistency before we
 * revalidate. Webhooks fire *before* the Sanity CDN has the new content, so
 * without it the rebuild can re-cache the stale document.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    const model = body?.model
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
    if (body?.slug) {
      const slugTag = `${mapping.singular}_${body.slug}`
      revalidateTag(slugTag, 'max')
      revalidated.push(slugTag)
    }

    return NextResponse.json({ revalidated: true, tags: revalidated })
  } catch (err) {
    return new Response((err as Error).message, { status: 500 })
  }
}
