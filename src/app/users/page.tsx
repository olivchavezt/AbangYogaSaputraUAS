'use client';

import { useEffect, useState } from 'react';
import { UserList } from '@/components/ui/user-list';
import { userApi } from '@/lib/api';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getAll();
        setUsers(response.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-2xl border border-white/10">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin mb-4"></div>
          <div className="text-gray-300 text-xl animate-pulse">Loading Pengguna...</div>
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
            Manajemen Pengguna
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-white via-gray-400 to-transparent rounded-full"></div>
          <p className="text-gray-400 mt-3 text-sm">
            Kelola data pengguna perpustakaan digital Anda
          </p>
        </div>

        <div className="transform hover:scale-[1.01] transition-transform duration-300">
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
}