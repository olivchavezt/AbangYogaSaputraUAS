'use client';

import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { bookApi, userApi, loanApi } from '@/lib/api';
import type { Loan, Book } from '@/lib/types';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalUsers: number;
  totalBooks: number;
  activeLoans: number;
  overdueLoans: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, booksResponse, loansResponse] = await Promise.all([
          userApi.getAll(),
          bookApi.getAll(),
          loanApi.getAll(),
        ]);

        setBooks(booksResponse.data);
        setLoans(loansResponse.data);

        setStats({
          totalUsers: users.data.length,
          totalBooks: booksResponse.data.length,
          activeLoans: loansResponse.data.filter((loan: Loan) => loan.status === 'active').length,
          overdueLoans: loansResponse.data.filter((loan: Loan) => loan.status === 'overdue').length,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-2xl border border-white/10">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin mb-4"></div>
          <div className="text-gray-300 text-xl animate-pulse">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Dashboard Perpustakaan
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-white via-gray-400 to-transparent rounded-full"></div>
          <p className="text-gray-400 mt-3 text-sm">
            Kelola dan pantau aktivitas perpustakaan digital Anda
          </p>
        </div>

        <StatsCards stats={stats} />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <RecentActivity
              title="Peminjaman Terbaru"
              activities={loans.slice(0, 5)}
              type="loans"
            />
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <RecentActivity
              title="Buku Baru Ditambahkan"
              activities={books.slice(0, 5)}
              type="books"
            />
          </div>
        </div>
      </div>
    </div>
  );
}