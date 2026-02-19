"use client"

import { useState } from "react"
import { AnimatePresence, m } from "framer-motion"
import { ChevronDown, TerminalSquare } from "lucide-react"
import { SectionContainer } from "@/components/section-container"
import { ViewerCard } from "@/components/ui/viewer-card"

const EXPERIENCE_DATA = [
    {
        date: "Jan. 2026 – Present",
        title: "Visual Strategy & Digital Communications Lead",
        company: "ILSA",
        description: "Directing the 2026 digital transformation and communication master plan. I lead the transition to a headless architecture using Astro and WordPress, optimizing site performance and UX. My role involves orchestrating institutional narratives through high-level editorial design, audiovisual production, and strategic ecosystem management.",
    },
    {
        date: "Jan 2025 – Sep 2025",
        title: "Graphic Designer",
        company: "PIPE TORO SAS",
        description: "Conceptualized and executed strategic visual solutions for corporate clients like Fogafín and Reprotec. I spearheaded the UI/UX redesign for Reprotec, focusing on brand consistency and conversion-driven design, while managing complex brand architectures across digital and print assets.",
    },
    {
        date: "May 2023 – Jul. 2023",
        title: "Full-Stack Web Designer (Freelance)",
        company: "Independent",
        description: "Delivered tailor-made digital solutions using WordPress and modern frameworks. I focused on translating business goals into high-performance websites, optimizing technical SEO and visual storytelling to establish a competitive edge for niche professional brands.",
    },
    {
        date: "Aug. 2020 – Dec. 2025",
        title: "Visual Strategy & Digital Environments Specialist",
        company: "ILSA",
        description: "Managed the institute's global visual identity and digital presence. I scaled organic web traffic to 15,000 monthly visitors through SEO-driven design and led the production of complex digital archives, establishing a cohesive and distinctive brand image for the organization.",
    },
    {
        date: "Jul. 2022 – Oct. 2022",
        title: "Creative Content Producer",
        company: "Renta Fácil",
        description: "Managed end-to-back audiovisual production, creating high-engagement video content and corporate photography designed for social media growth and brand storytelling.",
        link: "#",
    },
    {
        date: "Jul. 2020 – Nov. 2020",
        title: "Multimedia Designer & Photographer",
        company: "Aire libre y aventura",
        description: "Key member of the Kuerfit creative team. Produced the 'Strength Training' digital course, managing video editing and promotional UI assets. Directed photographic coverage for major athletic events like 'Corre Chicaque'.",
    },
]

export function ExperienceSection() {
    const [showAll, setShowAll] = useState(false)
    const initialItemsToShow = 3 // Aumentado a 3 para mostrar el salto de nivel reciente
    const baseItems = EXPERIENCE_DATA.slice(0, initialItemsToShow)
    const extraItems = EXPERIENCE_DATA.slice(initialItemsToShow)

    return (
        <SectionContainer id="experience" className="snap-section scroll-mt-24 py-10 md:py-12">
            {/* Header - System Log Style */}
            <div className="flex items-center gap-4 mb-7 mt-4">
                <m.div
                    className="p-2.5 border border-black/10 dark:border-white/10 rounded-sm bg-black/5 dark:bg-white/5"
                    animate={{
                        opacity: [1, 0.72, 1, 0.85, 1],
                        scale: [1, 1.02, 1],
                    }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <TerminalSquare className="size-5 text-brand-salmon" strokeWidth={1.5} />
                </m.div>
                <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground dark:text-foreground tracking-tight leading-none">
                        SYSTEM_LOG
                    </h3>
                    <p className="text-[10px] font-mono text-brand-salmon mt-1 tracking-widest uppercase">
                        // CAREER_HISTORY_STREAM
                    </p>
                </div>
            </div>

            <div className="relative">
                <div className="grid md:grid-cols-2 gap-4">
                    {baseItems.map((exp, index) => {
                        const isFirst = index === 0
                        return (
                            <div key={`${exp.title}-${exp.date}`} className="relative">
                                <ViewerCard
                                    className="w-full h-full flex flex-col"
                                    label={`LOG_${String(index + 1).padStart(2, '0')}`}
                                >
                                    <div className="flex h-full flex-col">
                                        <div className="flex flex-col gap-1 border-b border-black/5 dark:border-white/5 pb-2 mb-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {isFirst && (
                                                        <span className="inline-flex items-center gap-1 text-[8px] font-mono text-brand-green/80 bg-brand-green/5 px-1 py-0.5 border border-brand-green/15 rounded-sm uppercase tracking-wide whitespace-nowrap flex-shrink-0">
                                                            <span className="w-1 h-1 bg-brand-green rounded-full animate-pulse" />
                                                            ACTIVE
                                                        </span>
                                                    )}
                                                    <h3 className="text-base md:text-lg font-bold text-foreground dark:text-foreground tracking-tight leading-snug">
                                                        {exp.title}
                                                    </h3>
                                                </div>
                                                <span className="text-[9px] font-mono text-brand-salmon bg-brand-salmon/5 px-1.5 py-0.5 border border-brand-salmon/20 rounded-sm uppercase tracking-wide whitespace-nowrap flex-shrink-0">
                                                    {exp.date}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-mono text-[#77828c] dark:text-brand-blue uppercase tracking-widest">
                                                @{exp.company}
                                            </span>
                                        </div>

                                        <p className="text-xs text-muted-foreground dark:text-muted-foreground leading-relaxed font-mono mt-auto pt-1">
                                            <span className="text-brand-green/70 mr-1">{'>'}</span>
                                            {exp.description}
                                        </p>
                                    </div>
                                </ViewerCard>
                            </div>
                        )
                    })}

                    <AnimatePresence initial={false}>
                        {showAll &&
                            extraItems.map((exp, extraIndex) => {
                                const index = extraIndex + initialItemsToShow
                                return (
                                    <m.div
                                        key={`${exp.title}-${exp.date}`}
                                        className="relative"
                                        initial={{ opacity: 0, y: 28, scale: 0.985 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                            transition: {
                                                duration: 0.42,
                                                ease: [0.22, 1, 0.36, 1],
                                                delay: extraIndex * 0.07,
                                            },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -18,
                                            scale: 0.985,
                                            transition: { duration: 0.24, ease: "easeInOut" },
                                        }}
                                        layout
                                    >
                                        <ViewerCard
                                            className="w-full h-full flex flex-col"
                                            label={`LOG_${String(index + 1).padStart(2, '0')}`}
                                        >
                                            <div className="flex h-full flex-col">
                                                <div className="flex flex-col gap-1 border-b border-black/5 dark:border-white/5 pb-2 mb-2">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h3 className="text-base md:text-lg font-bold text-foreground dark:text-foreground tracking-tight leading-snug">
                                                            {exp.title}
                                                        </h3>
                                                        <span className="text-[9px] font-mono text-brand-salmon bg-brand-salmon/5 px-1.5 py-0.5 border border-brand-salmon/20 rounded-sm uppercase tracking-wide whitespace-nowrap flex-shrink-0">
                                                            {exp.date}
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] font-mono text-[#77828c] dark:text-brand-blue uppercase tracking-widest">
                                                        @{exp.company}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-muted-foreground dark:text-muted-foreground leading-relaxed font-mono mt-auto pt-1">
                                                    <span className="text-brand-green/70 mr-1">{'>'}</span>
                                                    {exp.description}
                                                </p>
                                            </div>
                                        </ViewerCard>
                                    </m.div>
                                )
                            })}
                    </AnimatePresence>
                </div>

                {EXPERIENCE_DATA.length > initialItemsToShow && (
                    <div className="flex justify-center mt-12 relative z-10">
                        <m.button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-3 bg-background dark:bg-background border border-black/10 dark:border-white/10 hover:border-brand-blue hover:text-brand-blue text-foreground dark:text-foreground font-mono text-sm tracking-widest uppercase transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background group"
                            whileHover={{ y: -1, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 320, damping: 20 }}
                        >
                            <m.span
                                className="mr-2 inline-flex align-middle"
                                animate={{ rotate: showAll ? 180 : 0 }}
                                transition={{ duration: 0.28, ease: "easeInOut" }}
                            >
                                <ChevronDown className="size-4" />
                            </m.span>
                            {showAll ? "COLLAPSE_LOGS" : "LOAD_FULL_HISTORY"}
                        </m.button>
                    </div>
                )}
            </div>
        </SectionContainer>
    )
}