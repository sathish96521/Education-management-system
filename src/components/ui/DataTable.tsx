import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  Paper,
  Stack,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import type { GridColDef, RowAction } from '@/components/ui/types';
import EmptyState from './EmptyState';

interface DataTableProps<T extends Record<string, unknown>> {
  rows: T[];
  columns: GridColDef<T>[];
  searchKeys?: string[];
  title?: string;
  initialRowsPerPage?: number;
  actions?: RowAction<T>[];
}

// Lightweight, dependency-free data table with search, sort, pagination, and row actions.
// Renders status-like string values as colored chips automatically.
export default function DataTable<T extends Record<string, unknown>>({
  rows,
  columns,
  searchKeys = [],
  title,
  initialRowsPerPage = 5,
  actions,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const filtered = useMemo(() => {
    if (!search) return rows;
    const q = search.toLowerCase();
    return rows.filter((row) =>
      (searchKeys.length ? searchKeys : columns.map((c) => c.field)).some((k) =>
        String(row[k] ?? '').toLowerCase().includes(q)
      )
    );
  }, [rows, search, searchKeys, columns]);

  const sorted = useMemo(() => {
    if (!orderBy) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[orderBy];
      const bv = b[orderBy];
      if (typeof av === 'number' && typeof bv === 'number') {
        return order === 'asc' ? av - bv : bv - av;
      }
      return order === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [filtered, orderBy, order]);

  const paged = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}
        >
          <Typography variant="h6">{title}</Typography>
          <TextField
            size="small"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            sx={{ minWidth: 240 }}
          />
        </Stack>
      </Box>
      <TableContainer sx={{ maxHeight: 480 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  sortDirection={orderBy === col.field ? order : false}
                  sx={{ fontWeight: 600 }}
                >
                  {col.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === col.field}
                      direction={orderBy === col.field ? order : 'asc'}
                      onClick={() => handleSort(col.field)}
                    >
                      {col.headerName}
                    </TableSortLabel>
                  ) : (
                    col.headerName
                  )}
                </TableCell>
              ))}
              {actions && actions.length > 0 && (
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions?.length ? 1 : 0)} sx={{ border: 'none' }}>
                  <EmptyState title="No matching records" message="Try adjusting your search or filters." />
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row, idx) => (
                <TableRow hover key={String(row.id ?? idx)}>
                  {columns.map((col) => {
                    const value = row[col.field];
                    const isStatus = col.field === 'status' && typeof value === 'string';
                    return (
                      <TableCell key={col.field}>
                        {col.renderCell
                          ? col.renderCell(row)
                          : isStatus
                          ? <StatusChip value={value as string} />
                          : (value as React.ReactNode)}
                      </TableCell>
                    );
                  })}
                  {actions && actions.length > 0 && (
                    <TableCell>
                      <Stack direction="row" spacing={0.5}>
                        {actions
                          .filter((a) => !a.show || a.show(row))
                          .map((action) => (
                            <Tooltip key={action.label} title={action.label}>
                              <IconButton
                                size="small"
                                color={action.color ?? 'default'}
                                onClick={() => action.onClick(row)}
                              >
                                {action.icon}
                              </IconButton>
                            </Tooltip>
                          ))}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
}

function StatusChip({ value }: { value: string }) {
  const colorMap: Record<string, 'success' | 'error' | 'warning' | 'default' | 'info'> = {
    Active: 'success',
    Paid: 'success',
    Graded: 'success',
    Completed: 'success',
    Present: 'success',
    Inactive: 'default',
    Absent: 'error',
    Overdue: 'error',
    Partial: 'warning',
    Pending: 'warning',
    Scheduled: 'info',
    Submitted: 'info',
    Ongoing: 'warning',
    Late: 'warning',
  };
  return <Chip label={value} size="small" color={colorMap[value] ?? 'default'} />;
}
