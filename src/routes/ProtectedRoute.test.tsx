import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/authSlice';
import themeReducer from '@/store/themeSlice';
import toastReducer from '@/store/toastSlice';
import ProtectedRoute from '@/routes/ProtectedRoute';

function createStore(overrides = {}) {
  return configureStore({
    reducer: { auth: authReducer, theme: themeReducer, toast: toastReducer },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        status: 'idle' as const,
        error: null,
        sessionExpiresAt: null,
        ...overrides,
      },
    },
  });
}

function renderWithProviders(ui: React.ReactNode, store = createStore()) {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}

describe('ProtectedRoute', () => {
  it('redirects to /login when not authenticated', () => {
    renderWithProviders(<ProtectedRoute><div>Protected Content</div></ProtectedRoute>);
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    const store = createStore({
      isAuthenticated: true,
      user: { id: 'u1', name: 'Test', email: 'test@edu.com', role: 'admin' },
      token: 'test-token',
    });
    renderWithProviders(<ProtectedRoute><div>Protected Content</div></ProtectedRoute>, store);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects when user role is not in allowedRoles', () => {
    const store = createStore({
      isAuthenticated: true,
      user: { id: 'u1', name: 'Test', email: 'test@edu.com', role: 'student' },
      token: 'test-token',
    });
    renderWithProviders(
      <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
        <div>Admin Only</div>
      </ProtectedRoute>,
      store
    );
    expect(screen.queryByText('Admin Only')).not.toBeInTheDocument();
  });
});
