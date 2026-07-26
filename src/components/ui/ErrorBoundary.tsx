import { Component, type ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutlined } from '@mui/icons-material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, gap: 2 }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: 'error.main', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.15 }}>
            <ErrorOutlined sx={{ fontSize: 40, color: 'error.main' }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Something went wrong</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 400, textAlign: 'center' }}>
            An unexpected error occurred in this section. Please try again.
          </Typography>
          <Button variant="contained" onClick={() => this.setState({ hasError: false })}>
            Try Again
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}
