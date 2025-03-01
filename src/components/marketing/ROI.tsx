"use client";

import React from 'react'
import styles from './ROI.module.css'

const ROI = () => {
  const stats = [
    {
      value: '247%',
      label: 'Average increase in trading volume'
    },
    {
      value: '32K+',
      label: 'New wallet holders per viral video'
    },
    {
      value: '83%',
      label: 'Improved token retention'
    },
    {
      value: '5.4x',
      label: 'Average ROI on marketing spend'
    }
  ]

  return (
    <section id="roi" className={styles.roiSection}>
      <div className="container">
        <div className={styles.roiContainer}>
          <div className={styles.roiContent}>
            <h2>Proven ROI for Memecoin Projects</h2>
            <p>TikTok has become the #1 platform for memecoin virality, with a direct correlation between content performance and token price action.</p>
            <p>Our data shows memecoin projects using targeted TikTok marketing experience:</p>
            
            <div className={styles.roiStats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.roiStat}>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
            
            <p>With HyperFlix, you can create and publish up to 150 viral-optimized videos per month at a fraction of traditional production costs.</p>
            <a href="#" className="btn btn-accent">View Case Studies</a>
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