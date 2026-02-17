"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { cn } from "@/lib/utils"
import { ViewerCard } from "@/components/ui/viewer-card"

export interface Skill {
    title: string
    imageSrc?: string
    imageAlt?: string
    experienceLevel?: string
    experienceClass?: string
    icon?: string
    bgColor?: string
    darkInvert?: boolean
}

interface SkillCardProps extends Skill { }

function SkillCard({
    title,
    imageSrc,
    imageAlt,
    experienceLevel,
    experienceClass = "text-muted-foreground",
    icon,
    darkInvert,
}: SkillCardProps) {
    return (
        <ViewerCard
            className="h-52 w-44 flex-shrink-0 cursor-grab active:cursor-grabbing mx-2"
            active={false}
        >
            <div className="relative z-50 flex flex-col h-full w-full items-center justify-center py-3 px-2">
                {/* 1. Title — fixed height top zone */}
                <div className="h-10 flex items-center justify-center w-full">
                    <h4
                        className="font-bold text-center text-xs font-mono text-foreground leading-tight uppercase tracking-wider line-clamp-2"
                        style={{ textWrap: "balance" }}
                    >
                        {title}
                    </h4>
                </div>

                {/* 2. Icon — fixed height center zone */}
                <div className="h-16 flex items-center justify-center w-full my-2">
                    <div className="h-12 w-12 flex items-center justify-center transition-transform duration-300 hover:scale-[1.2]">
                        {imageSrc ? (
                            <img
                                src={imageSrc}
                                alt={imageAlt || title}
                                width={48}
                                height={48}
                                loading="lazy"
                                decoding="async"
                                className={cn("h-12 w-12 object-contain pointer-events-none select-none", darkInvert && "dark:invert")}
                            />
                        ) : icon ? (
                            <div
                                className="h-12 w-12 flex items-center justify-center [&>svg]:size-12 [&>svg]:fill-foreground"
                                aria-hidden="true"
                                dangerouslySetInnerHTML={{ __html: icon }}
                            />
                        ) : null}
                    </div>
                </div>

                {/* 3. Experience level — fixed height bottom zone */}
                <div className="h-7 flex items-center justify-center w-full">
                    {experienceLevel ? (
                        <span
                            className={cn(
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase border transition-colors",
                                experienceClass === "text-[#8758f4] font-bold"
                                    ? "bg-[#8758f4]/10 text-[#8758f4] border-[#8758f4]/20 dark:bg-[#8758f4]/15 dark:border-[#8758f4]/30 font-bold"
                                    : "bg-black/5 text-muted-foreground border-black/10 dark:bg-white/5 dark:border-white/10"
                            )}
                        >
                            {experienceLevel}
                        </span>
                    ) : null}
                </div>
            </div>
        </ViewerCard>
    )
}

export function SkillSlider({ skills }: { skills: Skill[] }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    const trackRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)

    const doubledSkills = [...skills, ...skills]

    const animationDuration = skills.length * 2.5

    // Respect prefers-reduced-motion
    useEffect(() => {
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
        setPrefersReducedMotion(mql.matches)
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
        mql.addEventListener("change", handler)
        return () => mql.removeEventListener("change", handler)
    }, [])

    useEffect(() => {
        if (!trackRef.current || prefersReducedMotion) return

        const controls = animate(x, -trackRef.current.scrollWidth / 2, {
            ease: "linear",
            duration: animationDuration < 30 ? 30 : animationDuration,
            repeat: Infinity,
            repeatType: "loop",
        })

        if (isHovered || isDragging) {
            controls.stop()
        } else {
            controls.play()
        }

        return () => controls.stop()
    }, [x, skills.length, animationDuration, isHovered, isDragging, prefersReducedMotion])

    const progress = useTransform(x, (v) => {
        if (!trackRef.current) return 0
        const totalWidth = trackRef.current ? trackRef.current.scrollWidth / 2 : 0
        if (totalWidth === 0) return 0
        return ((v / totalWidth) % 1) * -100
    })

    const [indicatorWidth, setIndicatorWidth] = useState(0)

    useEffect(() => {
        const calculateIndicatorWidth = () => {
            const containerWidth = containerRef.current?.offsetWidth || 0
            const trackWidth = trackRef.current ? trackRef.current.scrollWidth / 2 : 0
            if (trackWidth > 0) {
                setIndicatorWidth((containerWidth / trackWidth) * 100)
            }
        }
        calculateIndicatorWidth()
        window.addEventListener("resize", calculateIndicatorWidth)
        return () => window.removeEventListener("resize", calculateIndicatorWidth)
    }, [skills])

    const scrollbarX = useTransform(progress, (v) => {
        const scrollbarWidth = containerRef.current?.offsetWidth || 0
        const handleWidth = (indicatorWidth / 100) * scrollbarWidth
        return (v / 100) * (scrollbarWidth - handleWidth)
    })

    return (
        <motion.div
            ref={containerRef}
            className="relative"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <motion.div
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                style={{ touchAction: "pan-y" }}
            >
                <motion.div
                    ref={trackRef}
                    className="flex gap-4"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{
                        left: trackRef.current ? -trackRef.current.scrollWidth / 2 : 0,
                        right: 0,
                    }}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                >
                    {doubledSkills.map((skill, index) => (
                        <SkillCard
                            key={`${skill.title}-${index}`}
                            {...skill}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll progress indicator */}
            <motion.div
                className="absolute -bottom-4 left-0 w-full h-1 px-8 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <div className="bg-black/10 dark:bg-white/10 rounded-full h-full w-full relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-brand-blue dark:bg-brand-blue rounded-full"
                        style={{
                            width: `${indicatorWidth}%`,
                            x: scrollbarX,
                        }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}
