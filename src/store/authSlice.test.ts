import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginAsync, logout, refreshSession, checkSession } from '@/store/authSlice';

function createTestStore() {
  return configureStore({ reducer: { auth: authReducer } });
}

describe('authSlice', () => {
  it('should have correct initial state', () => {
    const store = createTestStore();
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.status).toBe('idle');
  });

  it('should handle loginAsync.fulfilled', async () => {
    const store = createTestStore();
    await store.dispatch(loginAsync({ email: 'admin@edu.com', password: 'password' }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).not.toBeNull();
    expect(state.user?.role).toBe('super_admin');
    expect(state.status).toBe('succeeded');
    expect(state.sessionExpiresAt).toBeGreaterThan(Date.now());
  });

  it('should handle loginAsync.rejected with wrong password', async () => {
    const store = createTestStore();
    await store.dispatch(loginAsync({ email: 'admin@edu.com', password: 'wrong' }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Invalid email or password');
    expect(state.status).toBe('failed');
  });

  it('should handle logout', async () => {
    const store = createTestStore();
    await store.dispatch(loginAsync({ email: 'admin@edu.com', password: 'password' }));
    store.dispatch(logout());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should refresh session on activity', async () => {
    const store = createTestStore();
    await store.dispatch(loginAsync({ email: 'admin@edu.com', password: 'password' }));
    const expiry1 = store.getState().auth.sessionExpiresAt!;
    // Simulate a small delay
    await new Promise((r) => setTimeout(r, 10));
    store.dispatch(refreshSession());
    const expiry2 = store.getState().auth.sessionExpiresAt!;
    expect(expiry2).toBeGreaterThanOrEqual(expiry1);
  });

  it('should auto-logout when session is expired', () => {
    // Test checkSession with a store that has an expired session via preloaded state
    const expiredStore = configureStore({
      reducer: { auth: authReducer },
      preloadedState: {
        auth: {
          user: { id: 'u1', name: 'Test', email: 'test@edu.com', role: 'super_admin' as const },
          token: 'mock-jwt-u1',
          isAuthenticated: true,
          status: 'succeeded' as const,
          error: null,
          sessionExpiresAt: Date.now() - 1000, // already expired
        },
      },
    });
    expiredStore.dispatch(checkSession());
    const state = expiredStore.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});
