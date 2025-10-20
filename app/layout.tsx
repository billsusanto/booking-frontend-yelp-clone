import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'BookNow - Discover & Book Local Businesses',
  description: 'Find and book the best restaurants, spas, gyms, and more in your area. Modern booking platform with instant confirmation.',
  keywords: ['booking', 'restaurants', 'spas', 'gyms', 'local business', 'reservations'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900">
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
