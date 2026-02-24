---
name: design-language
description: Defines all design tokens, typography, colors, spacing, and breakpoints. Must be used by all UI components.
---

# Design Language

Authoritative reference for all design tokens and UI semantics.
**Source of truth:** `site/app/globals.css`

All UI work must reference tokens from that file. Do not use raw hex values, arbitrary sizes, or undeclared fonts.

---

## Framework

- **CSS Framework:** Tailwind CSS v4 — `@import "tailwindcss"`
- **Token mechanism:** CSS custom properties on `:root` (raw values) + `@theme inline` (Tailwind utilities)
- **Dark mode:** None — light only

---

## Token Structure

### Raw tokens (`:root`)

These are the canonical values. Read from `globals.css` for exact values.

| Namespace        | Tokens              | Description                         |
|------------------|---------------------|-------------------------------------|
| `--brand-*`      | 50–950              | Brand blue scale                    |
| `--neutral-*`    | 50–950              | Neutral gray scale                  |
| `--status-*`     | success, warning, error, info | Status colors            |
| `--background`   | —                   | Page background                     |
| `--foreground`   | —                   | Default text                        |
| `--surface`      | —                   | Card/panel background                |
| `--surface-raised` | —                 | Elevated surface                    |
| `--border`       | —                   | Default border                      |
| `--border-strong`| —                   | Emphasized border                   |
| `--primary`      | —                   | Primary action color                |
| `--primary-hover`| —                   | Primary hover state                 |
| `--primary-foreground` | —             | Text on primary                     |
| `--secondary`    | —                   | Secondary action color              |
| `--secondary-hover` | —                | Secondary hover state               |
| `--secondary-foreground` | —          | Text on secondary                   |
| `--muted`        | —                   | Subtle background                   |
| `--muted-foreground` | —               | Subtle text                         |
| `--accent`       | —                   | Accent highlight background         |
| `--accent-foreground` | —              | Text on accent                      |
| `--donate`       | —                   | Donate/sponsor CTA background       |
| `--donate-hover` | —                   | Donate hover state                  |
| `--donate-foreground` | —             | Text on donate                      |
| `--text-*`       | xs–7xl              | Typography scale (rem, reference)   |
| `--bp-*`         | sm, md, lg, xl, 2xl | Breakpoint reference (px)           |
| `--duration-*`   | instant–slower      | Animation durations                 |
| `--ease-*`       | default, in, out, spring | Easing curves                  |

### Tailwind theme (`@theme inline`)

These expose raw tokens as Tailwind utility classes. Read from `globals.css` for exact mappings.

| Tailwind namespace     | Utilities generated                  |
|------------------------|--------------------------------------|
| `--color-brand-*`      | `bg-brand-*`, `text-brand-*`, etc.  |
| `--color-neutral-*`    | `bg-neutral-*`, `text-neutral-*`    |
| `--color-background`   | `bg-background`                     |
| `--color-foreground`   | `text-foreground`                   |
| `--color-surface`      | `bg-surface`                        |
| `--color-surface-raised` | `bg-surface-raised`               |
| `--color-border`       | `border-border`                     |
| `--color-border-strong`| `border-border-strong`              |
| `--color-primary`      | `bg-primary`                        |
| `--color-primary-hover`| `bg-primary-hover`                  |
| `--color-primary-fg`   | `text-primary-fg`                   |
| `--color-secondary`    | `bg-secondary`                      |
| `--color-secondary-hover` | `bg-secondary-hover`             |
| `--color-secondary-fg` | `text-secondary-fg`                 |
| `--color-muted`        | `bg-muted`                          |
| `--color-muted-fg`     | `text-muted-fg`                     |
| `--color-accent`       | `bg-accent`                         |
| `--color-accent-fg`    | `text-accent-fg`                    |
| `--color-donate`       | `bg-donate`                         |
| `--color-donate-hover` | `bg-donate-hover`                   |
| `--color-donate-fg`    | `text-donate-fg`                    |
| `--color-success`      | `text-success`, `bg-success`        |
| `--color-warning`      | `text-warning`, `bg-warning`        |
| `--color-error`        | `text-error`, `bg-error`            |
| `--color-info`         | `text-info`, `bg-info`              |
| `--font-sans`          | `font-sans`                         |
| `--font-mono`          | `font-mono`                         |
| `--radius-*`           | `rounded-xs` through `rounded-full` |
| `--shadow-*`           | `shadow-xs` through `shadow-xl`     |

---

## Typography

Use Tailwind's `text-*` utilities (`text-xs`, `text-sm`, `text-base`, etc.).
Font families: `font-sans` (UI text), `font-mono` (code).
Font variables are injected via `layout.tsx` class names.

---

## Spacing

Use Tailwind's default spacing scale (`p-4`, `gap-6`, `m-2`, etc.).
No custom spacing tokens are defined.

---

## Breakpoints

Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.
Reference vars `--bp-*` are available in CSS if needed.

---

## Animation

Use `--duration-*` and `--ease-*` vars in custom CSS transitions and animations.
These are `:root`-only — no Tailwind utilities are generated for them.

---

## Icons

- **Icon library:** `react-icons` — this is the **only** icon library used in this project
- Do NOT use `lucide-react`, Heroicons, or any other icon package
- Import from the appropriate react-icons sub-package (e.g. `react-icons/ri` for Remix Icons)
- Always pass `aria-hidden` on decorative icons; use `aria-label` on interactive icon-only elements

---

## Enforcement

- Never hardcode hex values in components — use semantic tokens
- Never declare font families inline — use `var(--font-sans)` / `var(--font-mono)`
- New tokens must be added to `globals.css` first, then the namespace table above updated
- Spacing: use Tailwind's default scale — no custom spacing tokens
- Icons: always use `react-icons` — never introduce other icon libraries
