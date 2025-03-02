"use client";

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthSessionProvider from '@/components/auth/AuthSessionProvider';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AuthSessionProvider>
      <AuthProvider>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </AuthProvider>
    </AuthSessionProvider>
  );
} 