import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Student } from '@/types';

const schema = yup.object({
  rollNo: yup.string().required('Roll number is required'),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  gender: yup.string().oneOf(['Male', 'Female']).required('Gender is required'),
  class: yup.string().required('Class is required'),
  section: yup.string().required('Section is required'),
  guardian: yup.string().required('Guardian name is required'),
  status: yup.string().oneOf(['Active', 'Inactive']).required(),
  admissionDate: yup.string().required('Admission date is required'),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: Student | null;
}

export default function StudentFormModal({ open, onClose, onSubmit, initialData }: Props) {
  const isEdit = Boolean(initialData);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData
      ? { rollNo: initialData.rollNo, name: initialData.name, email: initialData.email, phone: initialData.phone, gender: initialData.gender, class: initialData.class, section: initialData.section, guardian: initialData.guardian, status: initialData.status, admissionDate: initialData.admissionDate }
      : { rollNo: '', name: '', email: '', phone: '', gender: 'Male', class: '', section: '', guardian: '', status: 'Active', admissionDate: new Date().toISOString().split('T')[0] },
  });

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>{isEdit ? 'Edit Student' : 'Add Student'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit((data) => { onSubmit(data); handleClose(); })} noValidate>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Roll No" error={!!errors.rollNo} helperText={errors.rollNo?.message} {...register('rollNo')} />
            </Grid>
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
              <TextField fullWidth select label="Gender" defaultValue={initialData?.gender ?? 'Male'} error={!!errors.gender} helperText={errors.gender?.message} {...register('gender')}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField fullWidth label="Class" error={!!errors.class} helperText={errors.class?.message} {...register('class')} />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField fullWidth label="Section" error={!!errors.section} helperText={errors.section?.message} {...register('section')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Guardian" error={!!errors.guardian} helperText={errors.guardian?.message} {...register('guardian')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Admission Date" type="date" slotProps={{ inputLabel: { shrink: true } }} error={!!errors.admissionDate} helperText={errors.admissionDate?.message} {...register('admissionDate')} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">{isEdit ? 'Save Changes' : 'Add Student'}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
