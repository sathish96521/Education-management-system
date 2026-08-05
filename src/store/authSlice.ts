import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Role, User } from '@/types';
import { mockUsers, DEMO_CREDENTIALS, dynamicUsers } from '@/data/mockData';
import { STORAGE_KEYS } from '@/constants/app';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  sessionExpiresAt: number | null;
}

const getInitialUser = (): User | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (!stored) return null;
    const expiresAt = localStorage.getItem(STORAGE_KEYS.SESSION_EXPIRES);
    if (expiresAt && Date.now() > Number(expiresAt)) {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.SESSION_EXPIRES);
      return null;
    }
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
};

const getInitialExpiry = (): number | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.SESSION_EXPIRES);
  if (!stored) return null;
  const val = Number(stored);
  return Date.now() > val ? null : val;
};

const initialState: AuthState = {
  user: getInitialUser(),
  token: getInitialUser() ? localStorage.getItem(STORAGE_KEYS.TOKEN) : null,
  isAuthenticated: Boolean(getInitialUser()),
  status: 'idle',
  error: null,
  sessionExpiresAt: getInitialExpiry(),
};

// Async thunk for login — replaces manual dispatch pattern.
export const loginAsync = createAsyncThunk<
  { user: User; token: string; expiresAt: number },
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  // Simulate async API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check built-in demo credentials
  const match = DEMO_CREDENTIALS.find(
    (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
  );
  if (match) {
    const user = { ...mockUsers[match.role], email } as User;
    const token = 'mock-jwt-' + user.id;
    const expiresAt = Date.now() + SESSION_TIMEOUT_MS;
    return { user, token, expiresAt };
  }

  // Check dynamically registered users (created via UI)
  const dynamicMatch = dynamicUsers.find(
    (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
  );
  if (!dynamicMatch) return rejectWithValue('Invalid email or password');
  const user = dynamicMatch.user;
  const token = 'mock-jwt-' + user.id;
  const expiresAt = Date.now() + SESSION_TIMEOUT_MS;
  return { user, token, expiresAt };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.sessionExpiresAt = null;
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.SESSION_EXPIRES);
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
      }
    },
    refreshSession: (state) => {
      if (state.isAuthenticated) {
        state.sessionExpiresAt = Date.now() + SESSION_TIMEOUT_MS;
        localStorage.setItem(STORAGE_KEYS.SESSION_EXPIRES, String(state.sessionExpiresAt));
      }
    },
    checkSession: (state) => {
      if (state.sessionExpiresAt && Date.now() > state.sessionExpiresAt) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.sessionExpiresAt = null;
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.SESSION_EXPIRES);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
        state.sessionExpiresAt = action.payload.expiresAt;
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(action.payload.user));
        localStorage.setItem(STORAGE_KEYS.TOKEN, action.payload.token);
        localStorage.setItem(STORAGE_KEYS.SESSION_EXPIRES, String(action.payload.expiresAt));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Login failed';
        state.isAuthenticated = false;
      });
  },
});

export const { logout, updateProfile, refreshSession, checkSession } = authSlice.actions;
export default authSlice.reducer;
