'use client';

import { Author, AuthorFormData } from '@/lib/types';
import { useState } from 'react';
import { AuthorFormModal } from './AuthorFormModal';
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
import { authorApi } from '@/lib/api';

interface AuthorListProps {
  authors: Author[];
}

export function AuthorList({ authors }: AuthorListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const handleEdit = (author: Author) => {
    setSelectedAuthor(author);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedAuthor(null);
  };

  const handleDelete = async (authorId: string) => {
    if (confirm('Are you sure you want to delete this author?')) {
      try {
        await authorApi.delete(authorId);
        console.log('Delete author:', authorId);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting author:', error);
      }
    }
  };

  const handleSubmit = async (formData: AuthorFormData) => {
    try {
      if (selectedAuthor) {
        await authorApi.update(selectedAuthor.author_id, formData);
        console.log('Updated author:', formData);
      } else {
        await authorApi.create(formData);
        console.log('Created author:', formData);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error saving author:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Authors</h2>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add New Author
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Nationality</TableHead>
                <TableHead className="text-gray-300">Birth Date</TableHead>
                <TableHead className="text-right text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authors.length === 0 ? (
                <TableRow className="border-gray-700">
                  <TableCell colSpan={4} className="text-center text-gray-400 py-8">
                    No authors found
                  </TableCell>
                </TableRow>
              ) : (
                authors.map((author) => (
                  <TableRow key={author.author_id} className="border-gray-700 hover:bg-gray-700">
                    <TableCell className="font-medium text-white">{author.name}</TableCell>
                    <TableCell className="text-gray-300">{author.nationality}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(author.birthdate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(author)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(author.author_id)}
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

      <AuthorFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        author={selectedAuthor}
        onSubmit={handleSubmit}
      />
    </>
  );
}