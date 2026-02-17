import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Wand2, Palette, Sparkles, Briefcase, type LucideIcon } from "lucide-react"
import { SectionContainer } from "@/components/section-container"
import { ViewerCard } from "@/components/ui/viewer-card"
import { LightboxGallery } from "@/components/ui/lightbox-gallery"
import { LightboxImage } from "@/components/ui/image-lightbox"

export const metadata: Metadata = {
    title: "Graphic Design",
    description:
        "Explore the graphic design portfolio of Johan Caicedo, featuring branding projects, logo designs, and illustrations for clients like ILSA.",
    openGraph: {
        title: "Graphic Design",
        description:
            "Explore the graphic design portfolio of Johan Caicedo, featuring branding projects, logo designs, and illustrations.",
        images: [
            "https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA-Banner-2024.webp?alt=media&token=e2597250-4690-400d-89b7-f44bb61b53fb",
        ],
    },
}

/* ─── Data ─── */

const BRANDING_BADGES = [
    { label: "Creative Direction", color: "#4e5e37" },
    { label: "Visual Identity", color: "#5e332c" },
    { label: "Theory of Color", color: "#584b29" },
    { label: "Typography", color: "#6a7a8a" },
    { label: "Brand Manual", color: "#53345c" },
    { label: "Adobe Illustrator", color: "#e46f4d" },
]

const COLOR_PALETTE = [
    { color: "#4e7cce", label: "Lawyer" },
    { color: "#686868", label: "Monochrome" },
    { color: "#efefef", label: "Negative" },
    { color: "#5e3b69", label: "Women" },
    { color: "#af9cb5", label: "Women 2" },
]

const USE_CASE_IMAGES = [
    { src: "/Use Case (2).webp", alt: "ILSA Use Case 1" },
    { src: "/Use Case (1).webp", alt: "ILSA Use Case 2" },
    { src: "/Use Case (3).webp", alt: "ILSA Use Case 3" },
    { src: "/Use Case (4).webp", alt: "ILSA Use Case 4" },
    { src: "/Use Case (5).webp", alt: "ILSA Use Case 5" },
]

const POSTCARDS = [
    { src: "/Postales_1.webp", alt: "Postcards 1" },
    { src: "/Postales_2.webp", alt: "Postcards 2" },
    { src: "/Postales_3.webp", alt: "Postcards 3" },
    { src: "/Postales_4.webp", alt: "Postcards 4" },
    { src: "/Postales_5-1.webp", alt: "Postcards 5" },
    { src: "/Postales_6.webp", alt: "Postcards 6" },
    { src: "/Postales_7.webp", alt: "Postcards 7" },
]

const WEB_BANNERS = [
    { src: "/Web-Banner (4).webp", alt: "Web Banner 1" },
    { src: "/Web-Banner (2).webp", alt: "Web Banner 2" },
    { src: "/Web-Banner (1).webp", alt: "Web Banner 3" },
    { src: "/Web-Banner(5).webp", alt: "Web Banner 4" },
]

const ACIJ_PIECES = [
    { src: "/Publicaciones_1.webp", alt: "ACIJ Piece 1" },
    { src: "/Publicaciones_2.webp", alt: "ACIJ Piece 2" },
    { src: "/Publicaciones_3.webp", alt: "ACIJ Piece 3" },
    { src: "/Publicaciones_4.webp", alt: "ACIJ Piece 4" },
    { src: "/Publicaciones_5.webp", alt: "ACIJ Piece 5" },
]

const ILLUSTRATIONS = [
    { src: "/Illustration (1).webp", alt: "Illustration 1" },
    { src: "/Illustration.webp", alt: "Illustration 2" },
]

const GRAPHIC_PIECES_BADGES = [
    { label: "Composition", color: "#4e5e37" },
    { label: "Creativity", color: "#5e332c" },
    { label: "Color", color: "#584b29" },
    { label: "Photoshop", color: "#22282e" },
    { label: "Illustrator", color: "#53345c" },
]

const ILLUSTRATION_BADGES = [
    { label: "Composition", color: "#e56f45" },
    { label: "Creativity", color: "#f3cf59" },
    { label: "Color", color: "#4e5e37" },
    { label: "Photoshop", color: "#001e36" },
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
export default function GraphicDesignPage() {
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
                        // PRJ_02 — CASE_STUDY
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight">
                        Graphic Design
                    </h1>
                    <p className="text-lg text-[#777] mt-4 max-w-2xl mx-auto">
                        ILSA — Branding 2024
                    </p>
                </div>

                <BadgeRow badges={BRANDING_BADGES} />

                {/* Hero Banner */}
                <ViewerCard label="BANNER_PREVIEW" className="overflow-hidden">
                    <LightboxImage
                        src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA-Banner-2024.webp?alt=media&token=e2597250-4690-400d-89b7-f44bb61b53fb"
                        alt="ILSA Branding 2024 banner"
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
                            This ILSA logo redesign project sought to capture their essence as a
                            catalyst for change and growth in Latin America. The new design
                            merges an expanding map of Latin America with a sprouting plant,
                            symbolizing vitality, connection to the land, and the aspiration for
                            a better future.
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
                        { label: "ROLE", value: "Project Lead" },
                        { label: "TEAM", value: "Stand alone" },
                        { label: "DURATION", value: "One month" },
                        { label: "TOOLS", value: "Illustrator" },
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
                <div className="grid md:grid-cols-2 gap-6">
                    <ViewerCard label="IMAGOTYPE" className="overflow-hidden flex items-center justify-center">
                        <LightboxImage
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/ILSA-2024-Imagotipo.webp?alt=media&token=a7a94b92-64e4-4c67-80bb-adc6aa4b21c8"
                            alt="ILSA 2024 imagotype"
                        />
                    </ViewerCard>
                    <div className="space-y-6">
                        <ViewerCard label="CONTEXT">
                            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-3">
                                Context
                            </h3>
                            <p className="text-[#666] dark:text-[#aaa] leading-relaxed">
                                ILSA, a well-established NGO in Latin America, sought to refresh
                                its visual identity to better reflect its mission and values. The
                                organization has experienced significant growth in its reach and
                                impact, and needed an image that would communicate its dynamism
                                and commitment to social and legal development in the region.
                            </p>
                        </ViewerCard>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ViewerCard label="OBJECTIVE">
                                <h4 className="text-sm font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-2">
                                    Main Objective
                                </h4>
                                <p className="text-sm text-[#666] dark:text-[#aaa] leading-relaxed">
                                    To create a new logo that captures the essence of ILSA as an
                                    agent of change and constant growth in Latin America. This
                                    logo should be memorable, versatile, and adaptable to various
                                    contexts.
                                </p>
                            </ViewerCard>
                            <ViewerCard label="CHALLENGES">
                                <h4 className="text-sm font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-2">
                                    Challenges
                                </h4>
                                <p className="text-sm text-[#666] dark:text-[#aaa] leading-relaxed">
                                    Representing the organization&apos;s diverse activities in a
                                    single symbol, conveying the concept of growth and evolution,
                                    and developing a comprehensive brand manual.
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
                SECTION 4 — Logo Design
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Wand2} label="DESIGN_PROCESS" title="Logo Design" />

                {/* Logo Blue + Description */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <ViewerCard label="LOGO_BLUE" className="overflow-hidden bg-[#efefef] dark:bg-[#1a1a1a] flex items-center justify-center">
                        <LightboxImage
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Dise%C3%B1o%20grafico%2FILSA%20Logo%20Azul-12.svg?alt=media&token=37c8c193-7c27-4f38-ac70-1852d5cc7153"
                            alt="ILSA Logo blue"
                        />
                    </ViewerCard>
                    <ViewerCard label="LOGO_DESC" className="bg-[#4e7cce] text-white">
                        <p className="leading-relaxed">
                            The logo has been redesigned from the existing one, creating a new
                            unique isotype that seeks to distinguish the institution in the
                            sector. This new isotype, a stylized world map, incorporates the
                            concept of growth with a germinating plant, representing ILSA&apos;s
                            historical work. Additionally, the ILSA acronym has been updated,
                            establishing design guidelines for its creation.
                        </p>
                    </ViewerCard>
                </div>

                {/* World Map + Favicon */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <ViewerCard label="WORLD_MAP">
                        <h4 className="text-lg font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-2">
                            World Map
                        </h4>
                        <p className="text-sm text-[#666] dark:text-[#aaa] leading-relaxed">
                            The design of the world map is based on simplicity, legibility,
                            and uniqueness. The golden ratio was used as the foundation for
                            its composition, ensuring the harmony of this graphic element.
                        </p>
                        <p className="text-xs text-[#999] mt-2">
                            The maximum size of the world map served as a module to establish
                            the proportions of the other graphic elements.
                        </p>
                    </ViewerCard>
                    <ViewerCard label="FAVICON" className="overflow-hidden bg-[#4e7cce] flex items-center justify-center">
                        <LightboxImage
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Dise%C3%B1o%20grafico%2FILSA-Favicon-Blanco-16.svg?alt=media&token=4de42555-f478-4e00-a02c-8caf81746295"
                            alt="ILSA World Map favicon"
                        />
                    </ViewerCard>
                </div>

                {/* Acronym + Type */}
                <div className="grid md:grid-cols-2 gap-4">
                    <ViewerCard label="ACRONYM_DESC" className="bg-[#4e7cce] text-white">
                        <h4 className="text-lg font-bold mb-2">
                            Acronym and Type
                        </h4>
                        <p className="leading-relaxed">
                            In restructuring the ILSA acronym, the goal was to harmonize the
                            shape of the letters. Design guidelines were established, and
                            issues with kerning and font weight were resolved, bringing
                            cohesion to the two elements of the logo.
                        </p>
                    </ViewerCard>
                    <ViewerCard label="ACRONYM_IMG" className="overflow-hidden bg-[#efefef] dark:bg-[#1a1a1a] flex items-center justify-center">
                        <LightboxImage
                            src="https://firebasestorage.googleapis.com/v0/b/camilo-portfolio-77b8a.appspot.com/o/Dise%C3%B1o%20grafico%2FILSA-Type.svg?alt=media&token=abd052d3-29c2-44b7-9ebb-846fcb543d60"
                            alt="ILSA Logo acronym typography"
                        />
                    </ViewerCard>
                </div>
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 5 — Color Palette
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Palette} label="PALETTE_LOADED" title="Color Palette" />
                <ViewerCard label="COLOR_SYSTEM">
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
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 6 — Use Cases
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <SectionHeader icon={Sparkles} label="BRAND_APPLICATIONS" title="Use Cases" />
                <LightboxGallery images={USE_CASE_IMAGES} columns={3} label="USE" />
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 7 — Graphic Pieces
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <div className="mb-4">
                    <p className="text-[10px] font-mono text-[#999] tracking-widest uppercase text-right mb-2">
                        // portfolio/graphic-pieces
                    </p>
                    <ViewerCard label="GP_BANNER" className="overflow-hidden">
                        <LightboxImage
                            src="/GraphicPieces.webp"
                            alt="Graphic Pieces banner"
                        />
                    </ViewerCard>
                </div>

                <BadgeRow badges={GRAPHIC_PIECES_BADGES} />

                <SectionHeader icon={Briefcase} label="PROJECT_EXAMPLES" title="Graphic Pieces" />

                {/* Postcards */}
                <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-4">
                    ✉️ Voices in Movement Postcards
                </h3>
                <div className="mb-8">
                    <LightboxGallery images={POSTCARDS} columns={2} label="POSTCARD" />
                </div>

                {/* Web Banners */}
                <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-4">
                    🌐 Web Banners
                </h3>
                <div className="mb-8">
                    <LightboxGallery images={WEB_BANNERS} columns={2} label="BANNER" />
                </div>

                {/* ACIJ Pieces */}
                <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#faf9f6] mb-4">
                    🗒️ ACIJ Pieces
                </h3>
                <LightboxGallery images={ACIJ_PIECES} columns={3} label="ACIJ" />
            </SectionContainer>

            {/* Divider */}
            <SectionContainer className="py-0 md:py-0">
                <div className="border-t border-black/10 dark:border-white/10" />
            </SectionContainer>

            {/* ══════════════════════════════════════════════
                SECTION 8 — Illustrations
            ══════════════════════════════════════════════ */}
            <SectionContainer>
                <div className="mb-4">
                    <p className="text-[10px] font-mono text-[#999] tracking-widest uppercase text-right mb-2">
                        // portfolio/illustration
                    </p>
                    <ViewerCard label="ILLUS_BANNER" className="overflow-hidden">
                        <LightboxImage
                            src="/IllustrationBanner.webp"
                            alt="Illustration banner"
                        />
                    </ViewerCard>
                </div>

                <BadgeRow badges={ILLUSTRATION_BADGES} />

                <SectionHeader icon={Briefcase} label="ILLUSTRATION_EXAMPLES" title="Illustrations" />

                <LightboxGallery images={ILLUSTRATIONS} columns={2} label="ILLUS" />
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
