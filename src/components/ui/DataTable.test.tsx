import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataTable from '@/components/ui/DataTable';

const mockRows = [
  { id: '1', name: 'Alice', status: 'Active', score: 90 },
  { id: '2', name: 'Bob', status: 'Inactive', score: 75 },
  { id: '3', name: 'Charlie', status: 'Active', score: 85 },
];

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'status', headerName: 'Status' },
  { field: 'score', headerName: 'Score' },
];

describe('DataTable', () => {
  it('renders rows and columns', () => {
    render(<DataTable rows={mockRows} columns={columns} title="Test Table" />);
    expect(screen.getByText('Test Table')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('renders status chips for status fields', () => {
    render(<DataTable rows={mockRows} columns={columns} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('shows empty state when no rows match search', async () => {
    render(<DataTable rows={mockRows} columns={columns} searchKeys={['name']} />);
    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'xyz_no_match');
    expect(screen.getByText('No matching records')).toBeInTheDocument();
  });

  it('filters rows based on search', async () => {
    render(<DataTable rows={mockRows} columns={columns} searchKeys={['name']} />);
    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'Alice');
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });
});
