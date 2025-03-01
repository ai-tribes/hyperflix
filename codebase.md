# HyperFlix Codebase Documentation

## Project Overview

HyperFlix is an AI-powered platform for creating viral TikTok content for memecoins. The website is built using Next.js with TypeScript and React, following a component-based architecture.

## Project Structure

```
HyperFlix/
├── .git/                # Git repository
├── .next/               # Next.js build directory
├── css/                 # Global CSS
│   └── styles.css       # Global styles
├── node_modules/        # Project dependencies
├── src/                 # Source code
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API Routes
│   │   │   └── auth/    # NextAuth API endpoints
│   │   │       └── [...nextauth]/ # NextAuth configuration
│   │   │           └── route.ts   # NextAuth handler
│   │   ├── auth/        # Authentication pages
│   │   │   ├── signin/  # Sign in page
│   │   │   │   ├── signin.module.css  # Sign in styles
│   │   │   │   └── page.tsx           # Sign in component
│   │   │   ├── signup/  # Sign up page
│   │   │   │   ├── signup.module.css  # Sign up styles
│   │   │   │   └── page.tsx           # Sign up component
│   │   │   └── reset-password/ # Password reset page
│   │   │       ├── reset-password.module.css # Password reset styles
│   │   │       └── page.tsx                  # Password reset component
│   │   ├── dashboard/   # Dashboard page
│   │   │   ├── dashboard.module.css  # Dashboard styles
│   │   │   └── page.tsx              # Dashboard component
│   │   ├── profile/     # User profile page
│   │   │   ├── profile.module.css    # Profile styles 
│   │   │   └── page.tsx              # Profile component
│   │   ├── videos/      # Videos management
│   │   │   ├── videos.module.css     # Videos page styles
│   │   │   └── page.tsx              # Videos page component
│   │   ├── tokens/      # Token management
│   │   │   ├── tokens.module.css     # Tokens page styles
│   │   │   └── page.tsx              # Tokens page component
│   │   ├── audios/      # Audio management
│   │   │   ├── audios.module.css     # Audios page styles
│   │   │   ├── page.tsx              # Audios page component
│   │   │   └── create/               # Create voiceover subpage
│   │   │       ├── create.module.css # Create voiceover styles
│   │   │       └── page.tsx          # Create voiceover component 
│   │   ├── create/      # Create UGC content
│   │   │   ├── create.module.css     # Create UGC styles
│   │   │   └── page.tsx              # Create UGC component
│   │   ├── lipsync/     # Lip Sync feature
│   │   │   ├── lipsync.module.css    # Lip Sync styles
│   │   │   └── page.tsx              # Lip Sync component
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout component
│   │   └── page.tsx     # Home page component
│   ├── components/      # React components
│   │   ├── auth/        # Authentication components
│   │   │   └── AuthSessionProvider.tsx # NextAuth session provider
│   │   ├── layout/      # Layout components
│   │   │   ├── DashboardLayout.module.css # Dashboard layout styles
│   │   │   └── DashboardLayout.tsx        # Dashboard layout component
│   │   ├── marketing/   # Marketing-specific components
│   │   │   ├── CTA.module.css        # CTA component styles
│   │   │   ├── CTA.tsx               # Call to Action component
│   │   │   ├── Features.module.css   # Features component styles
│   │   │   ├── Features.tsx          # Features section component
│   │   │   ├── Hero.module.css       # Hero component styles
│   │   │   ├── Hero.tsx              # Hero section component
│   │   │   ├── Platform.module.css   # Platform component styles
│   │   │   ├── Platform.tsx          # Platform section component
│   │   │   ├── ROI.module.css        # ROI component styles
│   │   │   ├── ROI.tsx               # ROI section component
│   │   │   ├── Token.module.css      # Token component styles
│   │   │   └── Token.tsx             # Token section component
│   │   └── shared/      # Shared components
│   │       ├── Footer.module.css     # Footer component styles
│   │       ├── Footer.tsx            # Footer component
│   │       ├── Header.module.css     # Header component styles
│   │       ├── Header.tsx            # Header component
│   │       ├── Sidebar.module.css    # Sidebar component styles
│   │       └── Sidebar.tsx           # Sidebar component
│   ├── contexts/        # React Context providers
│   │   └── AuthContext.tsx # Authentication context provider
│   ├── lib/             # Utility libraries
│   │   └── firebase.ts  # Firebase configuration
│   └── types/           # TypeScript type definitions
│       └── next-auth.d.ts # NextAuth type extensions
├── .env.local           # Environment variables
├── .gitignore           # Git ignore file
├── index.html           # Output HTML file
├── next-env.d.ts        # Next.js TypeScript declarations
├── package-lock.json    # Package lock file
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Technology Stack

- **Frontend Framework**: Next.js 14.1.0
- **UI Library**: React 18.2.0
- **Language**: TypeScript 5.3.3
- **Styling**: CSS Modules
- **Authentication**: NextAuth.js with Firebase
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Font**: Poppins (Google Fonts)
- **Icons**: React Icons (Fa icons)

## Key Components

### App Components

1. **Layout (`src/app/layout.tsx`)**: 
   - Root layout component that wraps the entire application
   - Sets up global metadata and fonts
   - Provides authentication context via AuthProvider and AuthSessionProvider
   - Applies the Poppins font to the entire application

2. **Home Page (`src/app/page.tsx`)**: 
   - Main landing page component
   - Composes the page by assembling various marketing components
   - Includes Header, Hero, Features, ROI, Platform, Token, CTA, and Footer sections

3. **Dashboard Page (`src/app/dashboard/page.tsx`)**: 
   - Main dashboard interface
   - Shows recent videos, token metrics, and quick actions
   - Uses the DashboardLayout component with sidebar navigation
   - Protected by authentication middleware

4. **Videos Page (`src/app/videos/page.tsx`)**: 
   - Displays a grid of user-generated videos
   - Includes filtering and sorting options
   - Shows video metrics like views, likes, comments, and shares
   - Protected by authentication middleware

5. **Tokens Page (`src/app/tokens/page.tsx`)**: 
   - Interface for tracking and analyzing memecoins
   - Features a data table with sorting and filtering
   - Displays key metrics like price, change, volume, and market cap
   - Protected by authentication middleware

6. **Audios Page (`src/app/audios/page.tsx`)**: 
   - Manages background music and voiceovers
   - Shows list of audio files with metadata and playback controls
   - Includes link to Create Voiceover feature
   - Protected by authentication middleware

7. **Create UGC Page (`src/app/create/page.tsx`)**: 
   - Four-step wizard for creating UGC content
   - Includes hook generation, video selection, audio, and demo sections
   - Features AI-powered content generation
   - Protected by authentication middleware

8. **Create Voiceover Page (`src/app/audios/create/page.tsx`)**: 
   - Interface for generating AI voiceovers
   - Includes text input, voice selection, and language options
   - Features real-time preview with waveform visualization
   - Protected by authentication middleware

9. **Lip Sync Page (`src/app/lipsync/page.tsx`)**: 
   - Tabbed interface for managing lip sync videos
   - Features tabs for My Lip Syncs, Templates, and Avatars
   - Displays a grid of lip sync videos with thumbnails and metadata
   - Protected by authentication middleware

10. **Sign In Page (`src/app/auth/signin/page.tsx`)**: 
    - User authentication interface
    - Includes email/password login form
    - Provides social login options (Google and Twitter)
    - Features promotional banner highlighting platform benefits

11. **Sign Up Page (`src/app/auth/signup/page.tsx`)**: 
    - User registration interface
    - Includes form with name, email, and password fields
    - Provides social registration options (Google and Twitter)
    - Features promotional banner explaining platform benefits

12. **Password Reset Page (`src/app/auth/reset-password/page.tsx`)**: 
    - Password recovery interface
    - Allows users to request password reset emails
    - Includes instructions for the reset process
    - Features informational sidebar with step-by-step guidance

13. **Profile Page (`src/app/profile/page.tsx`)**: 
    - User profile management interface
    - Allows users to update profile information
    - Provides password change functionality
    - Includes logout option
    - Protected by authentication middleware

### Authentication Components

1. **AuthContext (`src/contexts/AuthContext.tsx`)**: 
   - React context provider for authentication state
   - Manages user authentication state across the application
   - Provides methods for login, registration, logout, and password reset
   - Integrates with Firebase Authentication

2. **AuthSessionProvider (`src/components/auth/AuthSessionProvider.tsx`)**: 
   - NextAuth session provider
   - Manages authentication session state
   - Makes session data available throughout the application

3. **NextAuth Configuration (`src/app/api/auth/[...nextauth]/route.ts`)**: 
   - API route for NextAuth.js
   - Configures authentication providers (credentials, Google, Twitter)
   - Defines callbacks for JWT and session handling
   - Specifies custom pages for various authentication flows

### Layout Components

1. **DashboardLayout (`src/components/layout/DashboardLayout.tsx`)**: 
   - Provides consistent layout for authenticated app pages
   - Features left sidebar navigation
   - Responsive design with collapsible sidebar for mobile

### Shared Components

1. **Header (`src/components/shared/Header.tsx`)**: 
   - Navigation bar at the top of the page
   - Contains the logo, navigation links, and promotional tagline
   - Features responsive mobile menu

2. **Footer (`src/components/shared/Footer.tsx`)**: 
   - Footer section at the bottom of the page
   - Contains links, copyright information, and additional navigation

3. **Sidebar (`src/components/shared/Sidebar.tsx`)**: 
   - Left-side navigation for authenticated pages
   - Contains links to Dashboard, Create UGC, Videos, Tokens, Audios, and Lip Sync
   - Shows active page indicator

### Marketing Components

1. **Hero (`src/components/marketing/Hero.tsx`)**: 
   - Main hero section with headline, description, and call-to-action buttons
   - Displays key token metrics (price, market cap, holders)

2. **Features (`src/components/marketing/Features.tsx`)**: 
   - Highlights the key features of the platform

3. **ROI (`src/components/marketing/ROI.tsx`)**: 
   - Showcases return on investment information

4. **Platform (`src/components/marketing/Platform.tsx`)**: 
   - Describes the platform's capabilities and benefits

5. **Token (`src/components/marketing/Token.tsx`)**: 
   - Provides information about the $FLIX token

6. **CTA (`src/components/marketing/CTA.tsx`)**: 
   - Call-to-action section to encourage visitor engagement

## Authentication System

### User Authentication Flow

1. **Registration**:
   - Users can register with email/password
   - Name, email, and password validation
   - Social registration via Google or Twitter
   - Firebase Authentication for credentials management

2. **Login**:
   - Email/password authentication
   - Social login via Google or Twitter
   - Error handling for invalid credentials
   - Redirects to dashboard after successful login

3. **Password Reset**:
   - Email-based password reset flow
   - Reset email sent via Firebase
   - Detailed instructions provided to users

4. **User Profile**:
   - Profile information management
   - Password change functionality
   - Account settings

5. **Security**:
   - JWT-based authentication
   - Secure password handling
   - Protected routes via middleware

### Authentication Technologies

- **NextAuth.js**: For session management and OAuth providers
- **Firebase Authentication**: For user credentials and account management
- **Middleware**: To protect restricted routes
- **JWT**: For secure token-based authentication

## Styling Approach

- The project uses CSS Modules for component-specific styling
- Each component has its own `.module.css` file
- Global styles are defined in `src/app/globals.css`
- Consistent color scheme using orange gradients (#FF6B00 to #FF9E00)
- Responsive design for all screen sizes

## Navigation Structure

### Marketing Site Navigation (Header)
- Value (#value)
- ROI (#roi)
- Platform (#platform)
- Token (#token)

### App Navigation (Sidebar)
- Dashboard
- Create UGC
- Videos
- Tokens
- Audios
- Lip Sync
- Profile

## Key Features

### Authentication & User Management
- User registration and login
- Social authentication (Google & Twitter)
- Password reset functionality
- User profile management

### Content Creation
- AI-powered UGC content generation
- Four-step creation wizard
- Voice generation with customizable parameters
- Lip sync with AI avatars

### Token Management
- Track memecoin metrics
- Sort and filter token data
- Analyze performance metrics

### Media Management
- Organize videos by status and platform
- Manage audio files (music and voiceovers)
- Preview and use media in content creation

## Project Dependencies

### Production Dependencies
- next: 14.1.0
- react: 18.2.0
- react-dom: 18.2.0
- next-auth: For authentication
- firebase: For Firebase services
- react-icons: For UI icons

### Development Dependencies
- @types/node: 20.11.19
- @types/react: 18.2.57
- @types/react-dom: 18.2.19
- typescript: 5.3.3

## Application Metadata

- **Title**: HyperFlix - The Ultimate Memecoin Marketing Platform
- **Description**: AI-powered platform for creating viral TikTok content for memecoins.

## Build and Development Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run linting

## Key Marketing Messages

- AI-powered platform for creating viral TikTok content
- Specifically designed for memecoin marketing
- $FLIX utility token
- Revolutionary approach to crypto marketing 