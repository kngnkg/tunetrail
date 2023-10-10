import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

import "@/styles/globals.css"

import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"

const notojp = Noto_Sans_JP({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "TuneTrail",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background", notojp.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
