import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { GridColDef } from '@/components/ui/types';
import { mockParents } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Parent Name' },
  { field: 'studentName', headerName: 'Student' },
  { field: 'studentClass', headerName: 'Class' },
  { field: 'relation', headerName: 'Relation' },
  { field: 'occupation', headerName: 'Occupation' },
  { field: 'phone', headerName: 'Phone' },
  { field: 'email', headerName: 'Email' },
  { field: 'status', headerName: 'Status' },
];

export default function Parents() {
  const toast = useToast();
  return (
    <Box>
      <PageHeader
        title="Parent Management"
        subtitle="Manage parent and guardian records."
        breadcrumbs={[{ label: 'Parents' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => toast.info('Add Parent form would open here.')}>
            Add Parent
          </Button>
        }
      />
      <DataTable
        rows={mockParents as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['name', 'studentName', 'email', 'phone']}
        title="All Parents"
      />
    </Box>
  );
}
