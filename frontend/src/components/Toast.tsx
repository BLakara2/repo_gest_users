import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';

interface ToastProps {
  open: boolean;
  message: string;
  severity: AlertColor; // 'success' | 'error' | 'info' | 'warning'
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ open, message, severity, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={4000} // 4 secondes
    onClose={onClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{
        backgroundColor:
          severity === 'success'
            ? Math.random() > 0.5 ? '#2196f3' : '#ffeb3b'
            : '#f44336',
        color: severity === 'success' && Math.random() > 0.5 ? '#fff' : '#000',
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default Toast;
