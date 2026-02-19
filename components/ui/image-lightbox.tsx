"use client"

import { useCallback, useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { createPortal } from "react-dom"
import Image from "next/image"

/* ─── Types ─── */
interface LightboxImage {
    src: string
    alt: string
}

/* ─── Lightbox Provider Context ─── */
// Simple state-based approach — no context needed

/* ─── Clickable Image ─── */
export function LightboxImage({
    src,
    alt,
    className = "",
    gallery,
    index = 0,
}: {
    src: string
    alt: string
    className?: string
    gallery?: LightboxImage[]
    index?: number
}) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className={`relative group cursor-zoom-in block w-full ${className}`}
                aria-label={`View ${alt} fullscreen`}
            >
                <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 border border-white/40 bg-black/50 backdrop-blur-sm">
                        <ZoomIn className="size-5 text-white" strokeWidth={1.5} />
                    </div>
                </div>
            </button>

            {open && (
                <LightboxModal
                    images={gallery || [{ src, alt }]}
                    initialIndex={gallery ? index : 0}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    )
}

/* ─── Fullscreen Modal ─── */
function LightboxModal({
    images,
    initialIndex,
    onClose,
}: {
    images: LightboxImage[]
    initialIndex: number
    onClose: () => void
}) {
    const [current, setCurrent] = useState(initialIndex)
    const [mounted, setMounted] = useState(false)
    const [visible, setVisible] = useState(false)
    const hasMultiple = images.length > 1

    // Animate in
    useEffect(() => {
        setMounted(true)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setVisible(true))
        })
    }, [])

    const animateOut = useCallback(() => {
        setVisible(false)
        setTimeout(onClose, 200)
    }, [onClose])

    const goNext = useCallback(() => {
        setCurrent((prev) => (prev + 1) % images.length)
    }, [images.length])

    const goPrev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length)
    }, [images.length])

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") animateOut()
            if (e.key === "ArrowRight" && hasMultiple) goNext()
            if (e.key === "ArrowLeft" && hasMultiple) goPrev()
        }
        document.addEventListener("keydown", handler)
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", handler)
            document.body.style.overflow = ""
        }
    }, [animateOut, goNext, goPrev, hasMultiple])

    if (!mounted) return null

    const img = images[current]

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-200 ${visible ? "opacity-100" : "opacity-0"
                }`}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={animateOut}
                role="button"
                tabIndex={-1}
                aria-label="Close lightbox"
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") animateOut()
                }}
            />

            {/* ASCII top bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 md:px-8 py-4">
                <div className="flex items-center gap-3">
                    <p className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                        // IMG_VIEWER
                    </p>
                    {hasMultiple && (
                        <p className="text-[10px] font-mono text-brand-salmon tracking-widest">
                            [{String(current + 1).padStart(2, "0")}/{String(images.length).padStart(2, "0")}]
                        </p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={animateOut}
                    className="p-2 border border-white/20 hover:border-brand-salmon hover:text-brand-salmon text-white/60 transition-colors"
                    aria-label="Close lightbox"
                >
                    <X className="size-5" strokeWidth={1.5} />
                </button>
            </div>

            {/* Image */}
            <div
                className={`relative z-10 w-[90vw] h-[80vh] transition-transform duration-200 ${visible ? "scale-100" : "scale-95"
                    }`}
            >
                <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain select-none"
                    draggable={false}
                    sizes="90vw"
                    priority
                />
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-8 py-4">
                <p className="text-xs font-mono text-white/40 text-center tracking-wider">
                    {img.alt}
                </p>
            </div>

            {/* Navigation arrows */}
            {hasMultiple && (
                <>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            goPrev()
                        }}
                        className="absolute left-4 md:left-8 z-10 p-3 border border-white/20 hover:border-brand-salmon hover:text-brand-salmon text-white/60 transition-colors bg-black/30 backdrop-blur-sm"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="size-5" strokeWidth={1.5} />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            goNext()
                        }}
                        className="absolute right-4 md:right-8 z-10 p-3 border border-white/20 hover:border-brand-salmon hover:text-brand-salmon text-white/60 transition-colors bg-black/30 backdrop-blur-sm"
                        aria-label="Next image"
                    >
                        <ChevronRight className="size-5" strokeWidth={1.5} />
                    </button>
                </>
            )}
        </div>,
        document.body
    )
}
