"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/account/profile');
  }, [router]);

  return (
    <ProtectedRoute>
      {/* This will redirect to profile, but ensures authentication first */}
      <div></div>
    </ProtectedRoute>
  );
} 