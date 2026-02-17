"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    const handleToggle = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const newTheme = theme === "light" ? "dark" : "light"

            // Get click position for the circular reveal origin
            const x = e.clientX
            const y = e.clientY

            // Calculate the max radius needed to cover the entire screen
            const maxRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            )

            // Use View Transition API if available
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    setTheme(newTheme)
                })

                // Apply the custom clip-path animation via CSS custom properties
                document.documentElement.style.setProperty("--reveal-x", `${x}px`)
                document.documentElement.style.setProperty("--reveal-y", `${y}px`)
                document.documentElement.style.setProperty("--reveal-radius", `${maxRadius}px`)
            } else {
                // Fallback for browsers without View Transition API
                setTheme(newTheme)
            }
        },
        [theme, setTheme]
    )

    return (
        <button
            ref={buttonRef}
            onClick={handleToggle}
            className="relative p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground dark:text-foreground" />
            <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground dark:text-foreground" />
        </button>
    )
}
