"use client";

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Only show loading spinner during authentication check
  if (loading) {
    console.log('[ProtectedRoute] Loading authentication state');
    return <LoadingSpinner />;
  }

  // Middleware should have already redirected if not authenticated
  // This is just a fallback protection in case middleware failed
  if (!user) {
    console.log('[ProtectedRoute] No authenticated user found');
    // Don't redirect here - middleware should handle this
    // Just show loading spinner as a fallback instead of redirecting
    return <LoadingSpinner />;
  }

  // User is authenticated, render the protected content
  console.log('[ProtectedRoute] User authenticated, rendering content:', user.uid);
  return <>{children}</>;
} 