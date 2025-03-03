# Setting up TikTok Authentication

This guide will help you set up TikTok authentication for your HyperFlix application.

## Prerequisites

1. A TikTok Developer account
2. Access to the TikTok Developer Portal
3. Your application's domain (e.g., hyper-flix.com)

## TikTok Developer Portal Configuration

1. Go to [TikTok Developer Portal](https://developers.tiktok.com/doc/login-kit-web)
2. Navigate to your app settings

### Basic Information

- **App Name**: HyperFlix
- **Category**: Business
- **Description**: HyperFlix gives you the power to create viral marketing campaigns with AI-powered content generation and multi-platform distribution.
- **Platform**: Web

### URL Configuration

Add the following URLs to your app configuration:

- **Terms of Service URL**: https://hyper-flix.com/terms
- **Privacy Policy URL**: https://hyper-flix.com/privacy
- **Web/Desktop URL**: https://hyper-flix.com

### Credentials

Your app credentials are:

```env
TIKTOK_CLIENT_KEY=awhpr1dpajln8v3l
TIKTOK_CLIENT_SECRET=UpPFhuCrwXXVPKgYRQbsIwrENDf3RlJV
```

### Required Scopes

The following scopes are required for HyperFlix functionality:

- `user.info.basic` - Basic user information
- `video.upload` - Ability to upload videos
- `video.list` - Access to user's video list

### Callback URLs

Add the following callback URLs to your app configuration:

Production:
```
https://hyper-flix.com/api/auth/callback/tiktok
```

Development:
```
http://localhost:3000/api/auth/callback/tiktok
```

## Local Development Setup

1. Update your `.env.local` file with the TikTok credentials:

```env
TIKTOK_CLIENT_KEY=awhpr1dpajln8v3l
TIKTOK_CLIENT_SECRET=UpPFhuCrwXXVPKgYRQbsIwrENDf3RlJV
```

2. Add `localhost:3000` to your TikTok app's allowed domains

## Production Setup

1. Add your production domain (`hyper-flix.com`) to the allowed domains in TikTok Developer Portal
2. Update your production environment variables with the same credentials
3. Ensure your site is served over HTTPS (required for TikTok Login Kit)

## Testing

1. Run the application locally
2. Try signing in with TikTok
3. Verify that the following data is received:
   - User's TikTok ID
   - Display name
   - Avatar URL

## Troubleshooting

Common issues and solutions:

1. **Popup Blocked**: Ensure popups are allowed for your domain
2. **Invalid Redirect URI**: Double-check the callback URLs in TikTok Developer Portal
3. **Scope Not Authorized**: Verify all required scopes are added in the app configuration

## Security Considerations

1. Never commit your TikTok credentials to version control
2. Use environment variables for all sensitive information
3. Implement proper CSRF protection (handled by NextAuth.js)
4. Store tokens securely (handled by NextAuth.js)

## Additional Resources

- [TikTok Login Kit Documentation](https://developers.tiktok.com/doc/login-kit-web)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [TikTok Developer Portal](https://developers.tiktok.com) 