"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface LiquidGlassProps {
    children: React.ReactNode
    className?: string
    glassColor?: string
    darkGlassColor?: string
    glassBgClass?: string
    enable3DEffect?: boolean
    clipContent?: boolean
}

export function LiquidGlass({
    children,
    className,
    glassColor = "rgba(255, 255, 255, 0.25)",
    darkGlassColor = "rgba(0, 0, 0, 0.25)",
    glassBgClass,
    enable3DEffect = true,
    clipContent = true,
}: LiquidGlassProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    // Use state to handle window/client availability safely
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const mouseX = useMotionValue(0.5)
    const mouseY = useMotionValue(0.5)
    const mouseX_abs = useMotionValue(0)
    const mouseY_abs = useMotionValue(0)

    useEffect(() => {
        if (!isMounted) return
        const cardElement = cardRef.current
        if (cardElement) {
            const { width, height } = cardElement.getBoundingClientRect()
            mouseX_abs.set(width / 2)
            mouseY_abs.set(height / 2)
        }
    }, [isMounted, mouseX_abs, mouseY_abs])

    const rotateX = useTransform(mouseY, [0, 1], [15, -15])
    const rotateY = useTransform(mouseX, [0, 1], [-15, 15])

    const displacementScale = useTransform([mouseX, mouseY], ([x, y]: number[]) => {
        // Only apply if 3D effect is enabled
        if (!enable3DEffect) return 10
        const dx = x - 0.5
        const dy = y - 0.5
        const distance = Math.sqrt(dx * dx + dy * dy)
        return 10 + distance * 60
    })

    // We need distinct filter IDs if multiple cards are on screen, 
    // but for simplicity we can use a stable ID or generate one.
    // Using a static ID for the filter definition might cause issues if parameters were dynamic per card,
    // but here the filter structure is static.
    const filterId = "glass-distortion"

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!enable3DEffect) return
        const { clientX, clientY, currentTarget } = event
        const { left, top, width, height } = currentTarget.getBoundingClientRect()

        mouseX_abs.set(clientX - left)
        mouseY_abs.set(clientY - top)
        mouseX.set((clientX - left) / width)
        mouseY.set((clientY - top) / height)
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!enable3DEffect) return
        const { width, height } = event.currentTarget.getBoundingClientRect()
        mouseX.set(0.5)
        mouseY.set(0.5)
        mouseX_abs.set(width / 2)
        mouseY_abs.set(height / 2)
    }

    // Updated to match Navbar style: extremely subtle, almost invisible border, matching background
    const backgroundClasses = glassBgClass
        ? glassBgClass
        : "bg-background/80 dark:bg-background/80 backdrop-blur-md border border-black/5 dark:border-white/5 shadow-sm"

    // Gradient for the highlight effect - made much subtler
    const gradientBackground = useTransform(
        [mouseX_abs, mouseY_abs],
        ([x, y]: number[]) => `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0) 50%)`
    )

    return (
        <>
            <svg style={{ display: "none" }}>
                <filter id={filterId}>
                    <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
                    <motion.feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale={displacementScale}
                    />
                </filter>
            </svg>

            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: enable3DEffect ? rotateX : 0,
                    rotateY: enable3DEffect ? rotateY : 0,
                    transformStyle: "preserve-3d",
                    // @ts-expect-error - Custom CSS variables
                    "--glass-color": glassColor,
                    "--dark-glass-color": darkGlassColor,
                }}
                className={cn(
                    "relative transition-transform duration-200 ease-out",
                    clipContent && "overflow-hidden",
                    className
                )}
            >
                {/* Distortion Layer - Reduced opacity */}
                <div className={`absolute inset-0 z-10 rounded-lg backdrop-blur-[2px] opacity-50`} style={{ filter: `url(#${filterId})` }}></div>

                {/* Background Color Layer */}
                <div className={cn("absolute inset-0 z-20 rounded-lg", backgroundClasses)}></div>

                {/* Highlight Layer */}
                <motion.div
                    className="absolute inset-0 z-30 rounded-lg"
                    style={{
                        background: gradientBackground,
                        opacity: 0.5, // Reduced global opacity of highlight
                    }}
                ></motion.div>

                {/* Content */}
                <div className="relative z-40 h-full">
                    {children}
                </div>
            </motion.div>
        </>
    )
}
