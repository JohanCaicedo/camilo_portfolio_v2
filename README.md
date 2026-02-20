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
│
├── app/                                    # Next.js App Router
│   ├── globals.css                         # Tailwind v4 theme, CSS variables, brand palette
│   ├── layout.tsx                          # Root layout: ThemeProvider, MotionProvider, Navbar, PageLoader
│   ├── template.tsx                        # Page transition wrapper (AnimatePresence fade)
│   ├── page.tsx                            # Homepage — assembles all page sections
│   ├── sitemap.ts                          # Dynamic sitemap generator
│   ├── robots.ts                           # SEO robots.txt
│   ├── cv/
│   │   └── page.tsx                        # Curriculum Vitae page
│   ├── web-design/
│   │   └── page.tsx                        # Web Design project category
│   ├── graphic-design/
│   │   └── page.tsx                        # Graphic Design category
│   ├── editorial-design/
│   │   └── page.tsx                        # Editorial Design category
│   ├── photography/
│   │   └── page.tsx                        # Photography category
│   └── personal/
│       └── page.tsx                        # Personal Projects category
│
├── components/                             # React components
│   │
│   ├── ui/                                 # Custom UI component library
│   │   ├── ascii-skeleton.tsx              # Loading skeleton for ASCII scene
│   │   ├── avatar.tsx                      # Avatar (image + fallback)
│   │   ├── badge-row.tsx                   # Row of tag/tech badges
│   │   ├── button.tsx                      # Button with CVA variants
│   │   ├── dropdown-menu.tsx               # Dropdown menu (Radix)
│   │   ├── error-boundary.tsx              # React error boundary
│   │   ├── image-lightbox.tsx              # Fullscreen image lightbox
│   │   ├── interactive-grid-pattern.tsx    # Animated dot grid background
│   │   ├── lightbox-gallery.tsx            # Gallery grid → lightbox connector
│   │   ├── section-header.tsx              # Reusable section title/label
│   │   ├── skill-slider.tsx                # Animated horizontal skill scroll
│   │   ├── social-pill.tsx                 # Social link pill button
│   │   └── viewer-card.tsx                 # Project thumbnail card
│   │
│   ├── animated-fox-logo.tsx               # � Fox SVG mascot — blink/drift/sparkle animations
│   ├── ascii-scene.tsx                     # Three.js + ASCII renderer scene
│   ├── atom-cursor.tsx                     # Custom orbital cursor animation
│   ├── hero-section.tsx                    # Hero: headline, subtitle, CTA, ASCII scene
│   ├── about-section.tsx                   # About: bio, avatar, social links
│   ├── projects-section.tsx                # Projects: grid of ViewerCards by category
│   ├── experience-section.tsx              # Work experience timeline cards
│   ├── education-section.tsx               # Education history
│   ├── skills-section.tsx                  # Skills: SkillSliders by discipline
│   ├── footer.tsx                          # Site footer with links
│   ├── navbar.tsx                          # 🧭 Floating pill navbar with fox home button
│   ├── page-loader.tsx                     # 🎬 Full-screen prismatic page loader
│   ├── motion-provider.tsx                 # LazyMotion + MotionConfig wrapper
│   ├── theme-provider.tsx                  # next-themes ThemeProvider wrapper
│   ├── mode-toggle.tsx                     # Dark/Light mode toggle button
│   ├── scroll-to-top.tsx                   # Floating scroll-to-top button
│   ├── json-ld.tsx                         # JSON-LD structured data (SEO)
│   ├── section-container.tsx               # Consistent section padding wrapper
│   ├── home-scroll-snap.tsx                # Scroll-snap layout helper
│   └── NewZorrito-Web.tsx                  # [WIP] New fox character component
│
├── hooks/
│   └── use-mobile.ts                       # Mobile breakpoint detection hook
│
├── lib/
│   └── utils.ts                            # `cn()` — clsx + tailwind-merge helper
│
├── public/                                 # Static assets (served at /)
│   │
│   ├── favicon.svg                         # Fox SVG favicon
│   ├── favicon.ico                         # Fallback favicon
│   ├── apple-icon.png                      # Apple touch icon
│   ├── og-image.jpg                        # Open Graph social preview image
│   ├── icon.svg / icon-dark-32x32.png / icon-light-32x32.png
│   │
│   ├── Profile-Foto-Camilo.webp            # Navbar avatar — idle photo
│   ├── Foxy-Blink-nav-bar.gif              # Navbar avatar — hover fox GIF
│   ├── Foxy-Blink.gif                      # Full-size fox blink animation
│   ├── PaperFoxStudio-IMG.svg              # Studio logo SVG
│   ├── PaperFoxStudio-Logo.webp            # Studio logo bitmap
│   │
│   ├── models/                             # 3D model assets
│   │   └── (3D model files)
│   │
│   ├── — Web Design project images —
│   │   ├── Web-Banner (2-5).webp
│   │   ├── Web-Gallery1-12.webp
│   │   ├── WebDesign-Cover.webp
│   │   └── Use Case (1-5).webp
│   │
│   ├── — Graphic Design images —
│   │   ├── GraphicDesign-Cover.webp
│   │   ├── Graphic Design.webm
│   │   ├── Illustration.webp / IllustrationBanner.webp
│   │   ├── Publicaciones_1-5.webp
│   │   ├── GraphicPieces.webp
│   │   └── Diseño Grafico (2).webp
│   │
│   ├── — Editorial Design images —
│   │   ├── EditorialDesign-Cover.webp
│   │   ├── Editorial-Design ID.webp
│   │   └── Editorial-Desing-Cover (1-9).webp
│   │
│   ├── — Photography images —
│   │   ├── Photography-Cover.webp
│   │   ├── Portrait (1-11).webp
│   │   ├── Nature.webp / Nature 2.webp / Nature 3.webp
│   │   ├── Inside.webp / Inside 2.webp
│   │   ├── Necoclí 2024 (1-13).webp
│   │   ├── Postales_1-7.webp
│   │   └── Timelapse 18 de julio 2022.webm
│   │
│   ├── — Personal / Studio images —
│   │   ├── PaperFoxStudio-Build.webm
│   │   ├── PaperFoxLogoV2.webp
│   │   ├── PFS-SafeAreas.webp
│   │   ├── Personal-MoodBoard.webp
│   │   ├── ID-Personal.webp
│   │   ├── Render_New_Zorrito 360_Cycles-Web.mp4
│   │   ├── Zorrito-Nahim-Paint.mp4
│   │   ├── Neil-Style.webm / Nile Riggin.webm
│   │   ├── Nile-Style.webp
│   │   └── Ñoquito-Portrait.webp
│   │
│   └── CV Johan Caicedo - 2024.pdf         # Downloadable CV
│
├── styles/
│   └── globals.css                         # (legacy, main styles are in app/globals.css)
│
├── .agents/                                # AI agent configuration
│   └── skills/                             # Agent skill definitions
│       ├── notion-project-publisher/
│       └── react-doctor/
│
├── docs/                                   # Internal documentation
│
├── .env.local                              # Environment variables (not committed)
├── .gitignore
├── .prettierrc                             # Prettier formatting config
├── components.json                         # shadcn/ui config
├── eslint.config.mjs                       # ESLint config
├── next.config.mjs                         # Next.js config
├── postcss.config.mjs                      # PostCSS config
├── tailwind.config.js                      # Tailwind config (brand colors, fonts)
├── tsconfig.json                           # TypeScript config
├── pnpm-workspace.yaml                     # pnpm workspace config
└── package.json                            # Dependencies & scripts
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
