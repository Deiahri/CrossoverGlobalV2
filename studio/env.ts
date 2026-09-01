/**
 * The Sanity CLI exposes `SANITY_STUDIO_*` vars to the Studio bundle.
 * Values live in studio/.env (see studio/.env.example).
 */
function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing ${name}. Copy studio/.env.example to studio/.env and fill it in.`)
  }
  return value
}

export const projectId = required(process.env.SANITY_STUDIO_PROJECT_ID, 'SANITY_STUDIO_PROJECT_ID')
export const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
export const apiVersion = process.env.SANITY_STUDIO_API_VERSION ?? '2026-08-27'
