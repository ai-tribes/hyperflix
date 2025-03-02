import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { 
  cancelSubscription, 
  createPortalSession, 
  getUserSubscription, 
  resumeSubscription,
  updateSubscription
} from '@/lib/stripe';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be signed in to access subscription information' },
        { status: 401 }
      );
    }

    // Get user's subscription
    const subscription = await getUserSubscription(session.user.id);

    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.error('Error getting subscription:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while getting the subscription' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be signed in to access subscription information' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { action, subscriptionId, customerId, newPriceId } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    let result;
    switch (action) {
      case 'cancel':
        if (!subscriptionId) {
          return NextResponse.json(
            { error: 'Subscription ID is required' },
            { status: 400 }
          );
        }
        result = await cancelSubscription(subscriptionId);
        break;
      case 'resume':
        if (!subscriptionId) {
          return NextResponse.json(
            { error: 'Subscription ID is required' },
            { status: 400 }
          );
        }
        result = await resumeSubscription(subscriptionId);
        break;
      case 'update':
        if (!subscriptionId || !newPriceId) {
          return NextResponse.json(
            { error: 'Subscription ID and new price ID are required' },
            { status: 400 }
          );
        }
        result = await updateSubscription(subscriptionId, newPriceId);
        break;
      case 'portal':
        if (!customerId) {
          return NextResponse.json(
            { error: 'Customer ID is required' },
            { status: 400 }
          );
        }
        const portalUrl = await createPortalSession(customerId);
        return NextResponse.json({ url: portalUrl });
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('Error managing subscription:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while managing the subscription' },
      { status: 500 }
    );
  }
} 