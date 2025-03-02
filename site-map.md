# HyperFlix Site Map

## Current Status Overview

This site map reflects the current state of the HyperFlix platform, highlighting both implemented features and areas requiring attention.

### Key Issues Requiring Immediate Attention:
- **Authentication System**: Sign-up and sign-in functionality not working properly
- **Pricing Page**: Not appearing correctly or processing payments as expected
- **Environment Variables**: Firebase configuration may be missing or incorrect
- **Middleware Issues**: Authentication token handling needs refinement

## Public Pages (Unauthenticated Access)

### Landing Page (/)
- **Hero Section**: Main banner with call-to-action buttons
- **Features Section**: Highlights key features of the platform
- **Platform Section**: Information about the platform functionality
- **ROI Section**: Return on investment information 
- **Token Section**: Details about the platform's token
- **CTA Section**: Final call-to-action

### Authentication Pages
- **/auth/signin**: User login page
  - Email/password login
  - Google authentication (needs domain authorization)
  - Twitter authentication (coming soon, not implemented)
  - TikTok authentication (coming soon, not implemented)
  - Error handling and user redirection

- **/auth/signup**: New user registration
  - Email/password registration
  - Google registration
  - Twitter registration (coming soon, not implemented)
  - Form validation and error handling
  - Redirect to dashboard upon success

- **/auth/reset-password**: Password recovery
  - Email-based password reset
  - Reset email sent via Firebase
  - Instructions for users

### Pricing (/pricing)
- Three-tier pricing model:
  - Starter Plan ($19/month)
  - Growth Plan ($49/month)
  - Scale Plan ($99/month)
- Monthly/yearly toggle with 20% discount for yearly plans
- Comparison chart vs. traditional methods
- FAQ section
- Stripe integration for payment processing (currently mocked)

### Support (/support)
- Customer support and help resources
- FAQ section with memecoin-focused questions

## Authenticated Pages (Requires Login)

### Dashboard (/dashboard)
- Main user dashboard with overview of activity
- Analytics section for content performance
- Recent videos section
- Token metrics display (price, market cap, holders)
- Shortcuts to main platform features

### Content Creation
- **/create**: Content creation hub
  - Four-step content creation workflow:
    - Hook Generation
    - Video Selection
    - Audio Features
    - Demo Video
  - Preview of final video
  - Generate button with processing indicators

- **/lipsync**: AI lip sync feature
  - Left panel for voice selection
  - Central preview area
  - Right panel with instructions and settings
  - Model version selection
  - Processing speed options

- **/videos**: Video management
  - Gallery view of videos
  - Upload functionality
  - Sorting and filtering options
  - Video editing, deletion, and archiving
  - TikTok publishing integration

- **/audios**: Audio management
  - Voice generation functionality
  - Upload audio interface
  - Audio library management
  - Audio preview functionality

### User Management
- **/profile**: User profile settings and information
  - Name and profile picture management
  - Password change functionality

- **/account**: Account management and billing
  - Subscription plan management
  - Connected TikTok accounts section
  - Sign out functionality

- **/tokens**: Token/memecoin management
  - Token addition interface with crypto-specific fields
  - Editing and deletion functionality
  - List view with key metrics
  - Performance tracking

## API Endpoints

- **/api/auth/**: Authentication-related API endpoints
  - NextAuth configuration
  - Session and JWT handling

- **/api/stripe/**: Payment processing endpoints
  - Subscription management
  - Webhook handling
  - Customer portal redirects

## Components Structure

### Layout Components
- **Header**: Site navigation and user controls
  - Conditional navigation based on authentication status
  - Mobile-responsive menu
  - Platform promotional tagline

- **Footer**: Site information, links, and legal
  - Navigation links
  - Copyright information
  - Social media links

- **Sidebar**: Navigation for authenticated users
  - Links to main app sections
  - Account dropdown
  - Active page indicator

- **DashboardLayout**: Layout wrapper for authenticated sections
  - Left sidebar navigation
  - Main content area
  - Top header with user information

### Marketing Components
- **Hero**: Main landing page banner
  - Headline, description, and call-to-action buttons
  - Token metrics display
  - Background gradient and decorative elements

- **Features**: Product features showcase
  - AI-powered virality
  - Quick content creation
  - Direct TikTok publishing
  - Price impact tracking
  - Crypto-native avatars
  - Token-powered ecosystem

- **Platform**: Platform capabilities description
  - Visual demonstration of the platform
  - Key selling points

- **ROI**: Return on investment information
  - Comparison with traditional marketing approaches
  - Cost savings and efficiency gains

- **Token**: Token information section
  - $FLIX utility token details
  - Tokenomics and benefits

- **CTA**: Call to action components
  - Sign-up prompt
  - Final conversion element

### Shared Components
- **Header components**: Base header and navigation
  - HeaderBase
  - HeaderNavigation
  - SkeletonNavigation (for loading states)

- **Footer**: Site footer with links and information
  - Company information
  - Navigation links
  - Legal notices

- **LoadingSpinner**: Loading indicator for async operations
  - Used during authentication
  - Used during content generation
  - Used during API calls

- **Sidebar**: Navigation sidebar for authenticated sections
  - Collapsible on mobile
  - Shows active section

### Authentication Components
- **GoogleSignInButton**: Google authentication integration
  - OAuth flow
  - Error handling

- **Other auth-related components**:
  - Form validation
  - Error display
  - Success messaging

## Middleware and Routing
- Route protection for authenticated pages
  - Cookie-based auth verification
  - Redirection to login for unauthenticated users

- API route handling
  - Authentication protection
  - Rate limiting

- Dynamic page routing
  - Page-specific configurations
  - Force dynamic rendering for client components

## Memecoin-Specific Features
- Token price chart display in videos
- Memecoin-specific UGC templates
- AI hook generator with crypto/memecoin focus
- Integration with cryptocurrency price APIs
- Token metrics dashboard
- Crypto-themed avatar options

## Setup Guide (Planned)
- TikTok account connection onboarding
- Memecoin/token setup wizard
- Subscription selection process
- Progress tracking system

## Testing & Launch Status
- Comprehensive testing required:
  - Unit tests
  - Integration tests
  - User acceptance testing
  - Performance testing
  - Security audit

- Performance optimization needed:
  - Code splitting
  - Image optimization
  - Caching strategies
  - CDN configuration 