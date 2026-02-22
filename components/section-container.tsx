"use client"

import { cn } from "@/lib/utils"
import { m } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"

interface SectionContainerProps extends HTMLMotionProps<"section"> {
    children: React.ReactNode
    className?: string
}

export function SectionContainer({
    children,
    className,
    ...props
}: SectionContainerProps) {
    return (
        <m.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24",
                className
            )}
            {...props}
        >
            {children}
        </m.section>
    )
}
