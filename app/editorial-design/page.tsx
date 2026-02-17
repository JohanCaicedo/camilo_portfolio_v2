import type { Metadata } from "next"
import Link from "next/link"
import { LightboxGallery } from "@/components/ui/lightbox-gallery"
import { LightboxImage } from "@/components/ui/image-lightbox"
import {
    ArrowLeft,
    Target,
    Briefcase,
    MousePointerClick,
    LayoutGrid,
    Star,
    BookOpen,
    type LucideIcon,
} from "lucide-react"
import { SectionContainer } from "@/components/section-container"
import { ViewerCard } from "@/components/ui/viewer-card"

export const metadata: Metadata = {
    title: "Editorial Design",
    description:
        "Explore the editorial design portfolio of Johan Caicedo, featuring book covers, layouts, and illustrations for clients like ILSA and JEP.",
    openGraph: {
        title: "Editorial Design",
        description:
            "Book covers, layouts, and illustrations for ILSA, JEP, and other organizations.",
        images: [
            "https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Editorial%20Design%20Image.webp?alt=media&token=aabfa3b4-9eb3-452b-b0d2-bb66de2456ea",
        ],
    },
}

/* ─── Data ─── */

const BADGES = [
    { label: "Editorial Design", color: "#e46f4d" },
    { label: "Photoshop", color: "#97acc6" },
    { label: "Illustration", color: "#d4a24e" },
    { label: "InDesign", color: "#6dae6b" },
    { label: "Typography", color: "#b0a0d0" },
    { label: "Composition", color: "#d09080" },
]

const APPROACH_POINTS = [
    {
        icon: "👁️",
        title: "Clarity and readability",
        desc: "I prioritize effective communication of ideas, ensuring content is easy to read and understand.",
    },
    {
        icon: "🌟",
        title: "Impactful aesthetics",
        desc: "I create visually appealing designs that reflect the theme and tone of each publication.",
    },
    {
        icon: "⭕",
        title: "Consistency with brand identity",
        desc: "I design covers and publications that align with the visual identity of ILSA and other organizations I collaborate with.",
    },
]

const SKILLS = [
    {
        icon: "🖌️",
        title: "Cover conceptualization and design",
        desc: "Creating original covers that capture the essence of the publication.",
    },
    {
        icon: "💻",
        title: "Adaptation of illustrations and murals",
        desc: "Integrating pre-existing visual elements into the editorial design.",
    },
    {
        icon: "📏",
        title: "Layout and typesetting",
        desc: "Organizing content in a clear and attractive way, optimizing readability and visual flow.",
    },
]

const FEATURED_PROJECTS = [
    {
        icon: "📕",
        title: "El Otro Derecho 62",
        desc: "Cover and interior design, maintaining consistency with the collection.",
    },
    {
        icon: "🪄",
        title: "Collection redesigns",
        desc: 'Updating the visual identity of "El Otro Derecho" and "Textos de Aquí y Ahora."',
    },
    {
        icon: "🤝",
        title: "Collaborations",
        desc: "Design of booklets, academic journals, and other materials for the JEP and various NGOs.",
    },
]

const COVER_STRUCTURE = [
    "📝 Text analysis, genre, audience, and client meeting.",
    "✏️ Create sketches and mood boards to explore visual concepts.",
    "💬 Select typography and page format.",
    "🎨 Experiment with compositions and color palettes.",
    "💻 Present options to the client and make revisions.",
    "🖨️ Prepare final files for printing.",
]

const COVER_IMAGES = [
    { src: "/Editorial-Desing-Cover (1).webp", alt: "Book Cover 1" },
    { src: "/Editorial-Desing-Cover (8).webp", alt: "Book Cover 2" },
    { src: "/Editorial-Desing-Cover (2).webp", alt: "Book Cover 3" },
    { src: "/Editorial-Desing-Cover (9).webp", alt: "Book Cover 4" },
    { src: "/Editorial-Desing-Cover (4).webp", alt: "Book Cover 5" },
    { src: "/Editorial-Desing-Cover (5).webp", alt: "Book Cover 6" },
    { src: "/Editorial-Desing-Cover (6).webp", alt: "Book Cover 7" },
    { src: "/Editorial-Desing-Cover (7).webp", alt: "Book Cover 8" },
    { src: "/Editorial-Desing-Cover (3).webp", alt: "Book Cover 9" },
]

const INSIDE_IMAGES = [
    { src: "/Inside.webp", alt: "Book Inside 1" },
    { src: "/Inside 2.webp", alt: "Book Inside 2" },
]

/* ─── Section Header ─── */
function SectionHeader({
    icon: Icon,
    label,
    title,
}: {
    icon: LucideIcon
    label: string
    title: string
}) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className="p-2.5 border border-black/10 dark:border-white/10 rounded-sm bg-black/5 dark:bg-white/5">
                <Icon className="size-5 text-brand-salmon" strokeWidth={1.5} />
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight leading-none">
                    {title}
                </h2>
                <p className="text-[10px] font-mono text-brand-salmon mt-1 tracking-widest uppercase">
                    // {label}
                </p>
            </div>
        </div>
    )
}

/* ─── Badge Row ─── */
function BadgeRow({ badges }: { badges: { label: string; color: string }[] }) {
    return (
        <nav className="flex flex-wrap gap-2 justify-center mb-8" aria-label="Project tags">
            {badges.map((badge) => (
                <span
                    key={badge.label}
                    className="px-3 py-1 text-xs font-mono uppercase tracking-wider border rounded-sm"
                    style={{
                        borderColor: badge.color,
                        color: badge.color,
                        backgroundColor: `${badge.color}15`,
                    }}
                >
                    {badge.label}
                </span>
            ))}
        </nav>
    )
}



/* ─── Page ─── */
export default function EditorialDesignPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            {/* ─── Back Navigation ─── */}
            <SectionContainer className="py-4 md:py-4">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-sm font-mono text-[#999] hover:text-brand-salmon transition-colors group"
                >
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                    // BACK_TO_PROJECTS
                </Link>
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 1 — Hero
            ══════════════════════════════════════════════ */}
            <SectionContainer className="py-8 md:py-12">
                <div className="text-center mb-8">
                    <p className="text-[10px] font-mono text-brand-blue tracking-widest uppercase mb-2">
                        // PRJ_04 — CASE_STUDY
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight">
                        Editorial Design
                    </h1>
                    <p className="text-lg text-[#777] mt-4 max-w-2xl mx-auto">
                        ILSA — 8 Years of Editorial Leadership
                    </p>
                </div>

                <BadgeRow badges={BADGES} />

                {/* Hero Banner */}
                <ViewerCard label="BANNER_PREVIEW" className="overflow-hidden">
                    <LightboxImage
                        src="/Editorial-Design ID.webp"
                        alt="ILSA Editorial Design banner"
                    />
                </ViewerCard>
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 2 — Project Details
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <div className="grid md:grid-cols-2 gap-8">
                    <ViewerCard label="GENERAL_DESC">
                        <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-3">
                            General Description
                        </h3>
                        <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                            <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">
                                Experienced editorial designer since 2016.
                            </strong>{" "}
                            I began my career at ILSA with the publication &quot;El Otro Derecho 52&quot;.
                            Since then, I have led the organization&apos;s editorial design, creating
                            original covers, adapting illustrations and layouts for various
                            publications, including collections like &quot;El Otro Derecho&quot; and
                            &quot;Textos de Aquí y Ahora&quot;. My experience also includes collaborations
                            with the JEP and other human rights NGOs.
                        </p>
                    </ViewerCard>
                    <ViewerCard label="ABOUT_ORG">
                        <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-3">
                            About the company
                        </h3>
                        <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                            ILSA, founded in 1978 as an NGO, focuses on alternative legal
                            services and supporting social movements, grassroots organizations,
                            and disadvantaged sectors. Initially operating in various Latin
                            American countries, it has focused on Colombia since 1988.
                        </p>
                    </ViewerCard>
                </div>

                {/* Specs Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[
                        { label: "ROLE", value: "Lead Editorial Designer, Illustrator" },
                        { label: "TEAM", value: "Freddy Ordoñez" },
                        { label: "EXPERIENCE", value: "8 years" },
                        { label: "TOOLS", value: "Photoshop, Illustrator, InDesign" },
                    ].map((spec) => (
                        <div
                            key={spec.label}
                            className="border border-black/10 dark:border-white/10 p-4 bg-black/[0.02] dark:bg-white/[0.02]"
                        >
                            <p className="text-[10px] font-mono text-brand-blue tracking-widest uppercase mb-1">
                                {spec.label}
                            </p>
                            <p className="text-sm font-medium text-[#1a1a1a] dark:text-[#faf9f6]">
                                {spec.value}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 3 — Approach & Experience
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Target} label="APPROACH" title="Approach and Experience" />

                <ViewerCard label="DESIGN_APPROACH">
                    <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-4">
                        My approach to editorial design is based on
                    </h3>
                    <ul className="space-y-4">
                        {APPROACH_POINTS.map((point) => (
                            <li key={point.title} className="text-[#666] dark:text-[#aaa]">
                                <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">
                                    {point.icon} {point.title}:
                                </strong>{" "}
                                {point.desc}
                            </li>
                        ))}
                    </ul>
                </ViewerCard>
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 4 — Skills & Featured Projects
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Skills */}
                    <ViewerCard label="SKILLS">
                        <div className="flex items-center gap-3 mb-4">
                            <MousePointerClick className="size-5 text-brand-salmon" strokeWidth={1.5} />
                            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6]">
                                Skills
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {SKILLS.map((skill) => (
                                <li key={skill.title} className="text-sm text-[#666] dark:text-[#aaa]">
                                    <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">
                                        {skill.icon} {skill.title}:
                                    </strong>{" "}
                                    {skill.desc}
                                </li>
                            ))}
                        </ul>
                    </ViewerCard>

                    {/* Featured Projects */}
                    <ViewerCard label="FEATURED_PROJECTS">
                        <div className="flex items-center gap-3 mb-4">
                            <Briefcase className="size-5 text-brand-salmon" strokeWidth={1.5} />
                            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6]">
                                Featured Projects
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {FEATURED_PROJECTS.map((proj) => (
                                <li key={proj.title} className="text-sm text-[#666] dark:text-[#aaa]">
                                    <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">
                                        {proj.icon} {proj.title}:
                                    </strong>{" "}
                                    {proj.desc}
                                </li>
                            ))}
                        </ul>
                    </ViewerCard>
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 5 — Book Cover Design Structure
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={LayoutGrid} label="DESIGN_STRUCTURE" title="Book Cover Design Structure" />

                <ViewerCard label="COVER_PROCESS">
                    <ul className="space-y-3">
                        {COVER_STRUCTURE.map((item, i) => (
                            <li
                                key={i}
                                className="text-sm text-[#666] dark:text-[#aaa] border-l-2 border-brand-salmon/30 pl-4"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </ViewerCard>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 6 — Featured Book Covers
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Star} label="BOOK_COVERS" title="Featured Book Covers" />
                <LightboxGallery images={COVER_IMAGES} columns={3} label="COVER" />
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 7 — Featured Book Inside
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={BookOpen} label="INTERIOR_DESIGN" title="Featured Book Inside" />
                <LightboxGallery images={INSIDE_IMAGES} columns={2} label="INSIDE" />
            </SectionContainer>

            {/* ─── Back to Projects Footer ─── */}
            <SectionContainer className="py-8 md:py-8">
                <div className="text-center">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-sm font-mono text-[#999] hover:text-brand-salmon transition-colors group"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        // RETURN_TO_PROJECTS
                    </Link>
                </div>
            </SectionContainer>
        </main>
    )
}
