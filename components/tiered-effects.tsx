"use client"

import { usePerformanceTier } from "@/components/performance-context"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import { AtomCursor } from "@/components/atom-cursor"

/**
 * Conditionally renders heavy visual effects based on the current performance tier.
 * - High:   Interactive dot grid + custom atom cursor
 * - Medium: Static dot grid (no mouse interaction) — no cursor
 * - Low:    Nothing
 */
export function TieredEffects() {
    const { tier } = usePerformanceTier()

    return (
        <>
            <InteractiveGridPattern interactive={tier === "high"} />
            {tier === "high" && <AtomCursor />}
        </>
    )
}
