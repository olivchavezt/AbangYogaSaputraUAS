'use client';

import { Book, BookFormData } from '@/lib/types';
import { useState } from 'react';
import { BookFormModal } from './BookFormModal';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { bookApi } from '@/lib/api';

interface BookListProps {
  books: Book[];
}

export function BookList({ books }: BookListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleDelete = async (bookId: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await bookApi.delete(bookId);
        console.log('Delete book:', bookId);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleSubmit = async (formData: BookFormData) => {
    try {
      if (selectedBook) {
        await bookApi.update(selectedBook.book_id, formData);
        console.log('Updated book:', formData);
      } else {
        await bookApi.create(formData);
        console.log('Created book:', formData);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <>
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Books</h2>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add New Book
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Title</TableHead>
                <TableHead className="text-gray-300">ISBN</TableHead>
                <TableHead className="text-gray-300">Publisher</TableHead>
                <TableHead className="text-gray-300">Year</TableHead>
                <TableHead className="text-gray-300">Stock</TableHead>
                <TableHead className="text-right text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.length === 0 ? (
                <TableRow className="border-gray-700">
                  <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                    No books found
                  </TableCell>
                </TableRow>
              ) : (
                books.map((book) => (
                  <TableRow key={book.book_id} className="border-gray-700 hover:bg-gray-700">
                    <TableCell className="font-medium text-white">{book.title}</TableCell>
                    <TableCell className="text-gray-300">{book.isbn}</TableCell>
                    <TableCell className="text-gray-300">{book.publisher}</TableCell>
                    <TableCell className="text-gray-300">{book.year_published}</TableCell>
                    <TableCell className="text-gray-300">{book.stock}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(book)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(book.book_id)}
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

      <BookFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        book={selectedBook}
        onSubmit={handleSubmit}
      />
    </>
  );
}