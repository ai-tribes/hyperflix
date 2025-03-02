# HyperFlix Deployment Guide

This guide provides instructions for deploying the HyperFlix application to Vercel.

## Prerequisites

- A Vercel account
- A GitHub/GitLab/Bitbucket repository with the HyperFlix codebase
- Firebase project with authentication set up
- Stripe account with API keys
- TikTok developer account (if using TikTok integration)

## Environment Variables

The following environment variables must be set in your Vercel project settings:

### Authentication

```
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-key
```

### Firebase

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
```

### Stripe

```
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### TikTok

```
TIKTOK_CLIENT_KEY=your-tiktok-client-key
TIKTOK_CLIENT_SECRET=your-tiktok-client-secret
```

## Deployment Steps

1. Connect your GitHub/GitLab/Bitbucket repository to Vercel
2. Configure the project settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
3. Add all environment variables as described above
4. Deploy the project

## Known Issues and Workarounds

### Static Generation Errors

During the build process, you may see errors like:

```
ReferenceError: location is not defined
```

These errors occur because Next.js attempts to statically generate pages that use client-side features like `useSearchParams()` and browser APIs like `location`. 

We've implemented several workarounds:

1. Added `export const dynamic = 'force-dynamic'` to affected pages
2. Set cache headers to prevent static generation
3. Updated Next.js configuration to handle these cases

**Important**: Despite these build errors, the application should function correctly when deployed.

### Webhook Handling

For Stripe webhooks to work properly:

1. Create a webhook endpoint in your Stripe dashboard pointing to `https://your-vercel-domain.vercel.app/api/stripe/webhook`
2. Set the `STRIPE_WEBHOOK_SECRET` environment variable with the signing secret from Stripe
3. Test the webhook to ensure it's working correctly

## Post-Deployment Verification

After deploying, verify the following functionality:

1. Authentication (sign in, sign up)
2. Profile and account pages
3. Subscription management
4. Webhook handling (for payments and subscriptions)
5. TikTok integration (if applicable)

## Troubleshooting

- **Authentication Issues**: Verify the `NEXTAUTH_URL` and `NEXTAUTH_SECRET` environment variables are set correctly
- **Payment Processing Failures**: Check Stripe dashboard logs and ensure webhook endpoints are properly configured
- **Static Generation Errors**: These are expected during build but should not affect runtime behavior
- **API Route Errors**: Check Vercel Function Logs for detailed error messages

## Optimization Recommendations

- Enable Vercel Analytics to monitor performance
- Configure Vercel Edge Functions for improved global performance
- Set up proper caching headers for static assets
- Configure Vercel Preview Deployments for testing changes before production 