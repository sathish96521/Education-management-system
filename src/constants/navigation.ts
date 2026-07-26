import type { NavItem, Role } from '@/types';

// Centralized navigation config. Each item declares which roles may see it.
// The sidebar filters this list by the current user's role.
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'Dashboard',
    roles: ['super_admin', 'admin', 'principal', 'teacher', 'staff', 'student', 'parent'],
  },
  {
    label: 'Students',
    path: '/students',
    icon: 'School',
    roles: ['super_admin', 'admin', 'principal', 'teacher', 'staff'],
  },
  {
    label: 'Teachers',
    path: '/teachers',
    icon: 'Person4',
    roles: ['super_admin', 'admin', 'principal'],
  },
  {
    label: 'Staff',
    path: '/staff',
    icon: 'Badge',
    roles: ['super_admin', 'admin', 'principal'],
  },
  {
    label: 'Parents',
    path: '/parents',
    icon: 'FamilyRestroom',
    roles: ['super_admin', 'admin', 'principal', 'teacher'],
  },
  {
    label: 'Classes',
    path: '/classes',
    icon: 'Class',
    roles: ['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent'],
  },
  {
    label: 'Attendance',
    path: '/attendance',
    icon: 'FactCheck',
    roles: ['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent'],
  },
  {
    label: 'Timetable',
    path: '/timetable',
    icon: 'Schedule',
    roles: ['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent'],
  },
  {
    label: 'Homework',
    path: '/homework',
    icon: 'Assignment',
    roles: ['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent'],
  },
  {
    label: 'Exams',
    path: '/exams',
    icon: 'Quiz',
    roles: ['super_admin', 'admin', 'principal', 'teacher', 'student', 'parent'],
  },
  {
    label: 'Fees',
    path: '/fees',
    icon: 'Payments',
    roles: ['super_admin', 'admin', 'principal', 'staff', 'student', 'parent'],
  },
  {
    label: 'Notifications',
    path: '/notifications',
    icon: 'Notifications',
    roles: ['super_admin', 'admin', 'principal', 'teacher', 'staff', 'student', 'parent'],
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: 'BarChart',
    roles: ['super_admin', 'admin', 'principal'],
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: 'AccountCircle',
    roles: ['super_admin', 'admin', 'principal', 'teacher', 'staff', 'student', 'parent'],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: 'Settings',
    roles: ['super_admin', 'admin', 'principal', 'teacher', 'staff', 'student', 'parent'],
  },
];

export const getNavItemsForRole = (role: Role): NavItem[] =>
  NAV_ITEMS.filter((item) => item.roles.includes(role));

export const ALL_ROLES: Role[] = [
  'super_admin',
  'admin',
  'principal',
  'teacher',
  'staff',
  'student',
  'parent',
];
