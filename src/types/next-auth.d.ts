import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]
    tiktok?: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    }
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend the built-in JWT types
   */
  interface JWT {
    id: string;
    tiktokAccessToken?: string;
    tiktokRefreshToken?: string;
    tiktokExpiresAt?: number;
  }
} 