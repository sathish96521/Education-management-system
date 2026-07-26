import { Card, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Chip, useTheme } from '@mui/material';
import { memo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, Area, AreaChart,
} from 'recharts';
import StatCard from '@/components/ui/StatCard';
import PageHeader from '@/components/ui/PageHeader';
import { useAppSelector } from '@/hooks/useRedux';
import { ROLES } from '@/constants/app';
import type { Role } from '@/types';
import {
  School, Person4, Payments, Class as ClassIcon, TrendingUp,
  Assignment, Quiz, Notifications, FactCheck, FamilyRestroom,
} from '@mui/icons-material';
import { mockStudents, mockTeachers, mockStaff, mockFees, mockAttendance } from '@/data/mockData';

// Derived from actual mock data
const totalStudents = mockStudents.length;
const activeStudents = mockStudents.filter((s) => s.status === 'Active').length;
const totalTeachers = mockTeachers.length;
const totalFeeAmount = mockFees.reduce((s, f) => s + f.amount, 0);
const totalFeePaid = mockFees.reduce((s, f) => s + f.paidAmount, 0);
const presentCount = mockAttendance.filter((a) => a.status === 'Present').length;
const absentCount = mockAttendance.filter((a) => a.status === 'Absent').length;
const lateCount = mockAttendance.filter((a) => a.status === 'Late').length;
const attendanceRate = mockAttendance.length > 0 ? Math.round((presentCount / mockAttendance.length) * 100) : 0;

const enrollmentTrend = [
  { month: 'Jan', students: 420, teachers: 28 },
  { month: 'Feb', students: 440, teachers: 30 },
  { month: 'Mar', students: 460, teachers: 30 },
  { month: 'Apr', students: 480, teachers: 32 },
  { month: 'May', students: 500, teachers: 34 },
  { month: 'Jun', students: 520, teachers: 36 },
  { month: 'Jul', students: 540, teachers: 38 },
];

const attendanceData = [
  { name: 'Present', value: presentCount, color: '#2e7d32' },
  { name: 'Absent', value: absentCount, color: '#d32f2f' },
  { name: 'Late', value: lateCount, color: '#ed6c02' },
];

const performanceData = [
  { subject: 'Math', score: 85 },
  { subject: 'Physics', score: 78 },
  { subject: 'Chemistry', score: 82 },
  { subject: 'English', score: 88 },
  { subject: 'Biology', score: 90 },
  { subject: 'History', score: 75 },
];

const feeCollection = [
  { month: 'Jan', collected: 45000, pending: 5000 },
  { month: 'Feb', collected: 48000, pending: 3000 },
  { month: 'Mar', collected: 50000, pending: 2000 },
  { month: 'Apr', collected: 52000, pending: 4000 },
  { month: 'May', collected: 55000, pending: 1500 },
  { month: 'Jun', collected: 58000, pending: 2000 },
  { month: 'Jul', collected: 62000, pending: 1000 },
];

interface DashboardConfig {
  stats: { title: string; value: string; icon: React.ReactNode; color: string; trend?: number }[];
  charts: ('enrollment' | 'attendance' | 'performance' | 'fees')[];
  activities: { icon: React.ReactNode; text: string; time: string }[];
}

const configs: Record<Role, DashboardConfig> = {
  super_admin: {
    stats: [
      { title: 'Total Institutions', value: '12', icon: <School />, color: '#1976d2', trend: 8 },
      { title: 'Total Students', value: String(totalStudents), icon: <School />, color: '#00897b', trend: 12 },
      { title: 'Total Staff', value: String(totalTeachers + mockStaff.length), icon: <Person4 />, color: '#f57c00', trend: 5 },
      { title: 'Revenue (Monthly)', value: `$${totalFeePaid.toLocaleString()}`, icon: <Payments />, color: '#2e7d32', trend: 15 },
    ],
    charts: ['enrollment', 'fees', 'attendance', 'performance'],
    activities: [
      { icon: <School color="primary" />, text: 'New institution onboarded: Greenfield Academy', time: '2h ago' },
      { icon: <Payments color="success" />, text: 'Monthly revenue report generated', time: '5h ago' },
      { icon: <Notifications color="warning" />, text: 'System maintenance scheduled for tonight', time: '1d ago' },
    ],
  },
  admin: {
    stats: [
      { title: 'Total Students', value: String(totalStudents), icon: <School />, color: '#1976d2', trend: 12 },
      { title: 'Total Teachers', value: String(totalTeachers), icon: <Person4 />, color: '#00897b', trend: 5 },
      { title: 'Fee Collected', value: `$${(totalFeePaid / 1000).toFixed(0)}K`, icon: <Payments />, color: '#2e7d32', trend: 15 },
      { title: 'Active Classes', value: '24', icon: <ClassIcon />, color: '#f57c00', trend: 3 },
    ],
    charts: ['enrollment', 'fees', 'attendance', 'performance'],
    activities: [
      { icon: <School color="primary" />, text: '12 new students admitted this month', time: '3h ago' },
      { icon: <Payments color="success" />, text: 'Fee collection target achieved', time: '6h ago' },
      { icon: <FactCheck color="warning" />, text: 'Attendance report reviewed', time: '1d ago' },
    ],
  },
  principal: {
    stats: [
      { title: 'Total Students', value: String(totalStudents), icon: <School />, color: '#1976d2', trend: 8 },
      { title: 'Total Teachers', value: String(totalTeachers), icon: <Person4 />, color: '#00897b', trend: 4 },
      { title: 'Avg Attendance', value: `${attendanceRate}%`, icon: <FactCheck />, color: '#2e7d32', trend: 2 },
      { title: 'Pass Rate', value: '94%', icon: <Quiz />, color: '#f57c00', trend: 6 },
    ],
    charts: ['enrollment', 'attendance', 'performance', 'fees'],
    activities: [
      { icon: <Quiz color="primary" />, text: 'Mid-term exam schedule approved', time: '2h ago' },
      { icon: <FactCheck color="success" />, text: 'Monthly attendance review completed', time: '4h ago' },
      { icon: <Person4 color="warning" />, text: 'Teacher performance evaluation due', time: '1d ago' },
    ],
  },
  teacher: {
    stats: [
      { title: 'My Students', value: '120', icon: <School />, color: '#1976d2' },
      { title: 'Classes Today', value: '5', icon: <ClassIcon />, color: '#00897b' },
      { title: 'Pending Homework', value: '8', icon: <Assignment />, color: '#f57c00' },
      { title: 'Avg Class Score', value: '82%', icon: <TrendingUp />, color: '#2e7d32', trend: 4 },
    ],
    charts: ['performance', 'attendance'],
    activities: [
      { icon: <Assignment color="primary" />, text: 'Algebra Worksheet 5 assigned to Class 10-A', time: '1h ago' },
      { icon: <FactCheck color="success" />, text: 'Attendance marked for Class 10-A', time: '3h ago' },
      { icon: <Quiz color="warning" />, text: 'Math mid-term paper to be prepared', time: '1d ago' },
    ],
  },
  staff: {
    stats: [
      { title: 'Fee Records', value: '320', icon: <Payments />, color: '#1976d2' },
      { title: 'Pending Invoices', value: '24', icon: <Assignment />, color: '#f57c00' },
      { title: 'Overdue', value: '8', icon: <Payments />, color: '#d32f2f' },
      { title: 'Collected Today', value: '$4.2K', icon: <TrendingUp />, color: '#2e7d32', trend: 10 },
    ],
    charts: ['fees'],
    activities: [
      { icon: <Payments color="success" />, text: 'Fee payment recorded for Aarav Sharma', time: '1h ago' },
      { icon: <Notifications color="warning" />, text: 'Overdue fee reminder sent to 8 students', time: '4h ago' },
    ],
  },
  student: {
    stats: [
      { title: 'Attendance', value: '95%', icon: <FactCheck />, color: '#1976d2' },
      { title: 'Avg Score', value: '85%', icon: <TrendingUp />, color: '#2e7d32', trend: 3 },
      { title: 'Pending Homework', value: '3', icon: <Assignment />, color: '#f57c00' },
      { title: 'Upcoming Exams', value: '2', icon: <Quiz />, color: '#7b1fa2' },
    ],
    charts: ['performance', 'attendance'],
    activities: [
      { icon: <Assignment color="primary" />, text: 'New homework: Algebra Worksheet 5', time: '1h ago' },
      { icon: <Quiz color="warning" />, text: 'Mid-term exam starts August 10', time: '2d ago' },
      { icon: <FactCheck color="success" />, text: 'Attendance marked Present today', time: '5h ago' },
    ],
  },
  parent: {
    stats: [
      { title: "Child's Attendance", value: '95%', icon: <FactCheck />, color: '#1976d2' },
      { title: 'Avg Score', value: '85%', icon: <TrendingUp />, color: '#2e7d32', trend: 3 },
      { title: 'Fees Due', value: '$2.5K', icon: <Payments />, color: '#f57c00' },
      { title: 'Pending Homework', value: '3', icon: <Assignment />, color: '#d32f2f' },
    ],
    charts: ['performance', 'attendance'],
    activities: [
      { icon: <Payments color="warning" />, text: 'Fee payment due on July 15', time: '2h ago' },
      { icon: <FactCheck color="info" />, text: 'Your child was marked Present today', time: '5h ago' },
      { icon: <Assignment color="primary" />, text: 'New homework assigned in Mathematics', time: '1d ago' },
    ],
  },
};

export default function Dashboard() {
  const user = useAppSelector((s) => s.auth.user);
  const theme = useTheme();
  if (!user) return null;
  const config = configs[user.role] as DashboardConfig;
  const roleLabel = ROLES[user.role];
  const gridColor = theme.palette.mode === 'dark' ? '#334155' : '#eee';

  return (
    <Box>
      <PageHeader
        title={`Welcome, ${user.name}!`}
        subtitle={`You are signed in as ${roleLabel}. Here's your overview.`}
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        {config.stats.map((stat: DashboardConfig['stats'][number]) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 2, mb: 3 }}>
        {config.charts.includes('enrollment') && (
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Enrollment Trend</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={enrollmentTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1976d2" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#1976d2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="students" stroke="#1976d2" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="teachers" stroke="#00897b" fill="#00897b33" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        )}

        {config.charts.includes('attendance') && (
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Attendance Distribution</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={attendanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {attendanceData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}

        {config.charts.includes('performance') && (
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Subject Performance</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="subject" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="score" fill="#1976d2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {config.charts.includes('fees') && (
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Fee Collection</Typography>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={feeCollection}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="collected" stroke="#2e7d32" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="#d32f2f" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}
      </Box>

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Recent Activity</Typography>
        <List>
          {config.activities.map((act: DashboardConfig['activities'][number], i: number) => (
            <ListItem key={i} sx={{ px: 0, borderBottom: i < config.activities.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
              <ListItemIcon>{act.icon}</ListItemIcon>
              <ListItemText primary={act.text} secondary={act.time} />
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}
