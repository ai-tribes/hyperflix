"use client";

import React from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import Features from '@/components/marketing/Features'
import ROI from '@/components/marketing/ROI'
import Platform from '@/components/marketing/Platform'
import Token from '@/components/marketing/Token'
import CTA from '@/components/marketing/CTA'

const HeroNew = dynamic(() => import('@/components/marketing/HeroNew'), { 
  ssr: false,
  loading: () => <div style={{ height: '100vh', background: '#000' }} />
})

const VideoShowcase = dynamic(() => import('@/components/marketing/VideoShowcase'), {
  ssr: false,
  loading: () => <div style={{ height: '400px', background: 'transparent' }} />
})

export default function Home() {
  return (
    <main>
      <Header />
      <HeroNew />
      <VideoShowcase />
      <Features />
      <ROI />
      <Platform />
      <Token />
      <CTA />
      <Footer />
    </main>
  )
} 