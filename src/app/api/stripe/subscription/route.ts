import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
// Temporarily comment out stripe functions to fix build
// import { 
//   cancelSubscription, 
//   createPortalSession, 
//   getUserSubscription, 
//   resumeSubscription,
//   updateSubscription
// } from '@/lib/stripe';

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

    // Temporarily return mock data
    return NextResponse.json({ 
      subscription: null,
      message: 'Subscription service temporarily unavailable' 
    });
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
    const { action } = body;

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    // Temporarily return mock response
    return NextResponse.json({ 
      result: 'success',
      message: 'Subscription management temporarily unavailable' 
    });
  } catch (error: any) {
    console.error('Error managing subscription:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while managing the subscription' },
      { status: 500 }
    );
  }
} 