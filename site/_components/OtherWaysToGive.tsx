import { RiBankLine } from 'react-icons/ri'
import CopyButton from '@/_components/CopyButton'
import { ZELLE } from '@/lib/giving'

interface OtherWaysToGiveProps {
  /** Extra line shown under the heading, e.g. noting PayPal is accepted in the form. */
  note?: string
  className?: string
}

export default function OtherWaysToGive({ note, className = '' }: OtherWaysToGiveProps) {
  return (
    <aside
      aria-labelledby="other-ways-heading"
      className={`w-full max-w-md mx-auto rounded-xl border border-border bg-surface p-6 text-left ${className}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <RiBankLine className="h-5 w-5 text-primary shrink-0" aria-hidden />
        <h3 id="other-ways-heading" className="text-base font-bold text-foreground">
          No card? Give with Zelle
        </h3>
      </div>
      {note && <p className="text-sm text-muted-fg mb-4">{note}</p>}

      <ol className="space-y-3 text-sm text-foreground mt-4 list-decimal pl-5 marker:text-muted-fg">
        <li>Open your bank&apos;s app and choose <strong>Zelle</strong>.</li>
        <li>
          Send to:
          <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <span className="flex-1 min-w-0 break-all font-medium select-all">{ZELLE.email}</span>
            <CopyButton value={ZELLE.email} />
          </div>
          {ZELLE.recipientName && (
            <p className="mt-1.5 text-xs text-muted-fg">
              Recipient shows as <strong className="text-foreground">{ZELLE.recipientName}</strong>.
            </p>
          )}
        </li>
      </ol>

      <p className="mt-4 text-xs text-muted-fg leading-relaxed">
        Zelle doesn&apos;t send donation receipts. For a tax receipt, email{' '}
        <a href={`mailto:${ZELLE.email}`} className="text-primary underline underline-offset-2 break-all">
          {ZELLE.email}
        </a>{' '}
        with your name, amount, and date.
      </p>
    </aside>
  )
}
