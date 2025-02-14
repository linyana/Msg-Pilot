import React, {
  createContext,
  useContext,
  useMemo,
} from 'react'
import {
  message,
} from 'antd'

type MESSAGE_TYPE = 'success' | 'error' | 'info' | 'warning' | 'loading';
type IMessageType = {
  content: React.ReactNode
  key?: string
} | string

interface MessageApiContextType {
  success: (params: IMessageType) => void;
  error: (params: IMessageType) => void;
  info: (params: IMessageType) => void;
  warning: (params: IMessageType) => void;
  loading: (params: IMessageType) => void;
}

const MessageApiContext = createContext<MessageApiContextType | null>(null)

export const MessageApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const showMessage = (type: MESSAGE_TYPE, params: IMessageType) => {
    messageApi.open(typeof params === 'string' ? {
      content: params,
    } : {
      type,
      duration: type === 'loading' ? 0 : 3,
      ...params,
    })
  }

  const api = useMemo(
    () => ({
      success: (params: IMessageType) => showMessage('success', params),
      error: (params: IMessageType) => showMessage('error', params),
      info: (params: IMessageType) => showMessage('info', params),
      warning: (params: IMessageType) => showMessage('warning', params),
      loading: (params: IMessageType) => showMessage('loading', params),
    }),
    [messageApi],
  )

  return (
    <MessageApiContext.Provider value={api}>
      {contextHolder}
      {children}
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
