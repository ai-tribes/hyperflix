# Fixing Google Authentication for Vercel Deployment

The error "This domain is not authorized for Google authentication" occurs because your Vercel deployment domain (`hyperflix.vercel.app`) is not authorized in your Firebase and Google Cloud Console configurations.

## Step 1: Add Vercel Domain to Firebase Authentication

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`hyper-flix-f2891`)
3. Navigate to **Authentication** in the left sidebar
4. Click on the **Settings** tab
5. Scroll down to the **Authorized domains** section
6. Click **Add domain**
7. Add your Vercel domain: `hyperflix.vercel.app`
8. Save the changes

## Step 2: Update Google Cloud Console OAuth Configuration

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** > **Credentials**
4. Find and edit your OAuth 2.0 Client ID used for authentication
5. Under **Authorized JavaScript Origins**, add:
   ```
   https://hyperflix.vercel.app
   ```
6. Under **Authorized redirect URIs**, add:
   ```
   https://hyperflix.vercel.app/api/auth/callback/google
   https://hyperflix.vercel.app/__/auth/handler
   ```
7. Save the changes

## Step 3: Update Firebase Auth Domain in Environment Variables

1. Make sure your `.env.production` file has the correct Firebase Auth Domain:
   ```
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hyper-flix-f2891.firebaseapp.com
   ```
   (Note: This should be your Firebase project's default auth domain, not your custom domain)

## Step 4: Redeploy Your Application

After making these changes, redeploy your application to Vercel:

1. Commit your changes to your repository
2. Push to the branch that triggers your Vercel deployment
3. Wait for the deployment to complete

## Step 5: Test Authentication

1. Navigate to your Vercel deployment URL: `https://hyperflix.vercel.app`
2. Try signing in with Google
3. The authentication should now work properly

## Troubleshooting

If you still encounter issues:

1. Check the browser console for any errors
2. Verify that all domains are correctly added to both Firebase and Google Cloud Console
3. Clear your browser cache and cookies
4. Try using incognito/private browsing mode
5. Ensure your environment variables are correctly set in Vercel's deployment settings
6. Check if there are any CORS issues in the browser console

Remember that changes to Google Cloud Console settings may take a few minutes to propagate. 