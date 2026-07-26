import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { checkSession, refreshSession, logout } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

const CHECK_INTERVAL = 60_000; // check every 60 seconds
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart'] as const;

// Auto-logout on session expiry; refresh session on user activity.
export function useSessionExpiry() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, sessionExpiresAt } = useAppSelector((s) => s.auth);

  const handleActivity = useCallback(() => {
    if (isAuthenticated) {
      dispatch(refreshSession());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Periodic check
    const interval = setInterval(() => {
      dispatch(checkSession());
    }, CHECK_INTERVAL);

    // Listen for user activity to refresh session
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));

    return () => {
      clearInterval(interval);
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [isAuthenticated, dispatch, handleActivity]);

  // When session expires, redirect to login
  useEffect(() => {
    if (sessionExpiresAt && Date.now() > sessionExpiresAt && isAuthenticated) {
      dispatch(logout());
      navigate('/login', { state: { expired: true } });
    }
  }, [sessionExpiresAt, isAuthenticated, dispatch, navigate]);
}
