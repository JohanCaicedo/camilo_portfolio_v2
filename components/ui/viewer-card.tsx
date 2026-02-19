"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ViewerCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    label?: string
    className?: string
    active?: boolean
}

export function ViewerCard({
    children,
    label,
    className,
    active = false,
    ...props
}: ViewerCardProps) {
    return (
        <div
            className={cn(
                "relative group border border-black/10 dark:border-white/10 bg-background/90 dark:bg-background/90 backdrop-blur-sm transition-all duration-300",
                active && "border-brand-blue/50 dark:border-brand-blue/50",
                className
            )}
            {...props}
        >
            {/* Technical Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black/20 dark:border-white/20 group-hover:border-brand-blue transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-black/20 dark:border-white/20 group-hover:border-brand-blue transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-black/20 dark:border-white/20 group-hover:border-brand-blue transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black/20 dark:border-white/20 group-hover:border-brand-blue transition-colors" />

            {/* Optional Data Label (HUD style) */}
            {label && (
                <div className="absolute -top-3 left-4 bg-background dark:bg-background px-2 text-[10px] font-mono text-brand-blue tracking-widest uppercase border border-black/5 dark:border-white/5">
                    {label}
                </div>
            )}

            {/* Scanline / Hover Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none bg-gradient-to-b from-transparent via-brand-blue to-transparent bg-[length:100%_4px] transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10 h-full p-4">
                {children}
            </div>
        </div>
    )
}
