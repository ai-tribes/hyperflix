// Configuration to prevent static generation for client-side pages
// This file is imported by pages that need browser APIs and should not be statically generated

// Set dynamic rendering mode (forces dynamic rendering for the page)
export const dynamic = 'force-dynamic';

// Optional: Set runtime to nodejs for server components
export const runtime = 'edge'; // Use 'edge' for better performance with client components

// Optional: Set revalidation time to 0 (always revalidate)
export const revalidate = 0; 