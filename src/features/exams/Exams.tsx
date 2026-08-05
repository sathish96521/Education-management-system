import { Box, Tabs, Tab, Card, Typography, Button } from '@mui/material';
import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { GridColDef } from '@/components/ui/types';
import { mockExams, mockResults } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const examColumns: GridColDef[] = [
  { field: 'name', headerName: 'Exam' },
  { field: 'class', headerName: 'Class' },
  { field: 'subject', headerName: 'Subject' },
  { field: 'date', headerName: 'Date' },
  { field: 'totalMarks', headerName: 'Total' },
  { field: 'passingMarks', headerName: 'Pass' },
  { field: 'status', headerName: 'Status' },
];

const resultColumns: GridColDef[] = [
  { field: 'rollNo', headerName: 'Roll No' },
  { field: 'studentName', headerName: 'Student' },
  { field: 'examName', headerName: 'Exam' },
  { field: 'subject', headerName: 'Subject' },
  { field: 'marksObtained', headerName: 'Obtained' },
  { field: 'totalMarks', headerName: 'Total' },
  { field: 'grade', headerName: 'Grade' },
];

export default function Exams() {
  const [tab, setTab] = useState(0);
  const toast = useToast();
  return (
    <Box>
      <PageHeader
        title="Exams & Results"
        subtitle="Manage exam schedules and view results."
        breadcrumbs={[{ label: 'Exams' }]}
        action={
          <Button variant="contained" onClick={() => toast.info('Schedule Exam form would open here.')}>
            Schedule Exam
          </Button>
        }
      />
      <Card sx={{ mb: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Exam Schedule" />
          <Tab label="Results" />
        </Tabs>
      </Card>
      {tab === 0 ? (
        <DataTable
          rows={mockExams as unknown as Record<string, unknown>[]}
          columns={examColumns}
          searchKeys={['name', 'subject', 'class']}
          title="Upcoming & Past Exams"
        />
      ) : (
        <DataTable
          rows={mockResults as unknown as Record<string, unknown>[]}
          columns={resultColumns}
          searchKeys={['studentName', 'rollNo', 'subject']}
          title="Published Results"
        />
      )}
    </Box>
  );
}
