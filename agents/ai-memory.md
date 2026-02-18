---
name: ai-memory
description: Canonical memory for Camilo Portfolio V2 (Paper Fox Studio). Covers architecture, design system, 3D rendering pipeline, content structure, page conventions, performance constraints, and internal skills/workflows.
metadata:
  author: camilo
  version: "3.0.0"
  last-updated: "2026-02-18"
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
- Navigation/footer: `components/navbar.tsx`, `components/footer.tsx`
- Global interactions: `components/ui/interactive-grid-pattern.tsx`, `components/atom-cursor.tsx`, `components/mode-toggle.tsx`, `components/scroll-to-top.tsx`
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
- Fixed background interactive dot grid (`InteractiveGridPattern`)
- Atom cursor overlay (`AtomCursor`)
- Theme reveal animation via View Transition API (`ModeToggle` + `globals.css`)

---

## 5) Home Structure (Current)

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

## 6) Hero + 3D Rendering System

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
Current system is a **custom scanline ASCII renderer** (not plain `AsciiRenderer`):
- Renders scene to low-res `WebGLRenderTarget`
- Reads pixels and maps luminance to chars (`ASCII_CHARS = " .:-=+*#%@"`)
- Draws to 2D overlay canvas with scanline style
- Supports reduced mode (`reduced` prop) for mobile background usage
- Includes cursor-reactive color displacement (disabled in reduced mode)
- Wrapped in `ErrorBoundary`

Performance choices used:
- reusable `Uint8Array` buffer
- cached 2D context
- precomputed palette RGB
- distance checks via squared distance

---

## 7) Navigation + Metadata + SEO

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

## 8) Content Architecture for Project Pages

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

## 9) Internal Skill Strategy

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

## 10) Known Constraints / Pitfalls

1. Any component using Framer Motion must be client component (`"use client"`).
2. `.git` operations can require elevated permissions in this environment.
3. Build can fail in restricted-network environments due to Google font fetching.
4. Home snap should remain guidance-focused (`proximity`), not forced (`mandatory`).
5. Preserve existing component language; avoid ad-hoc visual patterns.

---

## 11) Maintenance Rules (Practical)

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
- Preserve reduced mode support in Hero mobile background.
- Avoid expensive per-frame allocations.

---

## 12) Current Maturity Snapshot

Project state is advanced/polished:
- Multi-section portfolio with coherent visual language
- Working CV route and navigation flow
- Themed UI with custom interaction layers
- Animated section headers and expandable experience timeline
- Lint/type/tooling modernized
- Internal skill for Notion-to-portfolio publishing established

Primary future direction:
- Content velocity and maintainability for adding new projects while preserving style consistency.
