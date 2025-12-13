import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { AppAuthProvider } from '@/contexts/AuthContext'
import dynamic from 'next/dynamic'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const CustomCursor = dynamic(() => import('@/components/effects/CustomCursor'), {
  ssr: false
})

export const metadata = {
  title: 'HyperFlix - AI Viral Marketing Platform | Turn Memecoins Into Billions',
  description: 'Revolutionary AI that creates viral TikTok content. Watch your memecoin explode from $0 to $100M in days.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppAuthProvider>
          <CustomCursor />
          {children}
        </AppAuthProvider>
      </body>
    </html>
  )
} 