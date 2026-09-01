import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // Types are generated for the Next.js app, which is where the queries live.
  typegen: {
    enabled: true,
    path: '../site/{app,_components,lib,sanity}/**/*.{ts,tsx}',
    generates: '../site/sanity.types.ts',
  },
})
