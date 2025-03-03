// TikTok provider for NextAuth.js
// This is a simplified version that doesn't rely on the next-auth/providers import
import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth';

export interface TikTokProfile {
  open_id: string;
  union_id: string;
  avatar_url: string;
  display_name: string;
  [key: string]: any;
}

interface TikTokTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  scope: string;
  token_type: string;
}

/**
 * TikTok OAuth provider for NextAuth.js
 * Uses the TikTok Login Kit for authentication
 * @see https://developers.tiktok.com/doc/login-kit-web
 */
export default function TikTok(options: OAuthUserConfig<any>): OAuthConfig<any> {
  return {
    id: "tiktok",
    name: "TikTok",
    type: "oauth" as const,
    authorization: {
      url: "https://www.tiktok.com/v2/auth/authorize/",
      params: {
        client_key: options.clientId,
        scope: "user.info.basic,video.list,video.upload,video.publish",
        response_type: "code",
        state: "state", // Required for CSRF protection
      }
    },
    token: {
      url: "https://open.tiktokapis.com/v2/oauth/token/",
      async request({ client, params, checks, provider }: any) {
        const response = await fetch(provider.token.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_key: options.clientId,
            client_secret: options.clientSecret,
            code: params.code,
            grant_type: 'authorization_code',
          }),
        });
        
        const tokens: TikTokTokens = await response.json();
        return {
          tokens: {
            ...tokens,
            expires_at: Date.now() + tokens.expires_in * 1000,
            refresh_expires_at: Date.now() + tokens.refresh_expires_in * 1000,
          }
        };
      },
    },
    userinfo: {
      url: "https://open.tiktokapis.com/v2/user/info/",
      async request({ tokens, client, provider }: { tokens: TikTokTokens; client: any; provider: any }) {
        const response = await fetch(provider.userinfo.url, {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
          },
        });
        return await response.json();
      },
    },
    profile(profile: TikTokProfile, tokens: TikTokTokens) {
      return {
        id: profile.open_id,
        name: profile.display_name,
        email: null, // TikTok doesn't provide email
        image: profile.avatar_url,
        tiktok: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresAt: Date.now() + tokens.expires_in * 1000,
          refreshExpiresAt: Date.now() + tokens.refresh_expires_in * 1000,
          scope: tokens.scope,
        }
      };
    },
    style: {
      logo: "/tiktok-logo.svg",
      logoDark: "/tiktok-logo-dark.svg",
      bg: "#FFFFFF",
      bgDark: "#000000",
      text: "#000000",
      textDark: "#FFFFFF",
    },
    options,
  };
} 