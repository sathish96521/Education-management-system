import { Box, Button, Grid, Card, Typography } from '@mui/material';
import { Download, Payments } from '@mui/icons-material';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import StatCard from '@/components/ui/StatCard';
import type { GridColDef } from '@/components/ui/types';
import { mockFees } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const columns: GridColDef[] = [
  { field: 'rollNo', headerName: 'Roll No' },
  { field: 'studentName', headerName: 'Student' },
  { field: 'class', headerName: 'Class' },
  {
    field: 'amount',
    headerName: 'Amount',
    renderCell: (row) => `$${row.amount}`,
  },
  {
    field: 'paidAmount',
    headerName: 'Paid',
    renderCell: (row) => `$${row.paidAmount}`,
  },
  { field: 'dueDate', headerName: 'Due Date' },
  { field: 'method', headerName: 'Method' },
  { field: 'status', headerName: 'Status' },
];

export default function Fees() {
  const toast = useToast();
  const total = mockFees.reduce((s, f) => s + f.amount, 0);
  const paid = mockFees.reduce((s, f) => s + f.paidAmount, 0);
  const overdue = mockFees.filter((f) => f.status === 'Overdue').length;

  return (
    <Box>
      <PageHeader
        title="Fees Management"
        subtitle="Track fee collection and outstanding balances."
        breadcrumbs={[{ label: 'Fees' }]}
        action={
          <Button variant="outlined" startIcon={<Download />} onClick={() => toast.success('Fee report exported.')}>
            Export Report
          </Button>
        }
      />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard title="Total Fees" value={`$${total.toLocaleString()}`} icon={<Payments />} color="#1976d2" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard title="Collected" value={`$${paid.toLocaleString()}`} icon={<Payments />} color="#2e7d32" trend={8} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard title="Overdue Accounts" value={overdue} icon={<Payments />} color="#d32f2f" />
        </Grid>
      </Grid>
      <DataTable
        rows={mockFees as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['studentName', 'rollNo']}
        title="Fee Records"
      />
    </Box>
  );
}
