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
      title: 'Name',
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
        <Flex alignItems="center">
          <Text>Add your Account</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          gap="16px"
        >
          <Text>Please keep your login status when adding the cookie. Once log out your Account, please reset your cookie again.</Text>
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
