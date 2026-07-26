import { Box, Card, Grid, Typography, Avatar, Chip, Divider, Button, Tabs, Tab } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { GridColDef } from '@/components/ui/types';
import { mockStudents, mockAttendance, mockResults, mockFees } from '@/data/mockData';

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const student = mockStudents.find((s) => s.id === id);

  if (!student) {
    navigate('/students');
    return null;
  }

  const attendance = mockAttendance.filter((a) => a.rollNo === student.rollNo);
  const results = mockResults.filter((r) => r.rollNo === student.rollNo);
  const fees = mockFees.filter((f) => f.rollNo === student.rollNo);

  const attendanceCols: GridColDef<Record<string, unknown>>[] = [
    { field: 'date', headerName: 'Date' },
    { field: 'status', headerName: 'Status' },
  ];

  const resultCols: GridColDef<Record<string, unknown>>[] = [
    { field: 'examName', headerName: 'Exam' },
    { field: 'subject', headerName: 'Subject' },
    { field: 'marksObtained', headerName: 'Obtained' },
    { field: 'totalMarks', headerName: 'Total' },
    { field: 'grade', headerName: 'Grade' },
  ];

  const feeCols: GridColDef<Record<string, unknown>>[] = [
    { field: 'amount', headerName: 'Amount' },
    { field: 'paidAmount', headerName: 'Paid' },
    { field: 'dueDate', headerName: 'Due Date' },
    { field: 'status', headerName: 'Status' },
  ];

  return (
    <Box>
      <PageHeader
        title={student.name}
        subtitle={`Class ${student.class}-${student.section} · Roll No: ${student.rollNo}`}
        breadcrumbs={[{ label: 'Students', path: '/students' }, { label: student.name }]}
        action={<Button startIcon={<ArrowBack />} onClick={() => navigate('/students')}>Back</Button>}
      />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Avatar src={student.avatar} sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}>
              {student.name.charAt(0)}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{student.name}</Typography>
            <Typography variant="body2" color="text.secondary">{student.email}</Typography>
            <Box sx={{ mt: 1.5 }}>
              <Chip label={student.status} color={student.status === 'Active' ? 'success' : 'default'} size="small" />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ textAlign: 'left' }}>
              <DetailRow label="Phone" value={student.phone} />
              <DetailRow label="Gender" value={student.gender} />
              <DetailRow label="Guardian" value={student.guardian} />
              <DetailRow label="Admitted" value={student.admissionDate} />
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tab label="Attendance" />
              <Tab label="Results" />
              <Tab label="Fees" />
            </Tabs>
            <Box sx={{ p: 2 }}>
              {tab === 0 && (
                <DataTable rows={attendance as unknown as Record<string, unknown>[]} columns={attendanceCols} title="Attendance Records" />
              )}
              {tab === 1 && (
                <DataTable rows={results as unknown as Record<string, unknown>[]} columns={resultCols} title="Exam Results" />
              )}
              {tab === 2 && (
                <DataTable rows={fees as unknown as Record<string, unknown>[]} columns={feeCols} title="Fee Records" />
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>{value}</Typography>
    </Box>
  );
}
