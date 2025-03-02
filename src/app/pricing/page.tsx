"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './pricing.module.css';

export default function Pricing() {
  const { user } = useAuth();
  
  return (
    <div className={styles.pricingContainer}>
      <div className={styles.pricingHeader}>
        <h1>Simple, Transparent Pricing</h1>
        <p>Choose the plan that's right for your memecoin marketing needs</p>
      </div>
      
      <div className={styles.pricingGrid}>
        <div className={styles.pricingCard}>
          <div className={styles.pricingCardHeader}>
            <h2>Starter</h2>
            <div className={styles.price}>
              <span className={styles.amount}>$49</span>
              <span className={styles.period}>/month</span>
            </div>
            <p>Perfect for new memecoins just getting started</p>
          </div>
          
          <ul className={styles.featureList}>
            <li>50 AI-generated videos per month</li>
            <li>5 custom audio uploads</li>
            <li>Basic analytics</li>
            <li>Email support</li>
            <li>720p video quality</li>
          </ul>
          
          <Link 
            href={user ? "/account/billing" : "/auth/signup?callbackUrl=/account/billing"} 
            className={`${styles.pricingButton} ${styles.starterButton}`}
          >
            {user ? "Choose Starter" : "Sign Up for Starter"}
          </Link>
        </div>
        
        <div className={`${styles.pricingCard} ${styles.popularCard}`}>
          <div className={styles.popularBadge}>Most Popular</div>
          <div className={styles.pricingCardHeader}>
            <h2>Pro</h2>
            <div className={styles.price}>
              <span className={styles.amount}>$99</span>
              <span className={styles.period}>/month</span>
            </div>
            <p>For established memecoins looking to grow</p>
          </div>
          
          <ul className={styles.featureList}>
            <li>150 AI-generated videos per month</li>
            <li>20 custom audio uploads</li>
            <li>Advanced analytics</li>
            <li>Priority email support</li>
            <li>1080p video quality</li>
            <li>Custom branding</li>
            <li>Lip sync feature</li>
          </ul>
          
          <Link 
            href={user ? "/account/billing" : "/auth/signup?callbackUrl=/account/billing"} 
            className={`${styles.pricingButton} ${styles.proButton}`}
          >
            {user ? "Choose Pro" : "Sign Up for Pro"}
          </Link>
        </div>
        
        <div className={styles.pricingCard}>
          <div className={styles.pricingCardHeader}>
            <h2>Enterprise</h2>
            <div className={styles.price}>
              <span className={styles.amount}>$299</span>
              <span className={styles.period}>/month</span>
            </div>
            <p>For serious memecoin marketing campaigns</p>
          </div>
          
          <ul className={styles.featureList}>
            <li>Unlimited AI-generated videos</li>
            <li>Unlimited custom audio uploads</li>
            <li>Premium analytics dashboard</li>
            <li>Dedicated account manager</li>
            <li>4K video quality</li>
            <li>Custom branding</li>
            <li>Lip sync feature</li>
            <li>API access</li>
            <li>White-label option</li>
          </ul>
          
          <Link 
            href={user ? "/account/billing" : "/auth/signup?callbackUrl=/account/billing"} 
            className={`${styles.pricingButton} ${styles.enterpriseButton}`}
          >
            {user ? "Choose Enterprise" : "Sign Up for Enterprise"}
          </Link>
        </div>
      </div>
      
      <div className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        
        <div className={styles.faqItem}>
          <h3>Can I change plans later?</h3>
          <p>Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing cycle.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>Is there a free trial?</h3>
          <p>We offer a 7-day free trial for all new users. No credit card required to try out the platform.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>What payment methods do you accept?</h3>
          <p>We accept all major credit cards, PayPal, and cryptocurrency payments (BTC, ETH, and selected memecoins).</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>Do you offer refunds?</h3>
          <p>We offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
        </div>
      </div>
      
      <div className={styles.ctaSection}>
        <h2>Ready to start creating viral content?</h2>
        <p>Join thousands of memecoin marketers already using HyperFlix</p>
        <Link 
          href={user ? "/dashboard" : "/auth/signup"} 
          className={styles.ctaButton}
        >
          {user ? "Go to Dashboard" : "Get Started Now"}
        </Link>
      </div>
    </div>
  );
} 