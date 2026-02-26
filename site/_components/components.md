# Component Catalog

Authoritative list of all reusable UI components. Update this file whenever a component is added, renamed, or removed.
All components must use design-language tokens exclusively — no raw hex values or arbitrary sizes.

---

## Layout

| Component | File | Purpose | Used On |
|---|---|---|---|
| `NavBar` | `_components/NavBar.tsx` | Top navigation with main page links | Every page |
| `Footer` | `_components/Footer.tsx` | Org info, page links, EIN disclosure | Every page |

---

## Primitives

| Component | File | Purpose | Used On |
|---|---|---|---|
| `Button` | `_components/Button.tsx` | CTA actions — primary / secondary / ghost variants | All pages |
| `Badge` | `_components/Badge.tsx` | Status label (Active, Completed) or country tag | Cards, detail page headers |
| `YoutubeEmbed` | `_components/YoutubeEmbed.tsx` | Renders a YouTube iframe from an embed URL | `/sponsorship/[slug]`, `/projects/[slug]` |

---

## Heroes

| Component | File | Purpose | Used On |
|---|---|---|---|
| `HomeHero` | `_components/HomeHero.tsx` | Full-bleed mission hero with primary CTA | `/` |
| `PageHero` | `_components/PageHero.tsx` | Standard page header — title + subtitle | `/about`, `/projects`, `/sponsorship`, `/good-news` |

---

## Cards

| Component | File | Key Props | Used On |
|---|---|---|---|
| `ProjectCard` | `_components/ProjectCard.tsx` | title, image, desc, location, complete, amount_raised | `/projects`, `/` featured section |
| `SponsorshipCard` | `_components/SponsorshipCard.tsx` | title, image, desc, country, sponsee, complete | `/sponsorship` |
| `ArticleCard` | `_components/ArticleCard.tsx` | title, desc, featured_image, publish_date | `/good-news` |

---

## Detail Page Sections

| Component | File | Purpose | Used On |
|---|---|---|---|
| `MediaGallery` | `_components/MediaGallery.tsx` | Grid of images and video files | `/projects/[slug]` (pre/post photos) |
| `ImpactGrid` | `_components/ImpactGrid.tsx` | Renders `ProjectImpact[]` — quantity / verb / description / media | `/projects/[slug]` |
| `BibleVerse` | `_components/BibleVerse.tsx` | Displays verse content and citation | `/projects/[slug]` |
| `DonorboxEmbed` | `_components/DonorboxEmbed.tsx` | Renders raw Donorbox HTML (`donorbox_code` or `donorbox_wall`) safely | `/projects/[slug]`, `/sponsorship/[slug]` |
| `ScrollIntoViewButton` | `_components/ScrollIntoViewButton.tsx` | Client wrapper around `Button` that smoothly scrolls to a target element by ID | `/sponsorship/[slug]` |
| `ShareLinks` | `_components/ShareLinks.tsx` | Web Share API button (`navigator.share`) | `/sponsorship/[slug]` |

---

## Rich Text

| Component | File | Purpose | Used On |
|---|---|---|---|
| `RichText` | `_components/RichText.tsx` | Renders `BlocksContent` via `@strapi/blocks-react-renderer` | All detail pages with Strapi rich text fields |

---

## Home-Specific

| Component | File | Purpose | Used On |
|---|---|---|---|
| `SponsorStrip` | `_components/SponsorStrip.tsx` | Sponsor logo row | `/` |

---

## Validation

- [x] Every listed component has a corresponding `.tsx` source file
- [x] All components reference design-language tokens only
- [x] No component is documented that does not exist in the codebase
- [x] Types imported from `site/lib/types.ts`
