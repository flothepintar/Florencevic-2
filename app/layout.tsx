import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const SITE_URL = 'https://florencevic.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Florencevic Pondaag — Technology & E-Commerce Manager',
  description:
    'Technology and e-commerce manager building automation systems, AI workflows, e-commerce infrastructure, mobile applications and digital tools. Based in Bali, Indonesia.',
  keywords: [
    'Full-Stack Developer',
    'Automation',
    'AI',
    'E-Commerce',
    'Software Development',
    'Web Development',
    'Android',
    'Business Automation',
    'Bali',
    'Indonesia',
    'Florencevic Pondaag',
  ],
  authors: [{ name: 'Florencevic Pondaag' }],
  creator: 'Florencevic Pondaag',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Florencevic Pondaag — Technology & E-Commerce Manager',
    description:
      'I build software that does the work. Full-stack applications, automation systems, AI workflows, and digital tools that solve real-world business problems.',
    siteName: 'Florencevic Pondaag',
    images: [
      {
        url: '/og.png',
        width: 1536,
        height: 1024,
        alt: 'Florencevic Pondaag — Systems, Automation, AI, and Commerce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Florencevic Pondaag — Technology & E-Commerce Manager',
    description:
      'I build software that does the work. Automation · AI · E-Commerce · Business Systems · Mobile.',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#030807',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
