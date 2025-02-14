import React, {
  createContext,
  useContext,
  useMemo,
} from 'react'
import {
  message,
} from 'antd'

type MessageType = 'success' | 'error' | 'info' | 'warning';

interface MessageApiContextType {
  showMessage: (type: MessageType, content: React.ReactNode) => void;
  success: (content: React.ReactNode) => void;
  error: (content: React.ReactNode) => void;
  info: (content: React.ReactNode) => void;
  warning: (content: React.ReactNode) => void;
}

const MessageApiContext = createContext<MessageApiContextType | null>(null)

export const MessageApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const showMessage = (type: MessageType, content: React.ReactNode) => {
    switch (type) {
      case 'success':
        message.success(content)
        break
      case 'error':
        message.error(content)
        break
      case 'info':
        message.info(content)
        break
      case 'warning':
        message.warning(content)
        break
      default:
        break
    }
  }

  const api = useMemo(
    () => ({
      showMessage,
      success: (content: React.ReactNode) => showMessage('success', content),
      error: (content: React.ReactNode) => showMessage('error', content),
      info: (content: React.ReactNode) => showMessage('info', content),
      warning: (content: React.ReactNode) => showMessage('warning', content),
    }),
    [],
  )

  return <MessageApiContext.Provider value={api}>{children}</MessageApiContext.Provider>
}

export const useMessage = () => {
  const context = useContext(MessageApiContext)
  if (!context) {
    throw new Error('useMessage must be used within a MessageApiProvider')
  }
  return context
}
