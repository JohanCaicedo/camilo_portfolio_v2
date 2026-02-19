"use client"

import dynamic from "next/dynamic"
import { SocialPill } from "@/components/ui/social-pill"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { AsciiSkeleton } from "@/components/ui/ascii-skeleton"

const AsciiScene = dynamic(
  () => import("./ascii-scene").then((mod) => ({ default: mod.AsciiScene })),
  {
    ssr: false,
    loading: () => <AsciiSkeleton />
  }
)

function useStaggeredReveal() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])
  return visible
}

export function HeroSection() {
  const visible = useStaggeredReveal()
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden snap-section scroll-mt-24 selection:bg-brand-salmon/30 selection:text-foreground">

      {/* Background: ASCII effect for mobile/tablet (reduced mode, no interaction) */}
      <div
        className="absolute inset-0 lg:hidden opacity-30 pointer-events-none"
        aria-hidden="true"
      >
        <AsciiScene reduced />
      </div>

      {/* Main content container */}
      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen max-w-7xl mx-auto w-full"
        style={{
          paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
          paddingRight: "max(1.5rem, env(safe-area-inset-right))",
        }}
      >
        {/* Mobile/Tablet: Full width centered content */}
        <div className="lg:hidden w-full flex flex-col items-center justify-center text-center px-4 py-20">
          {/* Badge & Status */}
          <div
            className="flex flex-col gap-5 mb-8 items-center transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "100ms",
            }}
          >
            <div className="inline-flex items-center gap-2.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-salmon shadow-[0_0_8px_rgba(242,141,119,0.4)] animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground/80 tracking-[0.2em] uppercase">
                Design Portfolio
              </span>
            </div>

            <div className="group relative flex items-center gap-2.5 px-4 py-1.5 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-white/70 dark:hover:bg-white/10 hover:shadow-md hover:border-black/10 dark:hover:border-white/20 hover:scale-[1.02]">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75 duration-1000"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green shadow-[0_0_8px_rgba(192,217,180,0.5)]"></span>
              </div>
              <span className="text-[11px] font-mono font-medium text-foreground/80 dark:text-muted-foreground tracking-[0.15em] uppercase">
                Available for work
              </span>
            </div>
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl sm:text-5xl font-sans font-bold text-foreground leading-[1.1] tracking-tighter text-balance mb-6 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "300ms",
            }}
          >
            Visual Design <br className="hidden sm:block" /> Continuity
            <br />
            <span className="text-brand-blue inline-block relative">
              Across Every Dimension.
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-brand-salmon/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <div
            className="transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) mb-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "500ms",
            }}
          >
            <p className="text-base sm:text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed text-pretty mb-6">
              Synthesizing static structure and dynamic motion into a unified, immersive visual language.
            </p>
            <p className="text-xs sm:text-sm font-mono text-muted-foreground/60 tracking-widest uppercase">
              // BASED_IN_BOGOTA_<span
                className="inline-block font-bold colombia-flag-text relative"
              >COLOMBIA</span>
            </p>
            <style>{`
              .colombia-flag-text {
                background: linear-gradient(
                  90deg,
                  #999999 0%, #999999 15%,
                  #FCD116 25%, #FCD116 35%,
                  #003893 42%, #003893 52%,
                  #CE1126 60%, #CE1126 70%,
                  #999999 80%, #999999 100%
                );
                background-size: 300% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: colombia-sweep 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              }
              @keyframes colombia-sweep {
                0% { background-position: 100% 0; }
                100% { background-position: -100% 0; }
              }
            `}</style>
          </div>

          {/* Social Links */}
          <div
            className="flex flex-wrap justify-center items-center gap-3 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "700ms",
            }}
          >
            <SocialPill href="https://www.linkedin.com/in/johan-caicedo/">
              <Linkedin className="size-4" /> LINKEDIN
            </SocialPill>

            <SocialPill href="mailto:camilo.design07@gmail.com">
              <Mail className="size-4" /> MAIL
            </SocialPill>

            <SocialPill href="https://github.com/JohanCaicedo">
              <Github className="size-4" /> GITHUB
            </SocialPill>
          </div>
        </div>

        {/* Desktop: Side by side layout */}
        <div className="hidden lg:flex flex-row items-center justify-between min-h-screen w-full px-8 xl:px-12">
          {/* Left side - Text content */}
          <div className="flex-[1.2] flex flex-col justify-center max-w-none min-w-0 relative z-20">
            {/* Badge & Status */}
            <div
              className="flex flex-col gap-6 mb-8 w-fit transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "150ms",
              }}
            >
              <div className="inline-flex items-center gap-3 group cursor-default">
                <span className="inline-block w-2 h-2 rounded-full bg-brand-salmon shadow-[0_0_10px_rgba(242,141,119,0.4)] transition-transform duration-500 group-hover:scale-125" />
                <span className="text-xs font-mono text-muted-foreground/70 tracking-[0.25em] uppercase group-hover:text-muted-foreground transition-colors duration-300">
                  Design Portfolio
                </span>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full backdrop-blur-sm w-fit shadow-sm transition-all duration-300 hover:bg-white/60 dark:hover:bg-white/10 hover:shadow-md hover:border-black/10 dark:hover:border-white/20 hover:-translate-y-0.5 group">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75 duration-1000"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green shadow-[0_0_8px_rgba(192,217,180,0.6)]"></span>
                </div>
                <span className="text-[11px] font-mono font-medium text-foreground/80 dark:text-muted-foreground tracking-[0.15em] uppercase group-hover:text-foreground transition-colors">
                  Available for work
                </span>
              </div>
            </div>

            {/* Main heading */}
            <h1
              className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-sans font-bold text-foreground leading-[1.1] tracking-tighter mb-8 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) relative whitespace-nowrap"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: "350ms",
              }}
            >
              Visual Design Continuity
              <br />
              <span className="relative inline-block group cursor-pointer perspective-500">
                {/* Layer 1: Back/Deep Dimension (Salmon) - Moves Left/Up */}
                <span
                  className="absolute inset-0 text-brand-salmon/90 z-0 transition-transform duration-500 ease-out group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:-rotate-2 opacity-0 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  Across Every Dimension.
                </span>

                {/* Layer 2: Mid/Near Dimension (Blue) - Moves Right/Down (Open to Right) */}
                <span
                  className="absolute inset-0 text-[#86B3D9]/90 dark:text-brand-blue/90 z-0 transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5 group-hover:rotate-2 opacity-0 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  Across Every Dimension.
                </span>

                {/* Layer 3: Front/Main Reality (Foreground) - Acts as mask/anchor */}
                <span className="relative z-10 text-[#86B3D9] dark:text-brand-blue transition-colors duration-300 group-hover:text-foreground">
                  Across Every Dimension.
                </span>

                {/* Interaction Hint: Tiny underline that vanishes on hover */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#86B3D9]/30 dark:bg-brand-blue/30 transition-all duration-300 group-hover:w-0 group-hover:opacity-0" />
              </span>
            </h1>

            {/* Description */}
            <div
              className="transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) mb-12"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "550ms",
              }}
            >
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed text-pretty mb-6 font-light">
                Synthesizing static structure and dynamic motion into a unified, immersive visual language.
              </p>
              <p className="text-xs font-mono text-muted-foreground/50 tracking-widest uppercase hover:text-muted-foreground transition-colors duration-300 cursor-help w-fit">
                // BASED_IN_BOGOTA_<span
                  className="inline-block font-bold colombia-flag-text"
                >COLOMBIA</span>
              </p>
            </div>

            {/* Social Links */}
            <div
              className="flex flex-wrap items-center gap-4 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "750ms",
              }}
            >
              <SocialPill href="https://www.linkedin.com/in/johan-caicedo/">
                <Linkedin className="size-4" /> LINKEDIN
              </SocialPill>

              <SocialPill href="mailto:camilo.design07@gmail.com">
                <Mail className="size-4" /> MAIL
              </SocialPill>

              <SocialPill href="https://github.com/JohanCaicedo">
                <Github className="size-4" /> GITHUB
              </SocialPill>
            </div>
          </div>

          {/* Right side - 3D ASCII viewport (desktop only) */}
          <div
            className="flex-1 w-full h-[80vh] relative transition-all duration-1000 ease-out perspective-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1) translateZ(0)" : "scale(0.95) translateZ(-50px)",
              transitionDelay: "400ms",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent z-10 w-20 pointer-events-none" />
            <AsciiScene />
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: visible ? "900ms" : "0ms",
          bottom: "calc(2rem + env(safe-area-inset-bottom))",
        }}
      >
        <span className="text-[10px] font-mono font-bold text-muted-foreground/40 dark:text-muted-foreground/40 tracking-[0.3em] uppercase group-hover:text-brand-salmon transition-colors duration-300">
          Scroll
        </span>
        <div className="flex flex-col items-center -space-y-4">
          <ChevronDown className={`size-6 text-brand-salmon transition-all duration-300 ${hasScrolled ? "opacity-0" : "animate-bounce group-hover:scale-110"}`} style={hasScrolled ? {} : { animationDuration: "2s" }} />
          <ChevronDown className={`size-6 text-brand-salmon/40 transition-all duration-300 ${hasScrolled ? "opacity-0" : "animate-bounce"}`} style={hasScrolled ? {} : { animationDuration: "2s", animationDelay: "150ms" }} />
        </div>
      </div>
    </section>
  )
}
