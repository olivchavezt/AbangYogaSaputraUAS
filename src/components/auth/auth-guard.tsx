'use client';

import { useAuth } from './auth-provider';
import { LoginForm } from '@/app/login/page';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
}