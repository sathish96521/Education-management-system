import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { GridColDef } from '@/components/ui/types';
import { mockStaff } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const columns: GridColDef[] = [
  { field: 'employeeId', headerName: 'Emp ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'department', headerName: 'Department' },
  { field: 'role', headerName: 'Role' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'phone', headerName: 'Phone' },
  { field: 'email', headerName: 'Email' },
  { field: 'status', headerName: 'Status' },
];

export default function Staff() {
  const toast = useToast();
  return (
    <Box>
      <PageHeader
        title="Staff Management"
        subtitle="Manage non-teaching staff members."
        breadcrumbs={[{ label: 'Staff' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => toast.info('Add Staff form would open here.')}>
            Add Staff
          </Button>
        }
      />
      <DataTable
        rows={mockStaff as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['name', 'employeeId', 'department', 'role']}
        title="All Staff"
      />
    </Box>
  );
}
