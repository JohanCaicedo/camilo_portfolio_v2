"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MousePointer2 } from "lucide-react"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import { AnimatedFoxLogo } from "@/components/animated-fox-logo"
import { usePerformanceTier } from "@/components/performance-context"

export function PageLoader() {
    const [phase, setPhase] = useState<"intro" | "split" | "waiting" | "exit">("intro")
    const [done, setDone] = useState(false)
    const { tier } = usePerformanceTier()

    useEffect(() => {
        // Phase 1: Intro — elements fade in (0–1000ms)
        const t1 = setTimeout(() => setPhase("split"), 1000)
        // Phase 2: Split — dimensional layers diverge (1000–1800ms)
        const t2 = setTimeout(() => setPhase("waiting"), 1800)

        // Timeout: Force exit after 30s if no click
        const t3 = setTimeout(() => {
            if (phase !== "exit") handleExit()
        }, 30000)

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [])

    const handleExit = () => {
        if (phase === "exit" || done) return
        setPhase("exit")

        // End everything
        setTimeout(() => {
            setDone(true)
        }, 1000)
    }

    if (done) return null

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col cursor-pointer overflow-hidden text-foreground"
                    style={{ backgroundColor: "#faf9f6" }} // Force opaque color immediately
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    onClick={handleExit}
                >
                    {/* Lock background scrolling while loader is active */}
                    <style>{`
                        body {
                            overflow: hidden;
                            height: 100vh;
                        }
                    `}</style>
                    {/* Dot grid background — all tiers, interactive only on high */}
                    <InteractiveGridPattern interactive={tier === "high"} />

                    {/* Top: Logo + Paper Fox Studio */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center gap-2 pt-6 px-6 sm:pt-8 sm:px-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                            opacity: phase === "exit" ? 0 : 1,
                            y: 0,
                        }}
                        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <AnimatedFoxLogo className="w-10 h-10 sm:w-12 sm:h-12" />
                        <span className="text-sm sm:text-base font-sans font-bold text-muted-foreground tracking-tight">
                            Paper Fox Studio
                        </span>
                    </motion.div>

                    {/* Center: Main content */}
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-32">
                        {/* Small subtitle above */}
                        <motion.p
                            className="text-[10px] sm:text-xs font-mono text-muted-foreground tracking-[0.25em] uppercase mb-4"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: phase === "exit" ? 0 : 1, // Kept dark as requested
                            }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Camilo Caicedo&apos;s Design Portfolio
                        </motion.p>

                        {/* Across Every Dimension — large, centered */}
                        <div className="relative select-none">
                            {/* PRISM LAYER 1: Salmon (Top Left) */}
                            <motion.span
                                className="absolute inset-0 text-brand-salmon/80 font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter whitespace-nowrap will-change-transform"
                                aria-hidden="true"
                                initial={{ opacity: 0, x: 0, y: 0 }}
                                animate={{
                                    opacity: phase === "exit" ? 0 : (phase === "split" || phase === "waiting" ? 0.6 : 0),
                                    x: phase === "exit" ? -60 : (phase === "waiting" ? [-6, -9, -6] : (phase === "split" ? -6 : 0)),
                                    y: phase === "exit" ? -40 : (phase === "waiting" ? [-4, -7, -4] : (phase === "split" ? -4 : 0)),
                                    filter: phase === "exit" ? "blur(4px)" : "blur(0px)",
                                }}
                                transition={{
                                    duration: phase === "waiting" ? 4 : 0.8,
                                    ease: phase === "waiting" ? "easeInOut" : [0.22, 1, 0.36, 1],
                                    repeat: phase === "waiting" ? Infinity : 0
                                }}
                            >
                                Across Every Dimension.
                            </motion.span>

                            {/* PRISM LAYER 2: Blue (Top Right) */}
                            <motion.span
                                className="absolute inset-0 text-brand-blue/80 font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter whitespace-nowrap will-change-transform"
                                aria-hidden="true"
                                initial={{ opacity: 0, x: 0, y: 0 }}
                                animate={{
                                    opacity: phase === "exit" ? 0 : (phase === "split" || phase === "waiting" ? 0.6 : 0),
                                    x: phase === "exit" ? 60 : (phase === "waiting" ? [6, 9, 6] : (phase === "split" ? 6 : 0)),
                                    y: phase === "exit" ? -40 : (phase === "waiting" ? [-4, -7, -4] : (phase === "split" ? 4 : 0)),
                                    filter: phase === "exit" ? "blur(4px)" : "blur(0px)",
                                }}
                                transition={{
                                    duration: phase === "waiting" ? 4 : 0.8,
                                    ease: phase === "waiting" ? "easeInOut" : [0.22, 1, 0.36, 1],
                                    repeat: phase === "waiting" ? Infinity : 0
                                }}
                            >
                                Across Every Dimension.
                            </motion.span>

                            {/* PRISM LAYER 3: Green (Bottom Left) - Appears on exit */}
                            <motion.span
                                className="absolute inset-0 text-brand-green/80 font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter whitespace-nowrap"
                                aria-hidden="true"
                                initial={{ opacity: 0, x: 0, y: 0 }}
                                animate={{
                                    opacity: phase === "exit" ? [0, 0.6, 0] : 0,
                                    x: phase === "exit" ? -60 : 0,
                                    y: phase === "exit" ? 40 : 0,
                                    filter: phase === "exit" ? "blur(4px)" : "blur(0px)",
                                }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                Across Every Dimension.
                            </motion.span>

                            {/* PRISM LAYER 4: Yellow (Bottom Right) - Appears on exit */}
                            <motion.span
                                className="absolute inset-0 text-brand-yellow/80 font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter whitespace-nowrap"
                                aria-hidden="true"
                                initial={{ opacity: 0, x: 0, y: 0 }}
                                animate={{
                                    opacity: phase === "exit" ? [0, 0.6, 0] : 0,
                                    x: phase === "exit" ? 60 : 0,
                                    y: phase === "exit" ? 40 : 0,
                                    filter: phase === "exit" ? "blur(4px)" : "blur(0px)",
                                }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                Across Every Dimension.
                            </motion.span>


                            {/* Main Text (Foreground) */}
                            <motion.span
                                className="relative z-10 font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter whitespace-nowrap text-foreground"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{
                                    opacity: phase === "exit" ? 0 : 1,
                                    y: 0,
                                    scale: phase === "exit" ? 1.05 : 1, // Slight breath
                                    filter: phase === "exit" ? "blur(8px)" : "blur(0px)",
                                }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                Across Every Dimension.
                            </motion.span>
                        </div>

                        {/* Click to continue - appears last */}
                        <AnimatePresence>
                            {phase === "waiting" && (
                                <motion.div
                                    className="absolute bottom-20 flex flex-col items-center gap-3"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="relative">
                                        <MousePointer2 className="w-5 h-5 text-muted-foreground animate-bounce" strokeWidth={1.5} />
                                        <motion.div
                                            className="absolute -top-1 -right-1 w-2 h-2 bg-brand-salmon rounded-full"
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-mono text-muted-foreground/60 tracking-[0.2em] uppercase animate-pulse">
                                        Click to continue
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
