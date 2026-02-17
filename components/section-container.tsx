import { cn } from "@/lib/utils"

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    className?: string
}

export function SectionContainer({
    children,
    className,
    ...props
}: SectionContainerProps) {
    return (
        <section
            className={cn(
                "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24",
                className
            )}
            {...props}
        >
            {children}
        </section>
    )
}
