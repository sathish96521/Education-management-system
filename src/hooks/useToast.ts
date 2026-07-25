import { useCallback } from 'react';
import { useAppDispatch } from './useRedux';
import { enqueueToast, type ToastSeverity } from '@/store/toastSlice';

// Convenience hook to fire toast notifications from anywhere.
export const useToast = () => {
  const dispatch = useAppDispatch();

  const notify = useCallback(
    (message: string, severity: ToastSeverity = 'success') => {
      dispatch(enqueueToast({ message, severity }));
    },
    [dispatch]
  );

  return {
    success: (msg: string) => notify(msg, 'success'),
    error: (msg: string) => notify(msg, 'error'),
    warning: (msg: string) => notify(msg, 'warning'),
    info: (msg: string) => notify(msg, 'info'),
  };
};
