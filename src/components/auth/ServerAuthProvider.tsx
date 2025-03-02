import { cookies } from 'next/headers';
import { AuthProvider } from '@/contexts/AuthContext';
import { AUTH_COOKIE_NAME, parseAuthCookie } from '@/lib/auth-utils';

interface ServerAuthProviderProps {
  children: React.ReactNode;
}

export default function ServerAuthProvider({ children }: ServerAuthProviderProps) {
  // Get auth cookie on the server
  const cookieStore = cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  
  // Parse the cookie to get initial user data
  const initialUser = authCookie ? parseAuthCookie(authCookie) : null;
  
  return (
    <AuthProvider initialUser={initialUser}>
      {children}
    </AuthProvider>
  );
} 