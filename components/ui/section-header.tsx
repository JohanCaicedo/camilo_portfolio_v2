import { LucideIcon } from "lucide-react"

export function SectionHeader({
    icon: Icon,
    label,
    title,
}: {
    icon: LucideIcon
    label: string
    title: string
}) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className="p-2.5 border border-black/10 dark:border-white/10 rounded-sm bg-black/5 dark:bg-white/5">
                <Icon className="size-5 text-brand-salmon" strokeWidth={1.5} />
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] dark:text-[#faf9f6] tracking-tight leading-none">
                    {title}
                </h2>
                <p className="text-[10px] font-mono text-brand-salmon mt-1 tracking-widest uppercase">
                    // {label}
                </p>
            </div>
        </div>
    )
}
