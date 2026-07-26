import { Box, TextField, Button, Typography, Link, InputAdornment, Alert } from '@mui/material';
import { Mail } from '@mui/icons-material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '@/hooks/useToast';
import { Link as RouterLink } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

interface ForgotForm { email: string; }

export default function ForgotPassword() {
  const toast = useToast();
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ForgotForm) => {
    setSent(true);
    toast.success('Reset link sent to ' + data.email);
  };

  if (sent) {
    return (
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>Check Your Email</Typography>
        <Alert severity="success" sx={{ mb: 3 }}>
          We've sent a password reset link to your email address.
        </Alert>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          The link will expire in 30 minutes. If you don't see the email, check your spam folder.
        </Typography>
        <Button component={RouterLink} to="/reset-password" variant="contained" fullWidth size="large">
          Open Reset Page (Demo)
        </Button>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link component={RouterLink} to="/login" variant="body2">Back to sign in</Link>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>Forgot Password</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your email address and we'll send you a link to reset your password.
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          autoFocus
          error={!!errors.email}
          helperText={errors.email?.message}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Mail fontSize="small" /></InputAdornment>,
            },
          }}
          {...register('email')}
        />
        <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 2 }}>Send Reset Link</Button>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link component={RouterLink} to="/login" variant="body2">Back to sign in</Link>
      </Box>
    </Box>
  );
}
