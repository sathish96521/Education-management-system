import { Box, Typography } from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

// Reusable empty-state placeholder shown when a list/table has no data.
export default function EmptyState({
  title = 'No data found',
  message = 'There are no records to display at this time.',
  icon,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        textAlign: 'center',
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'action.hover',
          color: 'text.secondary',
        }}
      >
        {icon ?? <InboxOutlined sx={{ fontSize: 40 }} />}
      </Box>
      <Typography variant="h6" color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
        {message}
      </Typography>
    </Box>
  );
}
