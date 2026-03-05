import type { Metadata } from 'next'
import { getArticles } from '../../lib/api'
import GlowHero from '../../_components/GlowHero'
import ArticleCard from '../../_components/ArticleCard'
import Reveal from '../../_components/Reveal'
import {
  RiSparkling2Line, RiBookOpenLine, RiQuillPenLine,
  RiHeartLine, RiSunLine, RiMegaphoneLine,
  RiStarLine, RiLeafLine,
} from 'react-icons/ri'

export const metadata: Metadata = {
  title: 'Good News',
  description:
    'Stories of hope, faith, and transformation from Crossover Global — celebrating what God is doing around the world.',
}

export default async function GoodNewsPage() {
  const articles = await getArticles()

  return (
    <>
      <GlowHero
        title="Good News"
        subtitle="Stories of hope, faith, and transformation — celebrating what is happening around the world."
        icons={[
          <RiSparkling2Line />, <RiBookOpenLine />, <RiQuillPenLine />,
          <RiHeartLine />, <RiSunLine />, <RiMegaphoneLine />,
          <RiStarLine />, <RiLeafLine />,
        ]}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {articles.length > 0 ? (
          <div className="divide-y divide-border">
            {articles.map((article, i) => (
              <Reveal key={article.slug} variant="fadeUp" delay={i * 60}>
                <ArticleCard {...article} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal variant="fade">
            <div className="rounded-xl border border-dashed border-border py-24 text-center text-muted-fg">
              <p className="text-xl font-semibold mb-2">No articles yet</p>
              <p className="text-sm">Stories and updates will appear here once published.</p>
            </div>
          </Reveal>
        )}
      </div>
    </>
  )
}
