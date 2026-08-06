import type { Institution } from '@/types';
import { mockInstitutions } from '@/data/mockData';
import { apiGet, apiCreate, apiUpdate, apiDelete } from './api';

export const institutionService = {
  getAll: () => apiGet(mockInstitutions),
  create: (data: Omit<Institution, 'id'>) => apiCreate(mockInstitutions, data),
  update: (id: string, data: Partial<Institution>) => apiUpdate(mockInstitutions, id, data),
  delete: (id: string) => apiDelete(mockInstitutions, id),
};
