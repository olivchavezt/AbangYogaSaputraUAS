'use client';

import { Author, AuthorFormData } from '@/lib/types';
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

interface AuthorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  author?: Author | null;
  onSubmit: (data: AuthorFormData, author?: Author) => Promise<void>;
}

export function AuthorFormModal({ isOpen, onClose, author, onSubmit }: AuthorFormModalProps) {
  const [formData, setFormData] = useState<AuthorFormData>({
    name: '',
    nationality: '',
    birthdate: '',
  });

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name,
        nationality: author.nationality,
        birthdate: author.birthdate,
      });
    } else {
      setFormData({
        name: '',
        nationality: '',
        birthdate: '',
      });
    }
  }, [author]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData, author ?? undefined);
      onClose();
    } catch (error) {
      console.error('Failed to submit author data:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{author ? 'Edit Author' : 'Add New Author'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="birthdate">Birth Date</Label>
            <Input
              id="birthdate"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              required
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