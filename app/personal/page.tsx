import type { Metadata } from "next"
import Link from "next/link"
import {
    ArrowLeft,
    Palette,
    Sparkles,
    BarChart3,
    Box,
    Heart,
    type LucideIcon,
} from "lucide-react"
import { SectionContainer } from "@/components/section-container"
import { ViewerCard } from "@/components/ui/viewer-card"
import { LightboxImage } from "@/components/ui/image-lightbox"

export const metadata: Metadata = {
    title: "Personal Projects — Paper Fox Studio",
    description:
        "Explore the personal projects of Johan Caicedo, including animation, illustration, and branding for Paper Fox Studio.",
    openGraph: {
        title: "Personal Projects — Paper Fox Studio",
        description:
            "Animation, illustration, and branding for Paper Fox Studio.",
        images: [
            "https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Foxy-Blink.gif?alt=media&token=6fdef4b7-2f2f-4fbd-94a0-65a59868bfee",
        ],
    },
}

/* ─── Data ─── */

const BADGES = [
    { label: "Illustration", color: "#e46f4d" },
    { label: "Branding", color: "#97acc6" },
    { label: "Storytelling", color: "#d4a24e" },
    { label: "Animation", color: "#6dae6b" },
]

const LOGO_DESIGN_POINTS = [
    {
        icon: "💛",
        title: "Golden Ratio",
        desc: "The golden ratio was used to create the modules that make up the logo, ensuring visual harmony and aesthetic balance.",
    },
    {
        icon: "⭕",
        title: "Circular Shapes",
        desc: "The inclusion of circular elements conveys a sense of closeness, friendliness, and accessibility to the audience.",
    },
    {
        icon: "✏️",
        title: "Fennec Fox Representation",
        desc: "The Fennec fox, with its distinctive silhouette and expressive features, is subtly yet recognizably integrated into the logo.",
    },
]

const LOGO_DETERMINANTS = [
    {
        icon: "📝",
        title: "Illustrated",
        desc: "The golden ratio was used to create the modules that make up the logo, ensuring visual harmony and aesthetic balance.",
    },
    {
        icon: "🙂",
        title: "Brand Identity",
        desc: "The inclusion of circular elements conveys a sense of closeness, friendliness, and accessibility to the audience.",
    },
    {
        icon: "👁️",
        title: "Recognizable Silhouette",
        desc: "The Fennec fox, with its distinctive silhouette and expressive features, is subtly yet recognizably integrated into the logo.",
    },
]

const WORKFLOW_ITEMS = [
    "🦊 Market research",
    "🪄 Brand creation",
    "📝 Legal structure and financing",
    "💸 Marketing and sales",
    "👨‍💻 Operations and administration",
    "🪴 Growth and expansion",
]

const VIDEOS = [
    {
        src: "/PaperFoxStudio-Build.webm",
        poster: "/poster.webp",
        label: "LOGO_BUILD",
        caption: "Paper Fox Studio Logo V1 Build",
        type: "video/webm",
    },
    {
        src: "/Nile Riggin.webm",
        poster: "/PaperFoxLogoV2.webp",
        label: "RIGGING_2D",
        caption: "2D Rigging in After Effects and Duik Angela",
        type: "video/webm",
    },
    {
        src: "/Neil-Style.webm",
        poster: "/Nile-Style.webp",
        label: "STYLE_TIMELAPSE",
        caption: "Illustration timelapse using Infinite Painter",
        type: "video/webm",
    },
    {
        src: "/Zorrito-Nahim-Paint.mp4",
        poster: null,
        label: "PAINT_TIMELAPSE",
        caption: "Nile fennec fox painting final version timelapse",
        type: "video/mp4",
    },
    {
        src: "/Render_New_Zorrito 360_Cycles-Web.mp4",
        poster: null,
        label: "3D_RENDER",
        caption: "3D Model and Render in Blender using Cycles",
        type: "video/mp4",
    },
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
export default function PersonalPage() {
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
                        // PRJ_03 — PERSONAL
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight">
                        Personal Projects
                    </h1>
                    <p className="text-lg text-[#777] mt-4 max-w-2xl mx-auto">
                        Paper Fox Studio
                    </p>
                </div>

                <BadgeRow badges={BADGES} />

                {/* Hero Banner */}
                <ViewerCard label="BANNER_PREVIEW" className="overflow-hidden">
                    <LightboxImage
                        src="/ID-Personal.webp"
                        alt="Paper Fox Studio personal identity"
                    />
                </ViewerCard>
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 2 — Project Details
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <div className="grid md:grid-cols-2 gap-8">
                    <ViewerCard label="PROJECT_DETAILS">
                        <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-3">
                            Project Details
                        </h3>
                        <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                            Paper Fox Studio is my personal project, an animation and editorial
                            illustration studio. It is born from my passion for animation and
                            visual storytelling, with the goal of inspiring through unique
                            stories and aesthetics.
                        </p>
                    </ViewerCard>
                    <ViewerCard label="MISSION_VISION">
                        <ul className="space-y-3 text-[#666] dark:text-[#aaa]">
                            <li>
                                <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">🌟 Mission:</strong>{" "}
                                To inspire through creativity, captivating stories, and visually
                                stunning illustrations.
                            </li>
                            <li>
                                <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">🔭 Vision:</strong>{" "}
                                To become a world-leading studio in the creation of creative
                                experiences that excite and connect with people of all ages and cultures.
                            </li>
                            <li>
                                <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">💡 Values:</strong>{" "}
                                Creativity, quality, and passion for art in all its forms.
                            </li>
                        </ul>
                    </ViewerCard>
                </div>

                {/* Specs Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {[
                        { label: "ROLE", value: "Project Lead" },
                        {
                            label: "TEAM",
                            value: "Viviana Tovar",
                            link: "https://www.instagram.com/quas.art/",
                        },
                        { label: "STATUS", value: "Working on it" },
                        {
                            label: "TOOLS",
                            value: "Figma, Illustrator, Photoshop, Blender, Maya, Substance Painter",
                        },
                    ].map((spec) => (
                        <div
                            key={spec.label}
                            className="border border-black/10 dark:border-white/10 p-4 bg-black/[0.02] dark:bg-white/[0.02]"
                        >
                            <p className="text-[10px] font-mono text-brand-blue tracking-widest uppercase mb-1">
                                {spec.label}
                            </p>
                            {"link" in spec && spec.link ? (
                                <a
                                    href={spec.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-brand-salmon hover:underline"
                                >
                                    {spec.value}
                                </a>
                            ) : (
                                <p className="text-sm font-medium text-[#1a1a1a] dark:text-[#faf9f6]">
                                    {spec.value}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 3 — Flowchart
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={BarChart3} label="CREATION_FLOWCHART" title="Creation Process" />

                <p className="text-[#666] dark:text-[#aaa] leading-relaxed mb-6">
                    The flowchart illustrates my plan to create and grow Paper Fox Studio.
                    I am currently in the business planning phase, researching the market
                    and defining the studio&apos;s mission and objectives. This detailed plan
                    will guide the next stages, from brand creation to studio expansion.
                </p>

                <ViewerCard label="FIGMA_EMBED" className="overflow-hidden">
                    <iframe
                        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2Fp7w4TjLESvQfPmxLsfrv84%2FMindmap-(Community)%3Fnode-id%3D0-1%26t%3DiFmcAKuGvymkMgI5-1"
                        className="w-full aspect-[8/3] border-0"
                        allowFullScreen
                        title="Paper Fox Studio creation flowchart"
                    />
                </ViewerCard>

                {/* Workflow Pre-production */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <ViewerCard label="WORKFLOW">
                        <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-2">
                            Workflow (Pre-production)
                        </h3>
                        <p className="text-sm text-[#666] dark:text-[#aaa]">
                            I am currently in the pre-production phase, working on a
                            comprehensive business plan that includes:
                        </p>
                    </ViewerCard>
                    <ViewerCard label="PLAN_ITEMS">
                        <ul className="space-y-2">
                            {WORKFLOW_ITEMS.map((item) => (
                                <li
                                    key={item}
                                    className="text-sm font-medium text-[#1a1a1a] dark:text-[#faf9f6]"
                                >
                                    {item}
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
                SECTION 4 — Branding & Visual Identity
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Heart} label="BRAND_IDENTITY" title="Branding and Visual Identity" />

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Logo Design */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Palette className="size-5 text-brand-salmon" strokeWidth={1.5} />
                            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6]">
                                Logo Design
                            </h3>
                        </div>
                        <p className="text-sm text-[#666] dark:text-[#aaa] mb-4">
                            The logo, the central symbol of the brand, was designed following
                            rigorous design canons:
                        </p>
                        <ul className="space-y-3">
                            {LOGO_DESIGN_POINTS.map((point) => (
                                <li key={point.title} className="text-sm text-[#666] dark:text-[#aaa]">
                                    <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">
                                        {point.icon} {point.title}:
                                    </strong>{" "}
                                    {point.desc}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Brand Description */}
                    <ViewerCard label="BRAND_FOUNDATION">
                        <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                            The brand-building process for Paper Fox Studio was based on
                            creating a strong and cohesive visual identity, centered around
                            the main character, Nile the Fennec fox. His illustration style,
                            evoking warmth and curiosity, became the aesthetic foundation of
                            the studio.
                        </p>
                    </ViewerCard>
                </div>

                {/* Moodboard */}
                <div className="mt-8">
                    <ViewerCard label="MOODBOARD" className="overflow-hidden">
                        <LightboxImage
                            src="/Personal-MoodBoard.webp"
                            alt="Visual identity and character MoodBoard"
                        />
                    </ViewerCard>
                    <p className="text-xs font-mono text-[#999] text-right mt-2 uppercase tracking-wider">
                        // visual_identity_moodboard
                    </p>
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 5 — Logo Determinants
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Box} label="LOGO_DETERMINANTS" title="Logo Determinants" />

                <div className="grid md:grid-cols-2 gap-6">
                    <ViewerCard label="DETERMINANT_DESC">
                        <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                            The result is a logo that is not only visually appealing but also
                            effectively communicates the values and personality of Paper Fox
                            Studio. It is a symbol that invites the audience to explore the
                            world of animation and illustration through the eyes of Nile, the
                            Fennec fox.
                        </p>
                    </ViewerCard>
                    <div className="space-y-3">
                        {LOGO_DETERMINANTS.map((det) => (
                            <div
                                key={det.title}
                                className="border border-black/10 dark:border-white/10 p-4 bg-black/[0.02] dark:bg-white/[0.02]"
                            >
                                <p className="text-sm text-[#666] dark:text-[#aaa]">
                                    <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">
                                        {det.icon} {det.title}:
                                    </strong>{" "}
                                    {det.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 6 — Logo Construction
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Palette} label="CONSTRUCTION" title="Logo Construction" />

                {/* V1 + Build Video */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <ViewerCard label="LOGO_V1" className="overflow-hidden">
                        <LightboxImage
                            src="/PaperFoxStudioV1.webp"
                            alt="Paper Fox Studio Logo V1"
                        />
                        <p className="text-xs font-mono text-[#999] text-right mt-2 uppercase tracking-wider">
                            // logo_v1
                        </p>
                    </ViewerCard>
                    <ViewerCard label="LOGO_BUILD" className="overflow-hidden">
                        <video
                            controls
                            autoPlay
                            muted
                            playsInline
                            poster="/poster.webp"
                            className="w-full h-auto"
                        >
                            <source src="/PaperFoxStudio-Build.webm" type="video/webm" />
                            Your browser does not support video playback.
                        </video>
                        <p className="text-xs font-mono text-[#999] text-right mt-2 uppercase tracking-wider">
                            // logo_v1_build
                        </p>
                    </ViewerCard>
                </div>

                {/* V2 + Safe Areas */}
                <div className="grid md:grid-cols-2 gap-4">
                    <ViewerCard label="LOGO_V2" className="overflow-hidden">
                        <LightboxImage
                            src="/PaperFoxLogoV2.webp"
                            alt="Paper Fox Studio Logo V2"
                        />
                        <p className="text-xs font-mono text-[#999] text-right mt-2 uppercase tracking-wider">
                            // logo_v2 — retouched by{" "}
                            <a
                                href="https://www.instagram.com/quas.art/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-salmon hover:underline"
                            >
                                Viviana Tovar
                            </a>
                        </p>
                    </ViewerCard>
                    <ViewerCard label="SAFE_AREAS" className="overflow-hidden">
                        <LightboxImage
                            src="/PFS-SafeAreas.webp"
                            alt="Paper Fox Studio safe areas"
                        />
                        <p className="text-xs font-mono text-[#999] text-right mt-2 uppercase tracking-wider">
                            // safe_areas
                        </p>
                    </ViewerCard>
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 7 — Style Explore
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Sparkles} label="STYLE_EXPLORATION" title="Style Explore" />

                <ViewerCard label="STYLE_DESC" className="mb-6">
                    <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                        These videos showcase my skills in 2D animation and digital
                        illustration. I love bringing characters to life and telling visual
                        stories.
                    </p>
                </ViewerCard>

                <div className="grid md:grid-cols-2 gap-4">
                    {VIDEOS.slice(1).map((video) => (
                        <ViewerCard key={video.label} label={video.label} className="overflow-hidden">
                            <video
                                controls
                                autoPlay
                                muted
                                playsInline
                                poster={video.poster || undefined}
                                className="w-full h-auto"
                            >
                                <source src={video.src} type={video.type} />
                                Your browser does not support video playback.
                            </video>
                            <p className="text-xs font-mono text-[#999] text-right mt-2 uppercase tracking-wider">
                                // {video.caption.toLowerCase().replace(/\s+/g, "_")}
                            </p>
                        </ViewerCard>
                    ))}
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 8 — Launch Strategy & Next Steps
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={BarChart3} label="STRATEGY" title="Launch Strategy" />

                <div className="grid md:grid-cols-2 gap-6">
                    <ViewerCard label="MARKET_RESEARCH">
                        <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                            The construction of the visual identity was created through market
                            research aimed at identifying common points and thereby
                            understanding the visual language used by entities participating
                            in this niche.
                        </p>
                    </ViewerCard>
                    <ViewerCard label="COLOR_STRATEGY">
                        <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                            With that information, a distinctive color palette was created,
                            aligned with the themes the client addresses and their fields of
                            action.
                        </p>
                    </ViewerCard>
                </div>

                {/* Next Steps */}
                <div className="mt-8">
                    <div className="flex items-center gap-3 mb-4">
                        <BarChart3 className="size-5 text-brand-salmon" strokeWidth={1.5} />
                        <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6]">
                            Next Steps
                        </h3>
                    </div>
                    <ViewerCard label="NEXT_STEPS">
                        <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                            With the business plan underway, I will focus on creating engaging
                            content for Instagram and developing my website.
                        </p>
                    </ViewerCard>
                </div>
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
