import { Box, Button, Avatar } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import DataTable from '@/components/ui/DataTable';
import PageSkeleton from '@/components/ui/PageSkeleton';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import type { GridColDef, RowAction } from '@/components/ui/types';
import type { Student } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchStudents, addStudent, editStudent, removeStudent } from '@/store/studentSlice';
import { useToast } from '@/hooks/useToast';
import StudentFormModal from './StudentFormModal';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef<Record<string, unknown>>[] = [
  { field: 'rollNo', headerName: 'Roll No' },
  {
    field: 'name',
    headerName: 'Student',
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
  { field: 'class', headerName: 'Class' },
  { field: 'section', headerName: 'Section' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'guardian', headerName: 'Guardian' },
  { field: 'phone', headerName: 'Phone' },
  { field: 'status', headerName: 'Status' },
];

export default function Students() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { items, status } = useAppSelector((s) => s.students);
  const [formOpen, setFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStudents());
  }, [status, dispatch]);

  const handleAdd = (data: Omit<Student, 'id'>) => {
    dispatch(addStudent(data)).then(() => toast.success('Student added successfully.'));
  };

  const handleEdit = (data: Omit<Student, 'id'>) => {
    if (editingStudent) {
      dispatch(editStudent({ id: editingStudent.id, data })).then(() => toast.success('Student updated.'));
      setEditingStudent(null);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      dispatch(removeStudent(deleteTarget.id)).then(() => toast.success('Student removed.'));
      setDeleteTarget(null);
    }
  };

  const actions: RowAction<Record<string, unknown>>[] = [
    {
      label: 'View',
      icon: <Visibility fontSize="small" />,
      color: 'primary',
      onClick: (row) => navigate(`/students/${row.id}`),
    },
    {
      label: 'Edit',
      icon: <Edit fontSize="small" />,
      color: 'info',
      onClick: (row) => {
        setEditingStudent(row as unknown as Student);
        setFormOpen(true);
      },
    },
    {
      label: 'Delete',
      icon: <Delete fontSize="small" />,
      color: 'error',
      onClick: (row) => setDeleteTarget(row as unknown as Student),
    },
  ];

  if (status === 'loading') return <PageSkeleton />;

  return (
    <Box>
      <PageHeader
        title="Student Management"
        subtitle="View, add, and manage student records."
        breadcrumbs={[{ label: 'Students' }]}
        action={
          <Button variant="contained" startIcon={<Add />} onClick={() => { setEditingStudent(null); setFormOpen(true); }}>
            Add Student
          </Button>
        }
      />
      <DataTable
        rows={items as unknown as Record<string, unknown>[]}
        columns={columns}
        searchKeys={['name', 'rollNo', 'email', 'guardian']}
        title="All Students"
        initialRowsPerPage={10}
        actions={actions}
      />
      <StudentFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingStudent(null); }}
        onSubmit={editingStudent ? handleEdit : handleAdd}
        initialData={editingStudent}
      />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Student"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        severity="error"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Box>
  );
}
