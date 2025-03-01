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
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout component
│   │   └── page.tsx     # Home page component
│   └── components/      # React components
│       ├── marketing/   # Marketing-specific components
│       │   ├── CTA.module.css        # CTA component styles
│       │   ├── CTA.tsx               # Call to Action component
│       │   ├── Features.module.css   # Features component styles
│       │   ├── Features.tsx          # Features section component
│       │   ├── Hero.module.css       # Hero component styles
│       │   ├── Hero.tsx              # Hero section component
│       │   ├── Platform.module.css   # Platform component styles
│       │   ├── Platform.tsx          # Platform section component
│       │   ├── ROI.module.css        # ROI component styles
│       │   ├── ROI.tsx               # ROI section component
│       │   ├── Token.module.css      # Token component styles
│       │   └── Token.tsx             # Token section component
│       └── shared/      # Shared components
│           ├── Footer.module.css     # Footer component styles
│           ├── Footer.tsx            # Footer component
│           ├── Header.module.css     # Header component styles
│           └── Header.tsx            # Header component
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
- **Font**: Poppins (Google Fonts)

## Key Components

### App Components

1. **Layout (`src/app/layout.tsx`)**: 
   - Root layout component that wraps the entire application
   - Sets up global metadata and fonts
   - Applies the Poppins font to the entire application

2. **Home Page (`src/app/page.tsx`)**: 
   - Main landing page component
   - Composes the page by assembling various marketing components
   - Includes Header, Hero, Features, ROI, Platform, Token, CTA, and Footer sections

### Shared Components

1. **Header (`src/components/shared/Header.tsx`)**: 
   - Navigation bar at the top of the page
   - Contains the logo and navigation links

2. **Footer (`src/components/shared/Footer.tsx`)**: 
   - Footer section at the bottom of the page
   - Contains links, copyright information, and additional navigation

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

## Styling Approach

- The project uses CSS Modules for component-specific styling
- Each component has its own `.module.css` file
- Global styles are defined in `src/app/globals.css` and `css/styles.css`

## Navigation Structure

The main navigation is defined in the Header component with links to:
- Value (#value)
- ROI (#roi)
- Platform (#platform)
- Token (#token)

## Project Dependencies

### Production Dependencies
- next: 14.1.0
- react: 18.2.0
- react-dom: 18.2.0

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