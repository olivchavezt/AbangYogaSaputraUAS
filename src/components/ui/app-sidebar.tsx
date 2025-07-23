'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, BookOpen, Home, Library, User, Users } from 'lucide-react';
import { LogoutButton } from '@/components/ui/logout-button';

export function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Books', href: '/books', icon: Book },
    { name: 'Loans', href: '/loans', icon: BookOpen },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Authors', href: '/authors', icon: User },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white h-screen fixed flex flex-col border-r border-white/10">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl flex items-center justify-center shadow-lg border border-white/20">
            <Library className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Digital Library
            </h1>
            <p className="text-xs text-gray-400">Management System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg shadow-gray-900/50 border border-white/10'
                      : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 hover:text-white hover:border hover:border-white/5'
                  }`}
                >
                  {/* Left indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white to-gray-300 rounded-r-full"></div>
                  )}

                  <div
                    className={`p-2 rounded-lg mr-3 ${
                      isActive
                        ? 'bg-white/10 shadow-inner'
                        : 'group-hover:bg-white/5 group-hover:shadow-inner'
                    } transition-all duration-200`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="font-medium">{item.name}</span>

                  {/* Subtle glow effect for active item */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-50"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <LogoutButton />
      </div>
    </aside>
  );
}