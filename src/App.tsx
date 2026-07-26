import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useAppSelector } from '@/hooks/useRedux';
import { lightTheme, darkTheme } from '@/theme';
import { Provider } from 'react-redux';
import { store } from '@/store';

import AuthLayout from '@/components/layout/AuthLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/routes/ProtectedRoute';
import ToastContainer from '@/components/ui/ToastContainer';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import PageSkeleton from '@/components/ui/PageSkeleton';
import { useSessionExpiry } from '@/hooks/useSessionExpiry';

// Lazy-loaded route components — code-split by route.
const Login = lazy(() => import('@/features/auth/Login'));
const ForgotPassword = lazy(() => import('@/features/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('@/features/auth/ResetPassword'));
const Dashboard = lazy(() => import('@/features/dashboard/Dashboard'));
const Students = lazy(() => import('@/features/students/Students'));
const StudentDetail = lazy(() => import('@/features/students/StudentDetail'));
const Teachers = lazy(() => import('@/features/teachers/Teachers'));
const Staff = lazy(() => import('@/features/staff/Staff'));
const Parents = lazy(() => import('@/features/parents/Parents'));
const Classes = lazy(() => import('@/features/classes/Classes'));
const Attendance = lazy(() => import('@/features/attendance/Attendance'));
const Timetable = lazy(() => import('@/features/timetable/Timetable'));
const Homework = lazy(() => import('@/features/homework/Homework'));
const Exams = lazy(() => import('@/features/exams/Exams'));
const Fees = lazy(() => import('@/features/fees/Fees'));
const Notifications = lazy(() => import('@/features/notifications/Notifications'));
const Reports = lazy(() => import('@/features/reports/Reports'));
const Profile = lazy(() => import('@/features/profile/Profile'));
const Settings = lazy(() => import('@/features/settings/Settings'));
const Forbidden = lazy(() => import('@/features/errors/Forbidden'));
const NotFound = lazy(() => import('@/features/errors/NotFound'));
const ServerError = lazy(() => import('@/features/errors/ServerError'));

function ThemedApp() {
  const mode = useAppSelector((s) => s.theme.mode);
  useSessionExpiry();

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              {/* Public auth routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>

              {/* Protected dashboard routes — auth guard wraps the layout */}
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/students" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal', 'teacher', 'staff']}><Students /></ProtectedRoute>} />
                  <Route path="/students/:id" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal', 'teacher', 'staff']}><StudentDetail /></ProtectedRoute>} />
                  <Route path="/teachers" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal']}><Teachers /></ProtectedRoute>} />
                  <Route path="/staff" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal']}><Staff /></ProtectedRoute>} />
                  <Route path="/parents" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal', 'teacher']}><Parents /></ProtectedRoute>} />
                  <Route path="/classes" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent']}><Classes /></ProtectedRoute>} />
                  <Route path="/attendance" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent']}><Attendance /></ProtectedRoute>} />
                  <Route path="/timetable" element={<Timetable />} />
                  <Route path="/homework" element={<Homework />} />
                  <Route path="/exams" element={<Exams />} />
                  <Route path="/fees" element={<Fees />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/reports" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal']}><Reports /></ProtectedRoute>} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>

              {/* Error pages */}
              <Route path="/403" element={<Forbidden />} />
              <Route path="/500" element={<ServerError />} />
              <Route path="*" element={<NotFound />} />

              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}
