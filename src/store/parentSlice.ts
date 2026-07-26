import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Parent } from '@/types';
import { parentService } from '@/services/parentService';
import { dynamicUsers } from '@/data/mockData';

interface ParentState {
  items: Parent[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ParentState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchParents = createAsyncThunk('parents/fetchAll', () =>
  parentService.getAll()
);

export const addParent = createAsyncThunk('parents/add', (data: Omit<Parent, 'id'>) =>
  parentService.create(data)
);

export const editParent = createAsyncThunk(
  'parents/edit',
  ({ id, data }: { id: string; data: Partial<Parent> }) =>
    parentService.update(id, data)
);

export const removeParent = createAsyncThunk('parents/remove', async (id: string) => {
  await parentService.delete(id);
  return id;
});

const parentSlice = createSlice({
  name: 'parents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchParents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch parents';
      })
      .addCase(addParent.fulfilled, (state, action) => {
        state.items.push(action.payload);
        // Register as a loginable user with default password "password"
        dynamicUsers.push({
          email: action.payload.email,
          password: 'password',
          user: {
            id: action.payload.id,
            name: action.payload.name,
            email: action.payload.email,
            role: 'parent',
            designation: `Parent of ${action.payload.studentName}`,
            phone: action.payload.phone,
          },
        });
      })
      .addCase(editParent.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeParent.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default parentSlice.reducer;
