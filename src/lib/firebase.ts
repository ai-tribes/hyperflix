import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  TwitterAuthProvider, 
  connectAuthEmulator,
  Auth,
  User,
  NextOrObserver
} from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Your Firebase configuration
// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dummy-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dummy-auth-domain',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dummy-project-id',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dummy-storage-bucket',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000000000',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-0000000000'
};

// Check if we have all the required Firebase config values
const hasValidConfig = 
  !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
  !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

// Mock auth interface for fallback
interface MockAuth {
  currentUser: null;
  onAuthStateChanged: (callback: NextOrObserver<User | null>) => void;
  onIdTokenChanged: (callback: NextOrObserver<User | null>) => void;
  signOut: () => Promise<void>;
}

// Initialize Firebase only if we have valid config
let app;
let auth: Auth | MockAuth;
let db: Firestore | Record<string, never>;
let storage: FirebaseStorage | Record<string, never>;
let googleProvider: GoogleAuthProvider | Record<string, never>;
let twitterProvider: TwitterAuthProvider | Record<string, never>;

try {
  if (hasValidConfig) {
    console.log('Initializing Firebase with valid configuration');
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
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
    googleProvider = new GoogleAuthProvider();
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

    twitterProvider = new TwitterAuthProvider();

    // Only use Auth Emulator for development if needed
    // This helps bypass domain restrictions during local development
    if (typeof window !== 'undefined' && 
       (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1')) {
      // Uncomment the next line to use Firebase Auth Emulator
      // connectAuthEmulator(auth, 'http://localhost:9099');
      console.log('Using Firebase in development mode');
    }
  } else {
    console.warn('Firebase configuration is incomplete. Using dummy values.');
    // Create dummy objects for development/testing
    app = null;
    auth = {
      currentUser: null,
      onAuthStateChanged: (callback: NextOrObserver<User | null>) => callback(null),
      onIdTokenChanged: (callback: NextOrObserver<User | null>) => callback(null),
      signOut: () => Promise.resolve()
    };
    db = {};
    storage = {};
    googleProvider = {};
    twitterProvider = {};
  }
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Create fallback objects to prevent app crashes
  app = null;
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: NextOrObserver<User | null>) => callback(null),
    onIdTokenChanged: (callback: NextOrObserver<User | null>) => callback(null),
    signOut: () => Promise.resolve()
  };
  db = {};
  storage = {};
  googleProvider = {};
  twitterProvider = {};
}

export { app, auth, db, storage, googleProvider, twitterProvider }; 