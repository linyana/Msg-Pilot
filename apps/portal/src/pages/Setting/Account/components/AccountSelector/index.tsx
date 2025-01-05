import {
  useEffect,
  useState,
} from 'react'
import {
  Select,
} from 'antd'
import {
  useGetAccounts,
} from '@/services'
import {
  useMessage,
} from '@/hooks'

export const AccountSelector = () => {
  const [accounts, setAccounts] = useState<any>([])

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
      label: item.name,
      value: item.id,
    })) || [])
  }, [getData?.data])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  return (
    <Select
      placeholder="Select an account"
      loading={loading}
      options={accounts}
    />
  )
}
