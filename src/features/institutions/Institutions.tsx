import { Box, Button, Chip } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import PageSkeleton from '@/components/ui/PageSkeleton';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import type { GridColDef, RowAction } from '@/components/ui/types';
import type { Institution as InstitutionType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchInstitutions, addInstitution, editInstitution, removeInstitution } from '@/store/institutionSlice';
import { useToast } from '@/hooks/useToast';
import InstitutionFormModal from './InstitutionFormModal';

const columns: GridColDef<Record<string, unknown>>[] = [
  { field: 'name', headerName: 'Name' },
  { field: 'code', headerName: 'Code' },
  { field: 'type', headerName: 'Type' },
  { field: 'city', headerName: 'City' },
  { field: 'principal', headerName: 'Principal' },
  { field: 'studentsCount', headerName: 'Students' },
  { field: 'teachersCount', headerName: 'Teachers' },
  { field: 'email', headerName: 'Email' },
  { field: 'phone', headerName: 'Phone' },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (row) => {
      const status = row.status as string;
      return (
        <Chip
          label={status}
          size="small"
          color={status === 'Active' ? 'success' : 'default'}
          variant={status === 'Active' ? 'filled' : 'outlined'}
        />
      );
    },
  },
];

export default function Institutions() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { items, status } = useAppSelector((s) => s.institutions);
  const [formOpen, setFormOpen] = useState(false);
  const [editingInstitution, setEditingInstitution] = useState<InstitutionType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<InstitutionType | null>(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchInstitutions());
  }, [status, dispatch]);

  const handleAdd = (data: Omit<InstitutionType, 'id'>) => {
    dispatch(addInstitution(data)).then(() => toast.success('Institution added.'));
  };

  const handleEdit = (data: Omit<InstitutionType, 'id'>) => {
    if (editingInstitution) {
      dispatch(editInstitution({ id: editingInstitution.id, data })).then(() => toast.success('Institution updated.'));
      setEditingInstitution(null);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      dispatch(removeInstitution(deleteTarget.id)).then(() => toast.success('Institution removed.'));
      setDeleteTarget(null);
    }
  };

  const actions: RowAction<Record<string, unknown>>[] = [
    { label: 'Edit', icon: <Edit fontSize="small" />, color: 'info', onClick: (row) => { setEditingInstitution(row as unknown as InstitutionType); setFormOpen(true); } },
    { label: 'Delete', icon: <Delete fontSize="small" />, color: 'error', onClick: (row) => setDeleteTarget(row as unknown as InstitutionType) },
  ];

  if (status === 'loading') return <PageSkeleton />;

  return (
    <Box>
      <PageHeader
        title="Institution Management"
        subtitle="Manage all institutions in the system."
        breadcrumbs={[{ label: 'Institutions' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditingInstitution(null); setFormOpen(true); }}>
            Add Institution
          </Button>
        }
      />
      <DataTable
        rows={items as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['name', 'code', 'city', 'principal', 'type']}
        title="All Institutions"
        actions={actions}
      />
      <InstitutionFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingInstitution(null); }}
        onSubmit={editingInstitution ? handleEdit : handleAdd}
        initialData={editingInstitution}
      />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Institution"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        severity="error"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
}
