"use client"

import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import type { BlocksContent } from '@strapi/blocks-react-renderer'

interface RichTextProps {
  content: BlocksContent
}

export default function RichText({ content }: RichTextProps) {
  if (!content) return null

  return (
    <div className="prose-richtext">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => (
            <p className="mb-4 text-base leading-relaxed text-foreground">{children}</p>
          ),
          heading: ({ children, level }) => {
            const tagMap: Record<number, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = {
              1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6',
            }
            const Tag = tagMap[level] ?? 'h2'
            const classes: Record<number, string> = {
              1: 'text-3xl font-bold mt-8 mb-4',
              2: 'text-2xl font-bold mt-7 mb-3',
              3: 'text-xl font-semibold mt-6 mb-2',
              4: 'text-lg font-semibold mt-5 mb-2',
              5: 'text-base font-semibold mt-4 mb-1',
              6: 'text-sm font-semibold mt-4 mb-1',
            }
            return <Tag className={`${classes[level] ?? ''} text-foreground`}>{children}</Tag>
          },
          list: ({ children, format }) =>
            format === 'ordered' ? (
              <ol className="mb-4 list-decimal pl-6 space-y-1 text-foreground">{children}</ol>
            ) : (
              <ul className="mb-4 list-disc pl-6 space-y-1 text-foreground">{children}</ul>
            ),
          'list-item': ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
          quote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-primary pl-5 italic text-muted-fg">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
              <code>{children}</code>
            </pre>
          ),
          image: ({ image }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.url}
              alt={image.alternativeText ?? ''}
              className="my-6 rounded-xl w-full object-cover"
            />
          ),
          link: ({ children, url }) => (
            <a
              href={url}
              className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors"
              style={{ transitionDuration: 'var(--duration-fast)' }}
              target={url.startsWith('http') ? '_blank' : undefined}
              rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong className="font-semibold">{children}</strong>,
          italic: ({ children }) => <em className="italic">{children}</em>,
          underline: ({ children }) => <span className="underline">{children}</span>,
          strikethrough: ({ children }) => <span className="line-through">{children}</span>,
          code: ({ children }) => (
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">
              {children}
            </code>
          ),
        }}
      />
    </div>
  )
}
