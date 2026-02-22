"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { AnimatedFoxLogo } from "@/components/animated-fox-logo"
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
  { label: "Web Design", href: "/web-design" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Editorial Design", href: "/editorial-design" },
  { label: "Photography", href: "/photography" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-background/80 fixed top-3 right-4 left-4 z-50 border border-black/5 px-6 backdrop-blur-md transition-all duration-300 lg:px-12 dark:border-white/5 rounded-2xl shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        {/* Home Button (Logo Replacement) */}
        <Link
          href="/"
          className="group rounded-sm p-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          aria-label="Home"
        >
          <AnimatedFoxLogo className="size-12 transition-transform duration-200 group-hover:scale-[1.2]" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-brand-blue dark:text-muted-foreground dark:hover:text-brand-blue focus-visible:ring-brand-blue rounded-sm font-mono text-sm font-medium tracking-wide transition-colors outline-none focus-visible:ring-2"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Menu & Theme Toggle */}
        <div className="hidden items-center gap-4 md:flex">
          <ModeToggle />

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                style={{ touchAction: "manipulation" }}
                className="hover:border-brand-blue/50 focus-visible:ring-brand-blue/50 group relative h-12 w-12 overflow-hidden rounded-full border border-black/10 outline-none focus-visible:ring-2 focus-visible:ring-inset dark:border-white/10"
              >
                {/* Profile Image (Base) */}
                <Image
                  src="/Profile-Foto-Camilo.webp"
                  alt="Portrait of Johan Caicedo, designer and founder of Paper Fox Studio"
                  fill
                  sizes="48px"
                  className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 will-change-[opacity] group-hover:opacity-0"
                />

                {/* Fox GIF (Hover) */}
                <Image
                  src="/Foxy-Blink-nav-bar.gif"
                  alt="Paper Fox Studio animated mascot"
                  fill
                  sizes="48px"
                  unoptimized
                  className="absolute inset-0 h-full w-full scale-100 object-cover opacity-0 transition-all duration-300 will-change-[opacity,transform] group-hover:scale-110 group-hover:opacity-100"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background dark:bg-background w-56 border-black/10 dark:border-white/10"
            >
              <DropdownMenuLabel className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                Johan Camilo Caicedo
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-black/5 dark:bg-white/5" />
              <div className="text-muted-foreground dark:text-muted-foreground space-y-1 px-2 py-1.5 font-mono text-xs">
                <p>camilo.design07@gmail.com</p>
                <p>+57 300 3094625</p>
              </div>
              <DropdownMenuSeparator className="bg-black/5 dark:bg-white/5" />
              <DropdownMenuItem asChild>
                <Link
                  href="/cv"
                  className="text-foreground dark:text-foreground hover:text-brand-blue cursor-pointer font-mono text-xs focus:bg-black/5 dark:focus:bg-white/5"
                >
                  View Curriculum
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ touchAction: "manipulation" }}
          className="text-foreground dark:text-foreground focus-visible:ring-brand-blue hover:text-brand-blue rounded-md p-2 transition-colors outline-none focus-visible:ring-2 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="bg-background/95 border-border animate-in slide-in-from-top-2 absolute top-20 right-0 left-0 border-b p-6 shadow-lg backdrop-blur-lg md:hidden dark:border-white/10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-brand-blue dark:text-muted-foreground dark:hover:text-brand-blue focus-visible:ring-brand-blue flex w-fit items-center gap-2 rounded-sm font-mono text-lg font-medium transition-colors outline-none focus-visible:ring-2"
              >
                <AnimatedFoxLogo className="size-6" /> Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-brand-blue dark:text-muted-foreground dark:hover:text-brand-blue focus-visible:ring-brand-blue w-fit rounded-sm font-mono text-lg font-medium transition-colors outline-none focus-visible:ring-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-px w-full bg-black/5 dark:bg-white/5" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-black/10 dark:border-white/10">
                  <AvatarImage src="/Profile-Foto-Camilo.webp" alt="Johan Caicedo profile photo" />
                  <AvatarFallback className="bg-brand-blue/10 text-brand-blue">JC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-foreground dark:text-foreground text-sm font-bold">
                    Johan Caicedo
                  </span>
                  <Link href="/cv" className="text-brand-blue font-mono text-xs hover:underline">
                    View CV
                  </Link>
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
