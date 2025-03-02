import React from 'react'
import './globals.css'
import { Poppins } from 'next/font/google'
import ClientLayout from '@/components/layout/ClientLayout'
import { Metadata } from 'next'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export function generateMetadata(): Metadata {
  return {
    title: 'HyperFlix - The Ultimate Memecoin Marketing Platform',
    description: 'AI-powered platform for creating viral TikTok content for memecoins.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 