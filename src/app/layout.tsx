import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/ui/site-header';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { AuthProvider } from '@/components/auth/auth-provider';
import { AuthGuard } from '@/components/auth/auth-guard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Digital Library',
  description: 'Digital Library Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthGuard>
            <AppSidebar />
            <div className="ml-64 min-h-screen">
              <SiteHeader />
              <main className="p-6 bg-gray-800 min-h-screen">
                {children}
              </main>
            </div>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}