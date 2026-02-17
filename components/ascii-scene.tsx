"use client"

import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Model as Zorrito } from "./NewZorrito-Web"
import { Suspense, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

// Color palette — same as interactive-grid-pattern
const PALETTE = [
  "#eea284", // salmon
  "#bbc9d8", // blue
  "#f7df91", // yellow
  "#c4debc", // green
  "#f2d3c5", // pink
  "#6a5deb", // purple
]

const ASCII_CHARS = " .,:;|~-=+*#@"

// Pre-compute palette RGB values at module level (Fix #4)
const PALETTE_RGB: [number, number, number][] = PALETTE.map((hex) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
])

// Character data for interactive displacement
interface CharData {
  x: number
  y: number
  originX: number
  originY: number
  char: string
  baseColor: string
  activeColorIdx: number // Index into PALETTE_RGB instead of string
  currentColor: string
}

/**
 * Custom ASCII effect that renders inside the R3F Canvas.
 * It reads the 3D scene into a render target, converts to ASCII characters,
 * and draws them on a 2D overlay canvas with interactive scatter near the cursor.
 *
 * Performance optimizations:
 * - Uint8Array allocated once and reused (not per-frame)
 * - 2D context cached in ref
 * - Font set once on resize, not per-frame
 * - Palette RGB values pre-computed at module level
 * - Color strings built with minimal allocations
 */
function InteractiveAsciiEffect({
  fgColor,
  characters = ASCII_CHARS,
  resolution = 0.2,
}: {
  fgColor: string
  characters?: string
  resolution?: number
}) {
  const { gl, scene, camera, size } = useThree()
  const overlayRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null) // Fix #2: cache ctx
  const renderTarget = useRef<THREE.WebGLRenderTarget | null>(null)
  const pixelsRef = useRef<Uint8Array | null>(null) // Fix #1: reusable pixel buffer
  const charsRef = useRef<CharData[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const isMountedRef = useRef(true)
  const fontCachedRef = useRef("") // Fix #3: track font to avoid re-setting

  // Create overlay canvas + render target
  useEffect(() => {
    isMountedRef.current = true

    // Create overlay canvas
    const overlay = document.createElement("canvas")
    overlay.style.position = "absolute"
    overlay.style.top = "0"
    overlay.style.left = "0"
    overlay.style.width = "100%"
    overlay.style.height = "100%"
    overlay.style.pointerEvents = "none"
    overlay.style.zIndex = "10"

    // Insert overlay next to the Three.js canvas
    const parent = gl.domElement.parentElement
    if (parent) {
      parent.style.position = "relative"
      parent.appendChild(overlay)
    }
    overlayRef.current = overlay

    // Cache the 2D context once (Fix #2)
    ctxRef.current = overlay.getContext("2d")

    // Listen for mouse on the parent container (not just the canvas)
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

  // Handle resize — recreate render target and char grid
  useEffect(() => {
    if (!size.width || !size.height) return

    const w = Math.floor(size.width * resolution)
    const h = Math.floor(size.height * resolution)

    if (renderTarget.current) renderTarget.current.dispose()
    renderTarget.current = new THREE.WebGLRenderTarget(w, h)

    // Fix #1: Allocate pixel buffer once per resize, reused every frame
    pixelsRef.current = new Uint8Array(w * h * 4)

    // Update overlay canvas size
    if (overlayRef.current) {
      overlayRef.current.width = size.width
      overlayRef.current.height = size.height
    }

    // Fix #3: Set font once on resize
    const cellW = size.width / w
    const cellH = size.height / h
    const fontSize = Math.max(cellW, cellH) * 1.1
    const font = `bold ${fontSize}px monospace`
    fontCachedRef.current = font

    if (ctxRef.current) {
      ctxRef.current.font = font
      ctxRef.current.textAlign = "center"
      ctxRef.current.textBaseline = "middle"
    }

    // Initialize char grid
    const newChars: CharData[] = []

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        newChars.push({
          x: x * cellW + cellW / 2,
          y: y * cellH + cellH / 2,
          originX: x * cellW + cellW / 2,
          originY: y * cellH + cellH / 2,
          char: " ",
          baseColor: fgColor,
          activeColorIdx: Math.floor(Math.random() * PALETTE_RGB.length), // Fix #4: index not string
          currentColor: fgColor,
        })
      }
    }
    charsRef.current = newChars
  }, [size.width, size.height, resolution, fgColor])

  // Main render loop
  useFrame(() => {
    if (!renderTarget.current || !overlayRef.current || !isMountedRef.current) return

    const rt = renderTarget.current
    const overlay = overlayRef.current
    const ctx = ctxRef.current // Fix #2: use cached ctx
    if (!ctx) return

    const w = rt.width
    const h = rt.height

    // Render scene to offscreen target
    gl.setRenderTarget(rt)
    gl.render(scene, camera)
    gl.setRenderTarget(null)

    // Fix #1: Reuse pre-allocated pixel buffer
    const pixels = pixelsRef.current
    if (!pixels) return
    gl.readRenderTargetPixels(rt, 0, 0, w, h, pixels)

    // Clear overlay
    ctx.clearRect(0, 0, overlay.width, overlay.height)

    const cellW = overlay.width / w
    const cellH = overlay.height / h

    const chars = charsRef.current
    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    const maxDistance = 50
    const repelForce = 3
    const charsLen = characters.length - 1

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const charIdx = y * w + x
        const charData = chars[charIdx]
        if (!charData) continue

        // Sample pixel (flip Y — WebGL is bottom-up)
        const pixelIdx = ((h - 1 - y) * w + x) * 4
        const r = pixels[pixelIdx]
        const g = pixels[pixelIdx + 1]
        const b = pixels[pixelIdx + 2]
        const a = pixels[pixelIdx + 3]

        // Brightness
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255

        // Map brightness to character
        const charIndex = Math.floor(brightness * charsLen)
        charData.char = characters[charIndex]

        // Skip empty/transparent chars
        if (a < 10 || charData.char === " ") {
          // Still return to origin smoothly
          charData.x += (charData.originX - charData.x) * 0.08
          charData.y += (charData.originY - charData.y) * 0.08
          charData.currentColor = fgColor
          continue
        }

        // --- Interactive scatter (same logic as background dots) ---
        const dx = mx - charData.x
        const dy = my - charData.y
        const distSq = dx * dx + dy * dy // Avoid sqrt when possible

        if (distSq < maxDistance * maxDistance) {
          const distance = Math.sqrt(distSq)
          // Repulsion
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          charData.x -= Math.cos(angle) * force * repelForce
          charData.y -= Math.sin(angle) * force * repelForce

          // Fix #4 & #5: Use pre-computed RGB, minimal string build
          const intensity = Math.max(0.3, force)
          const rgb = PALETTE_RGB[charData.activeColorIdx]
          charData.currentColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(intensity * 0.9).toFixed(2)})`
        } else {
          // Return to origin
          charData.x += (charData.originX - charData.x) * 0.08
          charData.y += (charData.originY - charData.y) * 0.08

          // Fade back to base color
          charData.currentColor = fgColor
        }

        // Draw character
        ctx.fillStyle = charData.currentColor
        ctx.fillText(charData.char, charData.x, charData.y)
      }
    }
  }, 1) // Priority 1 = runs after scene render

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

export function AsciiScene() {
  const { theme } = useTheme()

  // Theme-aware colors
  const fgColor = theme === "dark" ? "#faf9f6" : "#1a1a1a"

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 35 }}
        gl={{ alpha: true }} // Fix #12: removed preserveDrawingBuffer
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneLighting />
          <Zorrito
            scale={1.8}
            position={[0, -0.2, 0]}
          />
        </Suspense>
        <InteractiveAsciiEffect
          fgColor={fgColor}
          characters={ASCII_CHARS}
          resolution={0.18}
        />
      </Canvas>
    </div>
  )
}