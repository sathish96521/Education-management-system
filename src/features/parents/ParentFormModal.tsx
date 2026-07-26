import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Parent } from '@/types';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  occupation: yup.string().required('Occupation is required'),
  studentName: yup.string().required('Student name is required'),
  studentClass: yup.string().required('Student class is required'),
  relation: yup.string().required('Relation is required'),
  status: yup.string().oneOf(['Active', 'Inactive']).required(),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: Parent | null;
}

export default function ParentFormModal({ open, onClose, onSubmit, initialData }: Props) {
  const isEdit = Boolean(initialData);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData
      ? { name: initialData.name, email: initialData.email, phone: initialData.phone, occupation: initialData.occupation, studentName: initialData.studentName, studentClass: initialData.studentClass, relation: initialData.relation, status: initialData.status }
      : { name: '', email: '', phone: '', occupation: '', studentName: '', studentClass: '', relation: '', status: 'Active' },
  });

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>{isEdit ? 'Edit Parent' : 'Add Parent'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit((data) => { onSubmit(data); handleClose(); })} noValidate>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Full Name" error={!!errors.name} helperText={errors.name?.message} {...register('name')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Email" error={!!errors.email} helperText={errors.email?.message} {...register('email')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Phone" error={!!errors.phone} helperText={errors.phone?.message} {...register('phone')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Occupation" error={!!errors.occupation} helperText={errors.occupation?.message} {...register('occupation')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Student Name" error={!!errors.studentName} helperText={errors.studentName?.message} {...register('studentName')} />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField fullWidth label="Student Class" error={!!errors.studentClass} helperText={errors.studentClass?.message} {...register('studentClass')} />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField fullWidth select label="Relation" defaultValue={initialData?.relation ?? 'Father'} error={!!errors.relation} helperText={errors.relation?.message} {...register('relation')}>
                <MenuItem value="Father">Father</MenuItem>
                <MenuItem value="Mother">Mother</MenuItem>
                <MenuItem value="Guardian">Guardian</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">{isEdit ? 'Save Changes' : 'Add Parent'}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
