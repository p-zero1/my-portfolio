# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # dev server (Turbopack)
npm run build     # production build — run this to verify zero TS errors + no broken routes
npx tsc --noEmit  # type-check only (no lint script exists)
```

There are no tests. Build success + `tsc --noEmit` clean = green.

---

## Stack & Critical Constraints

| Concern | Reality |
|---|---|
| Next.js | **16.2.6**, App Router, React 19 |
| Tailwind | **v4** — zero config file. All tokens live in `app/globals.css` `@theme` block |
| Framer Motion | **v12** — avoid `layout` prop; it generates `data-projection-id` attrs that diverge SSR→client |
| Smooth scroll | `LenisProvider` runs its own `requestAnimationFrame` loop — this modifies DOM post-hydration |
| Hydration | Both `<html>` and `<body>` carry `suppressHydrationWarning`. Do not remove these. |

**Never use `Math.random()` in JSX render** — produces different values on server vs client → hydration mismatch. Use index-based deterministic values instead.

---

## Design System

All design tokens are **CSS custom properties** in `app/globals.css`, not Tailwind utilities. The `@theme` block maps them to Tailwind class names (e.g., `--color-terminal: #00ff88` → `text-terminal`, `bg-terminal`).

Key custom utilities (defined in `globals.css`, not auto-generated):
- `.glass-1 / .glass-2 / .glass-3` — glassmorphism levels
- `.section-container` — max-width 1280px, responsive horizontal padding
- `.gradient-text` — purple→fuchsia gradient via `bg-clip-text`
- `.glow-purple / .glow-terminal / .text-glow-*` — box/text shadow utilities
- `.bg-grid / .bg-grid-fine` — animated drifting dot grids
- `.cursor-blink / .cursor-blink-purple` — terminal cursor animations
- `.scan-line` — fixed position CRT scan effect

---

## Architecture

### Page structure

Single page (`app/page.tsx`) assembles 7 sections in scroll order. Each section has a stable HTML `id` that `SystemStatusBar` uses for navigation:

| Section | Component | `id` |
|---|---|---|
| 01 | `BootSequence` | `boot` |
| 02 | `CorePresence` | `identity` |
| 03 | `PhilosophyField` | `mindset` |
| 04 | `ArchitectureView` | `experience` |
| 05 | `TerminalExplorer` | `labs` |
| 06 | `SignalGraph` | `signal` |
| 07 | `EOFSection` | `eof` |

Adding a new section = create the component, add it to `page.tsx`, register its `id` in `SystemStatusBar`'s `SECTIONS` array.

### Layout shell (`app/layout.tsx`)

Wraps everything in `LenisProvider` → `CursorGlow` + `scan-line` div + `children` + `SystemStatusBar`. All layout components are in `components/layout/`. `CursorGlow` is desktop-only (skips touch devices via `window.matchMedia('(hover: none)')`); it runs a dual-layer RAF loop — do not add a second RAF loop to the same component.

### Content layer

All personal data lives in `content/` — components are pure rendering logic and contain no hardcoded strings. Never put personal text directly in a component.

| File | Owns |
|---|---|
| `content/hero.ts` | Typewriter command, terminal title, all boot log lines (`bootLines: BootLine[]`) |
| `content/identity.ts` | 3 big statements, config key-value traits, location, availability, quote |
| `content/mindset.ts` | Engineering philosophy principles (title, body, icon) |
| `content/experience.ts` | `experiences: ExperienceEntry[]` — company, role, metrics, stack, highlights, `showArchDiagram` flag |
| `content/labs.ts` | Lab projects with slug, status, tech, description |
| `content/exploring.ts` | Weighted topics for SignalGraph |
| `content/contact.ts` | Heading, description, links array, resume filename, footer text |
| `content/site.ts` | SEO title, description, keywords, openGraph metadata |

Types are defined in `lib/types.ts`. To add content, update the data file and the TypeScript types together.

`content/experience.ts` exports an **array** (`experiences`, not `experience`). Adding a second object to the array automatically enables a tab bar in `ArchitectureView`. The `showArchDiagram` flag controls whether the right panel shows the architecture diagram (true) or a highlights list (false).

### Animation conventions

All animated components are `'use client'`. The standard scroll-reveal pattern:
```tsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: '-10%' })
// ...
<div ref={ref}>
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
  />
</div>
```

`RevealOnScroll` in `components/motion/` is a generic wrapper for this pattern.

Ambient CSS animations (`blink`, `grid-drift`, `scan`, `float`, `pulse-glow`) are defined as `@keyframes` in `globals.css` and applied via inline `style` props or the `.animate-*` utility classes — not via Framer Motion, to avoid JS overhead.

---

## Design Intent

This platform is intentionally **not** a standard portfolio. It is designed to feel like a terminal OS — a running system, not a static page. Every design decision should reinforce the identity of a backend systems engineer:

- Terminal aesthetic is **identity**, not decoration
- Glass panels = layers of abstraction (systems concept)
- Terminal green (`#00ff88`) = operational/alive; purple = architecture/intelligence
- Architecture diagrams carry real production data (latency, throughput, specific metrics)
- Config-style key-value pairs in identity panels over prose bios
- Code annotations (`// principle.id`) over generic card labels

Avoid adding visual effects that don't serve the narrative. The test: does this element tell you something about Prasad's engineering identity, or does it just look good?
