import { Box, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '@/constants/app';

interface ErrorPageProps {
  code: string;
  title: string;
  message: string;
}

// Shared error page layout for 403, 404, and 500.
export default function ErrorPage({ code, title, message }: ErrorPageProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bgcolor: 'background.default',
        p: 3,
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
          G
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>{APP_NAME}</Typography>
      </Box>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '5rem', sm: '8rem' },
          fontWeight: 800,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {code}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>{title}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 420 }}>
        {message}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        <Button variant="outlined" onClick={() => navigate('/login')}>Sign In</Button>
      </Box>
    </Box>
  );
}
