import React from 'react'
import './globals.css'
import { Poppins } from 'next/font/google'
import { AppAuthProvider } from '@/contexts/AuthContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'Hyper-Flix.com - The Ultimate Memecoin Marketing Platform',
  description: 'AI-powered platform for creating viral TikTok content for memecoins.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppAuthProvider>
          {children}
        </AppAuthProvider>
      </body>
    </html>
  )
} 