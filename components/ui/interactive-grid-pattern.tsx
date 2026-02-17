"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

// Color palette from the original portfolio
const PALETTE = [
    "#eea284", // salmon
    "#bbc9d8", // blue
    "#f7df91", // yellow
    "#c4debc", // green
    "#f2d3c5", // pink
    "#6a5deb", // purple
]

// Fix #9: Pre-compute palette RGB values at module level
const PALETTE_RGB: [number, number, number][] = PALETTE.map((hex) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
])

interface InteractiveGridPatternProps {
    gap?: number
}

export function InteractiveGridPattern({
    gap = 20,
}: InteractiveGridPatternProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let mouseX = -1000
        let mouseY = -1000

        interface DotData {
            x: number
            y: number
            originX: number
            originY: number
            size: number
            baseColor: string
            activeColorIdx: number // Fix #9: index into PALETTE_RGB
            currentColor: string
            currentOpacity: number
            targetOpacity: number
        }

        let dots: DotData[] = []

        const initDots = () => {
            dots = []
            const baseColor = theme === "dark" ? "255, 255, 255" : "26, 26, 26"

            const rows = Math.ceil(canvas.height / gap)
            const cols = Math.ceil(canvas.width / gap)

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: i * gap + gap / 2,
                        y: j * gap + gap / 2,
                        originX: i * gap + gap / 2,
                        originY: j * gap + gap / 2,
                        size: 1.5,
                        baseColor: `rgba(${baseColor}, 0.08)`, // Barely visible
                        activeColorIdx: Math.floor(Math.random() * PALETTE_RGB.length), // Fix #9
                        currentColor: `rgba(${baseColor}, 0.08)`,
                        currentOpacity: 0.08,
                        targetOpacity: 0.08,
                    })
                }
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initDots()
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (const dot of dots) {
                const dx = mouseX - dot.x
                const dy = mouseY - dot.y
                const distSq = dx * dx + dy * dy
                const maxDistance = 120
                const maxDistSq = maxDistance * maxDistance

                if (distSq < maxDistSq) {
                    const distance = Math.sqrt(distSq)
                    // Repulsion
                    const force = (maxDistance - distance) / maxDistance
                    const angle = Math.atan2(dy, dx)
                    dot.x -= Math.cos(angle) * force * 30
                    dot.y -= Math.sin(angle) * force * 30

                    // Fix #9: Use pre-computed RGB, minimal string build
                    const intensity = Math.max(0.3, force)
                    const rgb = PALETTE_RGB[dot.activeColorIdx]
                    dot.currentColor = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${(intensity * 0.8).toFixed(2)})`
                } else {
                    // Return to origin
                    dot.x += (dot.originX - dot.x) * 0.08
                    dot.y += (dot.originY - dot.y) * 0.08

                    // Fade back to base color
                    dot.currentColor = dot.baseColor
                }

                // Draw
                ctx.beginPath()
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
                ctx.fillStyle = dot.currentColor
                ctx.fill()
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        // Fix #10: Canvas is fixed inset-0, so clientX/clientY are already correct
        // No need for getBoundingClientRect()
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const handleMouseLeave = () => {
            mouseX = -1000
            mouseY = -1000
        }

        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseleave", handleMouseLeave)

        resize()
        animate()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseleave", handleMouseLeave)
            cancelAnimationFrame(animationFrameId)
        }
    }, [gap, theme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%", zIndex: 1 }}
        />
    )
}
