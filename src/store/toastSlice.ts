import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ToastSeverity = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  severity: ToastSeverity;
}

interface ToastState {
  toasts: ToastMessage[];
}

const initialState: ToastState = { toasts: [] };

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    enqueueToast: (state, action: PayloadAction<Omit<ToastMessage, 'id'>>) => {
      state.toasts.push({ id: Date.now() + Math.random().toString(), ...action.payload });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { enqueueToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
