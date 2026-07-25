// Column definition shared by the lightweight DataTable component.
export interface GridColDef {
  field: string;
  headerName: string;
  sortable?: boolean;
  renderCell?: (row: Record<string, unknown>) => React.ReactNode;
}
