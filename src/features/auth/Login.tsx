import { Box, TextField, Button, Typography, Link, InputAdornment, IconButton, Alert, Divider, Chip } from '@mui/material';
import { Visibility, VisibilityOff, Lock } from '@mui/icons-material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { loginAsync } from '@/store/authSlice';
import { useToast } from '@/hooks/useToast';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { DEMO_CREDENTIALS } from '@/data/mockData';

interface LoginForm {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { status, error } = useAppSelector((s) => s.auth);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    const result = await dispatch(loginAsync({ email: data.email, password: data.password }));
    if (loginAsync.fulfilled.match(result)) {
      toast.success('Welcome back! Login successful.');
      navigate('/dashboard');
    }
  };

  const quickLogin = async (email: string) => {
    const result = await dispatch(loginAsync({ email, password: 'password' }));
    if (loginAsync.fulfilled.match(result)) {
      toast.success('Logged in as demo user.');
      navigate('/dashboard');
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>Welcome Back</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Sign in to access your EduSphere dashboard.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          autoComplete="email"
          autoFocus
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Lock fontSize="small" /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          {...register('password')}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 2 }}>
          <Link component={RouterLink} to="/forgot-password" variant="body2">Forgot password?</Link>
        </Box>
        <Button type="submit" fullWidth variant="contained" size="large" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in...' : 'Sign In'}
        </Button>
      </Box>

      <Divider sx={{ my: 3 }}>
        <Typography variant="caption" color="text.secondary">Quick demo login</Typography>
      </Divider>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
        {DEMO_CREDENTIALS.slice(0, 4).map((c) => (
          <Chip key={c.email} label={c.role.replace('_', ' ')} size="small" clickable onClick={() => quickLogin(c.email)} />
        ))}
        <Chip label="student" size="small" clickable onClick={() => quickLogin('aarav@edu.com')} />
        <Chip label="parent" size="small" clickable onClick={() => quickLogin('rajesh@parent.com')} />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1.5 }}>
        Password for all demo accounts: <strong>password</strong>
      </Typography>
    </Box>
  );
}
