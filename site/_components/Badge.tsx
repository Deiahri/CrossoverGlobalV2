type StatusVariant = 'active' | 'completed'
type CountryVariant = 'country'

interface BadgeProps {
  label: string
  variant: StatusVariant | CountryVariant
}

const variantClasses: Record<StatusVariant | CountryVariant, string> = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-neutral-200 text-neutral-600',
  country: 'bg-accent text-accent-fg',
}

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {label}
    </span>
  )
}
