import { SectionContainer } from "@/components/section-container"
import { SocialPill } from "@/components/ui/social-pill"
import { Github, Linkedin, Mail } from "lucide-react"

export function AboutSection() {
    return (
        <SectionContainer className="pt-0 md:pt-0">
            <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto mt-24 md:mt-32">

                {/* Technical Vertical Line */}
                <div className="h-16 w-px border-r border-dashed border-brand-green/50 mb-8 relative">
                    <div className="absolute top-0 -left-[3px] w-2 h-px bg-brand-green" />
                    <div className="absolute bottom-0 -left-[3px] w-2 h-px bg-brand-green" />
                </div>

                {/* Intro Tagline */}
                {/* Removed "Visual Designer & Creative Developer" as per user request */}

                {/* Bio Text */}
                {/* Removed Bio Text as per user request */}

                {/* Social Links */}
                {/* Removed Social Links as per user request */}
            </div>
        </SectionContainer>
    )
}
