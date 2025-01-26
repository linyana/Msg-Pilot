import {
  useEffect,
  useState,
} from 'react'
import {
  Form,
  Select,
} from 'antd'
import {
  useGetAccounts,
} from '@/services'
import {
  useMessage,
} from '@/hooks'

export const AccountSelector = () => {
  const [accounts, setAccounts] = useState<{
    label: string,
    value: string | number,
  }[]>([])

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
    setAccounts(getData?.data?.map((item) => ({
      label: item.name || '',
      value: item.id || '',
    })) || [])
  }, [getData?.data])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  return (
    <Form.Item
      label="账号"
      required
      style={{
        width: '48%',
      }}
      shouldUpdate
      name="account_id"
    >
      <Select
        placeholder="选择你要使用的账号"
        loading={loading}
        options={accounts}
      />
    </Form.Item>
  )
}
