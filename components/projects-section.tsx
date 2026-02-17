"use client"

import { motion } from "framer-motion"
import { FolderGit2 } from "lucide-react"
import { ViewerCard } from "@/components/ui/viewer-card"
import { SectionContainer } from "@/components/section-container"

const projects = [
    {
        id: "01",
        title: "Web Design",
        tech: "REACT / NEXT.JS / TAILWIND",
        img: "https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Dise%C3%B1oWeb.webp?alt=media&token=7df9723e-ef97-4bac-823d-e3ccd377f45b",
        link: "/web-design",
        desktopCol: "lg:col-span-2",
    },
    {
        id: "02",
        title: "Graphic Design",
        tech: "ADOBE SUITE / FIGMA",
        img: "https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Dise%C3%B1o%20Grafico%20(2).webp?alt=media&token=4526b817-ecb5-4fb2-8317-f4ffda77d235",
        link: "/graphic-design",
        desktopCol: "lg:col-span-2 lg:col-start-3",
    },
    {
        id: "03",
        title: "Personal",
        tech: "EXPERIMENTAL / ART",
        img: "https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Foxy-Blink.gif?alt=media&token=6fdef4b7-2f2f-4fbd-94a0-65a59868bfee",
        link: "/personal",
        desktopCol: "lg:col-span-2 lg:col-start-5",
    },
    {
        id: "04",
        title: "Editorial Design",
        tech: "INDESIGN / TYPOGRAPHY",
        img: "https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Editorial%20Design%20Image.webp?alt=media&token=aabfa3b4-9eb3-452b-b0d2-bb66de2456ea",
        link: "/editorial-design",
        desktopCol: "lg:col-span-3 lg:row-start-2",
    },
    {
        id: "05",
        title: "Photography",
        tech: "DIRECTION / RETOUCHING",
        img: "https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Photography%20Image.webp?alt=media&token=2f3bcee6-0ff5-4a1c-8ec4-4944542b2c4b",
        link: "/photography",
        desktopCol: "lg:col-span-3 lg:col-start-4 lg:row-start-2",
    },
]

export function ProjectsSection() {
    return (
        <SectionContainer id="projects" className="snap-section scroll-mt-24 py-10 md:py-12">
            {/* Header - Technical / Monospace Accent */}
            <div className="flex items-center gap-4 mb-7 mt-4">
                <motion.div
                    className="p-2.5 border border-black/10 dark:border-white/10 rounded-sm bg-black/5 dark:bg-white/5"
                    animate={{
                        rotate: [0, -2.5, 2, 0],
                        x: [0, 1.2, 0, -0.8, 0],
                    }}
                    whileHover={{ rotate: -4, x: 2, scale: 1.06 }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FolderGit2 className="size-5 text-brand-salmon" strokeWidth={1.5} />
                </motion.div>
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground dark:text-foreground tracking-tight leading-none">
                        SELECTED_PROJECTS
                    </h3>
                    <p className="text-[10px] font-mono text-brand-salmon mt-1 tracking-widest uppercase">
                        // DATABASE_ACCESS_GRANTED
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 gap-4">
                {projects.map((project) => (
                    <motion.a
                        key={project.id}
                        href={project.link}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`
                            ${project.desktopCol}
                            block h-[220px] sm:h-[260px] lg:h-auto
                            relative outline-none 
                            focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background
                        `}
                    >
                        <ViewerCard
                            className="h-full w-full flex flex-col justify-between"
                            label={`PRJ_${project.id}`}
                        >
                            <div className="flex flex-col h-full relative z-10">
                                {/* Technical Header */}
                                <div className="flex justify-between items-start mb-3 border-b border-black/5 dark:border-white/5 pb-3">
                                    <h3 className="font-bold text-xl text-foreground dark:text-foreground tracking-tight">
                                        {project.title}
                                    </h3>
                                    <div className="bg-brand-blue/10 px-1.5 py-0.5">
                                        <span className="text-[9px] font-mono text-brand-blue uppercase tracking-wider">
                                            VIEW_DATA
                                        </span>
                                    </div>
                                </div>

                                {/* Image Container (Tech look) */}
                                <div className="relative flex-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 overflow-hidden group">
                                    {project.img && (
                                        <img
                                            loading="lazy"
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out opacity-80 group-hover:opacity-100"
                                            src={project.img}
                                            alt={project.title}
                                        />
                                    )}
                                    {/* Scanline overlay on image */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
                                </div>

                                {/* Tech Stack Footer */}
                                <div className="mt-3 pt-2 border-t border-black/5 dark:border-white/5 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                                    <span className="text-[10px] font-mono text-muted-foreground dark:text-muted-foreground uppercase tracking-wide">
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
