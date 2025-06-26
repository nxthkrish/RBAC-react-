import apiClient from './apiClient';
import { UserFormData } from '../types/user';

export const login = async (credentials: { email: string; password: string }) => {
  const response = await apiClient.post('/login', credentials);
  return response.data;
};

export const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData: UserFormData) => {
  const response = await apiClient.post('/users', userData);
  return response.data;
};

export const updateUser = async (id: string, userData: UserFormData) => {
  const response = await apiClient.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};