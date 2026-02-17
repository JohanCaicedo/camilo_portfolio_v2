"use client"

import { useEffect } from "react"

export function HomeScrollSnap() {
  useEffect(() => {
    const html = document.documentElement
    html.classList.add("home-snap")

    return () => {
      html.classList.remove("home-snap")
    }
  }, [])

  return null
}
