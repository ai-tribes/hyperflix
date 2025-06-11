"use client";

import React from 'react'
import Link from 'next/link'
import styles from './Hero.module.css'
import { useAuth } from '@/contexts/AuthContext'

const Hero = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1>Revolutionize Memecoin Marketing with AI</h1>
          <p>Hyper-Flix.com - The utility token powering the first AI-driven platform designed specifically for memecoins to create viral TikTok content. Join the future of crypto marketing.</p>
          <div className={styles.heroButtons}>
            {isAuthenticated ? (
              // For authenticated users, emphasize token purchase
              <>
                <a href="#" className="btn btn-accent">Buy $FLIX Token</a>
                <Link href="/create" className="btn">Create Content</Link>
              </>
            ) : (
              // For new users, emphasize getting started
              <>
                <Link href="/auth/signup" className="btn btn-accent">Get Started Free</Link>
                <a href="#" className="btn">Buy $FLIX Token</a>
              </>
            )}
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