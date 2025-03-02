import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, TwitterAuthProvider, connectAuthEmulator } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Store the Firebase auth token in a cookie for middleware access
if (typeof window !== 'undefined') {
  auth.onIdTokenChanged(async (user) => {
    try {
      if (user) {
        const token = await user.getIdToken();
        // Set cookie for server-side auth checks with HttpOnly false to allow JS access
        document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; SameSite=Lax`;
        
        // Save auth state to localStorage for redundancy
        localStorage.setItem('firebase-user-authenticated', 'true');
      } else {
        // Clear the cookie when user is signed out
        document.cookie = 'firebase-auth-token=; path=/; max-age=0';
        localStorage.removeItem('firebase-user-authenticated');
      }
    } catch (error) {
      console.error('Error managing authentication token:', error);
    }
  });

  // Refresh token periodically to prevent expiration
  let tokenRefreshInterval: NodeJS.Timeout | undefined;
  
  auth.onAuthStateChanged(user => {
    if (tokenRefreshInterval) {
      clearInterval(tokenRefreshInterval);
    }
    
    if (user) {
      // Refresh token every 30 minutes
      tokenRefreshInterval = setInterval(async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
          try {
            const newToken = await currentUser.getIdToken(true);
            document.cookie = `firebase-auth-token=${newToken}; path=/; max-age=3600; SameSite=Lax`;
          } catch (error) {
            console.error('Error refreshing authentication token:', error);
          }
        }
      }, 30 * 60 * 1000); // 30 minutes
    }
  });
}

// Configure Google provider with additional scopes and prompt
const googleProvider = new GoogleAuthProvider();
// Add required scopes
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Configure Google provider for proper OAuth flow
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Important: handle_missing_home_server_discovery parameter to avoid redirect URI issues
  // This can help with some OAuth redirects
  login_hint: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  // Include project ID in state parameter to help with tracking
  state: `project=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'hyperflix'}`,
});

const twitterProvider = new TwitterAuthProvider();

// Only use Auth Emulator for development if needed
// This helps bypass domain restrictions during local development
if (typeof window !== 'undefined' && 
   (window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1')) {
  // Uncomment the next line to use Firebase Auth Emulator
  // connectAuthEmulator(auth, 'http://localhost:9099');
  console.log('Using Firebase in development mode');
}

export { app, auth, db, storage, googleProvider, twitterProvider }; 