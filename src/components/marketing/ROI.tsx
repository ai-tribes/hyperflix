"use client";

import React from 'react'
import styles from './ROI.module.css'
import GlitchText from '@/components/effects/GlitchText'

const ROI = () => {
  const stats = [
    {
      value: '1,247%',
      label: 'Average token price increase'
    },
    {
      value: '85K+',
      label: 'New holders per month'
    },
    {
      value: '92%',
      label: 'Projects see 10x+ volume'
    },
    {
      value: '30 Days',
      label: 'To reach 100M+ views'
    }
  ]

  return (
    <section id="roi" className={styles.roiSection}>
      <div className="container">
        <div className={styles.roiContainer}>
          <div className={styles.roiContent}>
            <h2><GlitchText text="Real Results" /> From <GlitchText text="Real Projects" /></h2>
            <p>Why pay $50K+ for one influencer when you can create unlimited content for $99/month? Our users consistently outperform traditional marketing.</p>
            <p>Projects using HyperFlix see massive improvements within 30 days:</p>
            
            <div className={styles.roiStats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.roiStat}>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
            
            <p><strong>Case Study:</strong> $MOONCAT went from $50K to $15M market cap in 21 days using just HyperFlix content. Zero influencer spend required.</p>
            <a href="#" className="btn btn-accent">See More Success Stories</a>
          </div>
          <div className={styles.roiChart}>
            <div className={styles.chartContainer}>
              <svg width="300" height="200" viewBox="0 0 300 200">
                {/* Simplified chart representing price action correlation */}
                <path d="M0,150 C50,140 70,180 90,100 C110,20 130,40 150,30 C170,20 190,10 210,5 C230,0 250,10 300,2" 
                      stroke="url(#gradient)" strokeWidth="3" fill="none" />
                <path d="M0,170 C50,160 70,150 90,145 C110,140 130,120 150,90 C170,60 190,40 210,20 C230,10 250,5 300,0" 
                      stroke="#ff3366" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                <text x="20" y="190" fill="rgba(255,255,255,0.7)" fontSize="12">TikTok Views</text>
                <text x="200" y="190" fill="rgba(255,255,255,0.7)" fontSize="12">Token Price</text>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#f7931a' }} />
                    <stop offset="100%" style={{ stopColor: '#ff3366' }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ROI 