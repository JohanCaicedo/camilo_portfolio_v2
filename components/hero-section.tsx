"use client"

import dynamic from "next/dynamic"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const AsciiScene = dynamic(
  () => import("./ascii-scene").then((mod) => ({ default: mod.AsciiScene })),
  { ssr: false }
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

  return (
    <section className="relative min-h-screen w-full bg-[#faf9f6] overflow-hidden">
      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-screen max-w-7xl mx-auto px-6 lg:px-12">
        {/* Left side - Text content */}
        <div className="flex-1 flex flex-col justify-center py-24 lg:py-0 lg:pr-12">
          {/* Badge */}
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-8 w-fit transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms",
            }}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-brand-salmon animate-pulse" />
            <span className="text-sm font-mono text-[#666666] tracking-widest uppercase">
              Design Portfolio
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-bold text-[#1a1a1a] leading-tight tracking-tight text-balance mb-6 transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "400ms",
            }}
          >
            Designing visual continuity
            <br />
            <span className="text-brand-blue">across every dimension.</span>
          </h1>

          {/* Description */}
          <p
            className="text-lg text-[#777777] max-w-md leading-relaxed mb-10 text-pretty transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "600ms",
            }}
          >
            Synthesizing static structure and dynamic motion into a unified, immersive visual language.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-wrap items-center gap-4 transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "800ms",
            }}
          >
            <Button
              size="lg"
              className="bg-brand-yellow text-[#1a1a1a] hover:bg-brand-yellow/80 font-semibold rounded-full px-8 h-12 text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-brand-green text-[#555555] hover:bg-brand-green/20 hover:text-[#1a1a1a] hover:border-brand-green rounded-full px-8 h-12 text-base transition-all"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Reel
            </Button>
          </div>

          {/* Stats */}
          <div
            className="flex items-center gap-10 mt-14 pt-10 border-t border-[#e5e5e0] transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "1000ms",
            }}
          >
            <div>
              <div className="text-3xl font-bold text-[#1a1a1a] font-mono">150+</div>
              <div className="text-sm text-[#999999] mt-1">Projects</div>
            </div>
            <div className="w-px h-10 bg-[#e5e5e0]" />
            <div>
              <div className="text-3xl font-bold text-[#1a1a1a] font-mono">98%</div>
              <div className="text-sm text-[#999999] mt-1">Satisfaction</div>
            </div>
            <div className="w-px h-10 bg-[#e5e5e0]" />
            <div>
              <div className="text-3xl font-bold text-[#1a1a1a] font-mono">12+</div>
              <div className="text-sm text-[#999999] mt-1">Years</div>
            </div>
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

      {/* Bottom scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: "1200ms",
        }}
      >
        <span className="text-xs text-[#aaaaaa] font-mono tracking-widest uppercase">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#aaaaaa] to-transparent animate-pulse" />
      </div>
    </section>
  )
}
