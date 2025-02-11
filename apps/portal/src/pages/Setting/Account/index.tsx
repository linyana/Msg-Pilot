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
} from 'antd'
import {
  ExclamationCircleFilled,
} from '@ant-design/icons'
import {
  useGetAccounts,
} from '@/services'
import {
  Flex,
} from '@/components'
import {
  CreateModal,
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

export const Account = React.memo(() => {
  const [data, setData] = useState<any>([])
  const message = useMessage()

  const {
    data: getData,
    fetchData,
    loading,
    error,
  } = useGetAccounts()

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
      title: '账号名',
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
                    账号登录信息已过期, 请重新连接
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
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
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
        <Flex alignItems="center">
          <Title level={4}>账号</Title>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap="16px"
        >
          <Text>请保持您账号的登录状态，如果过期了请更新cookie信息已重新授权。</Text>
          <CreateModal refreshData={refreshData} />
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
