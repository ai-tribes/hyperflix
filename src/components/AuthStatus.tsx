"use client";

import { useAuth } from '@/contexts/AuthContext';

export default function AuthStatus() {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-yellow-800">Loading authentication...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Auth Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <h3 className="font-semibold text-green-800 mb-2">Authenticated</h3>
        <div className="text-sm text-green-700">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
          <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
          {user.image && <p><strong>Image:</strong> {user.image}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
      <p className="text-gray-800">Not authenticated</p>
    </div>
  );
} 