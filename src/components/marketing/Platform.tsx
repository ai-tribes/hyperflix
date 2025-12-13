"use client";

import React from 'react'
import styles from './Platform.module.css'
import GlitchText from '@/components/effects/GlitchText'

const Platform = () => {
  const steps = [
    {
      number: 1,
      title: 'Start Creating',
      description: 'Connect wallet, add your token details. Takes 30 seconds. No technical knowledge required.'
    },
    {
      number: 2,
      title: 'Pick Your Vibe',
      description: 'Choose from 200+ crypto-native avatars that look like real TikTok influencers. Find your perfect match.'
    },
    {
      number: 3,
      title: 'Generate Viral Content',
      description: 'AI creates custom hooks, scripts and videos based on 50M+ viral examples. Each video optimized for maximum engagement.'
    },
    {
      number: 4,
      title: 'Watch It Moonshot',
      description: 'Content goes live instantly. Watch real-time analytics as your token price pumps with each viral video.'
    }
  ]

  return (
    <section id="platform" className={styles.section}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>Go From <GlitchText text="Launch" /> to <GlitchText text="Viral" /> in Minutes</h2>
          <p>No complex setups. No hiring creators. No expensive campaigns. Just pure AI-powered viral content generation that actually works.</p>
        </div>
        <div className={styles.platformGrid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.platformCard}>
              <h3><span>{step.number}</span> {step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Platform 