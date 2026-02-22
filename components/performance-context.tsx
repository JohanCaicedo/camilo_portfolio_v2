"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

export type PerformanceTier = "high" | "medium" | "low"

interface PerformanceContextValue {
    tier: PerformanceTier
    setTier: (tier: PerformanceTier) => void
    isAutoDetected: boolean
    resetToAuto: () => void
}

const PerformanceContext = createContext<PerformanceContextValue>({
    tier: "medium",
    setTier: () => { },
    isAutoDetected: true,
    resetToAuto: () => { },
})

const STORAGE_KEY = "pfs-perf-tier"

/**
 * Detect the best performance tier for the current device.
 *
 * Signals (weighted):
 *   - prefers-reduced-motion   → force "low"
 *   - Touch-only device        → cap at "medium"
 *   - navigator.gpu (WebGPU)   → +2 towards "high"
 *   - hardwareConcurrency ≥ 8  → +2, ≥ 4 → +1
 *   - deviceMemory ≥ 8         → +2, ≥ 4 → +1
 *   - WebGL2 support           → +1
 *   - Screen width ≤ 768       → −1 (likely small/mobile)
 */
function detectTier(): PerformanceTier {
    if (typeof window === "undefined") return "medium"

    // Hard override: reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return "low"
    }

    let score = 0

    // WebGPU availability
    if ("gpu" in navigator) {
        score += 2
    }

    // CPU cores
    const cores = navigator.hardwareConcurrency ?? 4
    if (cores >= 8) score += 2
    else if (cores >= 4) score += 1

    // Device memory (Chrome only)
    const mem = (navigator as { deviceMemory?: number }).deviceMemory
    if (mem !== undefined) {
        if (mem >= 8) score += 2
        else if (mem >= 4) score += 1
        else score -= 1
    }

    // WebGL2 support
    try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl2")
        if (gl) score += 1
    } catch {
        // no WebGL2
    }

    // Small screen → likely mobile
    if (window.innerWidth <= 768) {
        score -= 1
    }

    // Touch-only device → cap at medium
    const isTouchOnly =
        window.matchMedia("(pointer: coarse)").matches &&
        window.matchMedia("(hover: none)").matches

    if (isTouchOnly && score > 3) {
        score = 3
    }

    // Thresholds
    if (score >= 5) return "high"
    if (score >= 2) return "medium"
    return "low"
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
    const [tier, setTierState] = useState<PerformanceTier>("medium")
    const [isAutoDetected, setIsAutoDetected] = useState(true)

    // Initialise on mount (client only)
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as PerformanceTier | null

        if (stored && ["high", "medium", "low"].includes(stored)) {
            setTierState(stored)
            setIsAutoDetected(false)
        } else {
            const detected = detectTier()
            setTierState(detected)
            setIsAutoDetected(true)
        }
    }, [])

    const setTier = useCallback((t: PerformanceTier) => {
        setTierState(t)
        setIsAutoDetected(false)
        localStorage.setItem(STORAGE_KEY, t)
    }, [])

    const resetToAuto = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY)
        const detected = detectTier()
        setTierState(detected)
        setIsAutoDetected(true)
    }, [])

    return (
        <PerformanceContext.Provider value={{ tier, setTier, isAutoDetected, resetToAuto }}>
            {children}
        </PerformanceContext.Provider>
    )
}

export function usePerformanceTier() {
    return useContext(PerformanceContext)
}
