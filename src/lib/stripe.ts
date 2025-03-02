import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Check if we have Stripe API keys before initializing
const hasPublishableKey = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const hasSecretKey = !!process.env.STRIPE_SECRET_KEY;

// Initialize Stripe on the client
let stripePromise: Promise<any> | null = null;
export const getStripe = () => {
  if (!stripePromise && hasPublishableKey) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
  }
  return stripePromise;
};

// Initialize Stripe on the server
let stripe: Stripe | null = null;
if (hasSecretKey) {
  // @ts-ignore: Using any to avoid version mismatch issues
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16', 
  } as any);
}

// Price IDs for different subscription tiers
export const SUBSCRIPTION_PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_ID_STARTER || 'price_starter_monthly',
  growth: process.env.STRIPE_PRICE_ID_GROWTH || 'price_growth_monthly',
  scale: process.env.STRIPE_PRICE_ID_SCALE || 'price_scale_monthly',
};

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string; // Stripe price ID
  features: string[];
  popular?: boolean;
  interval?: 'month' | 'year';
}

// Subscription plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small-scale content creators',
    price: 19,
    priceId: 'price_starter_monthly',
    interval: 'month',
    features: [
      'Up to 10 UGC videos per month',
      'Basic AI editing tools',
      'Standard quality rendering',
      'Email support',
      'Limited token analytics'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Ideal for growing your content strategy',
    price: 49,
    priceId: 'price_growth_monthly',
    interval: 'month',
    features: [
      'Up to 30 UGC videos per month',
      'Advanced AI editing tools',
      'HD quality rendering',
      'Priority email support',
      'Full token analytics',
      'Watermark removal',
      'Basic brand kit'
    ],
    popular: true
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'For professional content teams',
    price: 99,
    priceId: 'price_scale_monthly',
    interval: 'month',
    features: [
      'Unlimited UGC videos',
      'Premium AI editing suite',
      '4K quality rendering',
      'Priority phone support',
      'Full token analytics with trends',
      'Custom branding',
      'Team collaboration',
      'API access',
      'Dedicated account manager'
    ]
  }
];

export const getStripePlan = (planId: string) => {
  return SUBSCRIPTION_PLANS.find(plan => plan.id === planId);
};

/**
 * Create a checkout session for subscription
 * @param userId The user ID 
 * @param priceId The price ID for the subscription
 * @param isYearly Whether the subscription is yearly
 * @returns The checkout session URL
 */
export async function createCheckoutSession(
  userId: string, 
  priceId: string,
  isYearly: boolean = false
) {
  if (!stripe) {
    throw new Error('Stripe is not initialized. Please check your API keys.');
  }
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer_email: undefined, // Will be populated by Stripe
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7, // 7-day trial
        metadata: {
          userId,
        },
      },
      success_url: `${process.env.NEXTAUTH_URL}/account/subscription?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId,
      },
    });

    return session.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Get a user's active subscription
 * @param userId The user ID
 * @returns The user's active subscription or null
 */
export async function getUserSubscription(userId: string) {
  if (!stripe) {
    throw new Error('Stripe is not initialized. Please check your API keys.');
  }
  
  try {
    // First, find the customer ID for this user
    const customers = await stripe.customers.list({
      email: userId,
      limit: 1,
    });

    if (!customers.data.length) {
      return null;
    }

    const customerId = customers.data[0].id;

    // Get the user's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.default_payment_method'],
    });

    return subscriptions.data[0] || null;
  } catch (error) {
    console.error('Error getting user subscription:', error);
    throw error;
  }
}

/**
 * Cancel a user's subscription
 * @param subscriptionId The subscription ID to cancel
 * @returns The updated subscription
 */
export async function cancelSubscription(subscriptionId: string) {
  if (!stripe) {
    throw new Error('Stripe is not initialized. Please check your API keys.');
  }
  
  try {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

/**
 * Resume a canceled subscription
 * @param subscriptionId The subscription ID to resume
 * @returns The updated subscription
 */
export async function resumeSubscription(subscriptionId: string) {
  if (!stripe) {
    throw new Error('Stripe is not initialized. Please check your API keys.');
  }
  
  try {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
  } catch (error) {
    console.error('Error resuming subscription:', error);
    throw error;
  }
}

/**
 * Update a subscription to a different plan
 * @param subscriptionId The subscription ID to update
 * @param newPriceId The new price ID
 * @returns The updated subscription
 */
export async function updateSubscription(
  subscriptionId: string, 
  newPriceId: string
) {
  if (!stripe) {
    throw new Error('Stripe is not initialized. Please check your API keys.');
  }
  
  try {
    return await stripe.subscriptions.retrieve(subscriptionId)
      .then(subscription => {
        if (!stripe) throw new Error('Stripe is not initialized');
        return stripe.subscriptions.update(subscriptionId, {
          items: [
            {
              id: subscription.items.data[0].id,
              price: newPriceId,
            },
          ],
        });
      });
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

/**
 * Create a customer portal session for managing subscription
 * @param customerId The customer ID
 * @returns The portal session URL
 */
export async function createPortalSession(customerId: string) {
  if (!stripe) {
    throw new Error('Stripe is not initialized. Please check your API keys.');
  }
  
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXTAUTH_URL}/account/subscription`,
    });

    return session.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}

export default stripe; 