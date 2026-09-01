import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Crossover Global')
    .items([
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('sponsorship').title('Sponsorships'),
      S.documentTypeListItem('article').title('Good News'),
      S.divider(),
      S.documentTypeListItem('supporter').title('Supporters'),
    ])
