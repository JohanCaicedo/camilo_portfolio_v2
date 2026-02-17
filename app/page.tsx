import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { EducationSection } from "@/components/education-section"
import { SkillsSection } from "@/components/skills-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
    </main>
  )
}
