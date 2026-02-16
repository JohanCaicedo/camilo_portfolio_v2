import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <Navbar />
      <HeroSection />
    </main>
  )
}
