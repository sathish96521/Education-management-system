import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

// Split-screen layout for authentication pages.
export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
      }}
    >
      {/* Brand panel */}
      <Box
        sx={{
          flex: 1.2,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          px: 8,
          background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 50%, #00897b 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.08)' }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 240, height: 240, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.06)' }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.5rem' }}>
              G
            </Box>
            <Box sx={{ fontSize: '1.75rem', fontWeight: 800 }}>GoSchool</Box>
          </Box>
          <Box sx={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.3, mb: 2 }}>
            The complete Education Management System
          </Box>
          <Box sx={{ fontSize: '1rem', opacity: 0.85, maxWidth: 420, lineHeight: 1.6 }}>
            Manage students, teachers, attendance, exams, fees, and more — all from one
            powerful, role-based platform designed for modern institutions.
          </Box>
        </Box>
      </Box>
      {/* Form panel */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, sm: 6 } }}>
        <Box sx={{ width: '100%', maxWidth: 420 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
