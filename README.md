# EduSphere — Education Management System (EMS)

A modern, responsive, role-based Education Management System frontend built with React, TypeScript, and Material UI. This is a **frontend-only** implementation using mock JSON data — no backend, APIs, or database logic is included.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tooling & dev server
- **Material UI (MUI) v9** — component library & theming
- **React Router DOM** — routing (with lazy-loaded code-split routes)
- **Redux Toolkit** + **React-Redux** — state management (with `createAsyncThunk`)
- **React Hook Form** + **Yup** — forms & validation
- **Recharts** — dashboard charts & analytics
- **date-fns** — date utilities
- **Vitest** + **React Testing Library** — unit & component testing

## Features

### Role-Based Access (7 roles)
Each role gets a tailored dashboard and navigation:
- **Super Admin** — multi-institution oversight, revenue, system-wide stats
- **Admin** — student/teacher/staff management, fee collection
- **Principal** — attendance, pass rates, teacher evaluation
- **Teacher** — classes, homework, student scores
- **Staff** — fee records, invoices
- **Student** — attendance, scores, homework, exams
- **Parent** — child's attendance, scores, fees

### Modules
- Authentication (Login, Forgot Password, Reset Password)
- Role-based Sidebar & Navbar
- Per-role Dashboards with KPI cards & charts (data derived from mock records)
- Student Management (CRUD with modal forms, detail page with tabs)
- Teacher Management (CRUD with modal forms)
- Staff Management (CRUD with modal forms)
- Parent Management (CRUD with modal forms)
- Class & Section Management
- Attendance (with status filter & date picker)
- Timetable (weekly grid view with class selector)
- Homework & Assignments
- Exams & Results (tabbed)
- Fees Management (with summary cards)
- Notifications (with unread badge count)
- Reports & Analytics (charts with data derived from mock records)
- User Profile (editable)
- Settings (theme, notifications, validated password change, privacy)
- Error Pages (403, 404, 500)

### UI / UX
- Light & Dark theme toggle (persisted to localStorage)
- Fully responsive (desktop, tablet, mobile)
- Reusable generic DataTable with search, sort, pagination, and row actions
- CRUD modal forms with React Hook Form + Yup validation
- Confirmation dialogs for destructive actions (delete, logout)
- Loading skeletons (Suspense fallback for lazy routes + data loading)
- Empty states
- Toast notifications
- Breadcrumb navigation with clickable links
- Dashboard cards and charts (Recharts, theme-aware colors)
- Consistent color palette and typography (Inter font)
- Error boundary for graceful crash recovery

### Architecture
- **Lazy-loaded routes** — every route component is code-split via `React.lazy()` + `Suspense`
- **API service layer** — `src/services/` with async CRUD functions (swap with real API calls later)
- **Per-module Redux slices** — Students, Teachers, Staff, Parents each have their own slice with `createAsyncThunk` CRUD
- **Session expiry** — 30-minute auto-logout with activity-based session refresh
- **Error boundary** — wraps the dashboard layout to catch rendering errors gracefully
- **Generic DataTable** — typed `GridColDef<T>` and `RowAction<T>` eliminate unsafe casts
- **Unit tests** — Vitest + React Testing Library for auth logic, ProtectedRoute, and DataTable

## Demo Credentials

All demo accounts use the password: **`password`**

| Role         | Email                  |
|--------------|------------------------|
| Super Admin  | admin@edu.com          |
| Admin        | sarah@edu.com          |
| Principal    | alan@edu.com           |
| Teacher      | rebecca@edu.com        |
| Staff        | robert@edu.com         |
| Student      | aarav@edu.com          |
| Parent       | rajesh@parent.com      |

On the login screen, click any role chip for a one-click demo login.

## Project Structure

```
src/
├── components/
│   ├── layout/         # AuthLayout, DashboardLayout, Sidebar, Navbar, Footer
│   └── ui/             # DataTable, StatCard, PageHeader, EmptyState, Toast, Skeleton,
│                       # ConfirmDialog, ErrorBoundary
├── constants/          # app constants, navigation config, role labels
├── data/               # mock JSON data for all modules
├── features/           # feature-based modules (auth, dashboard, students, ...)
│   ├── students/       # Students.tsx, StudentDetail.tsx, StudentFormModal.tsx
│   ├── teachers/       # Teachers.tsx, TeacherFormModal.tsx
│   ├── staff/          # Staff.tsx, StaffFormModal.tsx
│   ├── parents/        # Parents.tsx, ParentFormModal.tsx
│   └── ...             # attendance, exams, fees, homework, etc.
├── hooks/              # useRedux, useToast, useSessionExpiry
├── routes/             # ProtectedRoute (auth + role guard)
├── services/           # API service layer (studentService, teacherService, etc.)
├── store/              # Redux slices (auth, theme, toast, students, teachers, staff, parents)
├── test/               # test setup
├── theme/              # light & dark MUI themes
├── types/              # shared TypeScript domain types
├── utils/              # icon resolver, breadcrumb helper
├── App.tsx             # routing + theme provider + Suspense + ErrorBoundary
└── main.tsx            # entry point
```

## Architecture Notes

- **Feature-based folder structure**: each module is self-contained under `src/features/`.
- **Centralized navigation**: `src/constants/navigation.ts` declares which roles see which nav items — the sidebar filters automatically.
- **Role-guarded routes**: `ProtectedRoute` handles both authentication and role-based authorization, redirecting unauthorized users to `/403`. All routes are now guarded.
- **Lazy-loaded code splitting**: every route uses `React.lazy()` — the production build generates individual chunks per page.
- **Typed Redux**: `useAppSelector` is a `TypedUseSelectorHook` for full type safety. All CRUD operations use `createAsyncThunk`.
- **API service layer**: `src/services/` abstracts data access behind async functions — swap mock implementations with real API calls.
- **Generic DataTable**: a dependency-free table with typed column definitions, built-in search, sort, pagination, and row actions.
- **Session management**: 30-minute session timeout with auto-refresh on user activity and auto-logout on expiry.
- **Theme persistence**: light/dark preference is stored in `localStorage` and restored on load. Charts adapt colors to the active theme.
- **Error boundaries**: wrap the dashboard layout and app-level Suspense to catch rendering errors gracefully.
- **Mock data only**: all data lives in `src/data/mockData.ts`. Dashboard and Reports stats are computed from the actual mock arrays.

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start the dev server
npm run dev

# Build for production
npm run build

# Type-check
npm run typecheck

# Lint
npm run lint

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

> **Note:** `--legacy-peer-deps` is required due to peer dependency resolution between MUI v9 and `@hookform/resolvers`. The production build completes successfully.

## What's Next (Backend Integration)

This frontend is ready to be connected to a real backend. To do so:
1. Replace the simulated API functions in `src/services/api.ts` with real `fetch`/`axios` calls.
2. Replace the `loginAsync` thunk in `src/store/authSlice.ts` with a real authentication API call.
3. Update per-module services (`studentService.ts`, etc.) to call your backend endpoints.
4. Wire up Supabase or your preferred backend for data persistence.
5. Move JWT storage from `localStorage` to `httpOnly` cookies for production security.

---

Built as a production-quality React frontend reference implementation.
