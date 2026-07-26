import { Box, Button } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import PageSkeleton from '@/components/ui/PageSkeleton';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import type { GridColDef, RowAction } from '@/components/ui/types';
import type { Parent } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchParents, addParent, editParent, removeParent } from '@/store/parentSlice';
import { useToast } from '@/hooks/useToast';
import ParentFormModal from './ParentFormModal';

const columns: GridColDef<Record<string, unknown>>[] = [
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
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { items, status } = useAppSelector((s) => s.parents);
  const [formOpen, setFormOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Parent | null>(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchParents());
  }, [status, dispatch]);

  const handleAdd = (data: Omit<Parent, 'id'>) => {
    dispatch(addParent(data)).then(() => toast.success('Parent added.'));
  };

  const handleEdit = (data: Omit<Parent, 'id'>) => {
    if (editingParent) {
      dispatch(editParent({ id: editingParent.id, data })).then(() => toast.success('Parent updated.'));
      setEditingParent(null);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      dispatch(removeParent(deleteTarget.id)).then(() => toast.success('Parent removed.'));
      setDeleteTarget(null);
    }
  };

  const actions: RowAction<Record<string, unknown>>[] = [
    { label: 'Edit', icon: <Edit fontSize="small" />, color: 'info', onClick: (row) => { setEditingParent(row as unknown as Parent); setFormOpen(true); } },
    { label: 'Delete', icon: <Delete fontSize="small" />, color: 'error', onClick: (row) => setDeleteTarget(row as unknown as Parent) },
  ];

  if (status === 'loading') return <PageSkeleton />;

  return (
    <Box>
      <PageHeader
        title="Parent Management"
        subtitle="Manage parent and guardian records."
        breadcrumbs={[{ label: 'Parents' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditingParent(null); setFormOpen(true); }}>
            Add Parent
          </Button>
        }
      />
      <DataTable
        rows={items as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['name', 'studentName', 'email', 'phone']}
        title="All Parents"
        actions={actions}
      />
      <ParentFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingParent(null); }}
        onSubmit={editingParent ? handleEdit : handleAdd}
        initialData={editingParent}
      />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Parent"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        severity="error"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
}
