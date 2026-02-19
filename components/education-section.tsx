"use client"

import { m } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { ViewerCard } from "@/components/ui/viewer-card"
import { SectionContainer } from "@/components/section-container"

const education = [
    {
        id: "1",
        title: "B.A. in Digital and Multimedia Design",
        college: "Universidad Colegio Mayor de Cundinamarca",
        type: "Bachelor's Degree",
        state: "Graduate",
        date: "2016 - 2021",
        colSpan: "md:col-span-3 md:row-span-2 sm:col-span-2",
        accentColor: "text-brand-salmon",
    },
    {
        id: "2",
        title: "LabDesign",
        college: "UNIR",
        type: "Executive Program",
        state: "Completed",
        date: "2024",
        colSpan: "md:col-span-3 md:row-span-2 md:col-start-4 sm:col-start-3",
        accentColor: "text-brand-green",
    },
    {
        id: "3",
        title: "Leadership and Management",
        college: "MIU City University Miami",
        type: "Certificate",
        state: "Completed",
        date: "2024",
        colSpan: "md:col-span-3 md:row-span-2 md:row-start-3 sm:row-start-2",
        accentColor: "text-brand-salmon",
    }
]

export function EducationSection() {
    return (
        <SectionContainer id="education" className="snap-section scroll-mt-24 py-10 md:py-12">
            <section>
                {/* Header - Technical / Data Block Style */}
                <div className="flex items-center gap-4 mb-7 mt-4">
                    <m.div
                        className="p-2.5 border border-black/10 dark:border-white/10 rounded-sm bg-black/5 dark:bg-white/5"
                        animate={{
                            y: [0, -3.2, 0],
                            rotate: [0, -5.5, 0],
                        }}
                        whileHover={{ y: -4, rotate: -8, scale: 1.06 }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <GraduationCap className="size-5 text-brand-salmon" strokeWidth={1.5} />
                    </m.div>
                    <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground dark:text-foreground tracking-tight leading-none">
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
                            <div className="flex h-full flex-col relative z-10">
                                <div className="w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 border rounded-sm ${edu.state === 'Graduate' || edu.state === 'Completed' ? 'text-brand-green border-brand-green/30 bg-brand-green/5' : 'text-brand-yellow border-brand-yellow/30 bg-brand-yellow/5'}`}>
                                            [{edu.state}]
                                        </span>
                                        <span className="text-[10px] font-mono text-muted-foreground dark:text-muted-foreground">
                                            {edu.date}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-left mb-1 tracking-tight leading-tight text-foreground dark:text-foreground">
                                        {edu.title}
                                    </h3>
                                    <h4 className={`text-xs font-mono tracking-wide text-left opacity-80 ${edu.accentColor}`}>
                                        @{edu.college}
                                    </h4>
                                </div>

                                <div className="flex items-end justify-between mt-auto border-t border-black/5 dark:border-white/5 pt-3">
                                    <span className="text-[10px] font-mono text-muted-foreground dark:text-muted-foreground uppercase tracking-wider">
                                        TYPE: {edu.type}
                                    </span>
                                    <div className="w-1.5 h-1.5 bg-brand-blue/50 rounded-full animate-pulse" />
                                </div>
                            </div>
                        </ViewerCard>
                    ))}
                </div>
            </section>
        </SectionContainer>
    )
}
