export type UserRole = 'admin' | 'user' | 'partner';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  contactNo: string;
  address: string;
  status: 'active' | 'inactive';
  password: string;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserFormData extends Omit<User, 'id' | 'password'> {
  password?: string;
}