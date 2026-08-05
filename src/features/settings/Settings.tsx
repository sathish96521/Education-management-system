import { Box, Card, Typography, Switch, FormControlLabel, Divider, TextField, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageHeader from '@/components/ui/PageHeader';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toggleTheme, setTheme } from '@/store/themeSlice';
import { useToast } from '@/hooks/useToast';

const passwordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string().min(6, 'Must be at least 6 characters').required('New password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match').required('Please confirm your password'),
});

type PasswordForm = yup.InferType<typeof passwordSchema>;

export default function Settings() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  const toast = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordForm>({
    resolver: yupResolver(passwordSchema),
  });

  const onPasswordSubmit = (_data: PasswordForm) => {
    toast.success('Password updated successfully.');
    reset();
  };

  return (
    <Box>
      <PageHeader title="Settings" subtitle="Manage your application preferences." breadcrumbs={[{ label: 'Settings' }]} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Appearance</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Customize how the app looks.</Typography>
          <FormControlLabel
            control={<Switch checked={mode === 'dark'} onChange={() => dispatch(toggleTheme())} />}
            label="Dark Mode"
          />
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={1}>
            <Button variant={mode === 'light' ? 'contained' : 'outlined'} onClick={() => dispatch(setTheme('light'))}>Light</Button>
            <Button variant={mode === 'dark' ? 'contained' : 'outlined'} onClick={() => dispatch(setTheme('dark'))}>Dark</Button>
          </Stack>
        </Card>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Notifications</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Choose what you want to be notified about.</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
          <FormControlLabel control={<Switch defaultChecked />} label="Push notifications" />
          <FormControlLabel control={<Switch />} label="SMS alerts" />
        </Card>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Change Password</Typography>
          <Box component="form" onSubmit={handleSubmit(onPasswordSubmit)} noValidate>
            <TextField fullWidth label="Current Password" type="password" margin="normal" size="small" error={!!errors.currentPassword} helperText={errors.currentPassword?.message} {...register('currentPassword')} />
            <TextField fullWidth label="New Password" type="password" margin="normal" size="small" error={!!errors.newPassword} helperText={errors.newPassword?.message} {...register('newPassword')} />
            <TextField fullWidth label="Confirm Password" type="password" margin="normal" size="small" error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} {...register('confirmPassword')} />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Update Password</Button>
          </Box>
        </Card>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Privacy</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Control your data and privacy.</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Show profile to others" />
          <FormControlLabel control={<Switch defaultChecked />} label="Allow data collection for analytics" />
          <FormControlLabel control={<Switch />} label="Share activity with third parties" />
        </Card>
      </Box>
    </Box>
  );
}
