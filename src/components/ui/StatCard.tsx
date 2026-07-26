import { Card, Box, Typography, useTheme } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  trend?: number;
  subtitle?: string;
}

// Dashboard KPI card with icon, value, and optional trend indicator.
export default function StatCard({
  title,
  value,
  icon,
  color = '#1976d2',
  trend,
  subtitle,
}: StatCardProps) {
  const theme = useTheme();
  const isUp = (trend ?? 0) >= 0;

  return (
    <Card sx={{ p: 3, height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          bgcolor: color,
          opacity: 0.08,
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: color,
            color: '#fff',
          }}
        >
          {icon}
        </Box>
        {trend !== undefined && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: isUp ? 'success.main' : 'error.main',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {isUp ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
            {Math.abs(trend)}%
          </Box>
        )}
      </Box>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          {subtitle}
        </Typography>
      )}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${color}, ${color}55)`,
        }}
      />
    </Card>
  );
}
