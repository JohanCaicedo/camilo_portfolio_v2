# Studio | Creative Digital Agency Portfolio

> Crafting immersive web experiences that blend creativity with cutting-edge technology

A modern, performant portfolio website showcasing creative digital agency capabilities. Features stunning 3D ASCII art animations powered by Three.js, a comprehensive UI component library, and a sleek minimalist design system.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38bdf8?style=flat-square&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-0.171.0-000000?style=flat-square&logo=three.js)

## ✨ Features

### 🎨 Visual Design
- **3D ASCII Cat Animation**: Interactive walking cat rendered entirely with ASCII characters using Three.js and `@react-three/drei`
- **Minimalist Aesthetic**: Clean, modern design with a warm off-white (`#faf9f6`) color palette and dark accents
- **Staggered Reveal Animations**: Smooth entrance animations with carefully timed delays for text and visual elements
- **Responsive Layout**: Fully responsive design that adapts beautifully from mobile to desktop
- **Subtle Visual Details**: Dot grid background patterns, glassmorphic navbar with backdrop blur

### 🎭 3D & Animation
- **Real-time 3D Rendering**: Powered by Three.js with React Three Fiber
- **ASCII Art Rendering**: Custom ASCII shader with configurable character sets and resolution
- **Character Animation System**: Walking animation with:
  - Coordinated leg movement (opposing front/back pairs)
  - Natural body bob and rotation
  - Tail swaying physics
  - Head movement and rotation
  - Smooth camera rotation for 360° view

### 🧩 Component Library
Comprehensive UI component library with **57 production-ready components** built on Radix UI primitives and styled with Tailwind CSS v4:

**Form Components**: Input, Textarea, Checkbox, Radio Group, Select, Switch, Slider, Calendar, Date Picker, Input OTP

**Navigation**: Navigation Menu, Menubar, Breadcrumb, Pagination, Tabs

**Overlays**: Dialog, Alert Dialog, Drawer, Sheet, Popover, Hover Card, Tooltip, Context Menu, Dropdown Menu

**Data Display**: Card, Avatar, Badge, Table, Chart, Empty State, Skeleton, Progress

**Feedback**: Alert, Toast, Sonner, Spinner

**Layout**: Separator, Scroll Area, Resizable, Sidebar, Accordion, Collapsible, Carousel, Aspect Ratio

**Utilities**: Button, Button Group, Command, Field, Form, Item, KBD, Label

### 🚀 Performance & DX
- **TypeScript**: Full type safety throughout the codebase
- **Server Components**: Optimized server-side rendering with Next.js 16
- **Image Optimization**: Configured for unoptimized images (static export ready)
- **Analytics**: Vercel Analytics integration for performance monitoring
- **Build Flexibility**: TypeScript build errors ignored for rapid prototyping

## 🏗️ Tech Stack

### Core Framework
- **[Next.js 16.1.6](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.4](https://react.dev/)** - UI library
- **[TypeScript 5.7.3](https://www.typescriptlang.org/)** - Type safety

### 3D & Animation
- **[Three.js 0.171.0](https://threejs.org/)** - 3D graphics library
- **[@react-three/fiber 9.5.0](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[@react-three/drei 10.7.7](https://github.com/pmndrs/drei)** - Useful helpers for React Three Fiber
- **[three-stdlib 2.35.3](https://github.com/pmndrs/three-stdlib)** - Three.js utilities

### UI & Styling
- **[Tailwind CSS 4.1.9](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React 0.564.0](https://lucide.dev/)** - Icon library
- **[class-variance-authority 0.7.1](https://cva.style/)** - Component variant management
- **[tailwind-merge 3.3.1](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes
- **[tw-animate-css 1.3.3](https://github.com/tw-animate/tw-animate-css)** - Animation utilities

### Forms & Validation
- **[react-hook-form 7.54.1](https://react-hook-form.com/)** - Form state management
- **[@hookform/resolvers 3.9.1](https://github.com/react-hook-form/resolvers)** - Validation resolvers
- **[Zod 3.24.1](https://zod.dev/)** - Schema validation

### Additional Libraries
- **[next-themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Recharts 2.15.0](https://recharts.org/)** - Charting library
- **[Sonner 1.7.1](https://sonner.emilkowal.ski/)** - Toast notifications
- **[date-fns 4.1.0](https://date-fns.org/)** - Date utility library
- **[embla-carousel-react 8.6.0](https://www.embla-carousel.com/)** - Carousel component
- **[CMDK 1.1.1](https://cmdk.paco.me/)** - Command menu
- **[Vaul 1.1.2](https://vaul.emilkowal.ski/)** - Drawer component

### Developer Tools
- **[Vercel Analytics 1.6.1](https://vercel.com/analytics)** - Web analytics
- **[@tailwindcss/postcss 4.1.13](https://tailwindcss.com/)** - PostCSS plugin
- **[Geist Font](https://vercel.com/font)** - Modern sans-serif and monospace fonts

## 📁 Project Structure

```
camilo_portfolio_v2/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Tailwind v4 theme
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Homepage
│
├── components/                   # React components
│   ├── ui/                      # 57 UI components (shadcn/ui)
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ... (53 more components)
│   │
│   ├── animated-character.tsx   # 3D walking cat model
│   ├── ascii-scene.tsx          # Three.js ASCII renderer scene
│   ├── hero-section.tsx         # Main hero section
│   ├── navbar.tsx               # Navigation component
│   └── theme-provider.tsx       # Theme context provider
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
│
├── lib/                          # Utility functions
│   └── utils.ts                 # Helper utilities
│
├── public/                       # Static assets
│   ├── icon.svg                 # SVG icon
│   ├── icon-dark-32x32.png     # Dark mode favicon
│   ├── icon-light-32x32.png    # Light mode favicon
│   ├── apple-icon.png          # Apple touch icon
│   └── placeholder-*           # Placeholder images
│
├── styles/                       # Additional styles (if any)
│
├── components.json              # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── pnpm-lock.yaml             # Lockfile (using pnpm)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher recommended
- **Package Manager**: pnpm (recommended), npm, or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd camilo_portfolio_v2
   ```

2. **Install dependencies**
   
   Using pnpm (recommended):
   ```bash
   pnpm install
   ```
   
   Or using npm:
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Create production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## 🎨 Design System

### Color Palette

The design uses a sophisticated color system defined in `globals.css`:

**Light Mode**:
- Background: `#faf9f6` (Warm off-white)
- Primary Text: `#1a1a1a` (Near black)
- Secondary Text: `#777777`, `#999999`, `#aaaaaa` (Gray scale)
- Borders: `#e5e5e0`, `#d0d0d0`

**Dark Mode**: 
- Full dark mode support with OKLCH color space
- Automatic theme switching based on system preferences

### Typography

- **Sans-serif**: Geist - Modern, clean font for body text
- **Monospace**: Geist Mono - Technical, modern font for code/labels
- Letter spacing: Wide tracking for uppercase labels (`tracking-widest`)
- Line heights: Tight for headings (`leading-[0.95]`), relaxed for body

### Spacing & Layout

- Container: `max-w-7xl` (1280px)
- Padding: `px-6 lg:px-12` for responsive horizontal spacing
- Gaps: `gap-2`, `gap-4`, `gap-8`, `gap-10` for consistent vertical rhythm
- Border Radius: Custom radius system (`--radius: 0.625rem`)

### Component Variants

Components use `class-variance-authority` for type-safe variant management:

```typescript
// Example: Button variants
{
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size: "default" | "sm" | "lg" | "icon"
}
```

## 🎭 3D Animation System

### ASCII Renderer Configuration

Located in `components/ascii-scene.tsx`:

```typescript
<AsciiRenderer
  fgColor="#1a1a1a"          // Character color
  bgColor="#faf9f6"          // Background color
  characters=" .,:;|~-=+*#@" // ASCII character set
  invert={false}             // Color inversion
  resolution={0.18}          // Detail level
/>
```

### Character Animation

The walking cat animation (`animated-character.tsx`) uses:
- **useFrame hook**: React Three Fiber's animation loop
- **Walking speed**: Configurable at 3 units
- **Body physics**: Vertical bob, rotation, and weight shift
- **Leg coordination**: Opposing pairs for natural gait
- **Tail dynamics**: Swaying with multiple axes
- **Camera rotation**: Slow 360° rotation for showcase

## 🔧 Configuration

### TypeScript Config

```json
{
  "strict": true,
  "target": "ES6",
  "jsx": "react-jsx",
  "paths": {
    "@/*": ["./*"]  // Path alias for imports
  }
}
```

### Next.js Config

```javascript
{
  typescript: {
    ignoreBuildErrors: true  // Flexible for rapid development
  },
  images: {
    unoptimized: true       // Ready for static export
  }
}
```

### Tailwind CSS v4

Uses the new `@import 'tailwindcss'` syntax with:
- Custom variants for dark mode
- OKLCH color space for better color interpolation
- Inline theme configuration
- CSS custom properties for theming

## 📱 Responsive Design

The site is fully responsive with breakpoints:

- **Mobile**: Base styles (< 768px)
- **Tablet**: `md:` prefix (≥ 768px)
- **Desktop**: `lg:` prefix (≥ 1024px)
- **Large Desktop**: `xl:` prefix (≥ 1280px)

Key responsive patterns:
- Navbar: Hamburger menu on mobile, full links on desktop
- Hero: Stacked layout on mobile, side-by-side on desktop
- 3D Scene: Adjustable height (500px mobile, 700px desktop)

## 🎯 Key Components

### Hero Section (`hero-section.tsx`)

The main landing component featuring:
- Staggered reveal animation system
- 3D ASCII cat viewport
- Call-to-action buttons
- Stats display (Projects, Satisfaction, Years)
- Scroll indicator

### Navbar (`navbar.tsx`)

Fixed navigation with:
- Glassmorphic backdrop blur effect
- Mobile-responsive menu
- Smooth transitions
- Brand logo with accent

### Animated Character (`animated-character.tsx`)

3D cat model with:
- 167 lines of procedural animation
- 8 animated parts (body, head, 4 legs, tail)
- Real-time physics calculations
- Modular group-based structure

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Static Export

```bash
# Build for static hosting
pnpm build

# Serve the .next folder
```

### Environment Variables

Create `.env.local` for environment-specific variables:

```bash
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

## 🤝 Contributing

This is a personal portfolio project. Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private. All rights reserved.

## 🙏 Acknowledgments

- **shadcn/ui** - For the amazing component library
- **Vercel** - For Next.js and Geist font
- **Poimandres** - For React Three Fiber ecosystem
- **Radix UI** - For accessible primitives

## 📞 Contact

For inquiries, reach out through the contact form on the website.

---

**Built with ❤️ using Next.js, React, Three.js, and TypeScript**
