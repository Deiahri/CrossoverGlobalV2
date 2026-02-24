---
name: site-map
description: Defines the canonical site structure and page purposes. Used as the authoritative reference for all pages.
---
# Site Map

Canonical definition of all pages lives in **`site/SiteMap.md`**.
Agents must not add, remove, or rename pages without updating that file.

---

## Source File

`site/SiteMap.md` — authoritative page registry. Always read this file before making routing or page decisions.

---

## CMS

This site is connected to a CMS. Dynamic content (projects, sponsorships) is sourced from the CMS at runtime or build time. Pages that list or display CMS-managed content must integrate accordingly.

---

## Maintenance Requirements

- Validate all referenced routes exist as `app/*/page.tsx` files
- No page may be added to the codebase without a corresponding entry in `site/SiteMap.md`
- No orphan pages — every page must be reachable from at least one other page or nav link
- Path values must be repository-root relative
- Define render strategy per page (static, static pre-render, or static with client-side interactivity)
- Note: next to no pages will be defined as dynamic

---

## Validation

- [x] `site/SiteMap.md` exists
- [ ] All entries in `site/SiteMap.md` have a corresponding `page.tsx`
- [ ] No `page.tsx` files exist outside this map

---

## Info Source

If no site map exists, scrape https://crossoverglobal.org for site structure. Inform user of findings before creating `site/SiteMap.md`.
