---
name: animations
description: Defines animation conventions, scroll-reveal patterns, and motion design rules for the site. Use when adding animations or motion to any page or component.
---

# Animation System

## Core Primitives

### `Reveal` — `site/_components/Reveal.tsx`
Client component. Wraps any element and fades/slides it in when scrolled into view (fires once, powered by `IntersectionObserver`).

```tsx
import Reveal from '@/_components/Reveal'

<Reveal variant="fadeUp" delay={100}>
  <p>Content animates in on scroll</p>
</Reveal>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'fadeUp' \| 'fadeLeft' \| 'fadeRight' \| 'fade'` | `'fadeUp'` | Direction of entrance |
| `delay` | `number` (ms) | `0` | Stagger delay before transition starts |
| `duration` | `number` (ms) | `600` | Transition duration |
| `className` | `string` | — | Applied to the wrapper `<div>` — use for layout classes |

### `useInView` — `site/_hooks/useInView.ts`
Raw hook. Returns `{ ref, inView }`. Use when you need direct control over the animation state without the `Reveal` wrapper.

```ts
import { useInView } from '@/_hooks/useInView'
const { ref, inView } = useInView(0.12) // threshold (default: 0.12)
```

---

## Motion Tokens

All durations and easings come from `globals.css` `:root` vars. Never hardcode values.

| Token | Value | Use for |
|-------|-------|---------|
| `--duration-fast` | 100ms | Micro-interactions |
| `--duration-normal` | 200ms | Hover states |
| `--duration-slow` | 300ms | UI feedback |
| `--duration-slower` | 500ms | Component transitions |
| `--ease-out` | `cubic-bezier(0,0,0.2,1)` | Entrances (default for `Reveal`) |
| `--ease-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | Bouncy/playful entrances |
| `--ease-default` | `cubic-bezier(0.4,0,0.2,1)` | General purpose |

---

## Patterns

### Above-the-fold (hero) — mount-based stagger
Do NOT use `IntersectionObserver` for hero content — it's visible on page load. Instead, use a `useMount` hook with `useState` + `useEffect`, and apply CSS transition with `transitionDelay`.

```tsx
'use client'
function useMount() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return mounted
}

// In component:
const mounted = useMount()
<h1 style={{
  opacity: mounted ? 1 : 0,
  transform: mounted ? 'translateY(0)' : 'translateY(24px)',
  transition: 'opacity 700ms var(--ease-out), transform 700ms var(--ease-out)',
  transitionDelay: '0ms',
}}>...</h1>
```

Stagger delays for hero: `[0, 150, 300, 450]ms`

### Scroll sections — image + text stagger
For alternating image/text sections:
- Image on left → `variant="fadeLeft"`
- Image on right → `variant="fadeRight"`
- Text children stagger with `fadeUp`: eyebrow `delay=0`, heading `delay=100`, body `delay=200`, button `delay=300`

When `Reveal` wraps an image that is also a flex child, pass layout classes via `className`:
```tsx
<Reveal variant="fadeLeft" className="relative min-h-72 w-full md:w-1/2 overflow-hidden">
  <img ... className="h-full w-full object-cover" />
</Reveal>
```

### Simple fade-in (cards, strips, banners)
```tsx
<Reveal variant="fade" duration={800}>
  <SomeComponent />
</Reveal>
```

---

## Rules

- **Only animate once.** `IntersectionObserver` disconnects after first trigger — no re-animation on scroll back.
- **No layout classes on animated elements inside `Reveal`.** Put sizing/positioning on the `Reveal` wrapper's `className` when `Reveal` is the flex child.
- **No `transform` on the inner element** if `Reveal` is also applying transform — they will conflict. Keep transforms in one place.
- **Respect reduced motion.** If implementing custom CSS keyframes (not `Reveal`), always add `@media (prefers-reduced-motion: reduce) { animation: none }`. The `Reveal` component inherits this from the browser via CSS transitions.
- **No external animation libraries.** Use the primitives above — no Framer Motion, GSAP, or AOS.
