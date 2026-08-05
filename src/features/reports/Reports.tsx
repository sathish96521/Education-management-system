import { Box, Card, Typography, Grid, Button, useTheme } from '@mui/material';
import { Download } from '@mui/icons-material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';
import PageHeader from '@/components/ui/PageHeader';
import StatCard from '@/components/ui/StatCard';
import { useToast } from '@/hooks/useToast';
import { School, Person4, Payments, FactCheck } from '@mui/icons-material';
import { mockStudents, mockTeachers, mockFees, mockAttendance } from '@/data/mockData';

const totalStudents = mockStudents.length;
const totalTeachers = mockTeachers.length;
const totalFeePaid = mockFees.reduce((s, f) => s + f.paidAmount, 0);
const avgAttendance = mockAttendance.length > 0
  ? Math.round((mockAttendance.filter((a) => a.status === 'Present').length / mockAttendance.length) * 100)
  : 0;

const maleCount = mockStudents.filter((s) => s.gender === 'Male').length;
const femaleCount = mockStudents.filter((s) => s.gender === 'Female').length;

const gradeDistribution = [
  { grade: 'A+', count: 45 },
  { grade: 'A', count: 120 },
  { grade: 'B', count: 180 },
  { grade: 'C', count: 95 },
  { grade: 'D', count: 40 },
  { grade: 'F', count: 15 },
];

const monthlyAttendance = [
  { month: 'Jan', rate: 91 }, { month: 'Feb', rate: 93 }, { month: 'Mar', rate: 92 },
  { month: 'Apr', rate: 94 }, { month: 'May', rate: 95 }, { month: 'Jun', rate: 93 },
  { month: 'Jul', rate: 92 },
];

const genderSplit = [
  { name: 'Male', value: maleCount, color: '#1976d2' },
  { name: 'Female', value: femaleCount, color: '#00897b' },
];

export default function Reports() {
  const toast = useToast();
  const theme = useTheme();
  const gridColor = theme.palette.mode === 'dark' ? '#334155' : '#eee';
  return (
    <Box>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Insights and statistics across the institution."
        breadcrumbs={[{ label: 'Reports' }]}
        action={
          <Button variant="outlined" startIcon={<Download />} onClick={() => toast.success('Full report exported.')}>
            Export
          </Button>
        }
      />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Total Students" value={String(totalStudents)} icon={<School />} color="#1976d2" trend={8} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Total Teachers" value={String(totalTeachers)} icon={<Person4 />} color="#00897b" trend={4} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Fee Collected" value={`$${(totalFeePaid / 1000).toFixed(0)}K`} icon={<Payments />} color="#2e7d32" trend={15} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="Avg Attendance" value={`${avgAttendance}%`} icon={<FactCheck />} color="#f57c00" trend={2} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Grade Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="grade" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Gender Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={genderSplit} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {genderSplit.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Monthly Attendance Rate</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#00897b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
