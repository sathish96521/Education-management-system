import { Box, Button, Card, Typography, Chip, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import { mockHomework } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const statusColor: Record<string, 'warning' | 'info' | 'success'> = {
  Pending: 'warning',
  Submitted: 'info',
  Graded: 'success',
};

export default function Homework() {
  const toast = useToast();
  return (
    <Box>
      <PageHeader
        title="Homework & Assignments"
        subtitle="Track assigned homework and submissions."
        breadcrumbs={[{ label: 'Homework' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => toast.info('Assign Homework form would open here.')}>
            Assign Homework
          </Button>
        }
      />
      {mockHomework.length === 0 ? (
        <EmptyState title="No homework assigned" message="There are no homework assignments yet." />
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
          {mockHomework.map((hw) => (
            <Card key={hw.id} sx={{ p: 2.5 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{hw.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {hw.subject} · Class {hw.class}-{hw.section}
                  </Typography>
                </Box>
                <Chip label={hw.status} size="small" color={statusColor[hw.status]} />
              </Stack>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Assigned by {hw.assignedBy} · Due {hw.dueDate}
                </Typography>
                <Button size="small" onClick={() => toast.info(`Opening "${hw.title}"...`)}>
                  View Details
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
