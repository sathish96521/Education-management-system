import { Box, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '@/hooks/useToast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const schema = yup.object({
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
});

interface ResetForm { password: string; confirmPassword: string; }

export default function ResetPassword() {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ResetForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    toast.success('Password reset successfully. Please sign in.');
    navigate('/login');
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>Reset Password</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your new password below.
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="New Password"
          type={show ? 'text' : 'password'}
          margin="normal"
          autoFocus
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Lock fontSize="small" /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShow(!show)} edge="end">
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          {...register('password')}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type={show ? 'text' : 'password'}
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Lock fontSize="small" /></InputAdornment>,
            },
          }}
          {...register('confirmPassword')}
        />
        <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 2 }}>Reset Password</Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link component={RouterLink} to="/login" variant="body2">Back to sign in</Link>
      </Box>
    </Box>
  );
}
