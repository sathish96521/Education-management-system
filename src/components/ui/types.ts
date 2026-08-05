// Column definition shared by the lightweight DataTable component.
export interface GridColDef<T = Record<string, unknown>> {
  field: string;
  headerName: string;
  sortable?: boolean;
  renderCell?: (row: T) => React.ReactNode;
}

// Action definition for DataTable row actions.
export interface RowAction<T = Record<string, unknown>> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  show?: (row: T) => boolean;
}
