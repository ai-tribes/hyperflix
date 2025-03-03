# Setting Up Custom Domain for Firebase Authentication

To change your Firebase Authentication domain from `hyper-flix-f2891.firebaseapp.com` to `hyper-flix.com`, follow these steps:

## 1. Add Your Custom Domain to Firebase Hosting

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`hyper-flix-f2891`)
3. Navigate to **Hosting** in the left sidebar
4. Click on **Add custom domain**
5. Enter your domain: `hyper-flix.com`
6. Follow the verification process to prove ownership of the domain
   - This typically involves adding DNS records to your domain provider
   - Firebase will provide specific TXT records to add
7. **Important**: Also add the www subdomain (`www.hyper-flix.com`) as a connected domain
   - This ensures both versions of your domain work properly
   - Set up URL forwarding from `www.hyper-flix.com` to `hyper-flix.com` for consistency

## 2. Configure Authentication to Use Your Custom Domain

1. In the Firebase Console, navigate to **Authentication**
2. Click on the **Settings** tab
3. Scroll down to the **Authorized domains** section
4. Click **Add domain**
5. Add your custom domain: `hyper-flix.com`
6. **Also add**: `www.hyper-flix.com` as an authorized domain
7. Save the changes

## 3. Update OAuth Redirect Settings in Google Cloud Console

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** > **Credentials**
4. Find and edit your OAuth 2.0 Client ID used for authentication
5. Under **Authorized redirect URIs**, add both:
   ```
   https://hyper-flix.com/__/auth/handler
   https://www.hyper-flix.com/__/auth/handler
   ```
6. Save the changes

## 4. Update Your DNS Settings

1. Log in to your domain registrar (e.g., GoDaddy, Namecheap, etc.)
2. Add the DNS records provided by Firebase Hosting for both the root domain and www subdomain
3. Also add A records pointing to Firebase's IP addresses:
   ```
   A @ 151.101.1.195
   A @ 151.101.65.195
   A www 151.101.1.195
   A www 151.101.65.195
   ```
   (These IPs may change, always use the ones Firebase provides)
4. Consider setting up a CNAME record to redirect www to non-www:
   ```
   CNAME www hyper-flix.com
   ```

## 5. Configure URL Forwarding (Recommended)

To ensure a consistent user experience, set up URL forwarding:

1. In Firebase Hosting, configure URL forwarding from `www.hyper-flix.com` to `hyper-flix.com`
2. This can be done in the Firebase Hosting configuration or through your domain provider
3. Use 301 (permanent) redirects for better SEO

## 6. Deploy Your Application

After making these changes and updating your environment variables, deploy your application to make the changes take effect.

## Important Notes

- DNS propagation can take up to 48 hours, though it's often much faster
- Make sure your SSL certificate is properly set up (Firebase Hosting handles this automatically)
- Test the authentication flow thoroughly after making these changes
- You may need to clear browser cookies/cache to test properly
- Test both the www and non-www versions of your domain

## Troubleshooting

If you encounter issues:

1. Verify all DNS records are correctly set up
2. Ensure your domain is properly verified in Firebase Hosting
3. Check that your domain is added to the authorized domains list in Firebase Authentication
4. Confirm the redirect URI is correctly added in Google Cloud Console
5. Check the browser console for any errors during the authentication process
6. Try clearing your browser cache and cookies
7. If you see "www.hyper-flix.com" in the authentication popup instead of "hyper-flix.com", make sure both domains are authorized and consider setting up URL forwarding 