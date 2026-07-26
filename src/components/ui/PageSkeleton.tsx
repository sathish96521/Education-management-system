import { Skeleton, Card, Box } from '@mui/material';

// Loading skeleton block used while data is being fetched.
export default function PageSkeleton() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Skeleton variant="text" width={200} height={40} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
        {[0, 1, 2, 3].map((i) => (
          <Card key={i} sx={{ p: 2 }}>
            <Skeleton variant="rectangular" height={120} />
          </Card>
        ))}
      </Box>
      <Skeleton variant="rectangular" height={400} />
    </Box>
  );
}
