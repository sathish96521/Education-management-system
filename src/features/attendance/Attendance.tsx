import { Box, Button, ToggleButtonGroup, ToggleButton, TextField } from '@mui/material';
import { Download } from '@mui/icons-material';
import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { GridColDef } from '@/components/ui/types';
import { mockAttendance } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const columns: GridColDef<Record<string, unknown>>[] = [
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
  const [selectedDate, setSelectedDate] = useState('');
  const rows = mockAttendance
    .filter((a) => filter === 'All' || a.status === filter)
    .filter((a) => !selectedDate || a.date === selectedDate);

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
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
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
        <TextField
          type="date"
          size="small"
          label="Date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ minWidth: 180 }}
        />
        {selectedDate && (
          <Button size="small" onClick={() => setSelectedDate('')}>Clear Date</Button>
        )}
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
