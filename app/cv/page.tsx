import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Download, FileText, User, Briefcase, Wrench } from "lucide-react"
import { SectionContainer } from "@/components/section-container"
import { ViewerCard } from "@/components/ui/viewer-card"

const CV_FILE_PATH =
  "/CV%20Johan%20Caicedo%20-%202024%20-%20Digital%20and%20Multimedia%20Designer.pdf"

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description:
    "Curriculum Vitae of Johan Caicedo, Digital and Multimedia Designer. View online or download the PDF.",
  openGraph: {
    title: "Curriculum Vitae",
    description: "View and download Johan Caicedo's Curriculum Vitae.",
    images: ["/og-image.jpg"],
  },
}

const BADGES = [
  { label: "Digital Design", color: "#eea284" },
  { label: "UI/UX", color: "#bbc9d8" },
  { label: "Editorial", color: "#f7df91" },
  { label: "3D & Motion", color: "#c4debc" },
]

export default function CvPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <SectionContainer className="py-4 md:py-4">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-mono text-[#999] hover:text-brand-salmon transition-colors group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          // BACK_TO_PROJECTS
        </Link>
      </SectionContainer>

      <SectionContainer className="py-8 md:py-12">
        <div className="text-center mb-8">
          <p className="text-[10px] font-mono text-brand-blue tracking-widest uppercase mb-2">
            // PROFILE_DOCUMENT
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight">
            Curriculum Vitae
          </h1>
          <p className="text-lg text-[#777] mt-4 max-w-2xl mx-auto">
            Technical overview of experience, education, and design capabilities.
          </p>
        </div>

        <nav className="flex flex-wrap gap-2 justify-center mb-8" aria-label="CV tags">
          {BADGES.map((badge) => (
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ViewerCard label="PROFILE">
            <div className="flex items-center gap-3">
              <User className="size-5 text-brand-salmon" />
              <p className="text-sm font-medium text-[#1a1a1a] dark:text-[#faf9f6]">Johan Caicedo</p>
            </div>
          </ViewerCard>
          <ViewerCard label="ROLE">
            <div className="flex items-center gap-3">
              <Briefcase className="size-5 text-brand-salmon" />
              <p className="text-sm font-medium text-[#1a1a1a] dark:text-[#faf9f6]">
                Digital and Multimedia Designer
              </p>
            </div>
          </ViewerCard>
          <ViewerCard label="FORMAT">
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-brand-salmon" />
              <p className="text-sm font-medium text-[#1a1a1a] dark:text-[#faf9f6]">PDF Document</p>
            </div>
          </ViewerCard>
        </div>

        <ViewerCard label="CV_VIEWER">
          <div className="w-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <iframe
              src={CV_FILE_PATH}
              title="Curriculum Vitae - Johan Caicedo"
              className="w-full min-h-[70vh]"
            />
          </div>
        </ViewerCard>

        <p className="mt-6 text-center text-xs font-mono text-[#777] dark:text-[#999] tracking-wide">
          If the embedded viewer does not load in your browser, use the direct open/download actions below.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 items-center justify-center">
          <a
            href={CV_FILE_PATH}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/10 dark:border-white/10 hover:border-brand-blue text-sm font-mono tracking-wider uppercase text-[#1a1a1a] dark:text-[#faf9f6] hover:text-brand-blue transition-colors"
          >
            <Download className="size-4" />
            Download CV
          </a>

          <a
            href={CV_FILE_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-black/10 dark:border-white/10 hover:border-brand-salmon text-sm font-mono tracking-wider uppercase text-[#1a1a1a] dark:text-[#faf9f6] hover:text-brand-salmon transition-colors"
          >
            <Wrench className="size-4" />
            Open PDF in new tab
          </a>
        </div>
      </SectionContainer>
    </main>
  )
}
