import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import PageHeader from '@/components/ui/PageHeader';
import { mockTimetable } from '@/data/mockData';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['09:00 - 10:00', '10:00 - 11:00', '11:30 - 12:30'];

export default function Timetable() {
  return (
    <Box>
      <PageHeader
        title="Timetable"
        subtitle="Weekly class schedule for Class 10-A."
        breadcrumbs={[{ label: 'Timetable' }]}
      />
      <Card sx={{ p: { xs: 1, md: 3 }, overflowX: 'auto' }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>Time / Day</TableCell>
                {days.map((d) => (
                  <TableCell key={d} align="center" sx={{ fontWeight: 600 }}>{d}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {times.map((time) => (
                <TableRow key={time} hover>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>{time}</TableCell>
                  {days.map((day) => {
                    const entry = mockTimetable.find((e) => e.day === day && e.time === time);
                    return (
                      <TableCell key={day} align="center" sx={{ minWidth: 140 }}>
                        {entry ? (
                          <Box>
                            <Chip label={entry.subject} size="small" color="primary" sx={{ mb: 0.5 }} />
                            <Typography variant="caption" component="div" color="text.secondary">
                              {entry.teacher}
                            </Typography>
                            <Typography variant="caption" component="div" color="text.secondary">
                              Room {entry.room}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="caption" color="text.disabled">—</Typography>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
