"use client";

import React from 'react'
import styles from './CTA.module.css'
import GlitchText from '@/components/effects/GlitchText'

const CTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <h2>Your Next <GlitchText text="Viral Video" /> is <GlitchText text="30 Seconds" /> Away</h2>
        <p>Stop watching other tokens moonshot while yours stays flat. Create viral content that actually works. Join 85K+ creators already making millions.</p>
        <div className={styles.ctaButtons}>
          <a href="/auth/signup" className="btn btn-accent">Start Creating Free →</a>
          <a href="#token" className="btn">Buy $FLIX for Premium</a>
        </div>
      </div>
    </section>
  )
}

export default CTA 