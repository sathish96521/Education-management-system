import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Institution } from '@/types';
import { institutionService } from '@/services/institutionService';

interface InstitutionState {
  items: Institution[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InstitutionState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchInstitutions = createAsyncThunk('institutions/fetchAll', () =>
  institutionService.getAll()
);

export const addInstitution = createAsyncThunk('institutions/add', (data: Omit<Institution, 'id'>) =>
  institutionService.create(data)
);

export const editInstitution = createAsyncThunk(
  'institutions/edit',
  ({ id, data }: { id: string; data: Partial<Institution> }) =>
    institutionService.update(id, data)
);

export const removeInstitution = createAsyncThunk('institutions/remove', async (id: string) => {
  await institutionService.delete(id);
  return id;
});

const institutionSlice = createSlice({
  name: 'institutions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstitutions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInstitutions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInstitutions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch institutions';
      })
      .addCase(addInstitution.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editInstitution.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeInstitution.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export default institutionSlice.reducer;
