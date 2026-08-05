import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Staff } from '@/types';
import { staffService } from '@/services/staffService';
import { dynamicUsers } from '@/data/mockData';

interface StaffState {
  items: Staff[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StaffState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchStaff = createAsyncThunk('staff/fetchAll', () =>
  staffService.getAll()
);

export const addStaff = createAsyncThunk('staff/add', (data: Omit<Staff, 'id'>) =>
  staffService.create(data)
);

export const editStaff = createAsyncThunk(
  'staff/edit',
  ({ id, data }: { id: string; data: Partial<Staff> }) =>
    staffService.update(id, data)
);

export const removeStaff = createAsyncThunk('staff/remove', async (id: string) => {
  await staffService.delete(id);
  return id;
});

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch staff';
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.items.push(action.payload);
        // Register as a loginable user with default password "password"
        dynamicUsers.push({
          email: action.payload.email,
          password: 'password',
          user: {
            id: action.payload.id,
            name: action.payload.name,
            email: action.payload.email,
            role: 'staff',
            designation: `${action.payload.role} — ${action.payload.department}`,
            phone: action.payload.phone,
          },
        });
      })
      .addCase(editStaff.fulfilled, (state, action) => {
        const idx = state.items.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeStaff.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s.id !== action.payload);
      });
  },
});

export default staffSlice.reducer;
