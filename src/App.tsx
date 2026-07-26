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

import Login from '@/features/auth/Login';
import ForgotPassword from '@/features/auth/ForgotPassword';
import ResetPassword from '@/features/auth/ResetPassword';
import Dashboard from '@/features/dashboard/Dashboard';
import Students from '@/features/students/Students';
import Teachers from '@/features/teachers/Teachers';
import Staff from '@/features/staff/Staff';
import Parents from '@/features/parents/Parents';
import Classes from '@/features/classes/Classes';
import Attendance from '@/features/attendance/Attendance';
import Timetable from '@/features/timetable/Timetable';
import Homework from '@/features/homework/Homework';
import Exams from '@/features/exams/Exams';
import Fees from '@/features/fees/Fees';
import Notifications from '@/features/notifications/Notifications';
import Reports from '@/features/reports/Reports';
import Profile from '@/features/profile/Profile';
import Settings from '@/features/settings/Settings';
import Forbidden from '@/features/errors/Forbidden';
import NotFound from '@/features/errors/NotFound';
import ServerError from '@/features/errors/ServerError';

function ThemedApp() {
  const mode = useAppSelector((s) => s.theme.mode);
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
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
              <Route path="/teachers" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal']}><Teachers /></ProtectedRoute>} />
              <Route path="/staff" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal']}><Staff /></ProtectedRoute>} />
              <Route path="/parents" element={<ProtectedRoute allowedRoles={['super_admin', 'admin', 'principal', 'teacher']}><Parents /></ProtectedRoute>} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/attendance" element={<Attendance />} />
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
