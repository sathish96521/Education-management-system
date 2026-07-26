import { Box, Button } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import PageSkeleton from '@/components/ui/PageSkeleton';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import type { GridColDef, RowAction } from '@/components/ui/types';
import type { Staff as StaffType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchStaff, addStaff, editStaff, removeStaff } from '@/store/staffSlice';
import { useToast } from '@/hooks/useToast';
import StaffFormModal from './StaffFormModal';

const columns: GridColDef<Record<string, unknown>>[] = [
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
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { items, status } = useAppSelector((s) => s.staff);
  const [formOpen, setFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StaffType | null>(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStaff());
  }, [status, dispatch]);

  const handleAdd = (data: Omit<StaffType, 'id'>) => {
    dispatch(addStaff(data)).then(() => toast.success('Staff member added.'));
  };

  const handleEdit = (data: Omit<StaffType, 'id'>) => {
    if (editingStaff) {
      dispatch(editStaff({ id: editingStaff.id, data })).then(() => toast.success('Staff member updated.'));
      setEditingStaff(null);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      dispatch(removeStaff(deleteTarget.id)).then(() => toast.success('Staff member removed.'));
      setDeleteTarget(null);
    }
  };

  const actions: RowAction<Record<string, unknown>>[] = [
    { label: 'Edit', icon: <Edit fontSize="small" />, color: 'info', onClick: (row) => { setEditingStaff(row as unknown as StaffType); setFormOpen(true); } },
    { label: 'Delete', icon: <Delete fontSize="small" />, color: 'error', onClick: (row) => setDeleteTarget(row as unknown as StaffType) },
  ];

  if (status === 'loading') return <PageSkeleton />;

  return (
    <Box>
      <PageHeader
        title="Staff Management"
        subtitle="Manage non-teaching staff members."
        breadcrumbs={[{ label: 'Staff' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditingStaff(null); setFormOpen(true); }}>
            Add Staff
          </Button>
        }
      />
      <DataTable
        rows={items as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['name', 'employeeId', 'department', 'role']}
        title="All Staff"
        actions={actions}
      />
      <StaffFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingStaff(null); }}
        onSubmit={editingStaff ? handleEdit : handleAdd}
        initialData={editingStaff}
      />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Staff Member"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        severity="error"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
}
