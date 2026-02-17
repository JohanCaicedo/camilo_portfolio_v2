import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import { AtomCursor } from "@/components/atom-cursor"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Paper Fox Studio',
  description: 'Crafting immersive web experiences that blend creativity with cutting-edge technology',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10">
            <Navbar />
            {children}
            <Footer />
          </div>
          <InteractiveGridPattern />
          <AtomCursor />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
