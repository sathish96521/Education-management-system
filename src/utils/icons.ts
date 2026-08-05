import { useLocation } from 'react-router-dom';
import * as MuiIcons from '@mui/icons-material';

// Resolves a lucide-style icon name to the matching MUI icon component.
// Falls back to a generic icon if the name is not found.
export function getIcon(name: string): React.ElementType {
  const Icon = (MuiIcons as unknown as Record<string, React.ElementType>)[name];
  return Icon ?? MuiIcons.Dashboard;
}

// Derives breadcrumb segments from the current route path.
export function useBreadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  return segments.map((seg, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');
    const label = seg.charAt(0).toUpperCase() + seg.slice(1);
    return { label, path };
  });
}
