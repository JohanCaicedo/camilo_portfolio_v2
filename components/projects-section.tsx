"use client"

import { motion } from "framer-motion"
import { FolderGit2, ImageIcon } from "lucide-react"
import { ViewerCard } from "@/components/ui/viewer-card"
import { SectionContainer } from "@/components/section-container"
import { useState } from "react"

const projects = [
    {
        id: "01",
        title: "Web Design",
        tech: "REACT / NEXT.JS / TAILWIND",
        img: "/WebDesign-Cover.webp",
        link: "/web-design",
        desktopCol: "lg:col-span-2",
        aspect: "aspect-[4/3] sm:aspect-square",
    },
    {
        id: "02",
        title: "Graphic Design",
        tech: "ADOBE SUITE / FIGMA",
        img: "/GraphicDesign-Cover.webp",
        link: "/graphic-design",
        desktopCol: "lg:col-span-2 lg:col-start-3",
        aspect: "aspect-[4/3] sm:aspect-square",
    },
    {
        id: "03",
        title: "Personal",
        tech: "EXPERIMENTAL / ART",
        img: "/Foxy-Blink.gif",
        link: "/personal",
        desktopCol: "lg:col-span-2 lg:col-start-5",
        aspect: "aspect-[4/3] sm:aspect-square",
    },
    {
        id: "04",
        title: "Editorial Design",
        tech: "INDESIGN / TYPOGRAPHY",
        img: "/EditorialDesign-Cover.webp",
        link: "/editorial-design",
        desktopCol: "lg:col-span-3 lg:row-start-2",
        aspect: "aspect-[16/10]",
    },
    {
        id: "05",
        title: "Photography",
        tech: "DIRECTION / RETOUCHING",
        img: "/Photography-Cover.webp",
        link: "/photography",
        desktopCol: "lg:col-span-3 lg:col-start-4 lg:row-start-2",
        aspect: "aspect-[16/10]",
    },
]

export function ProjectsSection() {
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

    return (
        <SectionContainer id="projects" className="snap-section scroll-mt-24 py-10 md:py-12">
            {/* Header */}
            <div className="mt-4 mb-5 flex items-center gap-3 sm:mb-7 sm:gap-4">
                <motion.div
                    className="rounded-sm border border-black/10 bg-black/5 p-2 sm:p-2.5 dark:border-white/10 dark:bg-white/5"
                    animate={{
                        rotate: [0, -2.5, 2, 0],
                        x: [0, 1.2, 0, -0.8, 0],
                    }}
                    whileHover={{ rotate: -4, x: 2, scale: 1.06 }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FolderGit2 className="text-brand-salmon size-4 sm:size-5" strokeWidth={1.5} />
                </motion.div>
                <div>
                    <h3 className="text-foreground text-xl leading-none font-bold tracking-tight sm:text-2xl md:text-3xl">
                        SELECTED_PROJECTS
                    </h3>
                    <p className="text-brand-salmon mt-1 font-mono text-[9px] tracking-widest uppercase sm:text-[10px]">
                        // DATABASE_ACCESS_GRANTED
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
                {projects.map((project) => (
                    <motion.a
                        key={project.id}
                        href={project.link}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`${project.desktopCol} focus-visible:ring-brand-blue focus-visible:ring-offset-background relative block outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                    >
                        <ViewerCard
                            className="flex h-full w-full flex-col"
                            label={`PRJ_${project.id}`}
                        >
                            <div className="relative z-10 flex h-full min-h-0 flex-col">
                                {/* Technical Header */}
                                <div className="mb-2 flex flex-shrink-0 items-start justify-between border-b border-black/5 pb-2 sm:mb-3 sm:pb-3 dark:border-white/5">
                                    <h3 className="text-foreground text-lg font-bold tracking-tight sm:text-xl">
                                        {project.title}
                                    </h3>
                                    <div className="bg-brand-blue/10 px-1.5 py-0.5">
                                        <span className="text-brand-blue font-mono text-[8px] tracking-wider uppercase sm:text-[9px]">
                                            VIEW_DATA
                                        </span>
                                    </div>
                                </div>

                                {/* Image Container with responsive aspect ratio */}
                                <div className={`group relative overflow-hidden border border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5 ${project.aspect}`}>
                                    {project.img && !imageErrors[project.id] && (
                                        <img
                                            src={project.img}
                                            alt={project.title}
                                            loading="lazy"
                                            className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale transition-all duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0"
                                            onError={() => {
                                                console.error(`Failed to load image: ${project.title}`, project.img)
                                                setImageErrors((prev) => ({ ...prev, [project.id]: true }))
                                            }}
                                        />
                                    )}

                                    {/* Fallback */}
                                    {imageErrors[project.id] && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/5 dark:bg-white/5">
                                            <ImageIcon className="text-muted-foreground/40 size-8" strokeWidth={1.5} />
                                            <span className="text-muted-foreground/50 font-mono text-[10px] tracking-wider uppercase">
                                                Image unavailable
                                            </span>
                                        </div>
                                    )}

                                    {/* Scanline overlay */}
                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                                </div>

                                {/* Tech Stack Footer */}
                                <div className="mt-2 flex flex-shrink-0 items-center gap-2 border-t border-black/5 pt-1.5 sm:mt-3 sm:pt-2 dark:border-white/5">
                                    <span className="bg-brand-green h-1.5 w-1.5 animate-pulse rounded-full" />
                                    <span className="text-muted-foreground font-mono text-[9px] tracking-wide uppercase sm:text-[10px]">
                                        {project.tech}
                                    </span>
                                </div>
                            </div>
                        </ViewerCard>
                    </motion.a>
                ))}
            </div>
        </SectionContainer>
    )
}
