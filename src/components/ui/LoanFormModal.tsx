'use client';

import { LoanFormData, User, Book } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { userApi, bookApi } from '@/lib/api';

interface LoanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LoanFormData) => Promise<void>;
}

export function LoanFormModal({ isOpen, onClose, onSubmit }: LoanFormModalProps) {
  const [formData, setFormData] = useState<LoanFormData>({
    user_id: '',
    book_id: '',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch users and books when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const [usersResult, booksResult] = await Promise.all([
            userApi.getAll(),
            bookApi.getAll(),
          ]);
          setUsers(usersResult.data || []);
          // Filter books with stock > 0
          setBooks((booksResult.data || []).filter((book: Book) => book.stock > 0));
        } catch (error) {
          console.error('Failed to fetch data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        user_id: '',
        book_id: '',
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.user_id || !formData.book_id) {
      alert('Please select both user and book');
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to create loan:', error);
      alert('Failed to create loan. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Loan</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="py-8 text-center text-gray-500">
            Loading users and books...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="user_id">Select User</Label>
              <select
                id="user_id"
                name="user_id"
                value={formData.user_id}
                onChange={(e) => setFormData(prev => ({ ...prev, user_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose a user...</option>
                {users.map((user) => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="book_id">Select Book</Label>
              <select
                id="book_id"
                name="book_id"
                value={formData.book_id}
                onChange={(e) => setFormData(prev => ({ ...prev, book_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose a book...</option>
                {books.map((book) => (
                  <option key={book.book_id} value={book.book_id}>
                    {book.title} - {book.publisher} ({book.year_published}) - Stock: {book.stock}
                  </option>
                ))}
              </select>
              {books.length === 0 && (
                <p className="text-sm text-gray-500">
                  No books available for loan (all books are out of stock)
                </p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Loan Information</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Loan period: 14 days</p>
                <p>• Loan date: {new Date().toLocaleDateString()}</p>
                <p>• Due date: {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!formData.user_id || !formData.book_id || books.length === 0}
              >
                Create Loan
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}