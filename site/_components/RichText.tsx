"use client"

import { PortableText, type PortableTextComponents } from '@portabletext/react'

import { urlFor } from '@/sanity/image'
import type { RichTextContent } from '@/lib/types'

interface RichTextProps {
  content: RichTextContent
}

const HEADING_CLASSES: Record<string, string> = {
  h1: 'text-3xl font-bold mt-8 mb-4',
  h2: 'text-2xl font-bold mt-7 mb-3',
  h3: 'text-xl font-semibold mt-6 mb-2',
  h4: 'text-lg font-semibold mt-5 mb-2',
  h5: 'text-base font-semibold mt-4 mb-1',
  h6: 'text-sm font-semibold mt-4 mb-1',
}

function heading(tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
  const Component = ({ children }: { children?: React.ReactNode }) => {
    const Tag = tag
    return <Tag className={`${HEADING_CLASSES[tag]} text-foreground`}>{children}</Tag>
  }
  Component.displayName = `RichTextHeading(${tag})`
  return Component
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-foreground">{children}</p>
    ),
    h1: heading('h1'),
    h2: heading('h2'),
    h3: heading('h3'),
    h4: heading('h4'),
    h5: heading('h5'),
    h6: heading('h6'),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-5 italic text-muted-fg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc pl-6 space-y-1 text-foreground">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal pl-6 space-y-1 text-foreground">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    'strike-through': ({ children }) => <span className="line-through">{children}</span>,
    code: ({ children }) => (
      <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href: string = value?.href ?? ''
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors"
          style={{ transitionDuration: 'var(--duration-fast)' }}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(value).width(1200).auto('format').url()}
          alt={value.alt ?? ''}
          className="my-6 rounded-xl w-full object-cover"
        />
      ) : null,
    codeBlock: ({ value }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
        <code>{value?.code}</code>
      </pre>
    ),
  },
}

export default function RichText({ content }: RichTextProps) {
  if (!content?.length) return null

  return (
    <div className="prose-richtext">
      <PortableText value={content} components={components} />
    </div>
  )
}
