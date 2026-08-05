import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import toastReducer from './toastSlice';
import studentReducer from './studentSlice';
import teacherReducer from './teacherSlice';
import staffReducer from './staffSlice';
import parentReducer from './parentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    toast: toastReducer,
    students: studentReducer,
    teachers: teacherReducer,
    staff: staffReducer,
    parents: parentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
