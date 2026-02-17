"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed right-6 z-50 p-3 bg-background border border-black/10 dark:border-white/10 rounded-full shadow-lg hover:border-brand-salmon hover:shadow-xl transition-all md:hidden"
          style={{
            touchAction: "manipulation",
            bottom: "calc(1.5rem + env(safe-area-inset-bottom))",
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="size-5 text-foreground" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
