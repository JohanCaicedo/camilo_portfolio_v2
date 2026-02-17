import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"
import dynamic from "next/dynamic"

// Fix #11: Lazy-load below-fold sections for smaller initial bundle
const ProjectsSection = dynamic(
  () => import("@/components/projects-section").then((m) => ({ default: m.ProjectsSection })),
)
const ExperienceSection = dynamic(
  () => import("@/components/experience-section").then((m) => ({ default: m.ExperienceSection })),
)
const EducationSection = dynamic(
  () => import("@/components/education-section").then((m) => ({ default: m.EducationSection })),
)
const SkillsSection = dynamic(
  () => import("@/components/skills-section").then((m) => ({ default: m.SkillsSection })),
)

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
    </main>
  )
}
