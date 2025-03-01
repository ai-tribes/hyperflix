import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import stripe from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature') as string;
  
  // Skip signature verification in development to allow testing
  if (!signature && process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // Use the webhook secret to verify the signature
    event = process.env.NODE_ENV === 'development' 
      ? JSON.parse(body) as Stripe.Event 
      : stripe.webhooks.constructEvent(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET || ''
        );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle various event types
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        // Payment is successful and subscription is created
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        
        // Update user's subscription status in your database
        // You would typically store the subscription ID and status
        // This is where you would update your database with the subscription information
        console.log('Checkout session completed:', checkoutSession);
        
        break;
      case 'customer.subscription.created':
        // Subscription created
        const subscriptionCreated = event.data.object as Stripe.Subscription;
        console.log('Subscription created:', subscriptionCreated);
        
        break;
      case 'customer.subscription.updated':
        // Subscription updated (upgraded, downgraded, or other changes)
        const subscriptionUpdated = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', subscriptionUpdated);
        
        break;
      case 'customer.subscription.deleted':
        // Subscription canceled or expired
        const subscriptionDeleted = event.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', subscriptionDeleted);
        
        break;
      case 'invoice.payment_succeeded':
        // Invoice paid
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment succeeded:', invoice);
        
        break;
      case 'invoice.payment_failed':
        // Invoice payment failed
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log('Invoice payment failed:', failedInvoice);
        
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook event:', error);
    return NextResponse.json(
      { error: 'Error handling webhook event' },
      { status: 500 }
    );
  }
}

// Disable body parsing for webhook
export const config = {
  api: {
    bodyParser: false,
  },
}; 