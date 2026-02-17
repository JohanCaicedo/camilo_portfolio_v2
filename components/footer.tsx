import Link from "next/link"
import { Github, Linkedin, Mail, Instagram, Phone } from "lucide-react"

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

export function Footer() {
    const year = new Date().getFullYear()

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
                <div className="pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p className="text-[10px] font-mono text-[#999] tracking-wide">
                        © {year} Paper Fox Studio. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                        <span className="text-[10px] font-mono text-[#999] tracking-wide uppercase">
                            STATUS: ONLINE
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
