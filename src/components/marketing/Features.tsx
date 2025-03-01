import React from 'react'
import styles from './Features.module.css'

const Features = () => {
  const features = [
    {
      icon: '🚀',
      title: 'AI-Powered Virality',
      description: 'Our proprietary algorithms analyze top-performing memecoin content to generate hooks and scripts with the highest probability of going viral.'
    },
    {
      icon: '⚡',
      title: '30-Second Creation',
      description: 'What takes hours with traditional methods takes seconds with Hyper-Flix. Create professional UGC videos for your token in under a minute.'
    },
    {
      icon: '🌐',
      title: 'Direct TikTok Publishing',
      description: 'Seamlessly publish your memecoin content directly to TikTok with our integrated API. No downloads or uploads required.'
    },
    {
      icon: '📊',
      title: 'Price Impact Tracking',
      description: 'See the direct correlation between your content performance and token price movement with our integrated analytics.'
    },
    {
      icon: '👥',
      title: 'Crypto-Native Avatars',
      description: 'Choose from 100+ crypto influencer-style avatars designed specifically to resonate with the memecoin community.'
    },
    {
      icon: '💰',
      title: 'Token-Powered Ecosystem',
      description: '$HFLIX holders enjoy discounted platform access, governance rights, and participation in the platform\'s growing revenue.'
    }
  ]

  return (
    <section id="value" className={styles.section}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <h2>Why Hyper-Flix is a Game-Changer</h2>
          <p>We're solving the biggest challenge in memecoin marketing: creating authentic, viral content that drives real adoption.</p>
        </div>
        <div className={styles.valueCards}>
          {features.map((feature, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.valueCardIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features 