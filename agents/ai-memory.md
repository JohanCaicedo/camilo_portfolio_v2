---
name: ai-memory
description: Canonical memory for Camilo Portfolio V2 (Paper Fox Studio). Covers architecture, design system, 3D rendering pipeline, performance tier system, WebGPU integration, content structure, page conventions, and internal skills/workflows.
metadata:
  author: camilo
  version: "4.0.0"
  last-updated: "2026-02-22"
---

# AI Memory — Camilo Portfolio V2

Single source of truth for future modifications.

---

## 1) Project Identity

- Brand: Paper Fox Studio
- Owner: Johan Camilo Caicedo
- Type: Personal portfolio / case-study website
- Core narrative: multidisciplinary visual design continuity across web, graphic, editorial, photography, and personal experimentation.
- Main tone: technical/editorial style labels (`// TOKEN`), monospace accents, clean grid cards, subtle motion, warm off-white background.

---

## 2) Tech Stack (Current)

- Framework: Next.js 16.1.6 (App Router)
- Runtime: React 19.2.4
- Language: TypeScript (strict)
- Styling: Tailwind CSS v4 + CSS variables in `app/globals.css`
- Motion: Framer Motion + CSS animations
- 3D: Three.js via `@react-three/fiber` + `@react-three/drei`
- Theming: `next-themes`
- UI primitives: Radix + custom UI components in `components/ui`
- Analytics: `@vercel/analytics`
- Lint: ESLint flat config (`eslint.config.mjs`)

Package scripts of record:
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run format`

---

## 3) File/Folder Map (Key)

### App routes
- Home: `app/page.tsx`
- CV page: `app/cv/page.tsx`
- Web design: `app/web-design/page.tsx`
- Graphic design: `app/graphic-design/page.tsx`
- Editorial design: `app/editorial-design/page.tsx`
- Photography: `app/photography/page.tsx`
- Personal: `app/personal/page.tsx`
- Metadata infra: `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`

### Core components
- Hero and 3D scene: `components/hero-section.tsx`, `components/ascii-scene.tsx`, `components/NewZorrito-Web.tsx`
- Home sections: `components/about-section.tsx`, `components/projects-section.tsx`, `components/experience-section.tsx`, `components/education-section.tsx`, `components/skills-section.tsx`
- Navigation/footer: `components/navbar.tsx`, `components/footer.tsx` (footer is client component with tier selector)
- Global interactions: `components/ui/interactive-grid-pattern.tsx`, `components/atom-cursor.tsx`, `components/mode-toggle.tsx`, `components/scroll-to-top.tsx`
- Performance system: `components/performance-context.tsx`, `components/tiered-effects.tsx`
- Page loader: `components/page-loader.tsx` (intro animation, works on all tiers)
- Snap toggle for home only: `components/home-scroll-snap.tsx`

### Skills in repo
- `/.agents/skills/react-doctor/SKILL.md`
- `/.agents/skills/notion-project-publisher/SKILL.md`
- `/.agents/skills/notion-project-publisher/references/site-patterns.md`

---

## 4) Global Visual System

### Colors
Defined via CSS vars in `app/globals.css`:
- Background (light): `#faf9f6`
- Background (dark): near-black OKLCH
- Brand accents:
  - Blue: `--color-brand-blue: #B8CAD9`
  - Green: `--color-brand-green: #C0D9B4`
  - Yellow: `--color-brand-yellow: #F2D680`
  - Salmon: `--color-brand-salmon: #F28D77`

### Typography
- Sans: Geist
- Mono: Geist Mono
- Heavy use of monospace micro-labels and uppercase technical tokens.

### Card language
`ViewerCard` is the canonical content container:
- corner marks
- faint border
- subtle scanline overlay
- optional HUD label (`label="..."`)

### Interaction layers
- Fixed background interactive dot grid (`InteractiveGridPattern`) — shown on all tiers, interactive only on Ultra
- Atom cursor overlay (`AtomCursor`) — Ultra tier only, DPR-aware (crisp at any zoom)
- Theme reveal animation via View Transition API (`ModeToggle` + `globals.css`)
- Page loader (`PageLoader`) — prism text animation + fox logo, works on all tiers

---

## 5) Performance Tier System

Three-tier graphics system with auto-detection and manual override.

### Tiers
| Tier | Label | Effects |
|------|-------|---------|
| `high` | ⚡ Ultra | WebGPU 3D render, interactive dot grid, atom cursor, full animations, full page loader |
| `medium` | ⚖️ Balanced | WebGL2 3D render (reduced), static dot grid, no cursor, blink-only fox logo, page loader with static grid |
| `low` | 🍃 Lite | WebGL2 3D render (frozen frame 1), static dot grid, no cursor, static fox logo, page loader with static grid |

### Architecture
- **Context**: `components/performance-context.tsx` — React Context + `usePerformanceTier()` hook
- **Auto-detection**: Lenient detection (defaults to Ultra). Only downgrades to Balanced on low-end touch devices (≤ 4 cores or ≤ 4GB RAM), or Lite on very weak hardware (≤ 2 cores / ≤ 2GB RAM) and `prefers-reduced-motion`. Initial CSR state matches SSR state (`high`) to avoid hydration mismatch.
- **Manual override**: Dropdown in footer, persisted via `localStorage` key `"pfs-perf-tier"`
- **Conditional rendering**: `components/tiered-effects.tsx` renders grid + cursor based on tier
- **Layout integration**: `app/layout.tsx` wraps app with `<PerformanceProvider>`

### Component tier behavior
- `InteractiveGridPattern`: `interactive` prop — `true` on high, `false` on medium/low (static dots)
- `AtomCursor`: Only rendered on `high` tier
- `AsciiScene`: `tier` prop — high=WebGPU full, medium=WebGL2 reduced, low=WebGL2 frozen (frame 1)
- `AnimatedFoxLogo`: high=full anims, medium=blink only, low=static SVG
- `PageLoader`: Shows on all tiers, grid interactive only on high, all text/fox animations preserved

---

## 6) Home Structure (Current)

Home composition in `app/page.tsx`:
1. `HeroSection`
2. `AboutSection`
3. `ProjectsSection`
4. `ExperienceSection`
5. `EducationSection`
6. `SkillsSection`

### Home scroll behavior
- Activated only on Home by `HomeScrollSnap` (adds class `home-snap` to `<html>`)
- CSS in `app/globals.css`:
  - `scroll-snap-type: y proximity` (non-rigid guidance)
  - `.snap-section { scroll-snap-align: start; scroll-snap-stop: normal; }`
  - reduced-motion fallback maintained

### Header icon animation language (semantic micro-motion)
Implemented with Framer Motion, each section icon has different behavior:
- About (person): gentle breathing/nod
- Projects (folder): slight tilt/shift
- Experience (terminal): pulse/flicker style
- Education (cap): buoyant toss-like motion
- Skills (sparkles): twinkle pulse

Rule: `framer-motion` in a component requires `"use client"` at top.

---

## 7) Hero + 3D Rendering System

### Hero behavior (`components/hero-section.tsx`)
- Responsive split:
  - Desktop: text + 3D side-by-side
  - Mobile/tablet: centered text + reduced background 3D layer
- Uses staggered reveal (timed opacity/transform)
- Shows social pills and scroll hint
- Uses `AsciiSkeleton` as loading fallback for dynamic 3D import

### 3D model source (`components/NewZorrito-Web.tsx`)
- GLB path: `/models/NewZorrito-Web.glb`
- Auto-generated with gltfjsx
- Uses `useAnimations` and currently plays first animation clip (`names[0]`)
- Also has procedural behavior:
  - pointer-follow rotation
  - subtle float and sway

### ASCII rendering (`components/ascii-scene.tsx`)
Custom scanline ASCII renderer with WebGPU/WebGL2 dual-path:
- **Ultra tier**: Uses `THREE.WebGPURenderer` (async init via `three/webgpu`) with automatic WebGL2 fallback
- **Medium tier**: Uses standard `WebGLRenderer` in reduced mode
- **Low tier**: Uses standard `WebGLRenderer`, frozen on frame 1
- Renders scene to low-res `WebGLRenderTarget` (width 64-aligned for WebGPU compatibility)
- Pixel readback: sync `readRenderTargetPixels` for WebGL, async `readRenderTargetPixelsAsync` for WebGPU
- Y-axis handling: WebGL reads bottom-to-top (flip Y), WebGPU reads top-to-bottom (no flip)
- Maps luminance to chars (`ASCII_CHARS = " .:-=+*#%@"`) on 2D overlay canvas
- Cursor-reactive color displacement (disabled in reduced/frozen modes)
- Wrapped in `ErrorBoundary` with GIF fallback

Performance choices:
- Reusable `Uint8Array` pixel buffer
- Cached 2D context
- Precomputed palette RGB
- Squared distance checks
- WebGPU async read uses pending flag to avoid overlapping reads

### Atom Cursor (`components/atom-cursor.tsx`)
- Canvas-based custom cursor with nucleus + orbiting electrons
- DPR-aware: canvas buffer scaled by `devicePixelRatio` — stays crisp at any browser zoom
- Hover detection: grows on interactive elements (fast-path tag check + cached `getComputedStyle`)
- Click animation: burst scale with slow elegant retraction
- Trail ring buffers pre-allocated (no per-frame allocations)
- Only rendered on Ultra tier

---

## 8) Navigation + Metadata + SEO

### Navbar (`components/navbar.tsx`)
- Uses `next/link` and `next/image`
- Anchors: `#about`, `#projects`, `#education`, `#experience`
- CV links route to `/cv` (desktop and mobile)
- dropdown includes profile/contact metadata

### CV page (`app/cv/page.tsx`)
- Styled as technical case page
- Embedded PDF via iframe
- download/open fallback actions
- PDF path:
  - `/CV%20Johan%20Caicedo%20-%202024%20-%20Digital%20and%20Multimedia%20Designer.pdf`

### Root metadata (`app/layout.tsx`)
- `metadataBase` set to `https://paperfoxstudio.com`
- OG/Twitter image uses `/og-image.jpg`
- `public/og-image.jpg` exists and is used for social previews
- JSON-LD injected by `components/json-ld.tsx`

---

## 9) Content Architecture for Project Pages

Each category page follows a repeated pattern:
- back link (`// BACK_TO_PROJECTS`)
- hero section (micro-label, title, subtitle)
- badge row
- project details cards
- process/context/challenges/outcome blocks
- gallery/media blocks

Primary reusable building blocks:
- `SectionContainer`
- `ViewerCard`
- `LightboxImage`
- `LightboxGallery`

Most page data lives in top-of-file constants (badges/images/specs arrays).

---

## 10) Internal Skill Strategy

### `react-doctor`
Use for health audits and diagnostics; command:
- `npx -y react-doctor@latest . --verbose`

### `notion-project-publisher`
Purpose: convert Notion content into React updates while preserving existing visual identity and component usage.

Hard category lock (only these):
- `diseño web` -> `web-design`
- `diseño grafico` -> `graphic-design`
- `diseño editorial` -> `editorial-design`
- `fotografia` -> `photography`
- `personal` -> `personal`

No new categories should be introduced by this skill.

---

## 11) Known Constraints / Pitfalls

1. Any component using Framer Motion must be client component (`"use client"`).
2. `.git` operations can require elevated permissions in this environment.
3. Build can fail in restricted-network environments due to Google font fetching.
4. Home snap should remain guidance-focused (`proximity`), not forced (`mandatory`).
5. Preserve existing component language; avoid ad-hoc visual patterns.
6. Three.js `WebGPURenderer` has a bug in `copyTextureToBuffer` — buffer size doesn't account for 256-byte row padding. Worked around by aligning render target width to 64px multiples.
7. WebGL and WebGPU have opposite Y-axis conventions for pixel readback — handled in `ascii-scene.tsx` via `isWebGPU` flag.
8. Footer is a client component (uses `usePerformanceTier` hook).

---

## 12) Maintenance Rules (Practical)

When adding/editing content:
- Prefer additive changes over rewrites.
- Keep technical micro-label format (`// TOKEN`) consistent.
- Reuse `ViewerCard` patterns for new blocks.
- Keep `alt` texts descriptive.
- Validate with `npm run typecheck` (or `npx tsc --noEmit`).

When touching home sections:
- Keep `snap-section` class on each section container.
- Keep icon motions subtle and semantically relevant.
- Respect reduced-motion behavior.

When touching 3D:
- Preserve reduced/frozen mode support in Hero mobile background.
- Avoid expensive per-frame allocations.
- Keep WebGPU/WebGL2 dual-path in ASCII readback.
- Keep render target width 64-aligned for WebGPU compatibility.
- Test Y-axis orientation when changing pixel readback logic.

---

## 13) Current Maturity Snapshot

Project state is advanced/polished:
- Multi-section portfolio with coherent visual language
- Working CV route and navigation flow
- Themed UI with custom interaction layers
- Animated section headers and expandable experience timeline
- 3-tier performance system (Ultra/Balanced/Lite) with auto-detection
- WebGPU rendering on Ultra with automatic WebGL2 fallback
- DPR-aware atom cursor (crisp at any zoom)
- Lint/type/tooling modernized
- Internal skill for Notion-to-portfolio publishing established

Primary future direction:
- Content velocity and maintainability for adding new projects while preserving style consistency.
