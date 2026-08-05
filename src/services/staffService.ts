import type { Staff } from '@/types';
import { mockStaff } from '@/data/mockData';
import { apiGet, apiCreate, apiUpdate, apiDelete } from './api';

export const staffService = {
  getAll: () => apiGet(mockStaff),
  create: (data: Omit<Staff, 'id'>) => apiCreate(mockStaff, data),
  update: (id: string, data: Partial<Staff>) => apiUpdate(mockStaff, id, data),
  delete: (id: string) => apiDelete(mockStaff, id),
};
