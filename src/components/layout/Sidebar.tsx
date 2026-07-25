import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Box, Divider } from '@mui/material';
import { useAppSelector } from '@/hooks/useRedux';
import { getNavItemsForRole } from '@/constants/navigation';
import { APP_NAME } from '@/constants/app';
import { getIcon } from '@/utils/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 260;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: 'permanent' | 'temporary';
}

// Role-aware sidebar. Filters navigation items by the signed-in user's role.
export default function Sidebar({ open, onClose, variant }: SidebarProps) {
  const user = useAppSelector((s) => s.auth.user);
  const location = useLocation();
  const navigate = useNavigate();
  const items = user ? getNavItemsForRole(user.role) : [];

  const content = (
    <Box sx={{ width: drawerWidth, height: '100%' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
            }}
          >
            E
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>
            {APP_NAME}
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1.5, py: 1 }}>
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (variant === 'temporary') onClose();
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor: active ? 'primary.main' : 'transparent',
                  color: active ? 'primary.contrastText' : 'text.primary',
                  '&:hover': { bgcolor: active ? 'primary.dark' : 'action.hover' },
                }}
              >
                <ListItemIcon sx={{ color: active ? 'inherit' : 'text.secondary', minWidth: 40 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontWeight: active ? 600 : 400, fontSize: '0.9rem' } } }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  if (variant === 'permanent') {
    return (
      <Drawer
        variant="permanent"
        open
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{ [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' } }}
    >
      {content}
    </Drawer>
  );
}

export { drawerWidth };
