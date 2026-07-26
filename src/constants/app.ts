import type { Role } from '@/types';

export const APP_NAME = 'GoSchool';
export const APP_TAGLINE = 'Education Management System';

export const ROLES: Record<Role, string> = {
  super_admin: 'Super Admin',
  admin: 'Administrator',
  principal: 'Principal',
  teacher: 'Teacher',
  staff: 'Staff',
  student: 'Student',
  parent: 'Parent',
};

export const STORAGE_KEYS = {
  TOKEN: 'ems_token',
  USER: 'ems_user',
  THEME: 'ems_theme',
  SESSION_EXPIRES: 'ems_session_expires',
} as const;

// Brand color palette - professional blue/teal scheme
export const BRAND_COLORS = {
  primary: '#1976d2',
  primaryDark: '#0d47a1',
  primaryLight: '#63a4ff',
  secondary: '#00897b',
  secondaryDark: '#00564d',
  accent: '#f57c00',
  success: '#2e7d32',
  warning: '#ed6c02',
  error: '#d32f2f',
  background: '#f4f6f8',
  paper: '#ffffff',
};
