# BuzzClip Platform Reference Documentation

## Overview

BuzzClip is an AI-powered platform that enables users to create TikTok UGC (User Generated Content) quickly and efficiently. The platform offers tools for generating viral hooks, selecting AI avatars, adding audio elements, and directly publishing to TikTok. This document serves as a reference for developing HyperFlix, a similar platform specifically focused on memecoin marketing.

## Platform Structure

### Navigation & Main Sections

BuzzClip features a consistent left sidebar navigation with the following sections:
- Dashboard
- Create UGC Content
- Videos
- Products
- Audios
- Lip Sync (marked as "New!")
- Account
- Support

In the top-right corner, there's typically a promotional tag line: "BuzzClip - Generate Viral TikTok UGC in Seconds"

## Key Pages & Features

### 1. Setup Guide

![Setup Guide]

The setup process includes three main steps:
1. **Connect TikTok account**
   - Allows direct publishing to TikTok
   - Takes approximately 30 seconds to connect
   - Features a "Connect" button with TikTok icon

2. **Add First Product**
   - Enables generation of viral hooks
   - Takes approximately 30 seconds to set up
   - Has an "Add Product" button

3. **Subscription Required**
   - Shows estimated setup time (2-3 minutes)
   - Features an "Upgrade now" button
   - Uses Stripe for payment processing

### 2. Create UGC Content Interface

![Create UGC Content]

The content creation workflow follows a four-step process:

1. **Hook**
   - Text input field for entering hooks
   - Option to "Generate 10+ hooks" with an AI-powered tool
   - Text formatting options (Bold, Outline, etc.)

2. **Video**
   - Choose from a gallery of AI avatars/characters
   - Tabs for "UGC" and "Lipsync" content types
   - Visual preview of selected avatar

3. **Audio** (Optional)
   - Two options: "Background Music" and "Voice Over"
   - Dropdown to select music or generate voice over

4. **Demo Video** (Optional)
   - Upload area for demo video content

The right side of the interface shows a live preview of the video being created with the selected avatar and hook text. At the bottom is a prominent "Generate" button.

### 3. My Videos Page

![My Videos]

A simple gallery view showing:
- Page title "My Videos"
- "Upload Demo Video" button in the top-right
- Empty state indicating no videos have been created yet

### 4. Products Page

![Products]

Features:
- "Add Product" button in the top-right
- Empty state message: "No products yet. Click 'Add Product' to create your first product."

**Add Product Modal:**
- Name field
- "What it does" description field (with note about using this for generating hooks)
- Character counter (50 characters needed)
- Default Language selector (showing English with US flag)
- Cancel and "Add product" buttons

### 5. Audios Page

![Audios]

Contains two main options:
1. **Generate Voice**
   - AI text-to-speech functionality
   - Describes the feature as generating AI voice

2. **Upload Audio**
   - For songs or voice recordings
   - Upload interface for audio files

### 6. Lip Sync Creator

![Lip Sync]

A specialized tool with several components:
- "Lip Sync Creator" title
- Left panel for selecting voices
- Central preview area showing "Original Video" and "Generated Video"
- Right panel with:
  - "How It Works" instructions (3 steps)
  - Tips for best results
  - Advanced Settings section with:
    - Model Version options (v1.9.0-beta, v1.8.0, v1.7.1)
    - Processing Speed options (1x, 2x, 3x, 4x)
  - "Generate Lip Sync" button at bottom

### 7. Pricing Page

![Pricing]

The pricing page features:
- Headline: "Start TikTok Virality Today"
- Subheadline: "For no more than ~$1 per video. Cancel anytime."
- Toggle between Monthly and Yearly (save 20%) billing options

Three pricing tiers:
1. **Starter: $19/month**
   - 15 videos per month
   - 15 video generations
   - 15 voiceovers (29 languages)
   - 150+ UGC Avatars
   - Unlimited viral hooks
   - Multiple TikTok accounts
   - Direct TikTok publishing
   - 15 lipsyncs

2. **Growth: $49/month** (Highlighted as recommended)
   - 50 videos per month
   - Same features as Starter but with higher limits

3. **Scale: $95/month**
   - 150 videos per month
   - Same features as other plans but with highest limits

All plans include:
- "Get Started" button
- "Secured by Stripe" badge

Additional pricing/value sections include:
- "Save Hours using AI"
- "Save Money and Time" comparison with traditional methods
- Cost comparison chart (BuzzClip ~$1 per video vs. Traditional ~$100 per video)

### 8. Marketing/Landing Pages

![Landing Pages]

Several marketing sections:
1. **Hero Section**
   - "Generate Clips that buzz your traffic in seconds"
   - Subtitle: "Post daily user AI-generated TikToks in one click"
   - "Dashboard" button
   - "Trusted by 700+ happy users"

2. **Product Demonstration**
   - "You're 60 seconds from your first viral TikTok UGC"
   - Shows product interface with TikTok publishing modal
   - Featured on Product Hunt badge

3. **Process Explanation**
   - "UGC TikToks. At Lightspeed."
   - Three-step process:
     1. Pick a character (100+ unique avatars)
     2. Customize the UGC (hooks, text, demo video)
     3. Publish on TikTok (direct or draft publishing)
   - "Create Now" button

4. **Features Sections**
   - "AI UGC Characters"
   - "AI Lip Sync" (Marked as "New!")
   - "Multi-Language Support" (28+ languages)
   - "Viral Hooks"

5. **Final CTA**
   - "Ready to Create Your First Viral Video?"
   - "Join hundreds of creators transforming their content strategy"
   - "Dashboard" button
   - Trust indicators

### 9. FAQ Section

![FAQ]

Questions covered:
- What is BuzzClip?
- How does BuzzClip's AI UGC creation work?
- Can I use the videos for commercial purposes?
- How many videos can I create?
- Can I cancel my subscription anytime?
- How fast is the generation process?
- How many languages do you support?
- How does the AI character generation work?
- Can I publish directly to TikTok?
- What makes BuzzClip different from other tools?
- Do you offer customer support?

Each question has an expandable answer section.

### 10. Account Settings

![Account Settings]

The account page includes:
- Account Settings header
- Form fields for:
  - Your Name (with 64 character maximum)
  - Your Email (with verification notice)
- Connected TikTok Accounts section
  - Shows if any accounts are connected
  - "Connect TikTok Account" button
- Subscription Plan section
  - Current plan display
  - Option to change plan
  - "Open customer portal" button for managing subscription on Stripe
- Sign Out section
  - "Sign Out" button
  - Message that you can always sign back in

### 11. TikTok Authorization

![TikTok Authorization]

Shows the TikTok authorization screen:
- "BuzzClip wants to access your TikTok account"
- Profile switching option
- Permissions requested:
  - Access profile info (avatar and display name)
  - Post content to TikTok
  - Upload draft content to TikTok for further editing
- Links to Terms of Service and Privacy Policy
- Cancel and Continue buttons

## Adaptation for HyperFlix (Memecoin Marketing Focus)

To adapt this platform for HyperFlix's memecoin marketing focus, consider:

1. **Terminology Changes**
   - Replace generic "product" with "memecoin" or "token"
   - Focus the hook generation on crypto/memecoin specific language

2. **Feature Adaptations**
   - Add memecoin-specific UGC templates
   - Include price chart displays in videos
   - Feature token metrics prominently (price, market cap, holder count)

3. **Additional Sections**
   - Token metrics dashboard
   - Integration with popular crypto data APIs
   - Memecoin-specific AI avatars/characters
   - Templates for common memecoin marketing formats

4. **Content Focus**
   - Pre-written hooks specifically about token launches, pumps, community, etc.
   - Background elements related to crypto/trading
   - Educational elements about token utility

5. **Marketing Language**
   - Emphasize ROI for token marketing
   - Focus on virality leading to token purchases
   - Highlight memecoin success stories

## Technical Implementation Notes

1. **TikTok API Integration**
   - Requires OAuth for posting directly to TikTok
   - Needs permissions for profile access and content posting

2. **AI Generation Features**
   - Character/avatar generation system
   - Voice generation in multiple languages
   - Lip-sync technology (latest v1.9.0-beta)
   - Hook generation AI

3. **Subscription Management**
   - Stripe integration for payments
   - Tiered system based on usage volume
   - Monthly and yearly billing options

4. **Video Processing**
   - Different processing speeds (1x-4x)
   - Video preview functionality
   - Multiple avatar options
   - Text overlay capabilities 