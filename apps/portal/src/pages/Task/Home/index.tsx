import React, {
  useState,
  useEffect,
} from 'react'
import {
  Card,
  Typography,
  Table,
  TableProps,
  Tooltip,
  Button,
} from 'antd'
import {
  ExclamationCircleFilled,
} from '@ant-design/icons'
import {
  useNavigate,
} from 'react-router-dom'
import {
  useGetTasks,
} from '@/services'
import {
  Flex,
} from '@/components'
import {
  DeleteModal,
  EditDrawer,
} from './components'
import {
  IAccountType,
} from '@/types'
import {
  useMessage,
} from '@/hooks'

const {
  Text,
  Title,
} = Typography

export const Task = React.memo(() => {
  const [data, setData] = useState<any>([])
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

  const columns: TableProps<IAccountType>['columns'] = [
    {
      title: '任务名',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Flex gap="8px">
          {record?.name || record?.name || ''}
          {
            record?.is_expired && (
              <Tooltip
                placement="right"
                title={(
                  <>
                    The cookie may have expired, please check it.
                  </>
                )}
              >
                <div style={{
                  color: '#ECB424',
                }}
                >
                  <ExclamationCircleFilled />
                </div>
              </Tooltip>
            )
          }
        </Flex>
      ),
    },
    {
      title: 'Cookie',
      dataIndex: 'cookie',
      key: 'cookie',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Flex>
          <EditDrawer
            refreshData={refreshData}
            record={record}
          />
          <DeleteModal
            refreshData={refreshData}
            record={record}
          />
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
