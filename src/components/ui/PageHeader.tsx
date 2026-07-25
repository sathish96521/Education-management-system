import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: { label: string; path?: string }[];
  action?: React.ReactNode;
}

// Standard page header with title and breadcrumb navigation.
export default function PageHeader({ title, subtitle, breadcrumbs, action }: PageHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        sx={{ mb: 1 }}
        aria-label="breadcrumb"
      >
        <Link component={RouterLink} to="/dashboard" color="inherit" underline="hover" variant="body2">
          Home
        </Link>
        {breadcrumbs.map((bc, i) =>
          bc.path && i < breadcrumbs.length - 1 ? (
            <Link key={bc.label} component={RouterLink} to={bc.path} color="inherit" underline="hover" variant="body2">
              {bc.label}
            </Link>
          ) : (
            <Typography key={bc.label} color="text.primary" variant="body2" sx={{ fontWeight: 600 }}>
              {bc.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {action}
      </Box>
    </Box>
  );
}
