"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Instagram, Phone } from "lucide-react"
import { usePerformanceTier, type PerformanceTier } from "@/components/performance-context"

const NAV_LINKS = [
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Education", href: "/#education" },
    { label: "Skills", href: "/#skills" },
]

const SOCIAL_LINKS = [
    { icon: Github, href: "https://github.com/JohanCaicedo", label: "GitHub" },
    { icon: Instagram, href: "https://instagram.com/camilo.cl1", label: "Instagram" },
    { icon: Mail, href: "mailto:camilo.design07@gmail.com", label: "Email" },
    { icon: Phone, href: "tel:+573003094625", label: "Phone" },
]

const TIER_OPTIONS: { value: PerformanceTier; label: string; icon: string }[] = [
    { value: "high", label: "Ultra", icon: "⚡" },
    { value: "medium", label: "Balanced", icon: "⚖️" },
    { value: "low", label: "Lite", icon: "🍃" },
]

export function Footer() {
    const year = new Date().getFullYear()
    const { tier, setTier, isAutoDetected } = usePerformanceTier()

    return (
        <footer className="relative w-full border-t border-black/10 dark:border-white/10 bg-background/80 dark:bg-background/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Top row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
                    {/* Brand */}
                    <div>
                        <p className="text-[10px] font-mono text-brand-blue tracking-widest uppercase mb-2">
                            // SYSTEM_INFO
                        </p>
                        <h3 className="text-lg font-bold text-foreground dark:text-foreground tracking-tight">
                            Paper Fox Studio 🦊🍃
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Visual Design Continuity Across Every Dimension.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p className="text-[10px] font-mono text-brand-blue tracking-widest uppercase mb-3">
                            // NAV_LINKS
                        </p>
                        <nav className="flex flex-col gap-2" aria-label="Footer navigation">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-mono text-muted-foreground dark:text-muted-foreground hover:text-brand-salmon transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Social */}
                    <div>
                        <p className="text-[10px] font-mono text-brand-blue tracking-widest uppercase mb-3">
                            // CONNECT
                        </p>
                        <div className="flex gap-3">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="p-2 border border-black/10 dark:border-white/10 hover:border-brand-salmon dark:hover:border-brand-salmon transition-colors group"
                                >
                                    <social.icon
                                        className="size-4 text-[#666] dark:text-[#888] group-hover:text-brand-salmon transition-colors"
                                        strokeWidth={1.5}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-mono text-[#999] tracking-wide">
                        © {year} Paper Fox Studio. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {/* Performance Tier Selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-[#999] tracking-wide uppercase hidden sm:inline">
                                GFX:
                            </span>
                            <select
                                value={tier}
                                onChange={(e) => setTier(e.target.value as PerformanceTier)}
                                aria-label="Graphics quality tier"
                                className="text-[10px] font-mono text-[#999] tracking-wide uppercase bg-transparent border border-black/10 dark:border-white/10 rounded px-2 py-1 outline-none focus:border-brand-blue hover:border-brand-salmon transition-colors cursor-pointer appearance-none pr-5"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath d='M0 2l4 4 4-4' fill='none' stroke='%23999' stroke-width='1.5'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 6px center",
                                }}
                            >
                                {TIER_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.icon} {opt.label}{isAutoDetected ? " (auto)" : ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status indicator */}
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                            <span className="text-[10px] font-mono text-[#999] tracking-wide uppercase">
                                STATUS: ONLINE
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

