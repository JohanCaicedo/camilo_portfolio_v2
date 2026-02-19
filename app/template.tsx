"use client"

import { m } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            {children}
        </m.div>
    )
}
