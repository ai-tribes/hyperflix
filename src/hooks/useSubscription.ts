"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Plan {
  id: string;
  amount: number;
  interval: string;
}

interface Subscription {
  id: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  trial_end: number | null;
  customer: string;
  plan: Plan;
}

export function useSubscription() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { user } = useAuth();

  // Determine if user is subscribed and get subscription tier
  const isSubscribed = !!subscription && subscription.status === 'active';
  const subscriptionTier = subscription?.plan?.id || null;

  // Fetch user's subscription when user state changes
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setSubscription(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // In a real app, this would be an API call to your server
        // For demo, we're using mock data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock subscription data
        const mockSubscription: Subscription = {
          id: 'sub_123456789',
          status: 'active',
          current_period_start: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60, // 30 days ago
          current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
          cancel_at_period_end: false,
          trial_end: null,
          customer: 'cus_123456789',
          plan: {
            id: 'growth',
            amount: 4900, // $49.00
            interval: 'month'
          }
        };
        
        setSubscription(mockSubscription);
        setError(null);
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError('Failed to load subscription information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  // Cancel user's subscription
  const cancelSubscription = async (subscriptionId: string) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // In a real app, this would be an API call to your server
      // which would then call Stripe's API to cancel the subscription
      // For demo, we're just updating local state
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update subscription locally
      setSubscription(prev => {
        if (!prev) return null;
        return {
          ...prev,
          cancel_at_period_end: true
        };
      });
      
      setError(null);
    } catch (err) {
      console.error('Error canceling subscription:', err);
      setError('Failed to cancel subscription. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Resume a canceled subscription
  const resumeSubscription = async (subscriptionId: string) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // In a real app, this would be an API call to your server
      // For demo, we're just updating local state
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update subscription locally
      setSubscription(prev => {
        if (!prev) return null;
        return {
          ...prev,
          cancel_at_period_end: false
        };
      });
      
      setError(null);
    } catch (err) {
      console.error('Error resuming subscription:', err);
      setError('Failed to resume subscription. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect to Stripe customer portal
  const redirectToCustomerPortal = async (customerId: string) => {
    if (!user) return;
    
    try {
      setLoading(true);
      // In a real app, this would create a session and redirect to Stripe
      alert('In a real app, this would redirect to Stripe Customer Portal');
      setLoading(false);
    } catch (err) {
      console.error('Error redirecting to customer portal:', err);
      setError('Failed to redirect to customer portal. Please try again later.');
      setLoading(false);
    }
  };

  // Redirect to Stripe checkout for new subscription or upgrade
  const redirectToCheckout = async (priceId: string, isYearly?: boolean) => {
    if (!user) return;
    
    try {
      setLoading(true);
      // In a real app, this would create a checkout session and redirect to Stripe
      alert(`In a real app, this would redirect to Stripe Checkout for price ID: ${priceId} (${isYearly ? 'yearly' : 'monthly'} plan)`);
      setLoading(false);
    } catch (err) {
      console.error('Error redirecting to checkout:', err);
      setError('Failed to redirect to checkout. Please try again later.');
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    subscription,
    isSubscribed,
    subscriptionTier,
    cancelSubscription,
    resumeSubscription,
    redirectToCustomerPortal,
    redirectToCheckout
  };
} 