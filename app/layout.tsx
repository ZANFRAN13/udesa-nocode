import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "UdeSA NO-CODE & AI",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* Preload Twitter widgets to speed up embeds */}
        <Script id="twitter-widgets" src="https://platform.twitter.com/widgets.js" strategy="afterInteractive" />
        <Suspense
          fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
              <div className="loader-udesa text-center">
                <img src="/images/udesa-logo-black-v.jpg" alt="UdeSA" className="h-28 w-auto animate-udesa-in" />
                <p className="text-gray-300 mt-4">Cargando...</p>
              </div>
            </div>
          }
        >
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
