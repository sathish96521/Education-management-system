import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '@/store';
import type { Role, User } from '@/types';
import { mockUsers, DEMO_CREDENTIALS } from '@/data/mockData';
import { STORAGE_KEYS } from '@/constants/app';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const getInitialUser = (): User | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? (JSON.parse(stored) as User) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: getInitialUser(),
  token: localStorage.getItem(STORAGE_KEYS.TOKEN),
  isAuthenticated: Boolean(getInitialUser()),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ email: string; role: Role }>) => {
      const user = { ...mockUsers[action.payload.role], email: action.payload.email } as User;
      state.user = user;
      state.token = 'mock-jwt-' + user.id;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.TOKEN, state.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateProfile } = authSlice.actions;

// Mock async login thunk — validates against DEMO_CREDENTIALS.
export const mockLogin =
  (email: string, password: string) =>
  (dispatch: AppDispatch) => {
    dispatch(loginStart());
    const match = DEMO_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );
    if (match) {
      dispatch(loginSuccess({ email, role: match.role }));
      return true;
    }
    dispatch(loginFailure('Invalid email or password'));
    return false;
  };

export default authSlice.reducer;
