import React from 'react'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import {
  Tag, Tooltip,
} from 'antd'
import {
  TASK_STATUS,
  TASK_STATUS_MAPPING,
} from '@/types'

const TASK_STATUS_STYLES: Record<TASK_STATUS, { color: string; icon?: React.ReactNode }> = {
  NOT_START: {
    color: 'default',
    icon: <MinusCircleOutlined />,
  },
  WAITING: {
    color: 'default',
    icon: <ClockCircleOutlined />,
  },
  RUNNING: {
    color: 'processing',
    icon: <SyncOutlined spin />,
  },
  FAILED: {
    color: 'error',
    icon: <CloseCircleOutlined />,
  },
  COMPLETED: {
    color: 'success',
    icon: <CheckCircleOutlined />,
  },
  PARTIAL_COMPLETED: {
    color: 'warning',
    icon: <ExclamationCircleOutlined />,
  },
  SEARCHING: {
    color: 'processing',
    icon: <SyncOutlined spin />,
  },
  COMPLETED_SEARCH: {
    color: 'processing',
    icon: <CheckCircleOutlined />,
  },
  PARTIAL_COMPLETED_SEARCH: {
    color: 'warning',
    icon: <CheckCircleOutlined />,
  },
}

export const Status: React.FC<{ status: TASK_STATUS; failed_reason?: string }> = ({
  status,
  failed_reason,
}) => {
  const statusInfo = TASK_STATUS_STYLES[status]

  return (status === 'FAILED' || status === 'PARTIAL_COMPLETED') && failed_reason ? (
    <Tooltip title={failed_reason}>
      <Tag
        icon={statusInfo.icon}
        color={statusInfo.color}
      >
        {TASK_STATUS_MAPPING[status]}
      </Tag>
    </Tooltip>
  ) : (
    <Tag
      icon={statusInfo.icon}
      color={statusInfo.color}
    >
      {TASK_STATUS_MAPPING[status]}
    </Tag>
  )
}
