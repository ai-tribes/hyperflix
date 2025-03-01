"use client";

import React from 'react'
import styles from './CTA.module.css'

const CTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <h2>Ready to Go Viral?</h2>
        <p>Join the revolution in memecoin marketing and start creating viral content that drives real adoption.</p>
        <div className={styles.ctaButtons}>
          <a href="#" className="btn">Buy $FLIX Token</a>
          <a href="#" className="btn btn-accent">Launch App</a>
        </div>
      </div>
    </section>
  )
}

export default CTA 