import type { Student } from '@/types';
import { mockStudents } from '@/data/mockData';
import { apiGet, apiCreate, apiUpdate, apiDelete } from './api';

export const studentService = {
  getAll: () => apiGet(mockStudents),
  create: (data: Omit<Student, 'id'>) => apiCreate(mockStudents, data),
  update: (id: string, data: Partial<Student>) => apiUpdate(mockStudents, id, data),
  delete: (id: string) => apiDelete(mockStudents, id),
};
