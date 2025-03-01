"use client";

import Hero from '@/components/marketing/Hero'
import Features from '@/components/marketing/Features'
import ROI from '@/components/marketing/ROI'
import Platform from '@/components/marketing/Platform'
import Token from '@/components/marketing/Token'
import CTA from '@/components/marketing/CTA'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <ROI />
      <Platform />
      <Token />
      <CTA />
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <Link href="/create" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#FF6B00',
          color: 'white',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          fontSize: '24px',
          textDecoration: 'none'
        }}>
          🎬
        </Link>
        <Link href="/dashboard" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#5865F2',
          color: 'white',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          fontSize: '24px',
          textDecoration: 'none'
        }}>
          📊
        </Link>
      </div>
      <Footer />
    </main>
  )
} 