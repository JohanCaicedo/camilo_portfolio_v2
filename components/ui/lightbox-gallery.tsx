"use client"

import { ViewerCard } from "@/components/ui/viewer-card"
import { LightboxImage } from "@/components/ui/image-lightbox"

/* ─── Lightbox Gallery ─── */
export function LightboxGallery({
    images,
    columns = 3,
    label,
}: {
    images: { src: string; alt: string }[]
    columns?: number
    label: string
}) {
    const gridClass =
        columns === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : columns === 4
                ? "grid-cols-2 md:grid-cols-4"
                : "grid-cols-2 md:grid-cols-3"
    return (
        <div className={`grid ${gridClass} gap-4`}>
            {images.map((img, i) => (
                <ViewerCard
                    key={img.src}
                    label={`${label}_${String(i + 1).padStart(2, "0")}`}
                >
                    <LightboxImage
                        src={img.src}
                        alt={img.alt}
                        gallery={images}
                        index={i}
                    />
                </ViewerCard>
            ))}
        </div>
    )
}
