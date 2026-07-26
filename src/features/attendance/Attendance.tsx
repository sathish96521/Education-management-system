import { Box, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Download } from '@mui/icons-material';
import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { GridColDef } from '@/components/ui/types';
import { mockAttendance } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const columns: GridColDef[] = [
  { field: 'rollNo', headerName: 'Roll No' },
  { field: 'studentName', headerName: 'Student' },
  { field: 'class', headerName: 'Class' },
  { field: 'section', headerName: 'Section' },
  { field: 'date', headerName: 'Date' },
  { field: 'status', headerName: 'Status' },
];

export default function Attendance() {
  const toast = useToast();
  const [filter, setFilter] = useState('All');
  const rows = filter === 'All'
    ? mockAttendance
    : mockAttendance.filter((a) => a.status === filter);

  return (
    <Box>
      <PageHeader
        title="Attendance"
        subtitle="Track and manage student attendance."
        breadcrumbs={[{ label: 'Attendance' }]}
        action={
          <Button variant="outlined" startIcon={<Download />} onClick={() => toast.success('Attendance report exported.')}>
            Export
          </Button>
        }
      />
      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup
          size="small"
          value={filter}
          exclusive
          onChange={(_, v) => v && setFilter(v)}
        >
          {['All', 'Present', 'Absent', 'Late'].map((f) => (
            <ToggleButton key={f} value={f}>{f}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <DataTable
        rows={rows as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['studentName', 'rollNo']}
        title="Attendance Records"
      />
    </Box>
  );
}
