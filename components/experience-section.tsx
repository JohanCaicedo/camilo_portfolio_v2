"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, TerminalSquare } from "lucide-react"
import { SectionContainer } from "@/components/section-container"
import { ViewerCard } from "@/components/ui/viewer-card"

const EXPERIENCE_DATA = [
    {
        date: "Aug. 2020 – Present · 5 years 2 months",
        title: "Generalist Designer",
        company: "Instituto Latinoamericano para una Sociedad y un Derecho Alternativos - ILSA",
        description: "As ILSA's generalist designer, I specialize in web design, editorial design, illustration, branding, photography, and audiovisual production. I have successfully created and maintained a cohesive, harmonious, and distinctive visual identity for the institute, significantly enhancing its market presence. Additionally, I have led key projects that have contributed to the organization's growth and success.",
    },
    {
        date: "Jan 2025 – Sep 2025 · 8 months",
        title: "Graphic Designer",
        company: "PIPE TORO SAS",
        description: "Developed strategic visual solutions for brands including Reprotec, Fogafín, and Puffer, integrating web design, branding, and graphic communication. Key achievements include leading the website redesign for Reprotec, focused on user experience and brand coherence, along with creating impactful corporate materials and campaigns that strengthened the visual identity of each client.",
    },
    {
        date: "May 2023 – Jul. 2023 · 3 months",
        title: "Web Developer and Design",
        company: "Freelance",
        description: "Designed and developed individual WordPress websites, focusing on customized design strategies that highlight clients' professional strengths and create a distinctive brand image within their niche.",
    },
    {
        date: "Jul. 2022 – Oct. 2022 · 4 months",
        title: "Web Developer and Design",
        company: "Instituto Latinoamericano para una Sociedad y un Derecho Alternativos - ILSA",
        description: "I spearheaded the complete redesign of the institute's main website, establishing a robust and strategic corporate visual identity. We implemented effective communication channels with users, consolidated the institutional archive, and defined the aesthetics of the digital platform. This transformative project elevated the company's industry relevance, transitioning from a limited online presence to a platform with 15,000 unique visitors per month. Furthermore, we significantly improved SEO and site performance, ensuring an optimal user experience.",
    },
    {
        date: "Jul. 2022 – Oct. 2022 · 4 months",
        title: "Photographer and Videographer",
        company: "Renta Fácil",
        description: "Provided production services, including social media videos, corporate videos, and corporate photography sessions.",
        link: "#",
    },
    {
        date: "Jul. 2020 – Nov. 2020 · 5 months",
        title: "Digital designer and photographer",
        company: "Aire libre y aventura",
        description: "I was part of the Kuerfit team, serving as a video editor, graphic designer, and photographer. I spearheaded the production of the video course 'Strength Training', created promotional videos and flyers for social media and the website, and provided photographic coverage of the 'Corre Chicaque event.'",
    },
]

export function ExperienceSection() {
    const [showAll, setShowAll] = useState(false)
    const initialItemsToShow = 2
    const baseItems = EXPERIENCE_DATA.slice(0, initialItemsToShow)
    const extraItems = EXPERIENCE_DATA.slice(initialItemsToShow)

    return (
        <SectionContainer id="experience" className="snap-section scroll-mt-24 py-10 md:py-12">
            {/* Header - System Log Style */}
            <div className="flex items-center gap-4 mb-7 mt-4">
                <motion.div
                    className="p-2.5 border border-black/10 dark:border-white/10 rounded-sm bg-black/5 dark:bg-white/5"
                    animate={{
                        opacity: [1, 0.72, 1, 0.85, 1],
                        scale: [1, 1.02, 1],
                    }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <TerminalSquare className="size-5 text-brand-salmon" strokeWidth={1.5} />
                </motion.div>
                <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground dark:text-foreground tracking-tight leading-none">
                        SYSTEM_LOG
                    </h3>
                    <p className="text-[10px] font-mono text-brand-salmon mt-1 tracking-widest uppercase">
                        // CAREER_HISTORY_STREAM
                    </p>
                </div>
            </div>

            <div className="relative max-w-5xl mx-auto">
                {/* Timeline Line removed for Grid Layout */}

                <div className="grid md:grid-cols-2 gap-4">
                    {baseItems.map((exp, index) => (
                        <div key={`${exp.title}-${exp.date}`} className="relative">
                            {/* Timeline Marker removed */}

                            <ViewerCard
                                className="w-full h-full flex flex-col"
                                label={`LOG_${String(index + 1).padStart(2, '0')}`}
                            >
                                <div className="flex flex-col justify-between mb-2 gap-1 border-b border-black/5 dark:border-white/5 pb-2">
                                    <h3 className="text-base md:text-lg font-bold text-foreground dark:text-foreground tracking-tight leading-snug">
                                        {exp.title}
                                    </h3>
                                    <div className="flex justify-between items-center w-full">
                                        <span className="text-[10px] font-mono text-brand-blue dark:text-brand-blue uppercase tracking-widest">
                                            @{exp.company}
                                        </span>
                                        <span className="text-[9px] font-mono text-brand-salmon bg-brand-salmon/5 px-1.5 py-0.5 border border-brand-salmon/20 rounded-sm uppercase tracking-wide">
                                            {exp.date}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground dark:text-muted-foreground leading-relaxed font-mono mt-auto pt-2">
                                    <span className="text-brand-green/70 mr-1">{'>'}</span>
                                    {exp.description}
                                </p>
                            </ViewerCard>
                        </div>
                    ))}

                    <AnimatePresence initial={false}>
                        {showAll &&
                            extraItems.map((exp, extraIndex) => {
                                const index = extraIndex + initialItemsToShow
                                return (
                                    <motion.div
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
                                            <div className="flex flex-col justify-between mb-2 gap-1 border-b border-black/5 dark:border-white/5 pb-2">
                                                <h3 className="text-base md:text-lg font-bold text-foreground dark:text-foreground tracking-tight leading-snug">
                                                    {exp.title}
                                                </h3>
                                                <div className="flex justify-between items-center w-full">
                                                    <span className="text-[10px] font-mono text-brand-blue dark:text-brand-blue uppercase tracking-widest">
                                                        @{exp.company}
                                                    </span>
                                                    <span className="text-[9px] font-mono text-brand-salmon bg-brand-salmon/5 px-1.5 py-0.5 border border-brand-salmon/20 rounded-sm uppercase tracking-wide">
                                                        {exp.date}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-xs text-muted-foreground dark:text-muted-foreground leading-relaxed font-mono mt-auto pt-2">
                                                <span className="text-brand-green/70 mr-1">{'>'}</span>
                                                {exp.description}
                                            </p>
                                        </ViewerCard>
                                    </motion.div>
                                )
                            })}
                    </AnimatePresence>
                </div>

                {EXPERIENCE_DATA.length > initialItemsToShow && (
                    <div className="flex justify-center mt-12 relative z-10">
                        <motion.button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-3 bg-background dark:bg-background border border-black/10 dark:border-white/10 hover:border-brand-blue hover:text-brand-blue text-foreground dark:text-foreground font-mono text-sm tracking-widest uppercase transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background group"
                            whileHover={{ y: -1, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 320, damping: 20 }}
                        >
                            <motion.span
                                className="mr-2 inline-flex align-middle"
                                animate={{ rotate: showAll ? 180 : 0 }}
                                transition={{ duration: 0.28, ease: "easeInOut" }}
                            >
                                <ChevronDown className="size-4" />
                            </motion.span>
                            {showAll ? "COLLAPSE_LOGS" : "LOAD_FULL_HISTORY"}
                        </motion.button>
                    </div>
                )}
            </div>
        </SectionContainer>
    )
}
