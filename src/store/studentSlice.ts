import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Student } from '@/types';
import { studentService } from '@/services/studentService';

interface StudentState {
  items: Student[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StudentState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchStudents = createAsyncThunk('students/fetchAll', () =>
  studentService.getAll()
);

export const addStudent = createAsyncThunk('students/add', (data: Omit<Student, 'id'>) =>
  studentService.create(data)
);

export const editStudent = createAsyncThunk(
  'students/edit',
  ({ id, data }: { id: string; data: Partial<Student> }) =>
    studentService.update(id, data)
);

export const removeStudent = createAsyncThunk('students/remove', async (id: string) => {
  await studentService.delete(id);
  return id;
});

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch students';
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        const idx = state.items.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeStudent.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
