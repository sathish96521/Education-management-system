import { Box, Card, Typography, List, ListItem, ListItemIcon, ListItemText, Stack, Chip, IconButton, Divider } from '@mui/material';
import { Notifications as NotificationsIcon, Info, CheckCircle, Warning, Error, Delete } from '@mui/icons-material';
import PageHeader from '@/components/ui/PageHeader';
import { mockNotifications } from '@/data/mockData';
import { useToast } from '@/hooks/useToast';

const iconMap = {
  info: <Info color="info" />,
  success: <CheckCircle color="success" />,
  warning: <Warning color="warning" />,
  error: <Error color="error" />,
};

export default function Notifications() {
  const toast = useToast();
  return (
    <Box>
      <PageHeader
        title="Notifications"
        subtitle="Stay updated with the latest alerts and messages."
        breadcrumbs={[{ label: 'Notifications' }]}
      />
      <Card sx={{ p: { xs: 1, md: 2 } }}>
        <List>
          {mockNotifications.map((n, i) => (
            <Box key={n.id}>
              <ListItem
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  bgcolor: n.read ? 'transparent' : 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' },
                }}
                secondaryAction={
                  <IconButton edge="end" onClick={() => toast.info('Notification deleted.')}>
                    <Delete fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemIcon>{iconMap[n.type]}</ListItemIcon>
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: n.read ? 400 : 600 }}>{n.title}</Typography>
                      {!n.read && <Chip label="New" size="small" color="primary" sx={{ height: 18 }} />}
                    </Stack>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">{n.message}</Typography>
                      <Typography variant="caption" color="text.disabled">{n.date}</Typography>
                    </Box>
                  }
                />
              </ListItem>
              {i < mockNotifications.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Card>
    </Box>
  );
}
