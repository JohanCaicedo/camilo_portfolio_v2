import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Wand2, Palette, User, Pencil, Hammer, BarChart3, Lightbulb, type LucideIcon } from "lucide-react"
import { SectionContainer } from "@/components/section-container"
import { ViewerCard } from "@/components/ui/viewer-card"
import { LightboxImage } from "@/components/ui/image-lightbox"
import { LightboxGallery } from "@/components/ui/lightbox-gallery"

export const metadata: Metadata = {
    title: "Web Design",
    description:
        "Explore the web design portfolio of Johan Caicedo, featuring the redesign of the ILSA website, a project focused on UI/UX, visual identity, and SEO optimization.",
    openGraph: {
        title: "Web Design",
        description:
            "Explore the web design portfolio of Johan Caicedo, featuring the redesign of the ILSA website.",
        images: [
            "https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA-web-mockup-V1-left.webp?alt=media&token=ffaa1e36-fb49-49b6-b19c-a5bf2baff3eb",
        ],
    },
}

/* ─── Data ─── */

const BADGES = [
    { label: "Web Design", color: "#eea284" },
    { label: "Image Editing", color: "#bbc9d8" },
    { label: "Illustration", color: "#f7df91" },
    { label: "WordPress", color: "#c4debc" },
]

const PROCESS_STEPS = [
    { title: "Map", subtitle: "Delimit", color: "#9695b5" },
    { title: "Explore", subtitle: "Understanding", color: "#7544a6" },
    { title: "Build", subtitle: "Develop", color: "#3d4a98" },
    { title: "Test", subtitle: "Feedback", color: "#f0e2d4" },
]

const COLOR_PALETTE = [
    { color: "#454C73", label: "Primary" },
    { color: "#3B82F6", label: "Secondary" },
    { color: "#497CBF", label: "Tertiary" },
    { color: "#454C73", label: "Tertiary 2" },
    { color: "#BFAD75", label: "Accent" },
]

const GALLERY_IMAGES = [
    { src: "/Web-Gallery6.webp", alt: "ILSA Illustration 1" },
    { src: "/Web-Gallery7.webp", alt: "ILSA Illustration 2" },
    { src: "/Web-Gallery8.webp", alt: "ILSA Illustration 3" },
    { src: "/Web-Gallery9.webp", alt: "ILSA Illustration 4" },
    { src: "/Web-Gallery10.webp", alt: "ILSA Illustration 5" },
    { src: "/Web-Gallery1.webp", alt: "ILSA Illustration 6" },
    { src: "/Web-Gallery11.webp", alt: "ILSA Illustration 7" },
    { src: "/Web-Gallery5.webp", alt: "ILSA Illustration 8" },
    { src: "/Web-Gallery12.webp", alt: "ILSA Illustration 9" },
]

const CHALLENGES = [
    {
        title: "Lack of visual appeal:",
        description:
            "The existing website was not visually appealing nor did it effectively communicate ILSA's mission.",
    },
    {
        title: "Difficult navigation:",
        description:
            "The dense content and lack of hierarchy made it difficult to navigate and access information.",
    },
    {
        title: "Low online visibility:",
        description:
            "The site was not optimized for search engines, limiting its reach.",
    },
]

/* ─── Section Header Helper ─── */
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

/* ─── Page ─── */
export default function WebDesignPage() {
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
                        // PRJ_01 — CASE_STUDY
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight">
                        Web Design
                    </h1>
                    <p className="text-lg text-[#777] mt-4 max-w-2xl mx-auto">
                        Reimagining ILSA&apos;s Digital Presence
                    </p>
                </div>

                {/* Badges */}
                <nav className="flex flex-wrap gap-2 justify-center mb-10" aria-label="Project tags">
                    {BADGES.map((badge) => (
                        <span
                            key={badge.label}
                            className="px-3 py-1 text-xs font-mono uppercase tracking-wider border rounded-sm"
                            style={{
                                borderColor: badge.color,
                                color: badge.color,
                                backgroundColor: `${badge.color}10`,
                            }}
                        >
                            {badge.label}
                        </span>
                    ))}
                </nav>

                {/* Hero Mockup Image */}
                <ViewerCard label="MOCKUP_PREVIEW" className="overflow-hidden">
                    <LightboxImage
                        src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA-Web-mockup.webp?alt=media&token=780054d4-1628-4e29-8652-29148ff403e5"
                        alt="ILSA website redesign mockup"
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
                            I served as the lead designer in creating the new website for ILSA,
                            a non-governmental organization with over 40 years of experience
                            focusing its efforts on supporting social movements, grassroots
                            organizations, and disadvantaged sectors of society. This experience
                            was rewarding, as it allowed me to apply my knowledge as a designer,
                            utilizing Design Thinking as the primary methodology.
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
                        { label: "ROLE", value: "Web Designer, UI/UX" },
                        { label: "TEAM", value: "Viviana Tovar" },
                        { label: "DURATION", value: "4 months" },
                        { label: "TOOLS", value: "Figma, Illustrator, Photoshop, WordPress" },
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

            {/* ══════════════════════════════════════════════
                SECTION 3 — Context & Challenges
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="md:col-span-2">
                        <ViewerCard label="CONTEXT_IMG" className="overflow-hidden">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA-Web-mockup-1.webp?alt=media&token=20977961-0397-4c6e-b91f-efd038073d62"
                                alt="ILSA website mockup detail"
                                className="w-full h-auto"
                                loading="lazy"
                            />
                        </ViewerCard>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        <ViewerCard label="CONTEXT">
                            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-3">
                                Context
                            </h3>
                            <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                                As a starting point, I established an overall goal for the project,
                                derived from an interview with ILSA&apos;s board of directors. During
                                this conversation, the need to improve the visual representation of
                                the website and ensure proper readability for visitors was
                                identified. To address this issue, we chose to work with a
                                simplified version of Design Thinking, with a special focus on the
                                construction phase.
                            </p>
                        </ViewerCard>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ViewerCard label="OBJECTIVE">
                                <h4 className="text-sm font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-2">
                                    Main Objective
                                </h4>
                                <p className="text-sm text-[#666] dark:text-[#aaa] leading-relaxed">
                                    Provide an accurate, coherent, and aesthetically pleasing
                                    communication tool. Through a design process, establish a creative
                                    foundation to continue evolving the identity, hand in hand with the
                                    organization&apos;s growth.
                                </p>
                            </ViewerCard>
                            <ViewerCard label="CHALLENGES">
                                <h4 className="text-sm font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-2">
                                    Challenges
                                </h4>
                                <p className="text-sm text-[#666] dark:text-[#aaa] leading-relaxed">
                                    ILSA lacked an online presence commensurate with its relevance in
                                    the sector. Additionally, it did not have a defined visual identity
                                    or communication language. The website was not optimized for SEO.
                                </p>
                            </ViewerCard>
                        </div>
                    </div>
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 4 — Design Process
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Wand2} label="METHODOLOGY_LOADED" title="Design Process" />

                {/* Moodboard */}
                <ViewerCard label="MOODBOARD" className="overflow-hidden mb-8">
                    <a
                        href="https://ilsa.org.co/voces-en-movimiento/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Artboard%201.webp?alt=media&token=3f717565-0d68-4b7a-bb5c-e60ece2ebbbc"
                            alt="ILSA design moodboard"
                            className="w-full h-auto hover:opacity-90 transition-opacity"
                            loading="lazy"
                        />
                    </a>
                </ViewerCard>

                {/* Problem Definition */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <ViewerCard label="PROBLEM_DEF">
                        <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-3">
                            Problem Definition
                        </h3>
                        <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                            The project began with an in-depth interview with the client,
                            where they expressed the need for a website that reflected the
                            importance and impact of their work. We identified the following
                            key challenges:
                        </p>
                    </ViewerCard>
                    <ViewerCard label="KEY_ISSUES">
                        <ol className="space-y-3">
                            {CHALLENGES.map((item, i) => (
                                <li key={i} className="text-sm text-[#666] dark:text-[#aaa]">
                                    <span className="font-mono text-brand-salmon text-[10px] mr-2">
                                        0{i + 1}
                                    </span>
                                    <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">
                                        {item.title}
                                    </strong>{" "}
                                    {item.description}
                                </li>
                            ))}
                        </ol>
                        <p className="text-sm text-[#666] dark:text-[#aaa] mt-4 pt-3 border-t border-black/5 dark:border-white/5">
                            With these challenges in mind, we established the goal of creating
                            a website that was visually appealing, easy to use, readable, and
                            optimized for SEO.
                        </p>
                    </ViewerCard>
                </div>

                {/* Conceptualization — Figma Embed */}
                <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-4">
                    Conceptualization and Design
                </h3>
                <ViewerCard label="FIGMA_BOARD" className="overflow-hidden mb-8">
                    <div className="w-full aspect-[16/9] relative">
                        <iframe
                            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2Fy8YZXMIIogI6XgTZNQXQmb%2FUntitled%3Fnode-id%3D0-1%26t%3Dbkn2jdLYoVMPi8gU-1"
                            className="absolute top-0 left-0 w-full h-full border-0"
                            allowFullScreen
                            title="ILSA Figma design board"
                        />
                    </div>
                </ViewerCard>

                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    <p className="md:col-span-2 text-[#666] dark:text-[#aaa] leading-relaxed">
                        To address these challenges, we adopted a simplified Design Thinking
                        approach, focusing on the construction phase due to the client&apos;s
                        prioritization of aesthetics. I started with hand investigation to
                        explore different structures and content hierarchies.
                    </p>
                    <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                        Then, I created a flowchart to visualize the site navigation and
                        wireframes in Figma to define the layout of elements on each page.
                    </p>
                </div>

                {/* Process Steps */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
                    {PROCESS_STEPS.map((step, i) => (
                        <div key={i} className="flex flex-col items-center group">
                            <p className="text-[10px] font-mono text-brand-blue tracking-widest uppercase mb-1">
                                STEP_0{i + 1}
                            </p>
                            <p className="text-center text-lg font-bold text-[#1a1a1a] dark:text-[#faf9f6]">
                                {step.title}
                            </p>
                            <p className="text-center text-xs text-[#999] mb-3">
                                {step.subtitle}
                            </p>
                            <div
                                className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg border border-black/10 dark:border-white/10 group-hover:scale-105 transition-transform duration-300 ${i === 2 ? "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" : ""}`}
                                style={{ backgroundColor: step.color }}
                            />
                        </div>
                    ))}
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 5 — Visual Identity
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Palette} label="PALETTE_LOADED" title="Visual Identity" />

                {/* Color Palette Info */}
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 mb-6">
                    <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#faf9f6] col-span-1">
                        Color Palette
                    </h3>
                    <p className="col-span-2 sm:col-span-3 text-[#666] dark:text-[#aaa] text-sm leading-relaxed">
                        The construction of the visual identity was created through market
                        research aimed at identifying common points and thereby understanding
                        the visual language used by entities participating in this niche.
                    </p>
                    <p className="col-span-2 text-[#666] dark:text-[#aaa] text-sm leading-relaxed">
                        With that information, a distinctive color palette was created,
                        aligned with the themes the client addresses and their fields of
                        action.
                    </p>
                </div>

                {/* Color Swatches */}
                <ViewerCard label="COLOR_SYSTEM" className="mb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                        {COLOR_PALETTE.map((c) => (
                            <div key={c.label} className="flex flex-col items-center text-center">
                                <div
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-black/10 dark:border-white/10 mb-2"
                                    style={{ backgroundColor: c.color }}
                                />
                                <p className="text-xs font-bold text-[#1a1a1a] dark:text-[#faf9f6]">
                                    {c.label}
                                </p>
                                <p className="text-[10px] font-mono text-[#999] uppercase">
                                    {c.color}
                                </p>
                            </div>
                        ))}
                    </div>
                </ViewerCard>

                {/* Typography */}
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 mb-6">
                    <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#faf9f6] col-span-1">
                        Typography
                    </h3>
                    <p className="col-span-5 text-[#666] dark:text-[#aaa] text-sm leading-relaxed">
                        Chosen based on readability and uniformity criteria.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ViewerCard label="FONT_01">
                        <h4 className="text-sm font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-2">
                            Merriweather Sans
                        </h4>
                        <p className="text-sm text-[#666] dark:text-[#aaa] break-all">
                            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Ññ Oo Pp Qq Rr Ss Tt
                            Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7 8 9 ¡ ! ¿ ? , . : ; - _ &apos; &quot;
                        </p>
                    </ViewerCard>
                    <ViewerCard label="FONT_02">
                        <h4 className="text-sm font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-2">
                            Source Sans Pro
                        </h4>
                        <p className="text-sm text-[#666] dark:text-[#aaa] break-all">
                            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Ññ Oo Pp Qq Rr Ss Tt
                            Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7 8 9 ¡ ! ¿ ? , . : ; - _ &apos; &quot;
                        </p>
                    </ViewerCard>
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 6 — UI/UX
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader
                    icon={User}
                    label="UI_UX_MODULE"
                    title="Interface Design and User Experience"
                />

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <ViewerCard label="WIREFRAME_HOME" className="overflow-hidden">
                        <LightboxImage
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA%20-Wireframe%20-Home.webp?alt=media&token=9942a7aa-1739-46b0-a690-dfa4d8a04033"
                            alt="ILSA homepage wireframe"
                        />
                        <p className="text-[10px] font-mono text-[#999] mt-2 tracking-wide uppercase">
                            // wireframe — home page
                        </p>
                    </ViewerCard>
                    <div className="space-y-4">
                        <ViewerCard label="UX_NOTE">
                            <p className="text-sm text-[#666] dark:text-[#aaa] leading-relaxed">
                                I prioritized visual hierarchy and information synthesis, using
                                high-quality images to complement the textual content and make
                                it more engaging.
                            </p>
                        </ViewerCard>
                        <ViewerCard label="WIREFRAME_MEDIA" className="overflow-hidden">
                            <LightboxImage
                                src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA%20-Wireframe%20-Multimedia.webp?alt=media&token=fd066bba-fb7c-4788-983d-080570bcf825"
                                alt="ILSA multimedia page wireframe"
                            />
                            <p className="text-[10px] font-mono text-[#999] mt-2 tracking-wide uppercase">
                                // wireframe — multimedia page
                            </p>
                        </ViewerCard>
                    </div>
                </div>

                {/* Illustrations */}
                <SectionHeader icon={Pencil} label="ASSETS_LOADED" title="Illustrations" />
                <p className="text-[#666] dark:text-[#aaa] leading-relaxed mb-6">
                    Original illustrations were integrated throughout the ILSA website to
                    enhance content, guide users, and create a more engaging experience.
                </p>
                <LightboxGallery images={GALLERY_IMAGES} columns={3} label="IMG" />
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 7 — Implementation
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader
                    icon={Hammer}
                    label="BUILD_PHASE"
                    title="Implementation and Optimization"
                />
                <div className="grid md:grid-cols-2 gap-6">
                    <ViewerCard label="TECH_STACK">
                        <p className="text-sm text-[#666] dark:text-[#aaa] leading-relaxed">
                            WordPress was selected as the platform due to its ease of use and{" "}
                            <strong className="text-[#1a1a1a] dark:text-[#faf9f6]">
                                flexibility.
                            </strong>{" "}
                            Elementor builder and Bridge template were leveraged to streamline
                            development and enable design customization. Yoast SEO was
                            implemented to optimize metadata, links, and images, ultimately
                            improving the site&apos;s search engine visibility.
                        </p>
                    </ViewerCard>
                    <ViewerCard label="BACKEND_PREVIEW" className="overflow-hidden">
                        <LightboxImage
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA%20Wordpress%20backend.webp?alt=media&token=77aa0c98-e10a-4c38-ac8d-1832c57d5cdb"
                            alt="ILSA WordPress backend dashboard"
                        />
                    </ViewerCard>
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 8 — Results
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader
                    icon={BarChart3}
                    label="ANALYTICS_DATA"
                    title="Results and Learnings"
                />
                <ViewerCard label="METRICS" className="mb-6">
                    <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                        The redesigned ILSA website successfully aligns with the
                        organization&apos;s mission, attracting over 15,000 visitors. Utilizing
                        Design Thinking and WordPress streamlined development, resulting in an
                        effective and maintainable site. This project was a valuable learning
                        experience, highlighting the importance of client communication,
                        project management, and adaptability in real-world design scenarios.
                    </p>
                </ViewerCard>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <ViewerCard label="STATS_01" className="overflow-hidden">
                        <LightboxImage
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA%20-%20Clodflare%20stadistics%20(1).webp?alt=media&token=e30afec0-0a9e-467a-a4d8-01a1d3fcc116"
                            alt="Cloudflare analytics for ILSA website"
                        />
                    </ViewerCard>
                    <ViewerCard label="STATS_02" className="overflow-hidden">
                        <LightboxImage
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA%20-%20Clodflare%20stadistics%20(2).webp?alt=media&token=726e9429-d215-4577-8108-4ffc6763426b"
                            alt="Cloudflare traffic statistics for ILSA website"
                        />
                    </ViewerCard>
                </div>

                {/* Before / After Comparison */}
                <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-4">
                    ILSA&apos;s Website Comparison
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <ViewerCard label="BEFORE">
                        <p className="text-[10px] font-mono text-brand-salmon tracking-widest uppercase mb-3">
                            // STATE: BEFORE
                        </p>
                        <LightboxImage
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA%20After.webp?alt=media&token=938eeb1f-52df-4cc4-8b0d-2fd44e6b9b9c"
                            alt="ILSA website before redesign"
                        />
                    </ViewerCard>
                    <ViewerCard label="AFTER">
                        <p className="text-[10px] font-mono text-brand-green tracking-widest uppercase mb-3">
                            // STATE: AFTER
                        </p>
                        <LightboxImage
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA-Before.webp?alt=media&token=93376329-7e5d-47c2-8bfa-0f6b1a20847a"
                            alt="ILSA website after redesign"
                        />
                    </ViewerCard>
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 9 — Conclusion
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Lightbulb} label="SUMMARY_COMPLETE" title="Conclusion" />
                <ViewerCard label="CONCLUSION" className="max-w-3xl mx-auto">
                    <div className="p-4 sm:p-6 bg-brand-green/10 border border-brand-green/20 rounded-sm">
                        <p className="text-[#1a1a1a] dark:text-[#faf9f6] font-medium leading-relaxed text-center">
                            The redesigned ILSA website successfully aligns with the
                            organization&apos;s mission, attracting over 15,000 daily visitors.
                            Utilizing Design Thinking and WordPress streamlined development,
                            resulting in an effective and maintainable site. This project was a
                            valuable learning experience, highlighting the importance of client
                            communication, project management, and adaptability in real-world
                            design scenarios.
                        </p>
                    </div>
                </ViewerCard>
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
