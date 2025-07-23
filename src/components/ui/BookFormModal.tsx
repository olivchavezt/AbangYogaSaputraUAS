'use client';

import { Book, BookFormData, Author } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { authorApi } from '@/lib/api';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book | null;
  onSubmit: (data: BookFormData, book?: Book) => Promise<void>;
}

export function BookFormModal({ isOpen, onClose, book, onSubmit }: BookFormModalProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    isbn: '',
    publisher: '',
    year_published: '',
    stock: 0,
    author_ids: [],
  });

  const [authors, setAuthors] = useState<Author[]>([]);

  // Ambil authors saat komponen mount
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const result = await authorApi.getAll();
        setAuthors(result.data); 
      } catch (error) {
        console.error('Failed to fetch authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        isbn: book.isbn,
        publisher: book.publisher,
        year_published: book.year_published,
        stock: book.stock,
        author_ids: book.authors?.map(a => a.author_id) || [],
      });
    } else {
      setFormData({
        title: '',
        isbn: '',
        publisher: '',
        year_published: '',
        stock: 0,
        author_ids: [],
      });
    }
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData, book ?? undefined);
      onClose();
    } catch (error) {
      console.error('Failed to submit book data:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="year_published">Year Published</Label>
              <Input
                id="year_published"
                name="year_published"
                value={formData.year_published}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="publisher">Publisher</Label>
            <Input
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleNumberChange}
              required
              min="0"
            />
          </div>
          <div>
            <Label>Authors</Label>
            <MultiSelect
              options={authors.map(author => ({
                value: author.author_id,
                label: author.name,
              }))}
              selected={formData.author_ids}
              onChange={(selected) =>
                setFormData(prev => ({ ...prev, author_ids: selected }))
              }
              placeholder="Select authors..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
