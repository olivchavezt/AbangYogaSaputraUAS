'use client';

import { User, UserFormData } from '@/lib/types';
import { useState } from 'react';
import { UserFormModal } from './UserFormModal';
import { Button } from '@/components/ui/button';
import { userApi } from '@/lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await userApi.delete(userId);
        console.log('Deleted user:', userId);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSubmit = async (formData: UserFormData, user?: User) => {
    try {
      if (user) {
        await userApi.update(user.user_id, formData);
        console.log('Updated user:', user.user_id);
      } else {
        await userApi.create(formData);
        console.log('Created user:', formData);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error submitting user:', error);
    }
  };

  return (
    <>
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Users</h2>
          <Button 
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add New User
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Membership Date</TableHead>
                <TableHead className="text-right text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow className="border-gray-700">
                  <TableCell colSpan={4} className="text-center text-gray-400 py-8">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.user_id} className="border-gray-700 hover:bg-gray-700">
                    <TableCell className="font-medium text-white">{user.name}</TableCell>
                    <TableCell className="text-gray-300">{user.email}</TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(user.membership_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(user)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(user.user_id)}
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

      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        user={selectedUser}
        onSubmit={handleSubmit}
      />
    </>
  );
}
