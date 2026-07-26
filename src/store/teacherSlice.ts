import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Teacher } from '@/types';
import { teacherService } from '@/services/teacherService';

interface TeacherState {
  items: Teacher[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TeacherState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTeachers = createAsyncThunk('teachers/fetchAll', () =>
  teacherService.getAll()
);

export const addTeacher = createAsyncThunk('teachers/add', (data: Omit<Teacher, 'id'>) =>
  teacherService.create(data)
);

export const editTeacher = createAsyncThunk(
  'teachers/edit',
  ({ id, data }: { id: string; data: Partial<Teacher> }) =>
    teacherService.update(id, data)
);

export const removeTeacher = createAsyncThunk('teachers/remove', async (id: string) => {
  await teacherService.delete(id);
  return id;
});

const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch teachers';
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editTeacher.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeTeacher.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export default teacherSlice.reducer;
