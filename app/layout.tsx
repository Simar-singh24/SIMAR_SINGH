import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://simar-singh.vercel.app'),
  title: 'Simarjot Singh | Full-Stack Developer & ML Engineer',
  description: 'Portfolio of Simarjot Singh, a Full-Stack Developer and Machine Learning Engineer specializing in building scalable platforms, ML integrations, and premium interactive web applications.',
  keywords: [
    'Simarjot Singh',
    'Simar-singh24',
    'Full Stack Developer',
    'Machine Learning Engineer',
    'AI Engineer',
    'Next.js Portfolio',
    'React Developer',
    'FastAPI',
    'Python ML',
    'Creative Frontend'
  ],
  authors: [{ name: 'Simarjot Singh', url: 'https://github.com/Simar-singh24' }],
  creator: 'Simarjot Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://simar-singh.vercel.app',
    title: 'Simarjot Singh | Full-Stack Developer & ML Engineer',
    description: 'Portfolio of Simarjot Singh, a Full-Stack Developer and Machine Learning Engineer specializing in building scalable platforms, ML integrations, and premium interactive web applications.',
    siteName: 'Simarjot Singh Portfolio',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Simarjot Singh Logo',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simarjot Singh | Full-Stack Developer & ML Engineer',
    description: 'Portfolio of Simarjot Singh, a Full-Stack Developer and Machine Learning Engineer specializing in building scalable platforms, ML integrations, and premium interactive web applications.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import CustomCursor from '@/components/CustomCursor'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
