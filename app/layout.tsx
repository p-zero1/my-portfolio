import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/layout/LenisProvider'
import CursorGlow from '@/components/layout/CursorGlow'
import SystemStatusBar from '@/components/layout/SystemStatusBar'
import { site } from '@/content/site'

const firaCode = Fira_Code({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name }],
  openGraph: {
    title: site.openGraph.title,
    description: site.openGraph.description,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={firaCode.variable} suppressHydrationWarning>
      <body className="bg-base text-text-1 antialiased overflow-x-hidden" suppressHydrationWarning>
        <LenisProvider>
          {/* Scan line effect */}
          <div className="scan-line" aria-hidden />

          {/* Cursor ambient glow */}
          <CursorGlow />

          {/* Main content */}
          {children}

          {/* Navigation status bar */}
          <SystemStatusBar />
        </LenisProvider>
      </body>
    </html>
  )
}
