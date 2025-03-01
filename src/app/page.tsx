import Hero from '@/components/marketing/Hero'
import Features from '@/components/marketing/Features'
import ROI from '@/components/marketing/ROI'
import Platform from '@/components/marketing/Platform'
import Token from '@/components/marketing/Token'
import CTA from '@/components/marketing/CTA'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

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
      <Footer />
    </main>
  )
} 