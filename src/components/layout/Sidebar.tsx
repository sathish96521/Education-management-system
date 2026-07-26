import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Box, Divider, Tooltip } from '@mui/material';
import { useAppSelector } from '@/hooks/useRedux';
import { getNavItemsForRole } from '@/constants/navigation';
import { APP_NAME } from '@/constants/app';
import { getIcon } from '@/utils/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidthExpanded = 260;
const drawerWidthCollapsed = 68;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: 'permanent' | 'temporary';
  collapsed?: boolean;
}

// Role-aware sidebar with expand/collapse support.
export default function Sidebar({ open, onClose, variant, collapsed = false }: SidebarProps) {
  const user = useAppSelector((s) => s.auth.user);
  const location = useLocation();
  const navigate = useNavigate();
  const items = user ? getNavItemsForRole(user.role) : [];

  const currentWidth = collapsed ? drawerWidthCollapsed : drawerWidthExpanded;

  const content = (
    <Box sx={{ width: currentWidth, height: '100%', transition: 'width 0.25s ease', overflow: 'hidden' }}>
      <Toolbar sx={{ justifyContent: collapsed ? 'center' : 'flex-start', px: collapsed ? 0 : 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', justifyContent: collapsed ? 'center' : 'flex-start' }}>
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
              flexShrink: 0,
            }}
          >
            E
          </Box>
          {!collapsed && (
            <Typography variant="h6" sx={{ fontWeight: 700 }} noWrap>
              {APP_NAME}
            </Typography>
          )}
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: collapsed ? 0.5 : 1.5, py: 1 }}>
        {items.map((item) => {
          const Icon = getIcon(item.icon);
          const active = location.pathname === item.path;
          const button = (
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
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  px: collapsed ? 1.5 : 2,
                  minHeight: 44,
                }}
              >
                <ListItemIcon sx={{ color: active ? 'inherit' : 'text.secondary', minWidth: collapsed ? 0 : 40, justifyContent: 'center' }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    slotProps={{ primary: { sx: { fontWeight: active ? 600 : 400, fontSize: '0.9rem' } } }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );

          // Show tooltip with label when collapsed
          if (collapsed) {
            return (
              <Tooltip key={item.path} title={item.label} placement="right" arrow>
                {button}
              </Tooltip>
            );
          }
          return button;
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
          width: currentWidth,
          flexShrink: 0,
          transition: 'width 0.25s ease',
          [`& .MuiDrawer-paper`]: {
            width: currentWidth,
            boxSizing: 'border-box',
            transition: 'width 0.25s ease',
            overflowX: 'hidden',
          },
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
      sx={{ [`& .MuiDrawer-paper`]: { width: drawerWidthExpanded, boxSizing: 'border-box' } }}
    >
      {content}
    </Drawer>
  );
}

export { drawerWidthExpanded, drawerWidthCollapsed };
