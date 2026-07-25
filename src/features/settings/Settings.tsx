import { Box, Card, Typography, Switch, FormControlLabel, Divider, TextField, Button, Stack } from '@mui/material';
import PageHeader from '@/components/ui/PageHeader';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toggleTheme, setTheme } from '@/store/themeSlice';
import { useToast } from '@/hooks/useToast';

export default function Settings() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  const toast = useToast();

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
          <Box component="form" onSubmit={(e) => { e.preventDefault(); toast.success('Password updated.'); }}>
            <TextField fullWidth label="Current Password" type="password" margin="normal" size="small" />
            <TextField fullWidth label="New Password" type="password" margin="normal" size="small" />
            <TextField fullWidth label="Confirm Password" type="password" margin="normal" size="small" />
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
