import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Institution } from '@/types';

const schema = yup.object({
  name: yup.string().required('Institution name is required'),
  code: yup.string().required('Institution code is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  type: yup.string().oneOf(['School', 'College', 'University', 'Institute']).required('Type is required'),
  establishedYear: yup.number().typeError('Enter a valid year').min(1800, 'Enter a valid year').max(new Date().getFullYear(), 'Year cannot be in the future').required('Established year is required'),
  principal: yup.string().required('Principal name is required'),
  studentsCount: yup.number().typeError('Enter a valid number').min(0, 'Cannot be negative').required('Student count is required'),
  teachersCount: yup.number().typeError('Enter a valid number').min(0, 'Cannot be negative').required('Teacher count is required'),
  status: yup.string().oneOf(['Active', 'Inactive']).required(),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: Institution | null;
}

export default function InstitutionFormModal({ open, onClose, onSubmit, initialData }: Props) {
  const isEdit = Boolean(initialData);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          code: initialData.code,
          email: initialData.email,
          phone: initialData.phone,
          address: initialData.address,
          city: initialData.city,
          type: initialData.type,
          establishedYear: initialData.establishedYear,
          principal: initialData.principal,
          studentsCount: initialData.studentsCount,
          teachersCount: initialData.teachersCount,
          status: initialData.status,
        }
      : {
          name: '',
          code: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          type: 'School',
          establishedYear: new Date().getFullYear(),
          principal: '',
          studentsCount: 0,
          teachersCount: 0,
          status: 'Active',
        },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>{isEdit ? 'Edit Institution' : 'Add Institution'}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit((data) => { onSubmit(data); handleClose(); })} noValidate>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Institution Name" error={!!errors.name} helperText={errors.name?.message} {...register('name')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Institution Code" error={!!errors.code} helperText={errors.code?.message} {...register('code')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Email" error={!!errors.email} helperText={errors.email?.message} {...register('email')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Phone" error={!!errors.phone} helperText={errors.phone?.message} {...register('phone')} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Address" error={!!errors.address} helperText={errors.address?.message} {...register('address')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="City" error={!!errors.city} helperText={errors.city?.message} {...register('city')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth select label="Type" defaultValue={initialData?.type ?? 'School'} error={!!errors.type} helperText={errors.type?.message} {...register('type')}>
                <MenuItem value="School">School</MenuItem>
                <MenuItem value="College">College</MenuItem>
                <MenuItem value="University">University</MenuItem>
                <MenuItem value="Institute">Institute</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Established Year" type="number" error={!!errors.establishedYear} helperText={errors.establishedYear?.message} {...register('establishedYear')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Principal" error={!!errors.principal} helperText={errors.principal?.message} {...register('principal')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Students Count" type="number" error={!!errors.studentsCount} helperText={errors.studentsCount?.message} {...register('studentsCount')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Teachers Count" type="number" error={!!errors.teachersCount} helperText={errors.teachersCount?.message} {...register('teachersCount')} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth select label="Status" defaultValue={initialData?.status ?? 'Active'} error={!!errors.status} helperText={errors.status?.message} {...register('status')}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">{isEdit ? 'Save Changes' : 'Add Institution'}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
