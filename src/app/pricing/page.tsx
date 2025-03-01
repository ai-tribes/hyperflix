"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/contexts/AuthContext';
import styles from './pricing.module.css';

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { 
    loading, 
    error, 
    isSubscribed, 
    subscriptionTier,
    redirectToCheckout 
  } = useSubscription();
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Calculate yearly prices (20% discount)
  const yearlyPlans = SUBSCRIPTION_PLANS.map(plan => ({
    ...plan,
    price: Math.round(plan.price * 12 * 0.8),
    interval: 'year' as const
  }));

  const plans = isYearly ? yearlyPlans : SUBSCRIPTION_PLANS;

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      // Redirect to sign in page if not authenticated
      router.push('/auth/signin?callbackUrl=/pricing');
      return;
    }

    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    setSelectedPlan(planId);
    await redirectToCheckout(plan.priceId, isYearly);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Choose Your Plan</h1>
        <p>Select the perfect plan for your memecoin marketing needs</p>
        
        <div className={styles.toggle}>
          <span className={!isYearly ? styles.active : ''}>Monthly</span>
          <label className={styles.switch}>
            <input 
              type="checkbox" 
              checked={isYearly} 
              onChange={() => setIsYearly(!isYearly)}
            />
            <span className={styles.slider}></span>
          </label>
          <span className={isYearly ? styles.active : ''}>
            Yearly <span className={styles.discount}>Save 20%</span>
          </span>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.plansContainer}>
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`${styles.planCard} ${plan.id === 'growth' ? styles.popular : ''} ${subscriptionTier === plan.id ? styles.current : ''}`}
          >
            {plan.id === 'growth' && (
              <div className={styles.popularBadge}>Most Popular</div>
            )}
            
            <div className={styles.planHeader}>
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <div className={styles.price}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>{plan.price}</span>
                <span className={styles.period}>/{plan.interval}</span>
              </div>
            </div>
            
            <ul className={styles.features}>
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <FaCheck className={styles.checkIcon} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              className={styles.subscribeButton}
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading || (isSubscribed && subscriptionTier === plan.id)}
            >
              {loading && selectedPlan === plan.id ? 'Processing...' : 
               isSubscribed && subscriptionTier === plan.id ? 'Current Plan' : 
               'Subscribe'}
            </button>
          </div>
        ))}
      </div>

      <div className={styles.comparison}>
        <h2>HyperFlix vs. Traditional Methods</h2>
        
        <div className={styles.comparisonTable}>
          <div className={styles.comparisonHeader}>
            <div className={styles.comparisonFeature}></div>
            <div className={styles.comparisonHyperFlix}>HyperFlix</div>
            <div className={styles.comparisonTraditional}>Traditional Methods</div>
          </div>
          
          <div className={styles.comparisonRow}>
            <div className={styles.comparisonFeature}>Content Creation Time</div>
            <div className={styles.comparisonHyperFlix}>Minutes</div>
            <div className={styles.comparisonTraditional}>Days to Weeks</div>
          </div>
          
          <div className={styles.comparisonRow}>
            <div className={styles.comparisonFeature}>AI-Powered Content</div>
            <div className={styles.comparisonHyperFlix}><FaCheck className={styles.checkIcon} /></div>
            <div className={styles.comparisonTraditional}><FaTimes className={styles.timesIcon} /></div>
          </div>
          
          <div className={styles.comparisonRow}>
            <div className={styles.comparisonFeature}>Memecoin-Specific Templates</div>
            <div className={styles.comparisonHyperFlix}><FaCheck className={styles.checkIcon} /></div>
            <div className={styles.comparisonTraditional}><FaTimes className={styles.timesIcon} /></div>
          </div>
          
          <div className={styles.comparisonRow}>
            <div className={styles.comparisonFeature}>TikTok Integration</div>
            <div className={styles.comparisonHyperFlix}><FaCheck className={styles.checkIcon} /></div>
            <div className={styles.comparisonTraditional}><FaTimes className={styles.timesIcon} /></div>
          </div>
          
          <div className={styles.comparisonRow}>
            <div className={styles.comparisonFeature}>Cost</div>
            <div className={styles.comparisonHyperFlix}>Starting at $19/month</div>
            <div className={styles.comparisonTraditional}>$500+ per video</div>
          </div>
        </div>
      </div>

      <div className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        
        <div className={styles.faqItem}>
          <h3>Can I cancel my subscription at any time?</h3>
          <p>Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your billing period.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>Do you offer a free trial?</h3>
          <p>Yes, all plans come with a 7-day free trial. You won't be charged until the trial period ends.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>Can I upgrade or downgrade my plan?</h3>
          <p>Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference immediately. If you downgrade, the change will take effect at the end of your current billing period.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>What payment methods do you accept?</h3>
          <p>We accept all major credit cards, including Visa, Mastercard, American Express, and Discover.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>Can I use HyperFlix for multiple memecoin projects?</h3>
          <p>Yes, you can use HyperFlix for multiple memecoin projects under the same subscription. There are no limits on the number of projects you can create.</p>
        </div>
      </div>
    </div>
  );
} 