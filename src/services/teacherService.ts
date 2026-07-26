import type { Teacher } from '@/types';
import { mockTeachers } from '@/data/mockData';
import { apiGet, apiCreate, apiUpdate, apiDelete } from './api';

export const teacherService = {
  getAll: () => apiGet(mockTeachers),
  create: (data: Omit<Teacher, 'id'>) => apiCreate(mockTeachers, data),
  update: (id: string, data: Partial<Teacher>) => apiUpdate(mockTeachers, id, data),
  delete: (id: string) => apiDelete(mockTeachers, id),
};
