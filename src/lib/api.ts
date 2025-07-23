// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});
// Response interceptor untuk handling error
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('API Error:', message);
    return Promise.reject(message);
  }
);

// Users API
export const userApi = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (user: {
    name: string;
    email: string;
    password: string;
    membership_date: string;
  }) => api.post('/users', user),
  update: (id: string, user: {
    name: string;
    email: string;
    password: string;
  }) => api.put(`/users/${id}`, user),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Authors API
export const authorApi = {
  getAll: () => api.get('/authors'),
  getById: (id: string) => api.get(`/authors/${id}`),
  create: (author: {
    name: string;
    nationality: string;
    birthdate: string;
  }) => api.post('/authors', author),
  update: (id: string, author: {
    name: string;
    nationality: string;
  }) => api.put(`/authors/${id}`, author),
  delete: (id: string) => api.delete(`/authors/${id}`),
};

// Books API
export const bookApi = {
  getAll: () => api.get('/books'),
  getById: (id: string) => api.get(`/books/${id}`),
  create: (book: {
    title: string;
    isbn: string;
    publisher: string;
    year_published: string;
    stock: number;
    author_ids: string[];
  }) => api.post('/books', book),
  update: (id: string, book: {
    title?: string;
    stock?: number;
    author_ids?: string[];
  }) => api.put(`/books/${id}`, book),
  delete: (id: string) => api.delete(`/books/${id}`),
};

// Loans API
export const loanApi = {
  getAll: () => api.get('/loans'),
  getById: (id: string) => api.get(`/loans/${id}`),
  create: (loan: {
    user_id: string;
    book_id: string;
    loan_date: string;
    due_date: string;
  }) => api.post('/loans', loan),
  returnBook: (loanId: string) => api.patch(`/loans/${loanId}/return`),
  delete: (id: string) => api.delete(`/loans/${id}`),
};

export default api;