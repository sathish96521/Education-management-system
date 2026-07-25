import { Box, Button, Card, Typography, LinearProgress, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import type { GridColDef } from '@/components/ui/types';
import { mockClasses } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Class' },
  { field: 'sections', headerName: 'Sections', renderCell: (row) => (row.sections as string[]).join(', ') },
  { field: 'teacher', headerName: 'Class Teacher' },
  { field: 'room', headerName: 'Room' },
  { field: 'capacity', headerName: 'Capacity' },
  { field: 'enrolled', headerName: 'Enrolled' },
];

export default function Classes() {
  const toast = useToast();
  return (
    <Box>
      <PageHeader
        title="Class & Section Management"
        subtitle="Organize classes, sections, and assignments."
        breadcrumbs={[{ label: 'Classes' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => toast.info('Add Class form would open here.')}>
            Add Class
          </Button>
        }
      />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {mockClasses.map((c) => (
          <Grid key={c.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{c.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Sections: {c.sections.join(', ')}</Typography>
              <Typography variant="caption" color="text.secondary">Class Teacher: {c.teacher}</Typography>
              <Box sx={{ mt: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">Enrollment</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{c.enrolled}/{c.capacity}</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(c.enrolled / c.capacity) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <DataTable
        rows={mockClasses as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['name', 'teacher', 'room']}
        title="Class List"
      />
    </Box>
  );
}
