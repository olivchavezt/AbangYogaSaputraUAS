'use client';

import { Loan, LoanFormData } from '@/lib/types';
import { useState } from 'react';
import { LoanFormModal } from './LoanFormModal';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, RotateCcw, Trash2 } from 'lucide-react';
import { loanApi } from '@/lib/api';

interface LoanListProps {
  loans: Loan[];
}

export function LoanList({ loans }: LoanListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleReturn = async (loanId: string) => {
    if (confirm('Are you sure you want to return this book?')) {
      try {
        await loanApi.returnBook(loanId);
        console.log('Return book loan:', loanId);
        window.location.reload();
      } catch (error) {
        console.error('Error returning book:', error);
      }
    }
  };

  const handleDelete = async (loanId: string) => {
    if (confirm('Are you sure you want to delete this loan record?')) {
      try {
        await loanApi.delete(loanId);
        console.log('Delete loan:', loanId);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting loan:', error);
      }
    }
  };

  const handleSubmit = async (formData: LoanFormData) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14); // 14 days loan period
      
      const loanData = {
        user_id: formData.user_id,
        book_id: formData.book_id,
        loan_date: currentDate,
        due_date: dueDate.toISOString().split('T')[0],
      };

      await loanApi.create(loanData);
      console.log('Created loan:', loanData);
      window.location.reload();
    } catch (error) {
      console.error('Error creating loan:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'returned':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Loans</h2>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Loan
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Book</TableHead>
                <TableHead className="text-gray-300">User</TableHead>
                <TableHead className="text-gray-300">Loan Date</TableHead>
                <TableHead className="text-gray-300">Return Date</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-right text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.length === 0 ? (
                <TableRow className="border-gray-700">
                  <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                    No loans found
                  </TableCell>
                </TableRow>
              ) : (
                loans.map((loan) => (
                  <TableRow key={loan.loan_id} className="border-gray-700 hover:bg-gray-700">
                    <TableCell className="font-medium text-white">
                      {loan.book?.title || 'Unknown Book'}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {loan.user?.name || loan.user?.email || 'Unknown User'}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(loan.loan_date)}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {loan.return_date ? formatDate(loan.return_date) : '-'}
                    </TableCell>
                    <TableCell>
                      <span className={getStatusBadge(loan.status)}>
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {loan.status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReturn(loan.loan_id)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Return
                          </Button>
                        )}
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(loan.loan_id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <LoanFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
}