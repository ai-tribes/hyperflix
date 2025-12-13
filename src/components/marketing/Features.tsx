"use client";

import React, { useEffect, useRef } from 'react'
import styles from './Features.module.css'
import GlitchText from '@/components/effects/GlitchText'

const Features = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = cardsRef.current?.querySelectorAll(`.${styles.featureCard}`);
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: '🧠',
      title: 'Neural Viral Engine',
      description: 'AI trained on 100M+ viral TikToks predicts what content will explode. 97% accuracy in viral prediction.',
      stats: '10x ROI'
    },
    {
      icon: '⚡',
      title: 'Instant Generation',
      description: 'Create 100 unique videos in under 60 seconds. Each optimized for maximum engagement and virality.',
      stats: '60 sec'
    },
    {
      icon: '🎯',
      title: 'Smart Targeting',
      description: 'AI identifies and targets the exact audience that will pump your token. No wasted views.',
      stats: '85% CTR'
    },
    {
      icon: '📊',
      title: 'Real-Time Analytics',
      description: 'Track views, engagement, and token price correlation in real-time. Know exactly what works.',
      stats: 'Live Data'
    },
    {
      icon: '🎭',
      title: 'AI Influencers',
      description: '500+ ultra-realistic AI personas. Each with their own style, voice, and viral potential.',
      stats: '500+ Avatars'
    },
    {
      icon: '💎',
      title: 'Token Rewards',
      description: 'Earn $FLIX for every view. The more viral you go, the more you earn. Passive income on autopilot.',
      stats: '$5K/mo avg'
    }
  ]

  return (
    <section id="features" className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>FEATURES</span>
          <h2 className={styles.sectionTitle}>
            <GlitchText text="Weapons-Grade" className="gradient-text" /> <GlitchText text="Viral Tech" />
          </h2>
          <p className={styles.sectionDescription}>
            Stop playing amateur hour. Our military-grade AI creates content that hijacks the algorithm and forces virality.
          </p>
        </div>
        
        <div className={styles.featuresGrid} ref={cardsRef}>
          {features.map((feature, index) => (
            <div key={index} className={`${styles.featureCard} glow-card`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <span className={styles.featureStat}>{feature.stats}</span>
              </div>
              <h3 className={styles.featureTitle}><GlitchText text={feature.title} /></h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <div className={styles.featureAction}>
                <button className={styles.featureButton}>
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.featuresBottom}>
          <div className={styles.comparisonTable}>
            <h3>Why We Dominate</h3>
            <div className={styles.comparisonGrid}>
              <div className={styles.comparisonRow}>
                <span>Traditional Marketing</span>
                <span className={styles.comparisonBad}>$50K/month</span>
              </div>
              <div className={styles.comparisonRow}>
                <span>HyperFlix AI</span>
                <span className={styles.comparisonGood}>$99/month</span>
              </div>
              <div className={styles.comparisonRow}>
                <span>Time to First Video</span>
                <span className={styles.comparisonBad}>2 weeks</span>
              </div>
              <div className={styles.comparisonRow}>
                <span>HyperFlix AI</span>
                <span className={styles.comparisonGood}>30 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 