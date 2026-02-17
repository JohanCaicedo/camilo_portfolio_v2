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
    <section className="relative min-h-screen w-full overflow-hidden snap-section scroll-mt-24">

      <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-screen max-w-7xl mx-auto px-6 lg:px-12">
        {/* Left side - Text content */}
        <div className="flex-1 flex flex-col justify-center py-24 lg:py-0 lg:pr-12">
          {/* Badge & Status */}
          <div
            className="flex flex-col gap-4 mb-6 w-fit transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms",
            }}
          >
            <div className="inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-salmon animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase dark:text-foreground">
                Design Portfolio
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-background dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full w-fit">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
              </div>
              <span className="text-[10px] font-mono font-medium text-foreground dark:text-muted-foreground tracking-widest uppercase">
                Available for work
              </span>
            </div>
          </div>

          {/* Main heading */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-foreground leading-tight tracking-tight text-balance mb-6 transition-all duration-700 ease-out dark:text-foreground"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "400ms",
            }}
          >
            Visual Design Continuity
            <br />
            <span className="text-brand-blue">Across Every Dimension.</span>
          </h1>

          {/* Description */}
          <div
            className="transition-all duration-700 ease-out mb-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "600ms",
            }}
          >
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed text-pretty mb-4">
              Synthesizing static structure and dynamic motion into a unified, immersive visual language.
            </p>
            <p className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
              // BASED_IN_BOGOTA_<span
                className="inline-block font-bold colombia-flag-text"
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
                animation: colombia-sweep 6s linear infinite;
              }
              @keyframes colombia-sweep {
                0% { background-position: 100% 0; }
                100% { background-position: -100% 0; }
              }
            `}</style>
          </div>

          {/* Social Links */}
          <div
            className="flex flex-wrap items-center gap-4 transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "800ms",
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

        {/* Right side - 3D ASCII cat viewport */}
        <div
          className="flex-1 w-full lg:w-auto h-[500px] lg:h-[700px] relative transition-all duration-1000 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.95)",
            transitionDelay: "500ms",
          }}
        >
          <AsciiScene />
        </div>
      </div>

      {/* Bottom scroll hint — animation stops on scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: visible ? "1200ms" : "0ms",
        }}
      >
        <span className="text-sm font-mono font-bold text-muted-foreground dark:text-muted-foreground tracking-widest uppercase">
          Scroll to explore
        </span>
        <div className="flex flex-col items-center -space-y-3">
          <ChevronDown className={`size-6 text-brand-salmon transition-all duration-300 ${hasScrolled ? "" : "animate-bounce"}`} style={hasScrolled ? {} : { animationDuration: "1.2s" }} />
          <ChevronDown className={`size-6 text-brand-salmon/60 transition-all duration-300 ${hasScrolled ? "" : "animate-bounce"}`} style={hasScrolled ? {} : { animationDuration: "1.2s", animationDelay: "150ms" }} />
          <ChevronDown className={`size-6 text-brand-salmon/30 transition-all duration-300 ${hasScrolled ? "" : "animate-bounce"}`} style={hasScrolled ? {} : { animationDuration: "1.2s", animationDelay: "300ms" }} />
        </div>
      </div>
    </section>
  )
}
