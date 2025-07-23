'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    router.push('@/app/login/page');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center px-4 py-3 rounded-md transition-colors text-red-400 hover:text-red-300 hover:bg-red-900/20"
    >
      <LogOut className="w-5 h-5 mr-3" />
      <span>Logout</span>
    </button>
  );
}
