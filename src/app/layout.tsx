import React from 'react'
import './globals.css'
import { Poppins } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import AuthSessionProvider from '@/components/auth/AuthSessionProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'HyperFlix - The Ultimate Memecoin Marketing Platform',
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
        <AuthSessionProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
} 