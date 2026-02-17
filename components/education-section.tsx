"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { ViewerCard } from "@/components/ui/viewer-card"
import { SectionContainer } from "@/components/section-container"

const education = [
    {
        id: "1",
        title: "Digital and Multimedia Design",
        collage: "Colegiatura Colombiana",
        type: "Undergraduate",
        state: "Graduate",
        date: "2016 - 2021",
        colSpan: "md:col-span-3 md:row-span-2 sm:col-span-2",
        accentColor: "text-brand-salmon",
    },
    {
        id: "2",
        title: "3D Animation for the Entertainment Industries",
        collage: "UNIR",
        type: "Master's Degree",
        state: "Student",
        date: "2024 - 2025",
        colSpan: "md:col-span-3 md:row-span-2 md:col-start-4 sm:col-start-3",
        accentColor: "text-brand-blue",
    },
    {
        id: "3",
        title: "Video Game Programming: Unity and Unreal",
        collage: "UNIR",
        type: "Course",
        state: "Student",
        date: "2024 - 2025",
        colSpan: "md:col-span-2 md:row-span-2 md:row-start-3 sm:row-start-2",
        accentColor: "text-brand-yellow",
    },
    {
        id: "4",
        title: "LabDesign",
        collage: "UNIR",
        type: "Course",
        state: "Graduate",
        date: "2024",
        colSpan: "md:col-span-2 row-span-2 md:col-start-3 md:row-start-3 sm:row-start-2",
        accentColor: "text-brand-green",
    },
    {
        id: "5",
        title: "Leadership",
        collage: "MIU City University Miami",
        type: "Course",
        state: "Graduate",
        date: "2024",
        colSpan: "md:col-span-2 row-span-2 md:col-start-5 md:row-start-3 sm:row-start-2",
        accentColor: "text-brand-salmon",
    },
]

export function EducationSection() {
    return (
        <SectionContainer id="education" className="snap-section scroll-mt-24 py-10 md:py-12">
            <section>
                {/* Header - Technical / Data Block Style */}
                <div className="flex items-center gap-4 mb-7 mt-4">
                    <motion.div
                        className="p-2.5 border border-black/10 dark:border-white/10 rounded-sm bg-black/5 dark:bg-white/5"
                        animate={{
                            y: [0, -3.2, 0],
                            rotate: [0, -5.5, 0],
                        }}
                        whileHover={{ y: -4, rotate: -8, scale: 1.06 }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <GraduationCap className="size-5 text-brand-salmon" strokeWidth={1.5} />
                    </motion.div>
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight leading-none">
                            ACADEMIC_DATA
                        </h3>
                        <p className="text-[10px] font-mono text-brand-salmon mt-1 tracking-widest uppercase">
                            // CERTIFICATION_INDEX
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-4">
                    {education.map((edu) => (
                        <ViewerCard
                            key={edu.id}
                            label={`EDU_${edu.id}`}
                            className={`
                                ${edu.colSpan} 
                                min-h-[180px]
                                flex flex-col justify-between
                            `}
                        >
                            <div className="mb-4 w-full relative z-10">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 border rounded-sm ${edu.state === 'Graduate' ? 'text-brand-green border-brand-green/30 bg-brand-green/5' : 'text-brand-yellow border-brand-yellow/30 bg-brand-yellow/5'}`}>
                                        [{edu.state}]
                                    </span>
                                    <span className="text-[10px] font-mono text-[#666666] dark:text-[#888888]">
                                        {edu.date}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-left mb-1 tracking-tight leading-tight text-[#1a1a1a] dark:text-[#faf9f6]">
                                    {edu.title}
                                </h3>
                                <h4 className={`text-xs font-mono tracking-wide text-left opacity-80 ${edu.accentColor}`}>
                                    @{edu.collage}
                                </h4>
                            </div>

                            <div className="flex items-end justify-between relative z-10 border-t border-black/5 dark:border-white/5 pt-3">
                                <span className="text-[10px] font-mono text-[#555555] dark:text-[#a0a0a0] uppercase tracking-wider">
                                    TYPE: {edu.type}
                                </span>
                                <div className="w-1.5 h-1.5 bg-brand-blue/50 rounded-full animate-pulse" />
                            </div>
                        </ViewerCard>
                    ))}
                </div>
            </section>
        </SectionContainer>
    )
}
