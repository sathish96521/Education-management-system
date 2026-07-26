import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useRedux';
import type { Role } from '@/types';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
  children?: React.ReactNode;
}

// Guards routes that require authentication. Optionally restricts by role.
// Can be used as a layout route (renders <Outlet />) when no children are given,
// or as an inline wrapper around a single element when children are provided.
export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
