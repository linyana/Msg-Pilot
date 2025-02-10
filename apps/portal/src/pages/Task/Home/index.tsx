import React, {
  useState,
  useEffect,
} from 'react'
import {
  Card,
  Typography,
  Table,
  TableProps,
  Button,
} from 'antd'
import {
  useNavigate,
} from 'react-router-dom'
import dayjs from 'dayjs'
import {
  useGetTasks,
} from '@/services'
import {
  Flex,
  Status,
} from '@/components'
import {
  TaskAction,
} from './components'
import {
  ITaskType,
} from '@/types'
import {
  useMessage,
} from '@/hooks'

const {
  Text,
  Title,
} = Typography

export const Task = React.memo(() => {
  const [data, setData] = useState<ITaskType[]>([])
  const message = useMessage()
  const navigate = useNavigate()

  const {
    data: getData,
    fetchData,
    loading,
    error,
  } = useGetTasks()

  const refreshData = () => {
    fetchData?.()
  }

  useEffect(() => {
    refreshData()
  }, [])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  useEffect(() => {
    setData(getData?.data || [])
  }, [getData?.data])

  const columns: TableProps<ITaskType>['columns'] = [
    {
      title: '任务名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (_, record) => (
        <Flex
          gap="8px"
          justifyContent="center"
        >
          {record?.name || record?.name || ''}
        </Flex>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (_, record) => (
        <Status
          status={record?.status}
          failed_reason={record?.status}
        />
      ),
    },
    {
      title: '已发送数量',
      dataIndex: 'sent_count',
      key: 'sent_count',
      align: 'center',
    },
    {
      title: '预期发送数量',
      dataIndex: 'found_count',
      key: 'found_count',
      align: 'center',
    },
    {
      title: '最大发送数量',
      dataIndex: 'expect_count',
      key: 'expect_count',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'expect_count',
      key: 'expect_count',
      align: 'center',
      render: (_, record) => (
        <>{(record.created_at ? dayjs(record.created_at).format('YYYY-MM-DD HH:mm:ss') : '-')}</>
      ),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Flex justifyContent="center">
          <TaskAction record={record} />
        </Flex>
      ),
    },
  ]

  return (
    <>
      <Card>
        <Title level={4}>任务</Title>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap="16px"
        >
          <Text>管理你的所有任务，创建一个任务来发送消息。</Text>
          <Button
            type="primary"
            onClick={() => {
              navigate('./create-task')
            }}
          >
            创建任务
          </Button>
        </Flex>
        <Table
          style={{
            marginTop: 16,
          }}
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
      </Card>
    </>
  )
})
