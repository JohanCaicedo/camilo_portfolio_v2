# Paper Fox Studio — camilo_portfolio_v2

Portfolio of **Johan Camilo Caicedo** — Web Designer & Creative Developer.
Live at [paperfoxstudio.com](https://paperfoxstudio.com).

---

## Project Overview

This is a **Next.js 16** portfolio featuring a custom ASCII 3D scene, Framer Motion animations, a full shadcn/ui component library, and a dual light/dark design system. The app is deployed on Vercel with Cloudflare in front.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 |
| UI Primitives | Radix UI + shadcn/ui |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Fonts | Geist / Geist Mono (Google Fonts via `next/font`) |
| Animations | Framer Motion v12 |
| 3D / WebGL | Three.js v0.171 + @react-three/fiber v9 + @react-three/drei |
| Icons | Lucide React |
| Theme | next-themes (light · dark · system) |
| Analytics | @vercel/analytics |
| Linting | ESLint 9 + eslint-plugin-jsx-a11y + eslint-plugin-react-hooks |
| Formatting | Prettier 3 + prettier-plugin-tailwindcss |
| Package Manager | pnpm |

---

## Available Scripts

```bash
pnpm dev          # Start Next.js dev server (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix ESLint issues
pnpm typecheck    # tsc --noEmit (type check without build)
pnpm format       # Prettier write all supported files
pnpm format:check # Prettier check
```

Always run `pnpm lint:fix` and `pnpm typecheck` before finalizing any code change.

---

## File Structure

```
camilo_portfolio_v2/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout: ThemeProvider, Navbar, Footer, AtomCursor, Analytics
│   ├── page.tsx                # Home page (Hero + main sections)
│   ├── globals.css             # Global styles + CSS custom properties (design tokens)
│   ├── robots.ts               # robots.txt generation
│   ├── sitemap.ts              # sitemap.xml generation
│   ├── cv/                     # /cv route
│   ├── editorial-design/       # /editorial-design route
│   ├── graphic-design/         # /graphic-design route
│   ├── personal/               # /personal route
│   ├── photography/            # /photography route
│   └── web-design/             # /web-design route
│
├── components/                 # Feature components
│   ├── ascii-scene.tsx         # ★ WebGL 3D Zorrito mascot rendered as ASCII art (see below)
│   ├── NewZorrito-Web.tsx      # GLTF 3D model of the mascot (Zorrito the fox)
│   ├── hero-section.tsx        # Landing hero with AsciiScene, animated tagline, CTA buttons
│   ├── about-section.tsx       # About / bio section
│   ├── projects-section.tsx    # Portfolio project cards with tech tags and lightbox
│   ├── skills-section.tsx      # Skills with animated SkillSlider
│   ├── experience-section.tsx  # Work timeline
│   ├── education-section.tsx   # Education cards
│   ├── navbar.tsx              # Sticky top nav with ModeToggle
│   ├── footer.tsx              # Site footer
│   ├── animated-character.tsx  # Sprite-based animated character (Easter egg)
│   ├── atom-cursor.tsx         # Custom cursor rendered globally in layout
│   ├── home-scroll-snap.tsx    # DOM class controller for snap-scroll behavior
│   ├── json-ld.tsx             # JSON-LD structured data for SEO
│   ├── mode-toggle.tsx         # Theme switch with circular View Transition reveal
│   ├── scroll-to-top.tsx       # FAB to scroll back to top
│   ├── section-container.tsx   # Layout wrapper shared by all sections
│   └── theme-provider.tsx      # Wraps next-themes ThemeProvider
│
├── components/ui/              # shadcn/ui primitives (do not edit generated files arbitrarily)
│   ├── ascii-skeleton.tsx      # Skeleton for AsciiScene loading state
│   ├── error-boundary.tsx      # React error boundary used by AsciiScene
│   ├── liquid-glass.tsx        # Custom glassmorphism card effect
│   ├── social-pill.tsx         # Social link pill badge
│   ├── skill-slider.tsx        # Animated horizontal skills carousel
│   ├── interactive-grid-pattern.tsx  # Animated background grid (layout-level)
│   ├── image-lightbox.tsx      # Full-screen image/video lightbox
│   ├── lightbox-gallery.tsx    # Grid-based gallery triggering the lightbox
│   ├── viewer-card.tsx         # Project preview card with hover effects
│   ├── empty.tsx               # Empty-state placeholder component
│   ├── button.tsx / badge.tsx / card.tsx / ...  # Standard shadcn primitives
│   └── ...                     # (64 total UI primitives)
│
├── hooks/
│   ├── use-mobile.ts           # Breakpoint-aware isMobile boolean hook
│   └── use-toast.ts            # Toast state management (sonner)
│
├── lib/
│   └── utils.ts                # `cn()` helper (clsx + tailwind-merge)
│
├── styles/
│   └── globals.css             # Alternate/legacy global styles entry (imported via app/globals.css)
│
├── public/                     # Static assets (images, GIFs, fonts, favicon)
│   └── Foxy-Blink.gif          # Fallback for AsciiScene error state
│
├── agents/                     # Agent workflow artifacts directory
├── docs/                       # Project documentation
├── next.config.mjs             # Next.js config
├── tsconfig.json               # TypeScript config with `@/` path alias
├── eslint.config.mjs           # ESLint flat config
├── .prettierrc                 # Prettier config
└── components.json             # shadcn/ui CLI config
```

---

## Design System

### Color Tokens (`app/globals.css`)

All colors are defined as CSS custom properties and mapped into Tailwind via `@theme inline`. Use the `var(--token)` or `bg-background`, `text-foreground` utilities.

#### Light Mode (`:root`)
| Token | Value | Usage |
|---|---|---|
| `--background` | `#faf9f6` | Page background (warm off-white) |
| `--foreground` | `oklch(0.145 0 0)` | Body text (near-black) |
| `--primary` | `oklch(0.205 0 0)` | Buttons, headings |
| `--muted-foreground` | `oklch(0.556 0 0)` | Subtitles, placeholders |
| `--border` | `oklch(0.922 0 0)` | Card and input borders |
| `--radius` | `0.625rem` | Base border radius |

#### Dark Mode (`.dark`)
| Token | Value |
|---|---|
| `--background` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.985 0 0)` |
| `--primary` | `oklch(0.985 0 0)` |

#### Brand Palette
These four colors constitute the brand identity. Use them deliberately for accents:
```css
--color-brand-blue:   #B8CAD9   /* sky blue — scrollbar, skill accents */
--color-brand-green:  #C0D9B4   /* sage green */
--color-brand-yellow: #F2D680   /* warm yellow */
--color-brand-salmon: #F28D77   /* coral/salmon — text selection highlight */
```

### ASCII Art Palette (used in `ascii-scene.tsx`)
```
#eea284  (warm salmon)
#bbc9d8  (muted blue)
#f7df91  (pale yellow)
#c4debc  (sage)
#f2d3c5  (blush)
#6a5deb  (violet)
```
These colors are applied on mouse-hover over the ASCII characters.

### Typography
- **Sans-serif**: Geist (loaded via `next/font/google`)
- **Monospace**: Geist Mono (loaded via `next/font/google`)
- Body class: `font-sans antialiased`
- Text selection: background `brand-salmon`, text `white`

### Spacing & Radius
- Base radius: `0.625rem` (`--radius`), with `sm`, `md`, `lg`, `xl` variants computed from it.
- Sections use `scroll-snap-align: start` when `.home-snap` class is on `<html>`.

### Animations
- Theme switch: circular reveal using `View Transitions API` (`::view-transition-new/old(root)` with `clip-path: circle(...)`).
- Framer Motion is the primary tool for component animations (hero tagline, section entrances).
- `tw-animate-css` provides additional utility-class-based animations.
- Always respect `prefers-reduced-motion`. CSS animations must be wrapped with `@media (prefers-reduced-motion: reduce)` guards. Global guards already in `globals.css` cover `animate-pulse`, `animate-bounce`, `animate-ping`.

---

## Key Component: `ascii-scene.tsx`

> `@components/ascii-scene.tsx`

This is the visual centerpiece of the portfolio. It renders the **Zorrito** 3D fox mascot model (`NewZorrito-Web.tsx`) inside a `@react-three/fiber` `<Canvas>` and then post-processes the output into a real-time ASCII art overlay using a second `<canvas>` element painted each frame.

### Architecture

```
<AsciiScene reduced?>
  └── <ErrorBoundary fallback={<SceneErrorFallback />}>   ← shows Foxy-Blink.gif on crash
        └── <Canvas camera={{ position:[0,1,5], fov:35 }} gl={{ alpha:true }}>
              ├── <Suspense>
              │     ├── <SceneLighting />    ← ambient + 3 directional/point lights
              │     └── <Zorrito scale=1.8 position=[0,-0.2,0] />
              └── <ScanlineAsciiEffect fgColor lineSpacing lineHeight charSpacing resolution reduced />
```

### `ScanlineAsciiEffect` — How it works

Each frame (`useFrame`):
1. Renders the Three.js scene into a low-resolution `WebGLRenderTarget` (scaled by `resolution` prop, default `0.18`).
2. Reads pixels with `gl.readRenderTargetPixels`.
3. Maps each character cell's pixel brightness → ASCII character from `" .:-=+*#%@"`.
4. Draws a scanline rect + the character on the overlay `<canvas>` (positioned absolutely over the WebGL canvas, `z-index: 10`).
5. Characters near the mouse cursor get pushed horizontally and tinted with the ASCII palette colors.
6. Random glitch effect: 3% chance per frame to flash a colored horizontal band (disabled in `reduced` mode).

### Props on `<AsciiScene>`

| Prop | Default | Description |
|---|---|---|
| `reduced` | `false` | Mobile/perf mode: disables mouse FX, glitch, increases char grid spacing, lowers resolution |

### `reduced` mode parameter mapping

| Parameter | Normal | Reduced |
|---|---|---|
| `lineSpacing` | 1 | 2 |
| `lineHeight` | 2 | 3 |
| `charSpacing` | 8 | 12 |
| `resolution` | 0.18 | 0.12 |

### Foreground color

The ASCII text color adapts to the active theme:
```ts
const fgColor = theme === "dark" ? "#faf9f6" : "#1a1a1a"
```

### Performance notes
- The overlay `<canvas>` is appended to the DOM inside `useEffect` and removed on cleanup.
- Mouse events are attached to the **grandparent** element of the canvas, not the canvas itself, so pointer events pass through correctly.
- `WebGLRenderTarget` is disposed on resize and unmount to avoid GPU memory leaks.
- Do not add heavy post-processing passes upstream of `ScanlineAsciiEffect` — it reads raw pixels synchronously each frame.

---

## Routing (App Router)

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Home page with all sections |
| `/cv` | `app/cv/page.tsx` | Curriculum vitae view |
| `/web-design` | `app/web-design/page.tsx` | Web design portfolio gallery |
| `/graphic-design` | `app/graphic-design/page.tsx` | Graphic design portfolio |
| `/editorial-design` | `app/editorial-design/page.tsx` | Editorial design portfolio |
| `/photography` | `app/photography/page.tsx` | Photography portfolio |
| `/personal` | `app/personal/page.tsx` | Personal projects |

SEO metadata is defined per-page using the Next.js `generateMetadata` API or static `export const metadata`. The root metadata lives in `app/layout.tsx`.

---

## SEO Infrastructure

- `app/sitemap.ts` — generates `sitemap.xml` dynamically
- `app/robots.ts` — generates `robots.txt`
- `app/layout.tsx` — root `Metadata` with OpenGraph, Twitter Card, and `metadataBase`
- `components/json-ld.tsx` — injects JSON-LD structured data (`Person` schema)
- All pages must export a `metadata` object or `generateMetadata` function.
- Do **not** use `dangerouslySetInnerHTML` for structured data in page body — use `components/json-ld.tsx` pattern instead.

---

## Coding Conventions

### TypeScript
- Enable strict mode (already configured in `tsconfig.json`).
- Prefer explicit return types on exported functions and hooks.
- Use the `@/` alias for all imports (maps to project root).

### React
- Prefer stable keys over array indexes in lists.
- Wrap side-effectful components in `<Suspense>` and `<ErrorBoundary>` (see `ascii-scene.tsx` pattern).
- Avoid `useEffect` for derived state — compute it inline.
- Use `next/image` for all `<img>` tags and `next/link` for all `<a>` tags.
- Do not `dangerouslySetInnerHTML` — use `json-ld.tsx` as the approved pattern when raw HTML injection is unavoidable.

### Styling
- Use **Tailwind utilities first**. Only write custom CSS in `globals.css` when a utility equivalent doesn't exist.
- Never hardcode color values inside component files — use the design token utilities (`bg-background`, `text-muted-foreground`, `border-border`, etc.).
- For brand accent colors use `bg-brand-blue`, `text-brand-salmon`, etc. (registered via `@theme inline` in `globals.css`).
- Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) for conditional class composition.

### Accessibility
- Every interactive element must have an accessible name (`aria-label` or visible text).
- Focus states must be visible — do not remove `:focus-visible` outlines.
- Touch targets: minimum 44×44px on mobile (enforced globally in `globals.css`).
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, `<section>`, `<article>`) over `<div>`.
- Images must have meaningful `alt` text.

### Animations & Motion
- Always provide a `prefers-reduced-motion` alternative.
- Framer Motion: use `initial`, `animate`, `exit` props consistently. Do not trigger layout animations on every render.
- `AsciiScene`: pass `reduced={true}` on mobile detected via `use-mobile.ts` hook.

---

## Environment & Deployment

- **Hosting**: Vercel (production) behind Cloudflare CDN
- **Domain**: paperfoxstudio.com
- **Node version**: ≥ 18 (required by Next.js 16)
- No environment variables are required for local development.

After making changes, verify:
1. `pnpm typecheck` — zero TypeScript errors
2. `pnpm lint` — zero ESLint warnings
3. `pnpm build` — clean production build (no type or lint errors)
4. Visually verify both light and dark modes.
5. Verify mobile layout at 375px viewport width.
