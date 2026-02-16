"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-white font-mono tracking-tight">
          studio<span className="text-[#c4f0a0]">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#888888] hover:text-white transition-colors font-mono tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="text-sm font-mono text-[#0a0a0a] bg-[#c4f0a0] hover:bg-[#b0e088] px-5 py-2.5 rounded-full transition-colors font-semibold"
          >
            {"Let's Talk"}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-[#1a1a1a] p-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg text-[#888888] hover:text-white transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm font-mono text-[#0a0a0a] bg-[#c4f0a0] px-5 py-2.5 rounded-full transition-colors font-semibold w-fit mt-2"
            >
              {"Let's Talk"}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
