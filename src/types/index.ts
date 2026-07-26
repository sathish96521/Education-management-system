// Core domain types shared across the EMS application.

export type Role =
  | 'super_admin'
  | 'admin'
  | 'principal'
  | 'teacher'
  | 'staff'
  | 'student'
  | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  designation?: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  class: string;
  section: string;
  guardian: string;
  status: 'Active' | 'Inactive';
  admissionDate: string;
  avatar?: string;
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  gender: 'Male' | 'Female';
  qualification: string;
  experience: number;
  status: 'Active' | 'Inactive';
  avatar?: string;
}

export interface Staff {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  gender: 'Male' | 'Female';
  status: 'Active' | 'Inactive';
  avatar?: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  occupation: string;
  studentName: string;
  studentClass: string;
  relation: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  sections: string[];
  teacher: string;
  capacity: number;
  enrolled: number;
  room: string;
}

export interface AttendanceRecord {
  id: string;
  studentName: string;
  rollNo: string;
  class: string;
  section: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  class: string;
  room: string;
}

export interface Homework {
  id: string;
  title: string;
  subject: string;
  class: string;
  section: string;
  assignedBy: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
}

export interface Exam {
  id: string;
  name: string;
  class: string;
  subject: string;
  date: string;
  totalMarks: number;
  passingMarks: number;
  status: 'Scheduled' | 'Ongoing' | 'Completed';
}

export interface Result {
  id: string;
  studentName: string;
  rollNo: string;
  examName: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
}

export interface FeeRecord {
  id: string;
  studentName: string;
  rollNo: string;
  class: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Overdue';
  method: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: Role[];
  children?: NavItem[];
}
