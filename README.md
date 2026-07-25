# EduSphere — Education Management System (EMS)

A modern, responsive, role-based Education Management System frontend built with React, TypeScript, and Material UI. This is a **frontend-only** implementation using mock JSON data — no backend, APIs, or database logic is included.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tooling & dev server
- **Material UI (MUI) v9** — component library & theming
- **React Router DOM** — routing
- **Redux Toolkit** + **React-Redux** — state management
- **React Hook Form** + **Yup** — forms & validation
- **Recharts** — dashboard charts & analytics
- **date-fns** — date utilities

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
- Per-role Dashboards with KPI cards & charts
- Student Management
- Teacher Management
- Staff Management
- Parent Management
- Class & Section Management
- Attendance (with status filter)
- Timetable (weekly grid view)
- Homework & Assignments
- Exams & Results (tabbed)
- Fees Management (with summary cards)
- Notifications
- Reports & Analytics (charts)
- User Profile (editable)
- Settings (theme, notifications, password, privacy)
- Error Pages (403, 404, 500)

### UI / UX
- Light & Dark theme toggle (persisted to localStorage)
- Fully responsive (desktop, tablet, mobile)
- Reusable DataTable with search, sort, and pagination
- Form validation with React Hook Form + Yup
- Loading skeletons
- Empty states
- Toast notifications
- Breadcrumb navigation
- Dashboard cards and charts (Recharts)
- Consistent color palette and typography (Inter font)

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
│   ├── common/         # shared generic components
│   ├── layout/         # AuthLayout, DashboardLayout, Sidebar, Navbar, Footer
│   └── ui/             # DataTable, StatCard, PageHeader, EmptyState, Toast, Skeleton
├── constants/          # app constants, navigation config, role labels
├── data/               # mock JSON data for all modules
├── features/           # feature-based modules (auth, dashboard, students, ...)
├── hooks/              # useRedux, useToast
├── routes/             # ProtectedRoute (auth + role guard)
├── store/              # Redux slices (auth, theme, toast)
├── theme/              # light & dark MUI themes
├── types/              # shared TypeScript domain types
├── utils/              # icon resolver, breadcrumb helper
├── App.tsx             # routing + theme provider
└── main.tsx            # entry point
```

## Architecture Notes

- **Feature-based folder structure**: each module is self-contained under `src/features/`.
- **Centralized navigation**: `src/constants/navigation.ts` declares which roles see which nav items — the sidebar filters automatically.
- **Role-guarded routes**: `ProtectedRoute` handles both authentication and role-based authorization, redirecting unauthorized users to `/403`.
- **Typed Redux**: `useAppSelector` is a `TypedUseSelectorHook` for full type safety.
- **Reusable DataTable**: a dependency-free table with built-in search, sort, and pagination — no external data-grid dependency.
- **Theme persistence**: light/dark preference is stored in `localStorage` and restored on load.
- **Mock data only**: all data lives in `src/data/mockData.ts`. No backend calls are made.

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
```

> **Note:** `--legacy-peer-deps` is required due to peer dependency resolution between MUI v9 and `@hookform/resolvers`. The production build completes successfully.

## What's Next (Backend Integration)

This frontend is ready to be connected to a real backend. To do so:
1. Replace mock data imports in `src/data/mockData.ts` with API service calls in `src/services/`.
2. Replace the `mockLogin` thunk in `src/store/authSlice.ts` with a real authentication API call.
3. Add async thunks for each module's CRUD operations.
4. Wire up Supabase or your preferred backend for data persistence.

---

Built as a production-quality React frontend reference implementation.
