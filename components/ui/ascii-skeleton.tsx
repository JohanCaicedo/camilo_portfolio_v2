"use client"

export function AsciiSkeleton() {
  const chars = ["@", "#", "*", "+", ":", ".", " "]
  
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="grid grid-cols-12 gap-1 opacity-40">
        {Array.from({ length: 96 }).map((_, i) => (
          <span
            key={i}
            className="text-xs font-mono text-muted-foreground animate-pulse"
            style={{ 
              animationDelay: `${(i % 12) * 50 + Math.floor(i / 12) * 30}ms`,
              animationDuration: '1.5s'
            }}
          >
            {chars[i % chars.length]}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-mono text-brand-salmon tracking-widest animate-pulse">
          INIT_3D_RENDER...
        </span>
      </div>
    </div>
  )
}
