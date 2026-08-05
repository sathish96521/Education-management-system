import { Box, Button, Avatar } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import PageSkeleton from '@/components/ui/PageSkeleton';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import type { GridColDef, RowAction } from '@/components/ui/types';
import type { Teacher } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchTeachers, addTeacher, editTeacher, removeTeacher } from '@/store/teacherSlice';
import { useToast } from '@/hooks/useToast';
import TeacherFormModal from './TeacherFormModal';

const columns: GridColDef<Record<string, unknown>>[] = [
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
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { items, status } = useAppSelector((s) => s.teachers);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Teacher | null>(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTeachers());
  }, [status, dispatch]);

  const handleAdd = (data: Omit<Teacher, 'id'>) => {
    dispatch(addTeacher(data)).then(() => toast.success('Teacher added successfully.'));
  };

  const handleEdit = (data: Omit<Teacher, 'id'>) => {
    if (editingTeacher) {
      dispatch(editTeacher({ id: editingTeacher.id, data })).then(() => toast.success('Teacher updated.'));
      setEditingTeacher(null);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      dispatch(removeTeacher(deleteTarget.id)).then(() => toast.success('Teacher removed.'));
      setDeleteTarget(null);
    }
  };

  const actions: RowAction<Record<string, unknown>>[] = [
    { label: 'Edit', icon: <Edit fontSize="small" />, color: 'info', onClick: (row) => { setEditingTeacher(row as unknown as Teacher); setFormOpen(true); } },
    { label: 'Delete', icon: <Delete fontSize="small" />, color: 'error', onClick: (row) => setDeleteTarget(row as unknown as Teacher) },
  ];

  if (status === 'loading') return <PageSkeleton />;

  return (
    <Box>
      <PageHeader
        title="Teacher Management"
        subtitle="Manage teaching staff and their assignments."
        breadcrumbs={[{ label: 'Teachers' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditingTeacher(null); setFormOpen(true); }}>
            Add Teacher
          </Button>
        }
      />
      <DataTable
        rows={items as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['name', 'employeeId', 'subject', 'email']}
        title="All Teachers"
        initialRowsPerPage={10}
        actions={actions}
      />
      <TeacherFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingTeacher(null); }}
        onSubmit={editingTeacher ? handleEdit : handleAdd}
        initialData={editingTeacher}
      />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Teacher"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        severity="error"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
}
