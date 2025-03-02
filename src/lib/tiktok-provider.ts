// TikTok provider for NextAuth.js
// This is a simplified version that doesn't rely on the next-auth/providers import

export interface TikTokProfile {
  open_id: string;
  union_id: string;
  avatar_url: string;
  display_name: string;
  [key: string]: any;
}

/**
 * TikTok OAuth provider for NextAuth.js
 * Uses the TikTok Login Kit for authentication
 * @see https://developers.tiktok.com/doc/login-kit-web
 */
export default function TikTok(options: any) {
  return {
    id: "tiktok",
    name: "TikTok",
    type: "oauth" as const,
    authorization: {
      url: "https://www.tiktok.com/v2/auth/authorize/",
      params: {
        client_key: options.clientId,
        scope: "user.info.basic,video.upload,video.list",
        response_type: "code",
      }
    },
    token: "https://open.tiktokapis.com/v2/oauth/token/",
    userinfo: "https://open.tiktokapis.com/v2/user/info/",
    profile(profile: TikTokProfile) {
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