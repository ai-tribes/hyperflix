import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";

export interface TikTokProfile extends Record<string, any> {
  open_id: string;
  union_id: string;
  avatar_url: string;
  avatar_url_100: string;
  avatar_url_200: string;
  avatar_large_url: string;
  display_name: string;
  bio_description: string;
  profile_deep_link: string;
  is_verified: boolean;
  follower_count: number;
  following_count: number;
  likes_count: number;
  video_count: number;
}

/**
 * TikTok OAuth provider for NextAuth.js
 * Uses the TikTok Login Kit for authentication
 * @see https://developers.tiktok.com/doc/login-kit-web
 */
export default function TikTok<P extends TikTokProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "tiktok",
    name: "TikTok",
    type: "oauth",
    authorization: {
      url: "https://www.tiktok.com/v2/auth/authorize/",
      params: {
        client_key: options.clientId,
        scope: "user.info.basic,video.upload,video.list",
        response_type: "code",
        redirect_uri: options.callbackUrl
      }
    },
    token: {
      url: "https://open.tiktokapis.com/v2/oauth/token/",
      async request({ params, provider, tokens }) {
        const response = await fetch(provider.token.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_key: options.clientId,
            client_secret: options.clientSecret,
            code: params.code,
            grant_type: "authorization_code",
            redirect_uri: options.callbackUrl,
          }),
        });

        const data = await response.json();

        return {
          tokens: {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_at: Date.now() + data.expires_in * 1000,
          },
        };
      },
    },
    userinfo: {
      url: "https://open.tiktokapis.com/v2/user/info/",
      async request({ tokens, provider }) {
        const response = await fetch(provider.userinfo.url, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        });

        const data = await response.json();
        return data.data;
      },
    },
    profile(profile) {
      return {
        id: profile.open_id,
        name: profile.display_name,
        email: null, // TikTok doesn't provide email
        image: profile.avatar_url,
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