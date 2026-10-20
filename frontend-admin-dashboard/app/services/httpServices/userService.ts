import { httpService } from '../httpService';
import type { User } from '~/types/user';

export const userService = {
  getUsers: () => httpService.get<User[]>('/users'),
  getUserById: (id: string) => httpService.get<User>(`/users/${id}`),
  createUser: (user: Omit<User, 'id'>) => httpService.post<User>('/users', user),
  updateUser: (id: string, user: Partial<User>) => httpService.put<User>(`/users/${id}`, user),
  deleteUser: (id: string) => httpService.delete(`/users/${id}`),
};

/** Query params accepted by the list thunk. */
export type FetchUserListParams = Record<string, unknown>;
