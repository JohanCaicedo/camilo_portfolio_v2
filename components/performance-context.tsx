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
    if (typeof window === "undefined") return "high"

    // Hard override: reduced motion preference -> Lite mode
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return "low"
    }

    const cores = navigator.hardwareConcurrency ?? 4
    const mem = (navigator as { deviceMemory?: number }).deviceMemory

    // Very weak devices (<= 2 cores or <= 2GB RAM) -> Lite mode
    if (cores <= 2 || (mem !== undefined && mem <= 2)) {
        return "low"
    }

    const isTouchOnly =
        window.matchMedia("(pointer: coarse)").matches &&
        window.matchMedia("(hover: none)").matches

    // Mid-range mobile/tablets (<= 4 cores or <= 4GB RAM + touch) -> Balanced mode
    if (isTouchOnly && (cores <= 4 || (mem !== undefined && mem <= 4))) {
        return "medium"
    }

    // Default to Ultra for everything else (modern desktops, phones, tablets)
    return "high"
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
    const [tier, setTierState] = useState<PerformanceTier>("high")
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
