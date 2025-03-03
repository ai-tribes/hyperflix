# Updating Google OAuth Configuration for Custom Domain

When switching from `hyper-flix-f2891.firebaseapp.com` to `hyper-flix.com`, you need to update your Google OAuth configuration to ensure authentication works properly.

## Google Cloud Console Configuration

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** > **Credentials**
4. Find and edit your OAuth 2.0 Client ID used for authentication

## Update Authorized JavaScript Origins

Add the following URLs to the **Authorized JavaScript Origins** list:
```
https://hyper-flix.com
https://www.hyper-flix.com
```

## Update Authorized Redirect URIs

Add the following URLs to the **Authorized Redirect URIs** list:
```
https://hyper-flix.com/api/auth/callback/google
https://hyper-flix.com/__/auth/handler
https://www.hyper-flix.com/api/auth/callback/google
https://www.hyper-flix.com/__/auth/handler
```

## Handling www vs. non-www Domains

To ensure a consistent user experience:

1. Decide on your preferred domain format (with or without www)
2. Set up URL forwarding from the non-preferred format to your preferred format
3. For example, if you prefer `hyper-flix.com` (without www):
   - Set up a 301 redirect from `www.hyper-flix.com` to `hyper-flix.com`
   - This can be done through Firebase Hosting or your domain provider

## Important Notes

- Keep the existing URLs (like localhost ones for development)
- Make sure to click **Save** after making these changes
- Changes may take a few minutes to propagate
- You may need to clear browser cookies/cache to test properly
- Test authentication with both www and non-www versions of your domain

## Testing

After making these changes:

1. Try signing in with Google on your production site
2. Check the browser console for any errors
3. Verify that the authentication flow completes successfully
4. Confirm that you're redirected to the correct page after authentication
5. Test with both `hyper-flix.com` and `www.hyper-flix.com`

## Troubleshooting

If you see "www.hyper-flix.com" in the authentication popup:

1. Make sure both domains are authorized in Firebase Authentication
2. Verify that both redirect URIs are added in Google Cloud Console
3. Clear your browser cache and cookies
4. Try using incognito/private browsing mode
5. Consider setting up URL forwarding to standardize on one domain format

If you encounter any other issues, double-check all the configuration settings and ensure that your domain is properly set up in Firebase Authentication as well. 