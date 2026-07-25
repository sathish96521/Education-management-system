import { Box, Card, Avatar, Typography, TextField, Button, Divider, Grid, Chip } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageHeader from '@/components/ui/PageHeader';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { updateProfile } from '@/store/authSlice';
import { useToast } from '@/hooks/useToast';
import { ROLES } from '@/constants/app';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().default(''),
  designation: yup.string().default(''),
});

type ProfileForm = yup.InferType<typeof schema>;

export default function Profile() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      designation: user?.designation ?? '',
    },
  });

  if (!user) return null;

  const onSubmit: SubmitHandler<ProfileForm> = (data) => {
    dispatch(updateProfile(data));
    toast.success('Profile updated successfully.');
  };

  return (
    <Box>
      <PageHeader title="My Profile" subtitle="Manage your personal information." breadcrumbs={[{ label: 'Profile' }]} />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '2rem' }}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user.email}</Typography>
            <Box sx={{ mt: 1.5 }}>
              <Chip label={ROLES[user.role]} color="primary" size="small" />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">{user.designation}</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Edit Information</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Full Name" margin="normal" error={!!errors.name} helperText={errors.name?.message} {...register('name')} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Email" margin="normal" error={!!errors.email} helperText={errors.email?.message} {...register('email')} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Phone" margin="normal" {...register('phone')} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Designation" margin="normal" {...register('designation')} />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Changes</Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
