/* eslint-disable react/no-unknown-property */
"use client"

import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Model as Zorrito } from "./NewZorrito-Web"
import { Suspense, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import Image from "next/image"

const PALETTE = [
  "#eea284",
  "#bbc9d8",
  "#f7df91",
  "#c4debc",
  "#f2d3c5",
  "#6a5deb",
]

const PALETTE_RGB: [number, number, number][] = PALETTE.map((hex) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
])

const ASCII_CHARS = " .:-=+*#%@"

interface CharData {
  x: number
  y: number
  char: string
  opacity: number
  offsetX: number
  activeColorIdx: number
  currentColor: string
  flickerPhase: number
}

function ScanlineAsciiEffect({
  fgColor,
  lineSpacing = 1,
  lineHeight = 2,
  charSpacing = 8,
  resolution = 0.18,
  reduced = false,
  frozen = false,
}: {
  fgColor: string
  lineSpacing?: number
  lineHeight?: number
  charSpacing?: number
  resolution?: number
  reduced?: boolean
  frozen?: boolean
}) {
  const { gl, scene, camera, size } = useThree()
  const overlayRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const renderTarget = useRef<THREE.WebGLRenderTarget | null>(null)
  const pixelsRef = useRef<Uint8Array | null>(null)
  const charsRef = useRef<CharData[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const isMountedRef = useRef(true)
  const timeRef = useRef(0)
  const scaleRef = useRef({ charToRtX: 0, charToRtY: 0, rtWidth: 0, rtHeight: 0, numCols: 0 })
  const cachedColorRef = useRef<string>(fgColor)
  const hasFrozenFrame = useRef(false)

  useEffect(() => {
    isMountedRef.current = true

    const overlay = document.createElement("canvas")
    overlay.style.position = "absolute"
    overlay.style.top = "0"
    overlay.style.left = "0"
    overlay.style.width = "100%"
    overlay.style.height = "100%"
    overlay.style.pointerEvents = "none"
    overlay.style.zIndex = "10"

    const parent = gl.domElement.parentElement
    if (parent) {
      parent.style.position = "relative"
      parent.appendChild(overlay)
    }
    overlayRef.current = overlay

    ctxRef.current = overlay.getContext("2d")

    const grandParent = parent?.parentElement
    const handleMouseMove = (e: MouseEvent) => {
      if (!overlay) return
      const rect = overlay.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    if (grandParent) {
      grandParent.addEventListener("mousemove", handleMouseMove)
      grandParent.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      isMountedRef.current = false
      if (grandParent) {
        grandParent.removeEventListener("mousemove", handleMouseMove)
        grandParent.removeEventListener("mouseleave", handleMouseLeave)
      }
      overlay.remove()
      renderTarget.current?.dispose()
    }
  }, [gl])

  useEffect(() => {
    if (!size.width || !size.height) return

    const w = Math.floor(size.width * resolution)
    const h = Math.floor(size.height * resolution)

    if (renderTarget.current) renderTarget.current.dispose()
    renderTarget.current = new THREE.WebGLRenderTarget(w, h)

    pixelsRef.current = new Uint8Array(w * h * 4)

    if (overlayRef.current) {
      overlayRef.current.width = size.width
      overlayRef.current.height = size.height
    }

    const totalLineHeight = lineHeight + lineSpacing
    const numLines = Math.floor(size.height / totalLineHeight)
    const numCols = Math.floor(size.width / charSpacing)

    const scaleX = size.width / w
    const scaleY = size.height / h

    scaleRef.current = {
      charToRtX: charSpacing / scaleX,
      charToRtY: totalLineHeight / scaleY,
      rtWidth: w,
      rtHeight: h,
      numCols: numCols,
    }

    const chars: CharData[] = []

    for (let row = 0; row < numLines; row++) {
      for (let col = 0; col < numCols; col++) {
        chars.push({
          x: col * charSpacing + charSpacing / 2,
          y: row * totalLineHeight + totalLineHeight / 2,
          char: " ",
          opacity: 0,
          offsetX: 0,
          activeColorIdx: Math.floor(Math.random() * PALETTE_RGB.length),
          currentColor: fgColor,
          flickerPhase: Math.random() * Math.PI * 2,
        })
      }
    }
    charsRef.current = chars
    cachedColorRef.current = fgColor

    if (ctxRef.current) {
      const fontSize = Math.max(charSpacing * 0.9, 8)
      ctxRef.current.font = `bold ${fontSize}px monospace`
      ctxRef.current.textAlign = "center"
      ctxRef.current.textBaseline = "middle"
    }
  }, [size.width, size.height, resolution, fgColor, lineSpacing, lineHeight, charSpacing])

  useFrame((state) => {
    if (!renderTarget.current || !overlayRef.current || !isMountedRef.current) return

    // If frozen and we already rendered one frame, skip
    if (frozen && hasFrozenFrame.current) return

    const rt = renderTarget.current
    const overlay = overlayRef.current
    const ctx = ctxRef.current
    if (!ctx) return

    const { charToRtX, charToRtY, rtWidth, rtHeight, numCols } = scaleRef.current

    gl.setRenderTarget(rt)
    gl.render(scene, camera)
    gl.setRenderTarget(null)

    const pixels = pixelsRef.current
    if (!pixels) return
    gl.readRenderTargetPixels(rt, 0, 0, rtWidth, rtHeight, pixels)

    ctx.clearRect(0, 0, overlay.width, overlay.height)

    const chars = charsRef.current
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    const maxDistanceSq = 50 * 50

    timeRef.current = state.clock.getElapsedTime()
    const time = timeRef.current

    const globalFlicker = reduced ? 1 : (0.97 + Math.random() * 0.03)
    const baseFlicker = reduced ? 0 : Math.sin(time * 12)
    const scanlineBase = reduced ? 0 : (Math.sin(time * 8) * 0.02 + 0.02)

    const totalLineHeight = lineHeight + lineSpacing
    const baseColor = cachedColorRef.current

    const visibleChars: { char: CharData; scanlineOpacity: number; finalOpacity: number }[] = []

    for (let i = 0; i < chars.length; i++) {
      const charData = chars[i]
      if (!charData) continue

      const col = i % numCols
      const row = Math.floor(i / numCols)

      const rtX = Math.floor(col * charToRtX)
      const rtY = Math.floor(row * charToRtY)

      if (rtX >= 0 && rtX < rtWidth && rtY >= 0 && rtY < rtHeight) {
        const pixelIdx = ((rtHeight - 1 - rtY) * rtWidth + rtX) * 4
        const r = pixels[pixelIdx]
        const g = pixels[pixelIdx + 1]
        const b = pixels[pixelIdx + 2]
        const a = pixels[pixelIdx + 3]

        if (a > 20) {
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255
          charData.opacity = brightness

          const charIndex = Math.floor(brightness * (ASCII_CHARS.length - 1))
          charData.char = ASCII_CHARS[Math.min(charIndex, ASCII_CHARS.length - 1)]
        } else {
          charData.opacity = 0
          charData.char = " "
        }
      } else {
        charData.opacity = 0
        charData.char = " "
      }

      if (charData.opacity < 0.05 || charData.char === " ") continue

      // Skip mouse interactivity in reduced mode
      if (!reduced) {
        const dx = mx - charData.x
        const dy = my - charData.y
        const distSq = dx * dx + dy * dy

        if (distSq < maxDistanceSq) {
          const distance = Math.sqrt(distSq)
          const force = (50 - distance) / 50

          const angle = Math.atan2(dy, dx)
          charData.offsetX -= Math.cos(angle) * force * 4

          const rgb = PALETTE_RGB[charData.activeColorIdx]
          const colorIntensity = Math.max(0.5, force * 0.9)
          charData.currentColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${colorIntensity.toFixed(2)})`
        } else {
          charData.offsetX *= 0.92
          charData.currentColor = baseColor
        }
      }

      const flicker = baseFlicker * 0.03 + Math.sin(charData.flickerPhase) * 0.01
      const finalOpacity = Math.min(1, charData.opacity * globalFlicker * (1 + flicker))

      const scanlineOpacity = 0.1 + Math.sin(time * 3 + row * 0.5) * 0.03 + scanlineBase

      visibleChars.push({
        char: charData,
        scanlineOpacity: scanlineOpacity * charData.opacity,
        finalOpacity: finalOpacity,
      })
    }

    ctx.fillStyle = baseColor
    for (const item of visibleChars) {
      ctx.globalAlpha = item.scanlineOpacity
      ctx.fillRect(
        item.char.x + item.char.offsetX - charSpacing / 2,
        item.char.y - totalLineHeight / 2,
        charSpacing,
        lineHeight
      )
    }

    for (const item of visibleChars) {
      ctx.globalAlpha = item.finalOpacity
      ctx.fillStyle = item.char.currentColor
      ctx.fillText(item.char.char, item.char.x + item.char.offsetX, item.char.y)
    }

    ctx.globalAlpha = 1

    // Skip glitch effect in reduced mode
    if (!reduced && Math.random() > 0.97) {
      const glitchY = Math.random() * overlay.height
      const glitchH = Math.random() * lineHeight * 3
      ctx.globalAlpha = 0.2
      ctx.fillStyle = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      ctx.fillRect(0, glitchY, overlay.width, glitchH)
    }

    ctx.globalAlpha = 1

    // Mark frozen frame as rendered
    if (frozen) {
      hasFrozenFrame.current = true
    }
  }, 1)

  return null
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <directionalLight position={[-3, 4, -2]} intensity={0.5} />
      <pointLight position={[0, 3, 4]} intensity={0.8} color="#ffffff" />
    </>
  )
}

function SceneErrorFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/Foxy-Blink.gif"
        alt="Paper Fox Studio mascot"
        className="w-64 h-64 object-contain opacity-80"
        width={256}
        height={256}
      />
    </div>
  )
}

export function AsciiScene({
  reduced = false,
  tier,
}: {
  reduced?: boolean
  tier?: "high" | "medium" | "low"
} = {}) {
  const { theme } = useTheme()

  // Tier overrides: low → frozen (static frame 1), medium → reduced mode
  const isFrozen = tier === "low"
  const effectiveReduced = reduced || tier === "medium" || tier === "low"
  const fgColor = theme === "dark" ? "#faf9f6" : "#1a1a1a"

  return (
    <div className="w-full h-full relative">
      <ErrorBoundary fallback={<SceneErrorFallback />}>
        <Canvas
          camera={{ position: [0, 1, 5], fov: 35 }}
          gl={{ alpha: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <SceneLighting />
            <Zorrito
              scale={1.8}
              position={[0, -0.2, 0]}
            />
          </Suspense>
          <ScanlineAsciiEffect
            fgColor={fgColor}
            lineSpacing={effectiveReduced ? 2 : 1}
            lineHeight={effectiveReduced ? 3 : 2}
            charSpacing={effectiveReduced ? 12 : 8}
            resolution={effectiveReduced ? 0.12 : 0.18}
            reduced={effectiveReduced}
            frozen={isFrozen}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
