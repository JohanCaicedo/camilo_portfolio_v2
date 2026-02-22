"use client"

import { useEffect, useRef } from "react"

// Pre-allocated electron config (Fix #7: no per-frame object creation)
const ELECTRON_CONFIGS = [
    { angleOffset: 0, color: "rgba(135, 88, 244, 0.9)", colorBase: [135, 88, 244] as const },
    { angleOffset: Math.PI, color: "rgba(238, 162, 132, 0.9)", colorBase: [238, 162, 132] as const },
] as const

/**
 * Custom atom cursor: a central nucleus dot with 2 orbiting electrons.
 * Grows and changes color when hovering over interactive elements.
 *
 * Performance optimizations:
 * - getComputedStyle only called when target element changes (cached)
 * - Electron config defined as module-level constants
 * - Trail positions use pre-allocated ring buffer
 * - Interactive element check uses tag/closest instead of getComputedStyle when possible
 */
export function AtomCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: -100, y: -100 })
    const animRef = useRef<number>(0)
    const visibleRef = useRef(false)
    const isHoveringInteractive = useRef(false)
    const isTouchDevice = useRef(false)
    const currentScale = useRef(1)
    const clickScale = useRef(1)

    useEffect(() => {
        // Detect touch device more precisely
        // Only disable on true touch devices (coarse pointer AND no hover capability)
        const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
        const hasNoHover = window.matchMedia('(hover: none)').matches
        const isTouch = hasCoarsePointer && hasNoHover
        isTouchDevice.current = isTouch

        // Don't initialize on touch devices
        if (isTouchDevice.current) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Sizing — account for devicePixelRatio to avoid pixelation on zoom
        let dpr = 1
        const resize = () => {
            dpr = window.devicePixelRatio || 1
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            canvas.style.width = `${window.innerWidth}px`
            canvas.style.height = `${window.innerHeight}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        resize()
        window.addEventListener("resize", resize)

        // Fix #6: Cache last checked element to avoid repeated getComputedStyle
        let lastTarget: Element | null = null
        let lastTargetResult = false

        // Check if element under cursor is interactive
        const isInteractive = (el: Element | null): boolean => {
            if (!el) return false

            // Cache: same element as last check
            if (el === lastTarget) return lastTargetResult

            lastTarget = el

            // Fast path: check tag name (no style recalc needed)
            const tag = el.tagName.toLowerCase()
            if (tag === "a" || tag === "button" || tag === "input" || tag === "textarea" || tag === "select") {
                lastTargetResult = true
                return true
            }
            if (el.getAttribute("role") === "button") {
                lastTargetResult = true
                return true
            }

            // Check ancestors via closest (faster than manual parent walk + getComputedStyle)
            if (el.closest("a, button, [role='button']")) {
                lastTargetResult = true
                return true
            }

            // Only call getComputedStyle as last resort (Fix #6)
            const computed = window.getComputedStyle(el)
            lastTargetResult = computed.cursor === "pointer"
            return lastTargetResult
        }

        // Track mouse
        const handleMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX
            mouseRef.current.y = e.clientY
            visibleRef.current = true
            isHoveringInteractive.current = isInteractive(e.target as Element)
        }

        const handleLeave = () => {
            visibleRef.current = false
        }

        const handleEnter = () => {
            visibleRef.current = true
        }

        document.addEventListener("mousemove", handleMove)
        document.addEventListener("mouseleave", handleLeave)
        document.addEventListener("mouseenter", handleEnter)

        // Click grow/retract
        const handleMouseDown = () => {
            clickScale.current = 2.0 // instant target
        }
        const handleMouseUp = () => {
            clickScale.current = 1.0 // spring back
        }
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)

        // Base sizes
        const NUCLEUS_RADIUS = 8
        const ORBIT_RADIUS = 20
        const ELECTRON_RADIUS = 2.5
        const ORBIT_SPEED = 2.5
        const TRAIL_LENGTH = 8

        // Hover grow amount
        const HOVER_SCALE = 1.5

        // Colors
        const NUCLEUS_DEFAULT = "#B8CAD9"
        const NUCLEUS_HOVER = "#F28D77"

        // Fix #8: Pre-allocate trail ring buffers with fixed-size arrays
        const trailBuffers = ELECTRON_CONFIGS.map(() => ({
            xs: new Float32Array(TRAIL_LENGTH),
            ys: new Float32Array(TRAIL_LENGTH),
            head: 0,
            count: 0,
        }))

        const animate = (time: number) => {
            ctx.save()
            ctx.setTransform(1, 0, 0, 1, 0, 0) // reset to clear the full buffer
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.restore() // re-apply DPR scaling

            if (!visibleRef.current) {
                animRef.current = requestAnimationFrame(animate)
                return
            }

            const mx = mouseRef.current.x
            const my = mouseRef.current.y
            const t = time / 1000

            // Smooth scale transition (hover)
            const targetScale = isHoveringInteractive.current ? HOVER_SCALE : 1
            currentScale.current += (targetScale - currentScale.current) * 0.15

            // Click grow/retract (fast burst, slow elegant decay)
            const currentClickScale = clickScale.current
            const smoothClick = 1 + (currentClickScale - 1) * 0.4 // fast initial burst
            clickScale.current = 1 + (currentClickScale - 1) * 0.92 // slow elegant retraction

            const s = currentScale.current * smoothClick
            const nucleusR = NUCLEUS_RADIUS * s
            const orbitR = ORBIT_RADIUS * s
            const electronR = ELECTRON_RADIUS * s

            // Nucleus color
            const nucleusColor = isHoveringInteractive.current ? NUCLEUS_HOVER : NUCLEUS_DEFAULT

            // --- Draw orbit ring (subtle) ---
            ctx.beginPath()
            ctx.arc(mx, my, orbitR, 0, Math.PI * 2)
            ctx.strokeStyle = "rgba(135, 88, 244, 0.12)"
            ctx.lineWidth = 1
            ctx.stroke()

            // --- Draw electrons with trails ---
            for (let i = 0; i < ELECTRON_CONFIGS.length; i++) {
                const config = ELECTRON_CONFIGS[i]
                const angle = t * ORBIT_SPEED + config.angleOffset
                const ex = mx + Math.cos(angle) * orbitR
                const ey = my + Math.sin(angle) * orbitR

                // Fix #8: Ring buffer for trail
                const trail = trailBuffers[i]
                trail.xs[trail.head] = ex
                trail.ys[trail.head] = ey
                trail.head = (trail.head + 1) % TRAIL_LENGTH
                if (trail.count < TRAIL_LENGTH) trail.count++

                // Draw trail (fading dots)
                const [cr, cg, cb] = config.colorBase
                for (let j = 0; j < trail.count; j++) {
                    const idx = (trail.head - trail.count + j + TRAIL_LENGTH) % TRAIL_LENGTH
                    const alpha = ((j + 1) / trail.count) * 0.4
                    const size = ((j + 1) / trail.count) * electronR
                    ctx.beginPath()
                    ctx.arc(trail.xs[idx], trail.ys[idx], size, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(2)})`
                    ctx.fill()
                }

                // Draw electron
                ctx.beginPath()
                ctx.arc(ex, ey, electronR, 0, Math.PI * 2)
                ctx.fillStyle = config.color
                ctx.fill()
            }

            // --- Draw nucleus (center dot) ---
            ctx.beginPath()
            ctx.arc(mx, my, nucleusR, 0, Math.PI * 2)
            ctx.fillStyle = nucleusColor
            ctx.fill()

            animRef.current = requestAnimationFrame(animate)
        }

        animRef.current = requestAnimationFrame(animate)

        // Hide default cursor globally (including pointer on interactive elements)
        const style = document.createElement("style")
        style.id = "atom-cursor-style"
        style.textContent = "*, *::before, *::after { cursor: none !important; }"
        document.head.appendChild(style)

        return () => {
            cancelAnimationFrame(animRef.current)
            window.removeEventListener("resize", resize)
            document.removeEventListener("mousemove", handleMove)
            document.removeEventListener("mouseleave", handleLeave)
            document.removeEventListener("mouseenter", handleEnter)
            document.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mouseup", handleMouseUp)
            style.remove()
        }
    }, [])

    // Don't render on touch devices
    if (isTouchDevice.current) {
        return null
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
            aria-hidden="true"
        />
    )
}
