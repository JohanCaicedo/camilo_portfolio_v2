"use client"

import { SectionContainer } from "@/components/section-container"
import { ViewerCard } from "@/components/ui/viewer-card"
import { motion } from "framer-motion"
import { CircuitBoard, Layers3, Radar, UserRound } from "lucide-react"

const FOCUS_AREAS = [
    {
        id: "WEB_SYSTEMS",
        title: "Web Design",
        description: "UI/UX direction, responsive structures, and clear information hierarchy.",
    },
    {
        id: "BRAND_GRAPHICS",
        title: "Graphic Design",
        description: "Brand systems, campaign assets, and high-impact visual communication.",
    },
    {
        id: "EDITORIAL_FLOW",
        title: "Editorial Design",
        description: "Publication design, layout logic, readability, and visual storytelling.",
    },
    {
        id: "PHOTO_AV",
        title: "Photography & AV",
        description: "Photography and audiovisual production to document and amplify narratives.",
    },
]

const WORKFLOW_PROTOCOL = [
    {
        title: "Context Mapping",
        description: "Research the organization, audience, and communication objectives.",
    },
    {
        title: "Visual Architecture",
        description: "Build coherent systems that connect identity, content, and usability.",
    },
    {
        title: "Iteration Loop",
        description: "Prototype, test, refine, and align decisions with real project feedback.",
    },
    {
        title: "Delivery & Evolution",
        description: "Ship with consistency and continue improving through measurable outcomes.",
    },
]

export function AboutSection() {
    return (
        <SectionContainer id="about" className="snap-section scroll-mt-24 py-8 md:py-10 pt-0 md:pt-3">
            <div className="flex items-center gap-4 mb-7 mt-4">
                <motion.div
                    className="p-2.5 border border-black/10 dark:border-white/10 rounded-sm bg-black/5 dark:bg-white/5"
                    animate={{
                        y: [0, -1.5, 0],
                        scale: [1, 1.03, 1],
                        rotate: [0, -1.5, 0],
                    }}
                    whileHover={{ y: -2, scale: 1.08, rotate: -2 }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <UserRound className="size-5 text-brand-salmon" strokeWidth={1.5} />
                </motion.div>
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight leading-none">
                        PROFILE_CONTEXT
                    </h3>
                    <p className="text-[10px] font-mono text-brand-salmon mt-1 tracking-widest uppercase">
                        // DESIGN_CONTINUITY_PROTOCOL
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
                <ViewerCard label="ABOUT_ME" className="md:col-span-3">
                    <div className="space-y-4">
                        <p className="text-sm md:text-base text-[#555555] dark:text-[#a0a0a0] leading-relaxed">
                            I am Johan Caicedo, a multidisciplinary digital and multimedia designer based in Bogota.
                            My practice integrates web design, graphic systems, editorial design, photography, and audiovisual production into one coherent visual language.
                        </p>
                        <p className="text-sm md:text-base text-[#555555] dark:text-[#a0a0a0] leading-relaxed">
                            Through collaborations with institutions such as ILSA and through my personal project Paper Fox Studio,
                            I work on experiences where strategy, aesthetics, and usability are developed as one connected system.
                        </p>
                        <p className="text-sm md:text-base text-[#555555] dark:text-[#a0a0a0] leading-relaxed">
                            The objective is consistent in every project: translate complex ideas into clear, memorable, and scalable visual experiences.
                        </p>
                    </div>
                </ViewerCard>

                <ViewerCard label="WORKFLOW_PROTOCOL" className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                        <Radar className="size-4 text-brand-blue" />
                        <p className="text-xs font-mono uppercase tracking-widest text-brand-blue">
                            Operating Method
                        </p>
                    </div>
                    <ul className="space-y-3">
                        {WORKFLOW_PROTOCOL.map((item) => (
                            <li key={item.title} className="border-l border-black/10 dark:border-white/10 pl-3">
                                <p className="text-[11px] font-mono uppercase tracking-wider text-[#1a1a1a] dark:text-[#faf9f6]">
                                    {item.title}
                                </p>
                                <p className="text-xs text-[#666666] dark:text-[#999999] leading-relaxed">
                                    {item.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </ViewerCard>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-4">
                {FOCUS_AREAS.map((area) => (
                    <ViewerCard key={area.id} label={area.id}>
                        <div className="flex items-start gap-2 mb-2">
                            <CircuitBoard className="size-4 text-brand-salmon mt-0.5" />
                            <h4 className="text-sm font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight">
                                {area.title}
                            </h4>
                        </div>
                        <p className="text-xs text-[#666666] dark:text-[#999999] leading-relaxed">
                            {area.description}
                        </p>
                    </ViewerCard>
                ))}
            </div>

            <div className="max-w-6xl mx-auto mt-6 flex items-center gap-2 border-t border-black/10 dark:border-white/10 pt-4">
                <Layers3 className="size-4 text-brand-green" />
                <p className="text-[10px] font-mono text-[#777777] dark:text-[#999999] tracking-widest uppercase">
                    // Visual Design Continuity Across Every Dimension
                </p>
            </div>

            <div className="flex justify-center mt-8">
                <div className="h-16 w-px border-r border-dashed border-brand-green/40 relative">
                    <div className="absolute top-0 -left-[3px] w-2 h-px bg-brand-green/70" />
                    <div className="absolute bottom-0 -left-[3px] w-2 h-px bg-brand-green/70" />
                </div>
            </div>
        </SectionContainer>
    )
}
