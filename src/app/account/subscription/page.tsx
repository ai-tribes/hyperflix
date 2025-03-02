"use client";

// Force dynamic rendering for this client component
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle, FaCreditCard, FaExchangeAlt } from 'react-icons/fa';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/contexts/AuthContext';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe';
import DashboardLayout from '@/components/layout/DashboardLayout';
import styles from './subscription.module.css';

export default function SubscriptionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { 
    loading, 
    error, 
    subscription, 
    isSubscribed,
    subscriptionTier,
    cancelSubscription,
    resumeSubscription,
    redirectToCustomerPortal,
    redirectToCheckout
  } = useSubscription();
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCanceled, setShowCanceled] = useState(false);
  
  useEffect(() => {
    // Check URL parameters for success or canceled status
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    
    if (success === 'true') {
      setShowSuccess(true);
      // Clear URL parameters after a delay
      setTimeout(() => {
        router.replace('/account/subscription');
      }, 5000);
    }
    
    if (canceled === 'true') {
      setShowCanceled(true);
      // Clear URL parameters after a delay
      setTimeout(() => {
        router.replace('/account/subscription');
      }, 5000);
    }
  }, [searchParams, router]);
  
  if (!user) {
    router.push('/auth/signin?callbackUrl=/account/subscription');
    return null;
  }
  
  const handleManagePaymentMethod = () => {
    if (!subscription?.customer) return;
    redirectToCustomerPortal(subscription.customer);
  };
  
  const handleCancelSubscription = async () => {
    if (!subscription?.id) return;
    await cancelSubscription(subscription.id);
  };
  
  const handleResumeSubscription = async () => {
    if (!subscription?.id) return;
    await resumeSubscription(subscription.id);
  };
  
  const handleUpgrade = (planId: string) => {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) return;
    redirectToCheckout(plan.priceId);
  };
  
  // Format date to readable format
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Get current plan details
  const currentPlan = SUBSCRIPTION_PLANS.find(plan => plan.id === subscriptionTier);
  
  // Get available upgrade options
  const upgradeOptions = SUBSCRIPTION_PLANS.filter(plan => {
    if (!subscriptionTier) return true;
    if (subscriptionTier === 'starter') return plan.id === 'growth' || plan.id === 'scale';
    if (subscriptionTier === 'growth') return plan.id === 'scale';
    return false;
  });

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Subscription Management</h1>
        
        {showSuccess && (
          <div className={styles.success}>
            <FaCheckCircle />
            <p>Your subscription has been successfully updated! You will be redirected shortly.</p>
          </div>
        )}
        
        {showCanceled && (
          <div className={styles.canceled}>
            <FaTimesCircle />
            <p>Your subscription update was canceled. You will be redirected shortly.</p>
          </div>
        )}
        
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className={styles.loading}>
            <p>Loading subscription information...</p>
          </div>
        ) : isSubscribed ? (
          <div className={styles.subscriptionInfo}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>Current Plan</h2>
                {subscription?.cancel_at_period_end ? (
                  <span className={styles.cancelBadge}>Canceling</span>
                ) : (
                  <span className={styles.activeBadge}>Active</span>
                )}
              </div>
              
              <div className={styles.planDetails}>
                <h3>{currentPlan?.name || 'Subscription'}</h3>
                <p className={styles.price}>
                  ${subscription?.plan?.amount ? (subscription.plan.amount / 100).toFixed(2) : currentPlan?.price}
                  <span>/{subscription?.plan?.interval || 'month'}</span>
                </p>
                
                {currentPlan && (
                  <ul className={styles.features}>
                    {currentPlan.features.map((feature, index) => (
                      <li key={index}>
                        <FaCheckCircle className={styles.checkIcon} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className={styles.billingInfo}>
                <h3>Billing Information</h3>
                
                {subscription?.current_period_end && (
                  <div className={styles.billingDetail}>
                    <span>Current Period Ends:</span>
                    <span>{formatDate(subscription.current_period_end)}</span>
                  </div>
                )}
                
                {subscription?.cancel_at_period_end && subscription?.current_period_end && (
                  <div className={styles.billingDetail}>
                    <span>Subscription Ends:</span>
                    <span>{formatDate(subscription.current_period_end)}</span>
                  </div>
                )}
                
                {subscription?.trial_end && (
                  <div className={styles.billingDetail}>
                    <span>Trial Ends:</span>
                    <span>{formatDate(subscription.trial_end)}</span>
                  </div>
                )}
              </div>
              
              <div className={styles.actions}>
                <button 
                  className={styles.paymentButton}
                  onClick={handleManagePaymentMethod}
                >
                  <FaCreditCard />
                  Manage Payment Method
                </button>
                
                {subscription?.cancel_at_period_end ? (
                  <button 
                    className={styles.resumeButton}
                    onClick={handleResumeSubscription}
                    disabled={loading}
                  >
                    Resume Subscription
                  </button>
                ) : (
                  <button 
                    className={styles.cancelButton}
                    onClick={handleCancelSubscription}
                    disabled={loading}
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
            
            {upgradeOptions.length > 0 && !subscription?.cancel_at_period_end && (
              <div className={styles.upgradeSection}>
                <h2>Upgrade Your Plan</h2>
                <p>Get more features and higher limits by upgrading your plan</p>
                
                <div className={styles.upgradeOptions}>
                  {upgradeOptions.map((plan) => (
                    <div key={plan.id} className={styles.upgradeCard}>
                      <h3>{plan.name}</h3>
                      <p className={styles.upgradePrice}>
                        ${plan.price}<span>/month</span>
                      </p>
                      <p className={styles.upgradeDescription}>{plan.description}</p>
                      
                      <button 
                        className={styles.upgradeButton}
                        onClick={() => handleUpgrade(plan.id)}
                        disabled={loading}
                      >
                        <FaExchangeAlt />
                        Upgrade to {plan.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.noSubscription}>
            <h2>No Active Subscription</h2>
            <p>You don't have an active subscription. Choose a plan to get started.</p>
            
            <button 
              className={styles.viewPlansButton}
              onClick={() => router.push('/pricing')}
            >
              View Plans
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 