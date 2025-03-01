import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import TikTokProvider from "@/lib/tiktok-provider";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
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
        } catch (error) {
          console.error("Firebase authentication error:", error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      version: "2.0",
    }),
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_KEY || "",
      clientSecret: process.env.TIKTOK_CLIENT_SECRET || "",
      callbackUrl: process.env.NEXTAUTH_URL + "/api/auth/callback/tiktok",
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      // Store the access token and provider in the token
      if (account && account.provider === "tiktok") {
        token.tiktokAccessToken = account.access_token;
        token.tiktokRefreshToken = account.refresh_token;
        token.tiktokExpiresAt = account.expires_at;
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
            refreshToken: token.tiktokRefreshToken,
            expiresAt: token.tiktokExpiresAt,
          };
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 