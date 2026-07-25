import { Box, Typography } from '@mui/material';
import { APP_NAME } from '@/constants/app';

// App footer shown on all dashboard pages.
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: 'auto',
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} {APP_NAME}. All rights reserved. Built with React, TypeScript & MUI.
      </Typography>
    </Box>
  );
}
