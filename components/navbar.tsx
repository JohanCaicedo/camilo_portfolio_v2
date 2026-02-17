"use client"

import { useState } from "react"
import { Menu, X, Home } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 bg-background/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Home Button (Logo Replacement) */}
        <a
          href="/"
          className="p-2 text-[#1a1a1a] dark:text-[#faf9f6] hover:text-brand-blue dark:hover:text-brand-blue transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm"
          aria-label="Home"
        >
          <Home className="size-6" strokeWidth={1.5} />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#777777] hover:text-brand-blue dark:text-[#a0a0a0] dark:hover:text-brand-blue transition-colors font-mono tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* User Menu & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative h-12 w-12 rounded-full overflow-hidden border border-black/10 dark:border-white/10 hover:border-brand-blue transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-blue group">
                {/* Profile Image (Base) */}
                <img
                  src="/Profile-Foto-Camilo.webp"
                  alt="Profile"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-user.jpg";
                  }}
                />

                {/* Fox GIF (Hover) */}
                <img
                  src="/Foxy-Blink-nav-bar.gif"
                  alt="Fox"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#faf9f6] dark:bg-[#0a0a0a] border-black/10 dark:border-white/10">
              <DropdownMenuLabel className="font-mono text-xs text-[#777777] uppercase tracking-widest">
                Johan Camilo Caicedo
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-black/5 dark:bg-white/5" />
              <div className="px-2 py-1.5 text-xs text-[#555555] dark:text-[#a0a0a0] font-mono space-y-1">
                <p>camilo.design07@gmail.com</p>
                <p>+57 300 3094625</p>
              </div>
              <DropdownMenuSeparator className="bg-black/5 dark:bg-white/5" />
              <DropdownMenuItem asChild>
                <a href="/cv" className="font-mono text-xs cursor-pointer text-[#1a1a1a] dark:text-[#faf9f6] focus:bg-black/5 dark:focus:bg-white/5 hover:text-brand-blue">
                  View Curriculum
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#1a1a1a] dark:text-[#faf9f6] p-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md hover:text-brand-blue transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-[#e5e5e0] dark:border-white/10 p-6 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <a
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-[#777777] hover:text-brand-blue dark:text-[#a0a0a0] dark:hover:text-brand-blue transition-colors font-mono outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm w-fit flex items-center gap-2"
              >
                <Home className="size-5" /> Home
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-[#777777] hover:text-brand-blue dark:text-[#a0a0a0] dark:hover:text-brand-blue transition-colors font-mono outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-sm w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="h-px w-full bg-black/5 dark:bg-white/5" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-black/10 dark:border-white/10">
                  <AvatarImage src="/Profile-Foto-Camilo.webp" alt="User" />
                  <AvatarFallback className="bg-brand-blue/10 text-brand-blue">JC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1a1a1a] dark:text-[#faf9f6]">Johan Caicedo</span>
                  <a href="/cv" className="text-xs font-mono text-brand-blue hover:underline">View CV</a>
                </div>
              </div>
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
