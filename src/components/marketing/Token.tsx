"use client";

import React from 'react'
import styles from './Token.module.css'

const Token = () => {
  const features = [
    {
      icon: '💎',
      title: 'Platform Access',
      description: 'Hold $FLIX to access premium features and create unlimited viral content.'
    },
    {
      icon: '📈',
      title: 'Revenue Share',
      description: 'Earn a share of platform revenue based on your token holdings.'
    },
    {
      icon: '🎯',
      title: 'Governance Rights',
      description: 'Vote on platform features and token economics.'
    }
  ]

  return (
    <section id="token" className={styles.tokenSection}>
      <div className="container">
        <div className={styles.tokenContainer}>
          <div className={styles.tokenContent}>
            <h2>The $FLIX Token Economy</h2>
            <p>$FLIX is more than just a utility token - it's your stake in the future of memecoin marketing and the growing platform revenue.</p>
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