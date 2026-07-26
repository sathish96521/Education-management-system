import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid, Box, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Teacher } from '@/types';

const schema = yup.object({
  employeeId: yup.string().required('Employee ID is required'),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  subject: yup.string().required('Subject is required'),
  gender: yup.string().oneOf(['Male', 'Female']).required('Gender is required'),
  qualification: yup.string().required('Qualification is required'),
  experience: yup.number().min(0).required('Experience is required'),
  status: yup.string().oneOf(['Active', 'Inactive']).required(),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: Teacher | null;
}

export default function TeacherFormModal({ open, onClose, onSubmit, initialData }: Props) {
  const isEdit = Boolean(initialData);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData
      ? { employeeId: initialData.employeeId, name: initialData.name, email: initialData.email, phone: initialData.phone, subject: initialData.subject, gender: initialData.gender, qualification: initialData.qualification, experience: initialData.experience, status: initialData.status }
      : { employeeId: '', name: '', email: '', phone: '', subject: '', gender: 'Male', qualification: '', experience: 0, status: 'Active' },
  });

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>{isEdit ? 'Edit Teacher' : 'Add Teacher'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit((data) => { onSubmit(data); handleClose(); })} noValidate>
        <DialogContent>
          {!isEdit && (
            <Alert severity="info" sx={{ mb: 2 }}>
              This teacher can log in after being added using their email and the default password: <strong>password</strong>
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Employee ID" error={!!errors.employeeId} helperText={errors.employeeId?.message} {...register('employeeId')} />
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
              <TextField fullWidth label="Subject" error={!!errors.subject} helperText={errors.subject?.message} {...register('subject')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth select label="Gender" defaultValue={initialData?.gender ?? 'Male'} error={!!errors.gender} helperText={errors.gender?.message} {...register('gender')}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Qualification" error={!!errors.qualification} helperText={errors.qualification?.message} {...register('qualification')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Experience (years)" type="number" error={!!errors.experience} helperText={errors.experience?.message} {...register('experience')} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">{isEdit ? 'Save Changes' : 'Add Teacher'}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
