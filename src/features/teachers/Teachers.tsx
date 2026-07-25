import { Box, Button, Avatar } from '@mui/material';
import { Add } from '@mui/icons-material';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { GridColDef } from '@/components/ui/types';
import { mockTeachers } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const columns: GridColDef[] = [
  { field: 'employeeId', headerName: 'Emp ID' },
  {
    field: 'name',
    headerName: 'Teacher',
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
  { field: 'subject', headerName: 'Subject' },
  { field: 'qualification', headerName: 'Qualification' },
  { field: 'experience', headerName: 'Exp (yrs)' },
  { field: 'phone', headerName: 'Phone' },
  { field: 'status', headerName: 'Status' },
];

export default function Teachers() {
  const toast = useToast();
  return (
    <Box>
      <PageHeader
        title="Teacher Management"
        subtitle="Manage teaching staff and their assignments."
        breadcrumbs={[{ label: 'Teachers' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => toast.info('Add Teacher form would open here.')}>
            Add Teacher
          </Button>
        }
      />
      <DataTable
        rows={mockTeachers as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['name', 'employeeId', 'subject', 'email']}
        title="All Teachers"
        initialRowsPerPage={10}
      />
    </Box>
  );
}
