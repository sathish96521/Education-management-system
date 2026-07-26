import type { Parent } from '@/types';
import { mockParents } from '@/data/mockData';
import { apiGet, apiCreate, apiUpdate, apiDelete } from './api';

export const parentService = {
  getAll: () => apiGet(mockParents),
  create: (data: Omit<Parent, 'id'>) => apiCreate(mockParents, data),
  update: (id: string, data: Partial<Parent>) => apiUpdate(mockParents, id, data),
  delete: (id: string) => apiDelete(mockParents, id),
};
