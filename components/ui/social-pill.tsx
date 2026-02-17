import { cn } from "@/lib/utils"

interface SocialPillProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
    className?: string
}

export function SocialPill({ children, className, ...props }: SocialPillProps) {
    return (
        <a
            className={cn(
                "bg-[#faf9f6] dark:bg-white/5 border border-black/10 dark:border-white/10 flex justify-center items-center gap-x-2 py-2 px-4 text-xs font-mono tracking-widest uppercase transition-all hover:border-brand-blue hover:text-brand-blue text-foreground cursor-pointer decoration-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background relative group",
                className
            )}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        >
            {/* Hover corner accents */}
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />

            {children}
        </a>
    )
}
