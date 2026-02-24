# Site Map — Crossover Global WebV2

Canonical definition of all pages, their purpose, and navigation relationships.
Agents must not add, remove, or rename pages without updating this file and `SKILL.md`.

Sourced from: https://crossoverglobal.org — scraped 2026-02-24

---

## Pages

| Route | File | Purpose | Render | Status |
|---|---|---|---|---|
| `/` | `site/app/page.tsx` | Home — hero, mission CTA, featured projects, sponsors | Static | Done |
| `/about` | `site/app/about/page.tsx` | About — who we are, mission statement, how to help | Static | Done |
| `/projects` | `site/app/projects/page.tsx` | Projects listing — all active and completed initiatives | Static | Done |
| `/projects/[slug]` | `site/app/projects/[slug]/page.tsx` | Individual project detail — info, goals, impact gallery, donate | Static pre-render | Done |
| `/sponsorship` | `site/app/sponsorship/page.tsx` | Sponsorship listing — browse sponsorship opportunities | Static | Done |
| `/sponsorship/[slug]` | `site/app/sponsorship/[slug]/page.tsx` | Individual sponsorship detail — sponsee bio, needs, donate CTA | Static pre-render | Done |
| `/good-news` | `site/app/good-news/page.tsx` | Good News — blog/newsletter article listing | Static | Done |
| `/good-news/[slug]` | `site/app/good-news/[slug]/page.tsx` | Individual article — full post content | Static pre-render | Done |

---

## Navigation Relationships

```
/ (Home)
├── /about          ← nav + "Who We Are" hero CTA
├── /projects       ← nav + "Our Projects" section CTA
│   └── /projects/[slug]
├── /sponsorship    ← nav + "Sponsor Someone" section CTA
│   └── /sponsorship/[slug]
└── /good-news      ← nav + "Good News" section CTA
    └── /good-news/[slug]
```

### Home Page Outbound Links

| From (element) | To | Type |
|---|---|---|
| NavBar | `/about` | Nav link |
| NavBar | `/projects` | Nav link |
| NavBar | `/sponsorship` | Nav link |
| NavBar | `/good-news` | Nav link |
| Hero CTA button | `/about` | In-page CTA |
| Featured Projects section | `/projects` | Section CTA |
| Sponsorship section | `/sponsorship` | Section CTA |
| Good News section | `/good-news` | Section CTA |

---

## Notes

- `/projects/[slug]`, `/sponsorship/[slug]`, and `/good-news/[slug]` are dynamic segments. All must be statically pre-rendered via `generateStaticParams`.
- All pages must be reachable from at least one nav link or in-page CTA.
- No orphan pages permitted.
