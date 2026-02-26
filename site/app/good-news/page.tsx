import type { Metadata } from 'next'
import { getArticles } from '../../lib/api'
import PageHero from '../../_components/PageHero'
import ArticleCard from '../../_components/ArticleCard'

export const metadata: Metadata = {
  title: 'Good News',
  description:
    'Stories of hope, faith, and transformation from Crossover Global — celebrating what God is doing around the world.',
}

export default async function GoodNewsPage() {
  const articlesRaw = await getArticles()

  const articles = [...articlesRaw, ...articlesRaw, ...articlesRaw, ...articlesRaw, ...articlesRaw, ...articlesRaw];

  return (
    <>
      <PageHero
        title="Good News"
        subtitle="Stories of hope, faith, and transformation — celebrating what is happening around the world."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {articles.length > 0 ? (
          <div className="divide-y divide-border">
            {articles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border py-24 text-center text-muted-fg">
            <p className="text-xl font-semibold mb-2">No articles yet</p>
            <p className="text-sm">Stories and updates will appear here once published.</p>
          </div>
        )}
      </div>
    </>
  )
}
