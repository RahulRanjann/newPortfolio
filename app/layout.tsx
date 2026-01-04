import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Fira_Code } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Rahul Ranjan - Full Stack Developer",
  description:
    "Building immersive web experiences and robust backend systems with a focus on security and performance.",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${firaCode.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <Script 
          src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
