"use client";

import React from 'react'
import styles from './Platform.module.css'

const Platform = () => {
  const steps = [
    {
      number: 1,
      title: 'Connect Your Wallet',
      description: 'Hold $FLIX tokens to access the platform and unlock premium features based on your holding tier.'
    },
    {
      number: 2,
      title: 'Add Your Token',
      description: 'Input your memecoin\'s contract address and basic details to set up automated price tracking and content optimization.'
    },
    {
      number: 3,
      title: 'Choose Your Avatar',
      description: 'Select from our library of crypto-native avatars designed to resonate with memecoin communities.'
    },
    {
      number: 4,
      title: 'Generate Your Hook',
      description: 'Our AI analyzes top-performing memecoin content to create hooks with the highest potential for virality.'
    },
    {
      number: 5,
      title: 'Customize Your Script',
      description: 'Edit the AI-generated script or craft your own to highlight your token\'s unique value proposition.'
    },
    {
      number: 6,
      title: 'Publish & Track',
      description: 'Directly publish to TikTok and track performance metrics alongside token price movement in real-time.'
    }
  ]

  return (
    <section id="platform" className={styles.section}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>How to Use HyperFlix</h2>
          <p>Creating viral memecoin content has never been easier. Follow these simple steps to launch your next token to the moon.</p>
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