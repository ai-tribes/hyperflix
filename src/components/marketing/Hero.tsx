import React from 'react'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1>Revolutionize Memecoin Marketing with AI</h1>
          <p>$HFLIX - The utility token powering the first AI-driven platform designed specifically for memecoins to create viral TikTok content. Join the future of crypto marketing.</p>
          <div className={styles.heroButtons}>
            <a href="#" className="btn">Buy $HFLIX Token</a>
            <a href="#" className="btn btn-accent">Try the Platform</a>
          </div>
          <div className={styles.tokenInfo}>
            <div className={styles.tokenInfoItem}>
              <h3>$0.042</h3>
              <p>Current Price</p>
            </div>
            <div className={styles.tokenInfoItem}>
              <h3>$4.2M</h3>
              <p>Market Cap</p>
            </div>
            <div className={styles.tokenInfoItem}>
              <h3>42K</h3>
              <p>Holders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 