import type { Metadata } from "next"
import Link from "next/link"
import { LightboxGallery } from "@/components/ui/lightbox-gallery"
import {
    ArrowLeft,
    Target,
    Briefcase,
    Camera,
    type LucideIcon,
} from "lucide-react"
import { SectionContainer } from "@/components/section-container"
import { ViewerCard } from "@/components/ui/viewer-card"

export const metadata: Metadata = {
    title: "Photography",
    description:
        "Explore the photography portfolio of Johan Caicedo, featuring portrait, nature, and landscape photography, as well as project documentation.",
    openGraph: {
        title: "Photography",
        description:
            "Portrait, nature, landscape photography and project documentation.",
        images: [
            "https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Photography%20Image.webp?alt=media&token=2f3bcee6-0ff5-4a1c-8ec4-4944542b2c4b",
        ],
    },
}

/* ─── Data ─── */

const BADGES = [
    { label: "Lightroom", color: "#e46f4d" },
    { label: "Camera Manage", color: "#97acc6" },
    { label: "Composition", color: "#d4a24e" },
    { label: "Lighting", color: "#6dae6b" },
]

const FOCUS_POINTS = [
    {
        icon: "✏️",
        title: "Capture the creative process",
        desc: "Document the different stages of a project.",
    },
    {
        icon: "🌟",
        title: "Immortalize key moments",
        desc: "Photograph events, meetings, and other important moments to create a visual record.",
    },
    {
        icon: "💡",
        title: "Communicate ideas and concepts",
        desc: "Use images to illustrate design concepts, present proposals to clients, and share the final result.",
    },
    {
        icon: "📸",
        title: "Create visual content for marketing and social media",
        desc: "Produce attractive, high-quality photographs to promote projects and attract a wider audience.",
    },
]

const TECHNICAL_SKILLS = [
    "💡 Mastery of composition and lighting techniques.",
    "🌈 Excellent color management.",
    "📸 Proficiency with professional photography equipment (cameras, lenses, lighting).",
    "🧑‍💻 Experience in image editing and post-production (Adobe Photoshop, Lightroom).",
]

const PORTRAIT_IMAGES = [
    { src: "/Portrait (1).webp", alt: "Portrait 1" },
    { src: "/Portrait (2).webp", alt: "Portrait 2" },
    { src: "/Portrait (5).webp", alt: "Portrait 3" },
    { src: "/Ñoquito-Portrait.webp", alt: "Ñoquito Portrait" },
    { src: "/Nature.webp", alt: "Nature 1" },
    { src: "/Nature 2.webp", alt: "Nature 2" },
    { src: "/Nature 3.webp", alt: "Nature 3" },
    { src: "/Portrait (11).webp", alt: "Portrait 4" },
]

const NECOCLI_IMAGES = [
    { src: "/Necoclí 2024 (1).webp", alt: "Necoclí 1" },
    { src: "/Necoclí 2024 (3).webp", alt: "Necoclí 3" },
    { src: "/Necoclí 2024 (5).webp", alt: "Necoclí 5" },
    { src: "/Necoclí 2024 (6).webp", alt: "Necoclí 6" },
    { src: "/Necoclí 2024 (7).webp", alt: "Necoclí 7" },
    { src: "/Necoclí 2024 (8).webp", alt: "Necoclí 8" },
    { src: "/Necoclí 2024 (9).webp", alt: "Necoclí 9" },
    { src: "/Necoclí 2024 (10).webp", alt: "Necoclí 10" },
    { src: "/Necoclí 2024 (11).webp", alt: "Necoclí 11" },
    { src: "/Necoclí 2024 (12).webp", alt: "Necoclí 12" },
    { src: "/Necoclí 2024 (13).webp", alt: "Necoclí 13" },
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
export default function PhotographyPage() {
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
                        // PRJ_05 — PHOTOGRAPHY
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight">
                        Photography
                    </h1>
                    <p className="text-lg text-[#777] mt-4 max-w-2xl mx-auto">
                        Communicating through images
                    </p>
                </div>

                <BadgeRow badges={BADGES} />

                {/* Hero Video */}
                <ViewerCard label="TIMELAPSE_PREVIEW" className="overflow-hidden">
                    <video
                        controls
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full h-auto"
                    >
                        <source src="/Timelapse 18 de julio 2022.webm" type="video/webm" />
                        Your browser does not support video playback.
                    </video>
                </ViewerCard>

                {/* Intro */}
                <ViewerCard label="INTRO" className="mt-8">
                    <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                        Photography is an essential tool in my work as a designer. It allows
                        me to document projects, capture key moments, and communicate ideas
                        visually and effectively. Through my images, I strive to convey the
                        essence of each project and highlight its impact.
                    </p>
                </ViewerCard>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 2 — Focus and Applications
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Target} label="FOCUS_APPLICATIONS" title="Focus and Applications" />

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Focus Points */}
                    <ViewerCard label="PHOTOGRAPHIC_FOCUS">
                        <p className="text-sm text-[#666] dark:text-[#aaa] mb-4">
                            My photographic approach focuses on recording projects and creating
                            images that complement my design work. I use photography to:
                        </p>
                        <ul className="space-y-3">
                            {FOCUS_POINTS.map((point) => (
                                <li key={point.title} className="text-sm text-[#666] dark:text-[#aaa]">
                                    <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">
                                        {point.icon} {point.title}:
                                    </strong>{" "}
                                    {point.desc}
                                </li>
                            ))}
                        </ul>
                    </ViewerCard>

                    {/* Technical Skills */}
                    <ViewerCard label="TECHNICAL_SKILLS">
                        <div className="flex items-center gap-3 mb-4">
                            <Camera className="size-5 text-brand-salmon" strokeWidth={1.5} />
                            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6]">
                                Technical Skills
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {TECHNICAL_SKILLS.map((skill, i) => (
                                <li
                                    key={i}
                                    className="text-sm font-medium text-[#1a1a1a] dark:text-[#faf9f6] border-l-2 border-brand-salmon/30 pl-4"
                                >
                                    {skill}
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
                SECTION 3 — Personal Showcase
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Briefcase} label="PERSONAL_SHOWCASE" title="Personal Showcase" />

                <p className="text-[10px] font-mono text-brand-blue tracking-widest uppercase mb-4">
                    // PORTRAIT_NATURE_LANDSCAPES — SELECTED_PHOTOGRAPHS
                </p>

                <LightboxGallery images={PORTRAIT_IMAGES} columns={3} label="PHOTO" />
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 4 — Voices in Movement
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Briefcase} label="PROJECT_EXAMPLE" title="Project Examples" />

                <ViewerCard label="VOICES_IN_MOVEMENT" className="mb-6">
                    <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-2">
                        🌤️ Voices in Movement
                    </h3>
                    <p className="text-sm text-[#666] dark:text-[#aaa] leading-relaxed">
                        Photographic coverage of the &quot;Voces en Movimiento&quot; (Voices in
                        Movement) event in Necoclí, Antioquia (February 13, 2024). The
                        objective was to document the meetings of this women&apos;s collective,
                        which seeks to empower women in the region through education and
                        dialogue on gender issues.
                    </p>
                </ViewerCard>

                <LightboxGallery images={NECOCLI_IMAGES} columns={4} label="NECOCLI" />
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
