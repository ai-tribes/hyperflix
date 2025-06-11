import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import TikTokProvider from "./tiktok-provider";

// Define the type for the session object with TikTok properties
interface TikTokSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// Extend the Session and JWT types
declare module "next-auth" {
  interface Session {
    tiktok?: TikTokSession;
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
  
  interface JWT {
    id?: string;
    tiktokAccessToken?: string;
    tiktokRefreshToken?: string;
    tiktokExpiresAt?: number;
  }
}

// Get the deployment URL from environment variables
const deploymentUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", optional: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        
        try {
          // First, try to sign in with existing credentials
          const userCredential = await signInWithEmailAndPassword(
            auth, 
            credentials.email, 
            credentials.password
          );
          
          const user = userCredential.user;
          
          return {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL
          };
        } catch (signInError: any) {
          console.error("Sign in attempt failed:", signInError.code);
          
          // If user doesn't exist and we have a name, try to create the account
          if (signInError.code === 'auth/user-not-found' && credentials.name) {
            try {
              console.log("User not found, attempting to create account...");
              const newUserCredential = await createUserWithEmailAndPassword(
                auth,
                credentials.email,
                credentials.password
              );
              
              // Update the user's profile with the display name
              await updateProfile(newUserCredential.user, {
                displayName: credentials.name
              });
              
              const newUser = newUserCredential.user;
              
              return {
                id: newUser.uid,
                name: newUser.displayName || credentials.name,
                email: newUser.email,
                image: newUser.photoURL
              };
            } catch (createError: any) {
              console.error("Account creation failed:", createError);
              throw new Error(`Failed to create account: ${createError.message}`);
            }
          }
          
          // Handle other sign-in errors
          if (signInError.code === 'auth/wrong-password') {
            throw new Error("Invalid password");
          } else if (signInError.code === 'auth/invalid-email') {
            throw new Error("Invalid email address");
          } else if (signInError.code === 'auth/too-many-requests') {
            throw new Error("Too many failed attempts. Please try again later.");
          } else {
            throw new Error(`Authentication failed: ${signInError.message}`);
          }
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      version: "2.0",
    }),
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_KEY || "",
      clientSecret: process.env.TIKTOK_CLIENT_SECRET || "",
    })
  ],
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/dashboard', // Redirect new users to dashboard
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      
      // Store the access token and provider in the token
      if (account && account.provider === "tiktok") {
        token.tiktokAccessToken = account.access_token as string;
        token.tiktokRefreshToken = account.refresh_token as string;
        token.tiktokExpiresAt = account.expires_at as number;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        
        // Add TikTok-specific properties to the session
        if (token.tiktokAccessToken) {
          session.tiktok = {
            accessToken: token.tiktokAccessToken,
            refreshToken: token.tiktokRefreshToken as string,
            expiresAt: token.tiktokExpiresAt as number,
          };
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}; 