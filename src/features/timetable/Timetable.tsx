import { Box, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { mockTimetable } from '@/data/mockData';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const allTimes = [...new Set(mockTimetable.map((e) => e.time))].sort();
const allClasses = [...new Set(mockTimetable.map((e) => e.class))];

export default function Timetable() {
  const [selectedClass, setSelectedClass] = useState(allClasses[0] ?? '');
  const filteredEntries = mockTimetable.filter((e) => e.class === selectedClass);
  const times = allTimes.length > 0 ? allTimes : ['09:00 - 10:00', '10:00 - 11:00', '11:30 - 12:30'];

  return (
    <Box>
      <PageHeader
        title="Timetable"
        subtitle={`Weekly class schedule for ${selectedClass || 'all classes'}.`}
        breadcrumbs={[{ label: 'Timetable' }]}
      />
      <Box sx={{ mb: 2 }}>
        <TextField
          select
          size="small"
          label="Select Class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {allClasses.map((c) => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </TextField>
      </Box>
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
                    const entry = filteredEntries.find((e) => e.day === day && e.time === time);
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
