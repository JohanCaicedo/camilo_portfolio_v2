# Paper Fox Studio — Portfolio v2

> Crafting immersive web experiences across every dimension.

A modern, animated portfolio website for **Johan Camilo Caicedo**, creative designer and founder of Paper Fox Studio. Built with Next.js 16, React 19, Framer Motion, and Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-ff0055?style=flat-square&logo=framer)

---

## ✨ Features

### 🦊 Animated Fox Logo (`AnimatedFoxLogo`)
A custom SVG mascot with layered Framer Motion animations, all running simultaneously:

| Animation | Behavior | Cycle |
|---|---|---|
| **Head sway** | Rotates ±8° pivoting from the base | 8s mirror loop |
| **Ear wobble** | Independent ±4° on top of head rotation | 3s mirror loop |
| **Eye blinking** | Random `scaleY` squeeze every 1.5–4.5s | Randomized |
| **Pupil drift** | Eyes scan left ↔ right | 5s mirror loop |
| **Hover sparkles** | 8 Pokémon-shiny stars burst around the fox | On hover, loops |

**Hover state**: 8 four-point sparkle stars (in brand colors) appear around the fox, starting at 4× size and shrinking to their final size — a direct reference to the Pokémon shiny encounter animation.

---

### 🎬 Page Loader (`PageLoader`)
Full-screen entrance animation sequence that blocks the site until complete:

1. **Intro phase** (0–1s): Fox logo + "Paper Fox Studio" fade in from above
2. **Split phase** (1–1.8s): Prismatic layers of "Across Every Dimension." diverge
3. **Waiting phase** (1.8s+): Text floats in a looping breathing animation; click-to-continue prompt appears
4. **Exit phase** (on click / 30s timeout): Prismatic layers scatter outward, text blurs and fades, loader unmounts

The loader uses a hardcoded `backgroundColor: #faf9f6` on the container to guarantee an opaque screen from frame one, independent of CSS variable hydration timing.

---

### 🧭 Floating Navbar (`Navbar`)
- **Floating pill design**: `top-3`, `left-4`, `right-4`, `rounded-2xl` — detached from the screen edges
- **Animated Home button**: `AnimatedFoxLogo` (`size-12`) replaces the home icon; grows 20% on hover with sparkle effect
- **Profile avatar**: switches between a photo and an animated fox GIF on hover
- **Mobile menu**: Slide-in panel with full nav links and profile section
- **Backdrop blur**: Glassmorphic `bg-background/80 backdrop-blur-md`

---

### 🎨 Design System
- **Color palette**: Warm off-white `#faf9f6`, near-black `#1a1a1a`, with brand accent colors:
  - Salmon: `#F2691D`
  - Blue: `#7B9FD4`  
  - Green: `#7EB89E`
  - Yellow: `#FFD797`
- **Typography**: Geist Sans (body) + Geist Mono (labels, code)
- **Dark mode**: Full support via `next-themes`, toggled with `ModeToggle`

---

### 📄 Pages

| Route | Description |
|---|---|
| `/` | Homepage with Hero, About, Projects, Education, Experience, Skills |
| `/cv` | Curriculum Vitae page |
| `/web-design` | Web design project category |
| `/graphic-design` | Graphic design project category |
| `/editorial-design` | Editorial design project category |
| `/photography` | Photography category |
| `/personal` | Personal projects category |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | SEO robots file |

---

## 🏗️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** — App Router, SSR, static pages
- **[React 19](https://react.dev/)** — UI library
- **[TypeScript 5.7](https://www.typescriptlang.org/)** — Type safety

### Animation
- **[Framer Motion 12](https://www.framer.com/motion/)** — `motion`, `AnimatePresence`, keyframes, mirror loops
- **[Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** — 3D ASCII scene

### Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first with `@import 'tailwindcss'`
- **[Radix UI](https://www.radix-ui.com/)** — Accessible unstyled primitives
- **[class-variance-authority](https://cva.style/)** — Type-safe component variants
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** — Conflict-free class merging

### UI Components
- **[Lucide React](https://lucide.dev/)** — Icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** — Dark/light mode
- **[Sonner](https://sonner.emilkowal.ski/)** — Toast notifications
- **[Embla Carousel](https://www.embla-carousel.com/)** — Carousel
- **[CMDK](https://cmdk.paco.me/)** — Command palette
- **[Vaul](https://vaul.emilkowal.ski/)** — Drawer component

### Forms & Validation
- **[react-hook-form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** — Form state & schema validation

### Infrastructure
- **[Vercel](https://vercel.com/)** — Deployment & Analytics
- **[pnpm](https://pnpm.io/)** — Package manager

---

## 📁 Project Structure

```
camilo_portfolio_v2/
├── app/
│   ├── globals.css              # Tailwind v4 theme + CSS variables
│   ├── layout.tsx               # Root layout: ThemeProvider, MotionProvider, PageLoader, Navbar
│   ├── template.tsx             # Page transition wrapper (AnimatePresence)
│   ├── page.tsx                 # Homepage (Hero + all sections)
│   ├── cv/                      # CV page
│   ├── web-design/              # Project category pages
│   ├── graphic-design/
│   ├── editorial-design/
│   ├── photography/
│   ├── personal/
│   ├── sitemap.ts               # Dynamic sitemap
│   └── robots.ts                # SEO robots
│
├── components/
│   ├── animated-fox-logo.tsx    # 🦊 Animated SVG mascot (blink, drift, hover sparkles)
│   ├── page-loader.tsx          # 🎬 Full-screen page entrance animation
│   ├── navbar.tsx               # 🧭 Floating navbar with fox home button
│   ├── hero-section.tsx         # Main hero landing section
│   ├── about-section.tsx        # About section
│   ├── projects-section.tsx     # Projects grid
│   ├── experience-section.tsx   # Work experience cards
│   ├── education-section.tsx    # Education section
│   ├── skills-section.tsx       # Skills section
│   ├── footer.tsx               # Site footer
│   ├── atom-cursor.tsx          # Custom animated cursor
│   ├── ascii-scene.tsx          # Three.js ASCII renderer scene
│   ├── motion-provider.tsx      # LazyMotion + MotionConfig wrapper
│   ├── theme-provider.tsx       # next-themes wrapper
│   ├── mode-toggle.tsx          # Dark/Light mode toggle
│   ├── scroll-to-top.tsx        # Scroll-to-top button
│   ├── json-ld.tsx              # Structured data (SEO)
│   └── ui/                      # shadcn/ui component library
│
├── lib/
│   └── utils.ts                 # `cn()` helper (clsx + tailwind-merge)
│
├── hooks/
│   └── use-mobile.ts            # Mobile breakpoint hook
│
├── public/
│   ├── favicon.svg              # Fox favicon
│   ├── apple-icon.png           # Apple touch icon
│   ├── og-image.jpg             # Open Graph image
│   ├── Profile-Foto-Camilo.webp # Navbar avatar photo
│   ├── Foxy-Blink-nav-bar.gif   # Navbar avatar hover GIF
│   └── projects/                # Project images (WebP)
│
├── next.config.mjs              # Next.js config
├── tailwind.config.js           # Tailwind config (brand colors)
├── postcss.config.mjs           # PostCSS config
├── tsconfig.json                # TypeScript config
├── components.json              # shadcn/ui config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **pnpm** (recommended)

### Installation

```bash
# Clone the repo
git clone https://github.com/JohanCaicedo/camilo_portfolio_v2.git
cd camilo_portfolio_v2

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
pnpm dev      # Development server (hot reload)
pnpm build    # Production build
pnpm start    # Serve production build
pnpm lint     # ESLint
```

### Deploy to Vercel

```bash
vercel        # Preview deployment
vercel --prod # Production deployment
```

---

## 🎨 Brand Colors

Defined in `tailwind.config.js` and `globals.css`:

```js
colors: {
  brand: {
    salmon: "#F2691D",
    blue:   "#7B9FD4",
    green:  "#7EB89E",
    yellow: "#FFD797",
  }
}
```

---

## 📱 Responsive Design

| Breakpoint | Prefix | Value |
|---|---|---|
| Mobile | _(base)_ | < 768px |
| Tablet | `md:` | ≥ 768px |
| Desktop | `lg:` | ≥ 1024px |
| Large | `xl:` | ≥ 1280px |

---

## 🔧 Key Technical Decisions

- **Framer Motion `motion` over `m`**: The `PageLoader` uses the synchronous `motion` import (not `LazyMotion`'s `m`) to guarantee keyframe animations fire on the very first frame before hydration.
- **Inline `backgroundColor` on loader**: Prevents a transparent-background flash during the `--background` CSS variable hydration window.
- **`AnimatePresence` parent pattern for sparkles**: Sparkles with `repeat: Infinity` are wrapped in a single `<motion.g>` so `AnimatePresence` can exit the parent without being blocked by the children's infinite loops.
- **`overflow: visible` on SVG**: Allows sparkles to render outside the logo's bounding box.

---

## 🌐 Live Site

**[paperfoxstudio.site](https://paperfoxstudio.site)**

---

## 📄 License

Private — All rights reserved © Paper Fox Studio.
