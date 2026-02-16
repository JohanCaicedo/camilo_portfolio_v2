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
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 bg-[#faf9f6]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-[#1a1a1a] font-mono tracking-tight">
          studio<span className="text-[#999999]">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#777777] hover:text-[#1a1a1a] transition-colors font-mono tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="text-sm font-mono text-[#faf9f6] bg-[#1a1a1a] hover:bg-[#333333] px-5 py-2.5 rounded-full transition-colors font-semibold"
          >
            {"Let's Talk"}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#1a1a1a] p-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#faf9f6]/95 backdrop-blur-lg border-t border-[#e5e5e0] p-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg text-[#777777] hover:text-[#1a1a1a] transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm font-mono text-[#faf9f6] bg-[#1a1a1a] px-5 py-2.5 rounded-full transition-colors font-semibold w-fit mt-2"
            >
              {"Let's Talk"}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
