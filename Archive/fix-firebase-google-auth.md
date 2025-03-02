# Fix Firebase Google Authentication

The error you're experiencing is due to a mismatch between Firebase's Google authentication configuration and your Google Cloud OAuth credentials. Here's how to fix it:

## 1. Fix Firebase Console Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/project/hyper-flix-f2891/authentication/providers)
2. Click on "Authentication" > "Sign-in method"
3. Find "Google" in the list and click the "Edit" (pencil) icon
4. Make sure the provider is **Enabled**
5. For the Project support email, use your email address
6. Under "Web SDK configuration":
   - Verify the Web Client ID matches your Google OAuth client ID from your `.env.local` file
   - Set the Web Client Secret to match your Google OAuth client secret

## 2. Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find your OAuth 2.0 Client ID (same one used in Firebase)
3. Click to edit it
4. Under "Authorized redirect URIs", add:
   ```
   https://hyper-flix-f2891.firebaseapp.com/__/auth/handler
   ```
5. Also ensure these URIs are present for local development:
   ```
   http://localhost:3000/api/auth/callback/google
   http://localhost:3001/api/auth/callback/google
   ```
6. Click "Save"

## 3. Ensure Domains are Authorized in Firebase

1. In Firebase Console, go to "Authentication" > "Settings" > "Authorized domains"
2. Make sure these domains are added:
   - `localhost`
   - `127.0.0.1`
   - `hyper-flix-f2891.firebaseapp.com`
   - Any custom domains you'll use

## 4. Update Your `.env.local` File

Ensure these values in your `.env.local` file match exactly what's in Google Cloud Console:

```
GOOGLE_CLIENT_ID=965542932710-kgdaghu54uoa3gv5esknh4asrdmtkrpk.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

## 5. Restart and Test

1. Stop your development server
2. Start it again with:
   ```
   npm run dev
   ```
3. Test Google sign-in in an incognito/private browser window

## If You're Still Having Issues

If you continue to experience problems, try these additional fixes:

1. **Clear browser cache and cookies**:
   This can clear out any stored tokens that might be causing conflicts.

2. **Test with direct Firebase sign-in**:
   Try using Firebase's direct sign-in method in your code:

   ```javascript
   import { signInWithPopup } from 'firebase/auth';
   import { auth, googleProvider } from '@/lib/firebase';

   const signInWithGoogle = async () => {
     try {
       const result = await signInWithPopup(auth, googleProvider);
       console.log("Signed in successfully:", result.user);
     } catch (error) {
       console.error("Sign-in error:", error);
     }
   };
   ```

3. **Enable development mode authentication**:
   If you're only testing locally, you can uncomment the line in `src/lib/firebase.ts` to use the Firebase Auth Emulator:

   ```javascript
   // Change this from:
   // connectAuthEmulator(auth, 'http://localhost:9099');
   
   // To this:
   connectAuthEmulator(auth, 'http://localhost:9099');
   ```

   Note that you'll need to run the Firebase emulator suite with:
   ```
   firebase emulators:start
   ``` 