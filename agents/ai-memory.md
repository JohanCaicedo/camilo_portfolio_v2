---
name: ai-memory
description: Complete project memory for the Camilo Portfolio V2. Contains the ASCII design system, component architecture, color palette, interactivity patterns, and performance strategies. Use this as the canonical reference for any future modifications.
metadata:
  author: camilo
  version: "2.0.0"
  last-updated: "2026-02-16"
---

# AI Memory — Camilo Portfolio V2

Canonical reference for the entire project. Read this before making ANY changes.

---

## 1. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| 3D Engine | Three.js via `@react-three/fiber` + `@react-three/drei` |
| Animations | Framer Motion, CSS transitions, `requestAnimationFrame` |
| Theming | `next-themes` (light/dark, class strategy) |
| Icons | `lucide-react` |
| Analytics | `@vercel/analytics` |

---

## 2. Color Palette

The design uses a **soft, warm** palette across ALL interactive elements:

| Name | Hex | Usage |
|---|---|---|
| Salmon | `#eea284` | Dot grid active, electron trail |
| Blue | `#bbc9d8` / `#B8CAD9` | Brand accent, atom cursor nucleus, scrollbar |
| Yellow | `#f7df91` | Dot grid active |
| Green | `#c4debc` | Status indicator ("Available for work") |
| Pink | `#f2d3c5` | Dot grid active |
| Purple | `#6a5deb` | Dot grid active, electron orbit |

### CSS Variables (Tailwind)

```css
--color-brand-blue: #B8CAD9;
--color-brand-green: #C0D9B4;
--color-brand-yellow: #F2D680;
--color-brand-salmon: #F28D77;
```

### Theme Colors

| Mode | Background | Foreground |
|---|---|---|
| Light | `#faf9f6` (warm off-white) | `#1a1a1a` |
| Dark | `oklch(0.145 0 0)` (~`#1a1a1a`) | `#faf9f6` |

---

## 3. The ASCII Design System

The visual identity centers around an **ASCII render** of a 3D fox model (Zorrito). This is NOT a library plugin — it's a **custom canvas-based ASCII renderer** built from scratch.

### 3.1 How the ASCII Renderer Works

File: `components/ascii-scene.tsx`

```
┌─────────────────────────────────────────────┐
│  Three.js Canvas (hidden, alpha:true)       │
│  ┌────────────────────────────────────────┐  │
│  │  3D Scene                              │  │
│  │  - Zorrito model (GLTF)                │  │
│  │  - Ambient + Directional + Point light │  │
│  │  - Mouse-following rotation            │  │
│  └────────────────────────────────────────┘  │
│           ↓ renders to ↓                     │
│  WebGLRenderTarget (low-res, 0.18x)          │
│           ↓ readPixels ↓                     │
│  Uint8Array (reused, not per-frame!)         │
│           ↓ brightness → char mapping ↓      │
│  2D Overlay Canvas (full-res)                │
│  - Each pixel → ASCII char from " .,:;|~-=+*#@" │
│  - Bold monospace font                       │
│  - Interactive scatter near cursor           │
└─────────────────────────────────────────────┘
```

### 3.2 Character Mapping

```
Brightness 0.0 → " " (space, invisible)
Brightness 0.5 → "~" (mid-tone)
Brightness 1.0 → "@" (darkest/most visible)
```

Character set: `" .,:;|~-=+*#@"` (13 levels)

### 3.3 Interactive Scatter Effect

When the cursor hovers over the ASCII scene, characters near the cursor:
1. **Repel** — pushed away from cursor (radius: 50px, force: 3)
2. **Colorize** — change to a random palette color with opacity based on proximity
3. **Return** — smoothly lerp back to origin (factor: 0.08) when cursor leaves

This mirrors the background dot grid behavior but with **less** separation to preserve the model silhouette.

### 3.4 Performance Architecture

Critical optimizations in the ASCII renderer:
- **Pixel buffer**: `Uint8Array` allocated ONCE per resize, reused every frame
- **2D Context**: cached in ref, never re-fetched
- **Font**: set once on resize, not per-frame
- **Palette RGB**: pre-computed at module level as `[r,g,b]` arrays
- **Color strings**: built only for chars near cursor, not all chars
- **Distance check**: uses `distSq` comparison before `Math.sqrt`

---

## 4. 3D Model — NewZorrito-Web

File: `components/NewZorrito-Web.tsx`

### Model

- Source: `/models/NewZorrito-Web.glb` (GLTF)
- Generated via `gltfjsx`
- 4 meshes: Cuerpo (body), Capa (cape), Ojos (eyes), Accesorio (accessory)
- Has built-in animations (auto-played)
- Preloaded via `useGLTF.preload()`

### Mouse-Following Behavior

```
Base rotation: -PI/6 (slightly angled)
Mouse X → Y rotation: ±0.4 radians (left/right look)
Mouse Y → X rotation: ±0.15 radians (subtle up/down tilt)
Z rotation: ±0.05 (lean into look direction)
Lerp speed: 0.05 (X/Y), 0.03 (Z)
Floating: sin(t) * 0.08 on Y axis
```

---

## 5. Interactive Background — Dot Grid

File: `components/ui/interactive-grid-pattern.tsx`

### Structure

- Full-viewport `<canvas>` at `position: fixed`, `z-index: 1`
- Gap: 20px between dots (dense grid)
- Dot size: 1.5px radius
- Base opacity: 0.08 (barely visible)

### Interaction

- **Radius**: 120px from cursor
- **Repulsion force**: 30 (strong separation)
- **Color**: Random palette color per dot (assigned at init)
- **Intensity**: `max(0.3, force) * 0.8` opacity
- **Return**: lerp 0.08 to origin

### Performance

- No `getBoundingClientRect()` (canvas is fixed, clientX/Y is correct)
- Pre-computed `PALETTE_RGB` at module level
- `distSq` optimization before `Math.sqrt`

---

## 6. Atom Cursor

File: `components/atom-cursor.tsx`

### Visual

- **Nucleus**: 8px radius, brand blue `#B8CAD9`
- **Orbit ring**: 20px radius, very subtle (`rgba(135,88,244,0.12)`)
- **Electron 1**: purple `rgba(135,88,244,0.9)`, 2.5px radius
- **Electron 2**: salmon `rgba(238,162,132,0.9)`, 2.5px radius, offset by PI
- **Speed**: 2.5 rad/s
- **Trails**: 8-frame ring buffer per electron (Float32Array)

### Interactive States

| State | Effect |
|---|---|
| Default | Blue nucleus, 1x scale |
| Hover on button/link | Nucleus → salmon `#F28D77`, scale → 1.5x (lerp 0.15) |
| Click (mousedown) | Scale burst to 2.0x, fast rise (0.4), slow decay (0.92) |

### Interactive Element Detection

Priority order (performance-optimized):
1. Tag name (`a`, `button`, `input`, `textarea`, `select`)
2. `role="button"` attribute
3. `el.closest("a, button, [role='button']")`
4. `getComputedStyle` (last resort, cached per element)

### Cursor Hiding

Injects: `*, *::before, *::after { cursor: none !important; }`

---

## 7. Theme Toggle — Circular Reveal

File: `components/mode-toggle.tsx` + `app/globals.css`

Uses the **View Transition API** (`document.startViewTransition()`):
1. Captures click position (x, y)
2. Calculates max radius to cover viewport
3. Sets CSS custom properties: `--reveal-x`, `--reveal-y`, `--reveal-radius`
4. `::view-transition-new(root)` animates `clip-path: circle()` from 0 to max
5. Duration: 500ms, `cubic-bezier(0.4, 0, 0.2, 1)`
6. Falls back to instant swap in browsers without support
7. Respects `prefers-reduced-motion`

---

## 8. Component Architecture

```
app/layout.tsx
├── ThemeProvider (next-themes, class strategy)
├── <div z-10> → {children} (page content)
├── InteractiveGridPattern (fixed canvas, z-1)
├── AtomCursor (fixed canvas, z-9999)
└── Analytics

app/page.tsx
├── Navbar (fixed top, z-50)
├── HeroSection (eager load)
│   └── AsciiScene (dynamic, ssr:false)
│       └── Canvas (react-three-fiber)
│           ├── Zorrito (GLTF model)
│           ├── SceneLighting
│           └── InteractiveAsciiEffect (custom renderer)
├── ProjectsSection (lazy loaded via next/dynamic)
├── ExperienceSection (lazy loaded)
├── EducationSection (lazy loaded)
└── SkillsSection (lazy loaded)
```

---

## 9. Custom Scrollbar

Defined in `globals.css`:
- Width: 8px
- Thumb: `#B8CAD9` (brand blue), rounded pill with `background-clip: content-box`
- Hover: `#a0b8cc`
- Track: transparent
- Firefox: `scrollbar-width: thin; scrollbar-color: #B8CAD9 transparent`

---

## 10. Scroll Hint

File: `components/hero-section.tsx`

- Text: "Scroll to explore" — `text-sm font-mono font-bold`
- 3 ChevronDown icons in cascade, brand-salmon with decreasing opacity (100%/60%/30%)
- `animate-bounce` at 1.2s with 150ms staggered delays
- Animation **stops** (but hint stays visible) when `scrollY > 50`
- Reactivates when scrolling back to top

---

## 11. ZBrush Dark Mode Fix

In `components/skills-section.tsx`, the ZBrush skill has `darkInvert: true`.
In `components/ui/skill-slider.tsx`, when `darkInvert` is set, the image gets `dark:invert` CSS filter to turn the black SVG white in dark mode.

---

## 12. Key Files Quick Reference

| File | Purpose |
|---|---|
| `components/ascii-scene.tsx` | Custom ASCII renderer + 3D scene |
| `components/NewZorrito-Web.tsx` | 3D fox model with mouse tracking |
| `components/atom-cursor.tsx` | Custom atom cursor |
| `components/ui/interactive-grid-pattern.tsx` | Interactive dot background |
| `components/hero-section.tsx` | Hero section with staggered reveal |
| `components/mode-toggle.tsx` | Theme toggle with circular reveal |
| `components/navbar.tsx` | Navigation with profile hover |
| `app/globals.css` | CSS variables, scrollbar, view transitions |
| `app/layout.tsx` | Root layout (providers, global components) |
| `app/page.tsx` | Home page with lazy-loaded sections |
