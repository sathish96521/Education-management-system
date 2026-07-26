import { Snackbar, Alert } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { removeToast } from '@/store/toastSlice';

// Renders all queued toast notifications. Mounted once at the app root.
export default function ToastContainer() {
  const toasts = useAppSelector((s) => s.toast.toasts);
  const dispatch = useAppDispatch();

  return (
    <>
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={() => dispatch(removeToast(toast.id))}
        >
          <Alert
            severity={toast.severity}
            variant="filled"
            onClose={() => dispatch(removeToast(toast.id))}
            sx={{ width: '100%' }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
