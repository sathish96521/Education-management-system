import { useState } from 'react';
import { Box, Toolbar, Container, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { drawerWidthExpanded, drawerWidthCollapsed } from './Sidebar';

// Main authenticated layout: responsive sidebar + navbar + content + footer.
// Uses Outlet so nested <Route> children render inside the content area.
export default function DashboardLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? drawerWidthCollapsed : drawerWidthExpanded;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isDesktop && <Sidebar open onClose={() => setMobileOpen(false)} variant="permanent" collapsed={collapsed} />}
      {!isDesktop && (
        <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} variant="temporary" />
      )}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar onMenuClick={() => isDesktop ? setCollapsed((c) => !c) : setMobileOpen(true)} sidebarWidth={sidebarWidth} />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, pt: { xs: 2, md: 3 } }}>
          <Toolbar />
          <Container maxWidth="xl" disableGutters>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </Container>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
