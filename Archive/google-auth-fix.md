# Fix Google Authentication for HyperFlix

## 1. Check Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (the one with ID that starts with `965542932710`)
3. Go to **APIs & Services > OAuth consent screen**
4. Verify the following:
   - User Type: External (recommended for development)
   - Add "localhost" to Authorized domains
   - Add your email as a test user if in "Testing" mode

## 2. Configure OAuth Credentials Correctly

1. Go to **APIs & Services > Credentials**
2. Find your OAuth 2.0 Client ID and click to edit
3. Make sure **Authorized JavaScript origins** includes:
   ```
   http://localhost:3000
   http://localhost:3001
   ```
4. Make sure **Authorized redirect URIs** includes:
   ```
   http://localhost:3000/api/auth/callback/google
   http://localhost:3001/api/auth/callback/google
   ```
5. Click Save

## 3. Restart Your Application

1. Stop your current server
2. Make sure you're using the correct port in your browser (http://localhost:3001 if that's what shown in console)
3. Start the server again with:
   ```
   npm run dev
   ```

## 4. Test Google Authentication Flow

1. Open browser in incognito/private mode (to clear any cached sessions)
2. Go to http://localhost:3001 (or whichever port your app is running on)
3. Try to sign in with Google
4. Check browser console and server logs for any error messages

## 5. Common Errors and Solutions

- **"Error 400: redirect_uri_mismatch"**: You need to add the exact redirect URI to your Google Cloud Console
- **"Error 401: unauthorized"**: Your credentials may be incorrect
- **"This website is not authorized for authentication"**: 
  - Check that your domain is in the authorized domains list
  - Make sure you're using the right Client ID
  - Verify the app is published or you're added as a test user

## Additional Debugging

If you continue to have issues:
1. Check server logs with `NEXT_AUTH_DEBUG=1 npm run dev`
2. Look in browser network panel for the specific Google OAuth error
3. Ensure your Client ID and Client Secret match exactly in your .env.local file

Remember: Google OAuth is very particular about exact matches for URIs, including the protocol (http vs https) and any port numbers. 