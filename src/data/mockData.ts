import type { Student, Teacher, Staff, Parent, ClassRoom, AttendanceRecord, TimetableEntry, Homework, Exam, Result, FeeRecord, Notification } from '@/types';

export const mockStudents: Student[] = [
  { id: 's1', rollNo: 'STU001', name: 'Aarav Sharma', email: 'aarav@edu.com', phone: '+1 555-0101', gender: 'Male', class: '10', section: 'A', guardian: 'Rajesh Sharma', status: 'Active', admissionDate: '2023-06-15', avatar: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's2', rollNo: 'STU002', name: 'Sophia Williams', email: 'sophia@edu.com', phone: '+1 555-0102', gender: 'Female', class: '10', section: 'A', guardian: 'Michael Williams', status: 'Active', admissionDate: '2023-06-16', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's3', rollNo: 'STU003', name: 'Liam Johnson', email: 'liam@edu.com', phone: '+1 555-0103', gender: 'Male', class: '9', section: 'B', guardian: 'David Johnson', status: 'Active', admissionDate: '2023-06-17', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's4', rollNo: 'STU004', name: 'Emma Brown', email: 'emma@edu.com', phone: '+1 555-0104', gender: 'Female', class: '9', section: 'B', guardian: 'Sarah Brown', status: 'Inactive', admissionDate: '2023-06-18', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's5', rollNo: 'STU005', name: 'Noah Davis', email: 'noah@edu.com', phone: '+1 555-0105', gender: 'Male', class: '11', section: 'A', guardian: 'Robert Davis', status: 'Active', admissionDate: '2023-06-19', avatar: 'https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's6', rollNo: 'STU006', name: 'Olivia Miller', email: 'olivia@edu.com', phone: '+1 555-0106', gender: 'Female', class: '11', section: 'A', guardian: 'James Miller', status: 'Active', admissionDate: '2023-06-20', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's7', rollNo: 'STU007', name: 'Ethan Wilson', email: 'ethan@edu.com', phone: '+1 555-0107', gender: 'Male', class: '12', section: 'C', guardian: 'Thomas Wilson', status: 'Active', admissionDate: '2023-06-21', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's8', rollNo: 'STU008', name: 'Ava Moore', email: 'ava@edu.com', phone: '+1 555-0108', gender: 'Female', class: '12', section: 'C', guardian: 'Daniel Moore', status: 'Active', admissionDate: '2023-06-22', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's9', rollNo: 'STU009', name: 'Mason Taylor', email: 'mason@edu.com', phone: '+1 555-0109', gender: 'Male', class: '8', section: 'A', guardian: 'Andrew Taylor', status: 'Active', admissionDate: '2023-06-23', avatar: 'https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's10', rollNo: 'STU010', name: 'Isabella Anderson', email: 'isabella@edu.com', phone: '+1 555-0110', gender: 'Female', class: '8', section: 'A', guardian: 'Christopher Anderson', status: 'Active', admissionDate: '2023-06-24', avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's11', rollNo: 'STU011', name: 'Lucas Thomas', email: 'lucas@edu.com', phone: '+1 555-0111', gender: 'Male', class: '7', section: 'B', guardian: 'Mark Thomas', status: 'Active', admissionDate: '2023-06-25', avatar: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 's12', rollNo: 'STU012', name: 'Mia Jackson', email: 'mia@edu.com', phone: '+1 555-0112', gender: 'Female', class: '7', section: 'B', guardian: 'Paul Jackson', status: 'Inactive', admissionDate: '2023-06-26', avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=120' },
];

export const mockTeachers: Teacher[] = [
  { id: 't1', employeeId: 'EMP001', name: 'Dr. Rebecca Lee', email: 'rebecca@edu.com', phone: '+1 555-0201', subject: 'Mathematics', gender: 'Female', qualification: 'Ph.D. Mathematics', experience: 12, status: 'Active', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 't2', employeeId: 'EMP002', name: 'Mr. James Carter', email: 'james@edu.com', phone: '+1 555-0202', subject: 'Physics', gender: 'Male', qualification: 'M.Sc. Physics', experience: 8, status: 'Active', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 't3', employeeId: 'EMP003', name: 'Ms. Patricia Adams', email: 'patricia@edu.com', phone: '+1 555-0203', subject: 'English', gender: 'Female', qualification: 'M.A. English', experience: 6, status: 'Active', avatar: 'https://images.pexels.com/photos/5905811/pexels-photo-5905811.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 't4', employeeId: 'EMP004', name: 'Mr. Daniel Martinez', email: 'daniel@edu.com', phone: '+1 555-0204', subject: 'Chemistry', gender: 'Male', qualification: 'M.Sc. Chemistry', experience: 10, status: 'Active', avatar: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 't5', employeeId: 'EMP005', name: 'Mrs. Linda Wilson', email: 'linda@edu.com', phone: '+1 555-0205', subject: 'Biology', gender: 'Female', qualification: 'M.Sc. Biology', experience: 15, status: 'Active', avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=120' },
  { id: 't6', employeeId: 'EMP006', name: 'Mr. George Harris', email: 'george@edu.com', phone: '+1 555-0206', subject: 'History', gender: 'Male', qualification: 'M.A. History', experience: 7, status: 'Inactive', avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=120' },
];

export const mockStaff: Staff[] = [
  { id: 'st1', employeeId: 'STF001', name: 'Robert Clark', email: 'robert@edu.com', phone: '+1 555-0301', department: 'Administration', role: 'Clerk', gender: 'Male', status: 'Active' },
  { id: 'st2', employeeId: 'STF002', name: 'Mary Lewis', email: 'mary@edu.com', phone: '+1 555-0302', department: 'Library', role: 'Librarian', gender: 'Female', status: 'Active' },
  { id: 'st3', employeeId: 'STF003', name: 'John Walker', email: 'john@edu.com', phone: '+1 555-0303', department: 'Maintenance', role: 'Technician', gender: 'Male', status: 'Active' },
  { id: 'st4', employeeId: 'STF004', name: 'Patricia Hall', email: 'patricia.h@edu.com', phone: '+1 555-0304', department: 'Finance', role: 'Accountant', gender: 'Female', status: 'Active' },
  { id: 'st5', employeeId: 'STF005', name: 'Steven Allen', email: 'steven@edu.com', phone: '+1 555-0305', department: 'Transport', role: 'Driver', gender: 'Male', status: 'Inactive' },
];

export const mockParents: Parent[] = [
  { id: 'p1', name: 'Rajesh Sharma', email: 'rajesh@parent.com', phone: '+1 555-0401', occupation: 'Engineer', studentName: 'Aarav Sharma', studentClass: '10-A', relation: 'Father', status: 'Active' },
  { id: 'p2', name: 'Michael Williams', email: 'michael@parent.com', phone: '+1 555-0402', occupation: 'Doctor', studentName: 'Sophia Williams', studentClass: '10-A', relation: 'Father', status: 'Active' },
  { id: 'p3', name: 'David Johnson', email: 'david@parent.com', phone: '+1 555-0403', occupation: 'Businessman', studentName: 'Liam Johnson', studentClass: '9-B', relation: 'Father', status: 'Active' },
  { id: 'p4', name: 'Sarah Brown', email: 'sarah@parent.com', phone: '+1 555-0404', occupation: 'Teacher', studentName: 'Emma Brown', studentClass: '9-B', relation: 'Mother', status: 'Active' },
  { id: 'p5', name: 'Robert Davis', email: 'robert.d@parent.com', phone: '+1 555-0405', occupation: 'Lawyer', studentName: 'Noah Davis', studentClass: '11-A', relation: 'Father', status: 'Active' },
];

export const mockClasses: ClassRoom[] = [
  { id: 'c1', name: 'Class 7', sections: ['A', 'B'], teacher: 'Mr. George Harris', capacity: 40, enrolled: 38, room: '101' },
  { id: 'c2', name: 'Class 8', sections: ['A'], teacher: 'Ms. Patricia Adams', capacity: 40, enrolled: 35, room: '102' },
  { id: 'c3', name: 'Class 9', sections: ['A', 'B'], teacher: 'Dr. Rebecca Lee', capacity: 40, enrolled: 39, room: '201' },
  { id: 'c4', name: 'Class 10', sections: ['A', 'B', 'C'], teacher: 'Mr. James Carter', capacity: 40, enrolled: 40, room: '202' },
  { id: 'c5', name: 'Class 11', sections: ['A'], teacher: 'Mr. Daniel Martinez', capacity: 35, enrolled: 30, room: '301' },
  { id: 'c6', name: 'Class 12', sections: ['A', 'C'], teacher: 'Mrs. Linda Wilson', capacity: 35, enrolled: 32, room: '302' },
];

export const mockAttendance: AttendanceRecord[] = mockStudents.slice(0, 8).map((s, i) => ({
  id: `a${i + 1}`,
  studentName: s.name,
  rollNo: s.rollNo,
  class: s.class,
  section: s.section,
  date: '2026-07-25',
  status: i % 5 === 0 ? 'Absent' : i % 7 === 0 ? 'Late' : 'Present',
}));

export const mockTimetable: TimetableEntry[] = [
  { id: 'tt1', day: 'Monday', time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Dr. Rebecca Lee', class: '10-A', room: '202' },
  { id: 'tt2', day: 'Monday', time: '10:00 - 11:00', subject: 'Physics', teacher: 'Mr. James Carter', class: '10-A', room: '202' },
  { id: 'tt3', day: 'Monday', time: '11:30 - 12:30', subject: 'English', teacher: 'Ms. Patricia Adams', class: '10-A', room: '202' },
  { id: 'tt4', day: 'Tuesday', time: '09:00 - 10:00', subject: 'Chemistry', teacher: 'Mr. Daniel Martinez', class: '10-A', room: '202' },
  { id: 'tt5', day: 'Tuesday', time: '10:00 - 11:00', subject: 'Biology', teacher: 'Mrs. Linda Wilson', class: '10-A', room: '202' },
  { id: 'tt6', day: 'Wednesday', time: '09:00 - 10:00', subject: 'History', teacher: 'Mr. George Harris', class: '10-A', room: '202' },
  { id: 'tt7', day: 'Wednesday', time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Dr. Rebecca Lee', class: '10-A', room: '202' },
  { id: 'tt8', day: 'Thursday', time: '09:00 - 10:00', subject: 'Physics', teacher: 'Mr. James Carter', class: '10-A', room: '202' },
  { id: 'tt9', day: 'Friday', time: '09:00 - 10:00', subject: 'English', teacher: 'Ms. Patricia Adams', class: '10-A', room: '202' },
  { id: 'tt10', day: 'Friday', time: '10:00 - 11:00', subject: 'Chemistry', teacher: 'Mr. Daniel Martinez', class: '10-A', room: '202' },
];

export const mockHomework: Homework[] = [
  { id: 'h1', title: 'Algebra Worksheet 5', subject: 'Mathematics', class: '10', section: 'A', assignedBy: 'Dr. Rebecca Lee', dueDate: '2026-07-28', status: 'Pending' },
  { id: 'h2', title: 'Newton\'s Laws Lab Report', subject: 'Physics', class: '10', section: 'A', assignedBy: 'Mr. James Carter', dueDate: '2026-07-30', status: 'Submitted' },
  { id: 'h3', title: 'Essay: Modern Poetry', subject: 'English', class: '10', section: 'A', assignedBy: 'Ms. Patricia Adams', dueDate: '2026-07-27', status: 'Graded' },
  { id: 'h4', title: 'Periodic Table Quiz Prep', subject: 'Chemistry', class: '11', section: 'A', assignedBy: 'Mr. Daniel Martinez', dueDate: '2026-08-01', status: 'Pending' },
  { id: 'h5', title: 'Cell Biology Diagrams', subject: 'Biology', class: '11', section: 'A', assignedBy: 'Mrs. Linda Wilson', dueDate: '2026-07-29', status: 'Pending' },
];

export const mockExams: Exam[] = [
  { id: 'e1', name: 'Mid-Term Examination', class: '10', subject: 'Mathematics', date: '2026-08-10', totalMarks: 100, passingMarks: 40, status: 'Scheduled' },
  { id: 'e2', name: 'Mid-Term Examination', class: '10', subject: 'Physics', date: '2026-08-11', totalMarks: 100, passingMarks: 40, status: 'Scheduled' },
  { id: 'e3', name: 'Unit Test 1', class: '9', subject: 'English', date: '2026-07-20', totalMarks: 50, passingMarks: 20, status: 'Completed' },
  { id: 'e4', name: 'Unit Test 1', class: '11', subject: 'Chemistry', date: '2026-07-22', totalMarks: 50, passingMarks: 20, status: 'Ongoing' },
  { id: 'e5', name: 'Final Examination', class: '12', subject: 'Biology', date: '2026-09-15', totalMarks: 100, passingMarks: 40, status: 'Scheduled' },
];

export const mockResults: Result[] = [
  { id: 'r1', studentName: 'Aarav Sharma', rollNo: 'STU001', examName: 'Unit Test 1', subject: 'English', marksObtained: 42, totalMarks: 50, grade: 'A' },
  { id: 'r2', studentName: 'Sophia Williams', rollNo: 'STU002', examName: 'Unit Test 1', subject: 'English', marksObtained: 48, totalMarks: 50, grade: 'A+' },
  { id: 'r3', studentName: 'Liam Johnson', rollNo: 'STU003', examName: 'Unit Test 1', subject: 'English', marksObtained: 38, totalMarks: 50, grade: 'B' },
  { id: 'r4', studentName: 'Emma Brown', rollNo: 'STU004', examName: 'Unit Test 1', subject: 'English', marksObtained: 45, totalMarks: 50, grade: 'A' },
  { id: 'r5', studentName: 'Noah Davis', rollNo: 'STU005', examName: 'Unit Test 1', subject: 'English', marksObtained: 35, totalMarks: 50, grade: 'C' },
];

export const mockFees: FeeRecord[] = [
  { id: 'f1', studentName: 'Aarav Sharma', rollNo: 'STU001', class: '10', amount: 5000, paidAmount: 5000, dueDate: '2026-07-15', status: 'Paid', method: 'Card' },
  { id: 'f2', studentName: 'Sophia Williams', rollNo: 'STU002', class: '10', amount: 5000, paidAmount: 2500, dueDate: '2026-07-15', status: 'Partial', method: 'Bank Transfer' },
  { id: 'f3', studentName: 'Liam Johnson', rollNo: 'STU003', class: '9', amount: 4500, paidAmount: 0, dueDate: '2026-07-10', status: 'Overdue', method: '-' },
  { id: 'f4', studentName: 'Emma Brown', rollNo: 'STU004', class: '9', amount: 4500, paidAmount: 4500, dueDate: '2026-07-15', status: 'Paid', method: 'Cash' },
  { id: 'f5', studentName: 'Noah Davis', rollNo: 'STU005', class: '11', amount: 6000, paidAmount: 3000, dueDate: '2026-08-01', status: 'Partial', method: 'Card' },
  { id: 'f6', studentName: 'Olivia Miller', rollNo: 'STU006', class: '11', amount: 6000, paidAmount: 6000, dueDate: '2026-08-01', status: 'Paid', method: 'Bank Transfer' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'Fee Payment Reminder', message: 'Your fee payment is due on July 15, 2026.', type: 'warning', date: '2026-07-20', read: false },
  { id: 'n2', title: 'New Homework Assigned', message: 'Mathematics Worksheet 5 has been assigned.', type: 'info', date: '2026-07-21', read: false },
  { id: 'n3', title: 'Exam Schedule Published', message: 'Mid-Term Examination starts August 10.', type: 'info', date: '2026-07-22', read: true },
  { id: 'n4', title: 'Attendance Alert', message: 'Your child was marked absent on July 24.', type: 'error', date: '2026-07-24', read: false },
  { id: 'n5', title: 'Result Published', message: 'Unit Test 1 English results are now available.', type: 'success', date: '2026-07-23', read: true },
];

export const mockUsers = {
  super_admin: { id: 'u1', name: 'System Administrator', email: 'admin@edu.com', role: 'super_admin' as const, designation: 'System Administrator' },
  admin: { id: 'u2', name: 'Sarah Connor', email: 'sarah@edu.com', role: 'admin' as const, designation: 'Administrator' },
  principal: { id: 'u3', name: 'Dr. Alan Grant', email: 'alan@edu.com', role: 'principal' as const, designation: 'Principal' },
  teacher: { id: 'u4', name: 'Dr. Rebecca Lee', email: 'rebecca@edu.com', role: 'teacher' as const, designation: 'Mathematics Teacher' },
  staff: { id: 'u5', name: 'Robert Clark', email: 'robert@edu.com', role: 'staff' as const, designation: 'Clerk' },
  student: { id: 'u6', name: 'Aarav Sharma', email: 'aarav@edu.com', role: 'student' as const, designation: 'Class 10-A' },
  parent: { id: 'u7', name: 'Rajesh Sharma', email: 'rajesh@parent.com', role: 'parent' as const, designation: 'Parent of Aarav Sharma' },
};

// Demo credentials for each role — email maps to a role.
export const DEMO_CREDENTIALS = [
  { email: 'admin@edu.com', password: 'password', role: 'super_admin' as const },
  { email: 'sarah@edu.com', password: 'password', role: 'admin' as const },
  { email: 'alan@edu.com', password: 'password', role: 'principal' as const },
  { email: 'rebecca@edu.com', password: 'password', role: 'teacher' as const },
  { email: 'robert@edu.com', password: 'password', role: 'staff' as const },
  { email: 'aarav@edu.com', password: 'password', role: 'student' as const },
  { email: 'rajesh@parent.com', password: 'password', role: 'parent' as const },
];
