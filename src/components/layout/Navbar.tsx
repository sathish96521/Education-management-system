import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Chip, useMediaQuery, useTheme, Badge, Tooltip } from '@mui/material';
import { Menu as MenuIcon, DarkMode, LightMode, Notifications as NotificationsIcon, Logout, Person, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toggleTheme } from '@/store/themeSlice';
import { logout } from '@/store/authSlice';
import { ROLES } from '@/constants/app';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
}

// Top app bar with theme toggle, notifications, and user menu.
export default function Navbar({ onMenuClick }: NavbarProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const mode = useAppSelector((s) => s.theme.mode);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - 260px)` },
        ml: { md: '260px' },
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {!isDesktop && (
          <IconButton edge="start" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
          {mode === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
        <Tooltip title="Notifications">
          <IconButton color="inherit" onClick={() => navigate('/notifications')}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '0.95rem' }}>
              {user?.name?.charAt(0) ?? 'U'}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} keepMounted>
            <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{user?.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip label={user ? ROLES[user.role] : ''} size="small" color="primary" />
              </Box>
            </Box>
            <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile'); }}>
              <Person fontSize="small" sx={{ mr: 1.5 }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings'); }}>
              <Settings fontSize="small" sx={{ mr: 1.5 }} /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ mr: 1.5 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
