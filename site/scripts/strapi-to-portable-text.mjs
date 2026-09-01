/**
 * Strapi `blocks` JSON -> Portable Text.
 *
 * Covers every block/mark the Strapi editor could produce, not just the subset
 * present in the current content (paragraph, h3, unordered list, bold, link),
 * so re-running against newer Strapi content stays lossless.
 */

let counter = 0
/** Deterministic keys keep re-runs byte-identical, so createOrReplace is a no-op. */
export function resetKeys() {
  counter = 0
}
function key() {
  counter += 1
  return `k${counter.toString(36)}`
}

const MARK_MAP = {
  bold: 'strong',
  italic: 'em',
  underline: 'underline',
  strikethrough: 'strike-through',
  code: 'code',
}

function toSpan(node, extraMarks) {
  const marks = [...extraMarks]
  for (const [strapiMark, ptMark] of Object.entries(MARK_MAP)) {
    if (node[strapiMark]) marks.push(ptMark)
  }
  return { _type: 'span', _key: key(), text: node.text ?? '', marks }
}

function toSpans(children, markDefs) {
  const spans = []
  for (const child of children ?? []) {
    if (child.type === 'link') {
      const linkKey = key()
      markDefs.push({ _key: linkKey, _type: 'link', href: child.url })
      for (const grandchild of child.children ?? []) {
        spans.push(toSpan(grandchild, [linkKey]))
      }
    } else {
      spans.push(toSpan(child, []))
    }
  }
  return spans
}

function textBlock(children, style, extra = {}) {
  const markDefs = []
  const spans = toSpans(children, markDefs)
  return { _type: 'block', _key: key(), style, markDefs, children: spans, ...extra }
}

/** Strapi nests sub-lists inside list-items; Portable Text flattens them with `level`. */
function convertList(block, out, level) {
  const listItem = block.format === 'ordered' ? 'number' : 'bullet'
  for (const item of block.children ?? []) {
    if (item.type !== 'list-item') continue
    const inline = []
    const nested = []
    for (const child of item.children ?? []) {
      if (child.type === 'list') nested.push(child)
      else inline.push(child)
    }
    out.push(textBlock(inline, 'normal', { listItem, level }))
    for (const sublist of nested) convertList(sublist, out, level + 1)
  }
}

/**
 * @param blocks Strapi blocks array
 * @param resolveImage (strapiMedia) => sanity asset _id, or null to drop
 */
export function strapiBlocksToPortableText(blocks, resolveImage = () => null) {
  if (!Array.isArray(blocks)) return undefined
  const out = []

  for (const block of blocks) {
    if (!block || typeof block !== 'object') continue

    switch (block.type) {
      case 'paragraph':
        out.push(textBlock(block.children, 'normal'))
        break

      case 'heading': {
        const level = Math.min(Math.max(Number(block.level) || 2, 1), 6)
        out.push(textBlock(block.children, `h${level}`))
        break
      }

      case 'list':
        convertList(block, out, 1)
        break

      case 'quote':
        out.push(textBlock(block.children, 'blockquote'))
        break

      case 'code':
        out.push({
          _type: 'codeBlock',
          _key: key(),
          code: (block.children ?? []).map((c) => c.text ?? '').join('\n'),
        })
        break

      case 'image': {
        const assetId = resolveImage(block.image)
        if (assetId) {
          out.push({
            _type: 'image',
            _key: key(),
            asset: { _type: 'reference', _ref: assetId },
            alt: block.image?.alternativeText ?? '',
          })
        }
        break
      }

      default:
        // Unknown block type — surface it rather than dropping content silently.
        throw new Error(`Unhandled Strapi block type: ${block.type}`)
    }
  }

  return out
}
