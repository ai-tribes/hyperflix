"use client";

import React from 'react'
import styles from './Token.module.css'
import GlitchText from '@/components/effects/GlitchText'

const Token = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Premium Creator Access',
      description: 'Hold $FLIX for unlimited video generation, priority support, and exclusive avatar drops.'
    },
    {
      icon: '💰',
      title: 'Profit Sharing',
      description: 'Earn passive income from platform fees. The more HyperFlix grows, the more you earn.'
    },
    {
      icon: '⚡',
      title: 'Early Access',
      description: 'Get first access to new features, AI models, and beta testing opportunities.'
    }
  ]

  return (
    <section id="token" className={styles.tokenSection}>
      <div className="container">
        <div className={styles.tokenContainer}>
          <div className={styles.tokenContent}>
            <h2>Own a Piece of the <GlitchText text="Viral Economy" /></h2>
            <p>$FLIX isn't just access to the platform - it's ownership in the future of memecoin marketing. As more projects succeed using HyperFlix, your tokens become more valuable.</p>
            <div className={styles.tokenFeatures}>
              {features.map((feature, index) => (
                <div key={index} className={styles.tokenFeature}>
                  <div className={styles.tokenFeatureIcon}>{feature.icon}</div>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.tokenDistribution}>
            <div className={styles.tokenCircle} />
            <div className={styles.tokenLegend}>
              <div className={styles.tokenLegendItem}>
                <div className={styles.tokenLegendColor} style={{ background: 'var(--primary)' }} />
                <span>Public Sale (40%)</span>
              </div>
              <div className={styles.tokenLegendItem}>
                <div className={styles.tokenLegendColor} style={{ background: 'var(--secondary)' }} />
                <span>Platform Development (25%)</span>
              </div>
              <div className={styles.tokenLegendItem}>
                <div className={styles.tokenLegendColor} style={{ background: 'var(--accent)' }} />
                <span>Team & Advisors (15%)</span>
              </div>
              <div className={styles.tokenLegendItem}>
                <div className={styles.tokenLegendColor} style={{ background: 'rgba(255,255,255,0.3)' }} />
                <span>Community Rewards (20%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Token 