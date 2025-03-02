"use client";

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Generate Viral TikTok Content for Memecoins</h1>
          <p>HyperFlix uses AI to create engaging, viral-worthy content for your memecoin marketing campaigns.</p>
          <div className={styles.heroCta}>
            <Link href="/auth/signup" className={styles.primaryButton}>
              Get Started
            </Link>
            <Link href="/pricing" className={styles.secondaryButton}>
              View Pricing
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          {/* Placeholder for hero image */}
          <div className={styles.imagePlaceholder}>
            <span>AI-Generated Content Preview</span>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2>Why Choose HyperFlix?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚀</div>
            <h3>Rapid Content Creation</h3>
            <p>Generate TikTok videos in minutes, not hours or days.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Targeted for Crypto</h3>
            <p>Content specifically designed for memecoin marketing.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔥</div>
            <h3>Viral-Worthy</h3>
            <p>AI-optimized for maximum engagement and virality.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💰</div>
            <h3>Cost-Effective</h3>
            <p>Fraction of the cost of traditional content creation.</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to Create Viral Content?</h2>
        <p>Join thousands of memecoin marketers already using HyperFlix.</p>
        <Link href="/auth/signup" className={styles.primaryButton}>
          Sign Up Now
        </Link>
      </section>
    </div>
  );
} 