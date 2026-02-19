export function BadgeRow({ badges }: { badges: { label: string; color: string }[] }) {
    return (
        <nav className="flex flex-wrap gap-2 justify-center mb-8" aria-label="Project tags">
            {badges.map((badge) => (
                <span
                    key={badge.label}
                    className="px-3 py-1 text-xs font-mono uppercase tracking-wider border rounded-sm"
                    style={{
                        borderColor: badge.color,
                        color: badge.color,
                        backgroundColor: `${badge.color}15`,
                    }}
                >
                    {badge.label}
                </span>
            ))}
        </nav>
    )
}
