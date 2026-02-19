import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"
import { AtomCursor } from "@/components/atom-cursor"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageLoader } from "@/components/page-loader"
import { MotionProvider } from "@/components/motion-provider"

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://paperfoxstudio.com"),
  title: {
    default: "Paper Fox Studio",
    template: "%s | Paper Fox Studio",
  },
  description: 'Crafting immersive web experiences that blend creativity with cutting-edge technology',
  generator: 'v0.app',
  applicationName: 'Paper Fox Studio',
  authors: [{ name: 'Johan Caicedo', url: 'https://paperfoxstudio.com' }],
  creator: 'Johan Caicedo',
  publisher: 'Paper Fox Studio',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://paperfoxstudio.com",
    siteName: "Paper Fox Studio",
    title: "Paper Fox Studio",
    description: "Crafting immersive web experiences that blend creativity with cutting-edge technology",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Paper Fox Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper Fox Studio",
    description: "Crafting immersive web experiences that blend creativity with cutting-edge technology",
    creator: "@paperfoxstudio",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <PageLoader />
            <div className="relative z-10">
              <Navbar />
              {children}
              <Footer />
            </div>
            <InteractiveGridPattern />
            <AtomCursor />
            <ScrollToTop />
            <Analytics />
            <JsonLd />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
