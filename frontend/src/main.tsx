import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// eslint-disable-next-line react-refresh/only-export-components
const Root = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: '#2e7d32' },
      secondary: { main: '#66bb6a' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes mode={mode} toggleMode={toggleMode} />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
