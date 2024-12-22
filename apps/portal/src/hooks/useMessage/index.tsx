import React, {
  createContext, useContext, useState, useMemo,
} from 'react'
import {
  Snackbar, Alert,
} from '@mui/material'

type MessageType = 'success' | 'error' | 'info' | 'warning';

interface MessageApiContextType {
  showMessage: (type: MessageType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const MessageApiContext = createContext<MessageApiContextType | null>(null)

export const MessageApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: MessageType }>({
    open: false,
    message: '',
    severity: 'info',
  })

  const showMessage = (type: MessageType, message: string) => {
    setSnackbar({
      open: true, message, severity: type,
    })
  }

  const handleClose = () => setSnackbar({
    ...snackbar, open: false,
  })

  const api = useMemo(
    () => ({
      showMessage,
      success: (message: string) => showMessage('success', message),
      error: (message: string) => showMessage('error', message),
      info: (message: string) => showMessage('info', message),
      warning: (message: string) => showMessage('warning', message),
    }),
    [],
  )

  return (
    <MessageApiContext.Provider value={api}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MessageApiContext.Provider>
  )
}

export const useMessage = () => {
  const context = useContext(MessageApiContext)
  if (!context) {
    throw new Error('useMessage must be used within a MessageApiProvider')
  }
  return context
}
