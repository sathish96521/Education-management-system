import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { BRAND_COLORS } from '@/constants/app';

const baseTypography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontWeight: 700, fontSize: '2.5rem' },
  h2: { fontWeight: 700, fontSize: '2rem' },
  h3: { fontWeight: 600, fontSize: '1.75rem' },
  h4: { fontWeight: 600, fontSize: '1.5rem' },
  h5: { fontWeight: 600, fontSize: '1.25rem' },
  h6: { fontWeight: 600, fontSize: '1.125rem' },
  body1: { fontSize: '0.95rem', lineHeight: 1.5 },
  body2: { fontSize: '0.875rem', lineHeight: 1.5 },
  button: { textTransform: 'none', fontWeight: 600 },
} as const;

const sharedOverrides: ThemeOptions = {
  shape: { borderRadius: 10 },
  typography: baseTypography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, paddingInline: 16 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 12 } },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
    },
  },
};

export const lightTheme = createTheme({
  ...sharedOverrides,
  palette: {
    mode: 'light',
    primary: { main: BRAND_COLORS.primary, dark: BRAND_COLORS.primaryDark, light: BRAND_COLORS.primaryLight },
    secondary: { main: BRAND_COLORS.secondary, dark: BRAND_COLORS.secondaryDark },
    success: { main: BRAND_COLORS.success },
    warning: { main: BRAND_COLORS.warning },
    error: { main: BRAND_COLORS.error },
    background: { default: BRAND_COLORS.background, paper: BRAND_COLORS.paper },
    text: { primary: '#1a2027', secondary: '#5a6473' },
  },
});

export const darkTheme = createTheme({
  ...sharedOverrides,
  palette: {
    mode: 'dark',
    primary: { main: BRAND_COLORS.primaryLight, dark: BRAND_COLORS.primary, light: '#90caf9' },
    secondary: { main: '#4db6ac', dark: BRAND_COLORS.secondary },
    success: { main: '#66bb6a' },
    warning: { main: '#ffa726' },
    error: { main: '#ef5350' },
    background: { default: '#0f172a', paper: '#1e293b' },
    text: { primary: '#e2e8f0', secondary: '#94a3b8' },
  },
});
