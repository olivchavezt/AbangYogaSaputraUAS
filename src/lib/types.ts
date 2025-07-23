export interface User {
  user_id: string;
  name: string;
  email: string;
  password: string;
  membership_date: string; 
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  membership_date: string;
}

export interface Book {
  book_id: string;
  title: string;
  isbn: string;
  publisher: string;
  year_published: string;
  stock: number;
  authors?: Author[];
}

export interface BookFormData {
  title: string;
  isbn: string;
  publisher: string;
  year_published: string;
  stock: number;
  author_ids: string[];
}

export interface Author {
  author_id: string;
  name: string;
  nationality: string;
  birthdate: string;
}

export interface AuthorFormData {
  name: string;
  nationality: string;
  birthdate: string;
}

export interface Loan {
  loan_id: string;
  user_id: string;
  book_id: string;
  loan_date: string;
  return_date: string | null;
  status: 'active' | 'returned' | 'overdue';
  user?: User;
  book?: Book;
}

export interface LoanFormData {
  user_id: string;
  book_id: string;
}