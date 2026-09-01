function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Add it to site/.env — see the Sanity project settings at https://sanity.io/manage.`,
    )
  }
  return value
}

export const projectId = required(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

/** Pinned so query behaviour never shifts under us. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-08-27'
