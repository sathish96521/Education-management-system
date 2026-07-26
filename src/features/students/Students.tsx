import { Box, Button, Avatar } from '@mui/material';
import { Add } from '@mui/icons-material';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { GridColDef } from '@/components/ui/types';
import { mockStudents } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const columns: GridColDef[] = [
  { field: 'rollNo', headerName: 'Roll No' },
  {
    field: 'name',
    headerName: 'Student',
    renderCell: (row) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar src={row.avatar as string} sx={{ width: 36, height: 36 }} />
        <Box>
          <Box sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{row.name as string}</Box>
          <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{row.email as string}</Box>
        </Box>
      </Box>
    ),
  },
  { field: 'class', headerName: 'Class' },
  { field: 'section', headerName: 'Section' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'guardian', headerName: 'Guardian' },
  { field: 'phone', headerName: 'Phone' },
  { field: 'status', headerName: 'Status' },
];

export default function Students() {
  const toast = useToast();
  return (
    <Box>
      <PageHeader
        title="Student Management"
        subtitle="View, add, and manage student records."
        breadcrumbs={[{ label: 'Students' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => toast.info('Add Student form would open here.')}>
            Add Student
          </Button>
        }
      />
      <DataTable
        rows={mockStudents as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['name', 'rollNo', 'email', 'guardian']}
        title="All Students"
        initialRowsPerPage={10}
      />
    </Box>
  );
}
