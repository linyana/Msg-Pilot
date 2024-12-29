import {
  useEffect,
  useState,
} from 'react'
import {
  Card,
  Typography,
} from '@mui/material'
import {
  useGetAccounts,
} from '@/services'
import {
  useMessage,
} from '@/hooks'
import {
  IAccountType,
} from '@/types'
import {
  Loading,
  Table,
} from '@/components'

export const Account = () => {
  const [accounts, setAccounts] = useState<IAccountType[]>([])
  const [filter, setFilter] = useState<object>({})
  const [selectedKey, setSelectedKey] = useState<number[]>([])

  const message = useMessage()

  const {
    data,
    fetchData,
    loading,
    error,
  } = useGetAccounts()

  useEffect(() => {
    fetchData?.()
  }, [])

  useEffect(() => {
    if (data?.data) {
      setAccounts(data.data)
    }
  }, [data?.data])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  return (
    <Loading loading={loading}>
      <Card>
        <Typography
          variant="h6"
          marginBottom="8px"
        >
          Account
        </Typography>
        <Table
          data={accounts}
          filter={filter}
          setFilter={setFilter}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
          columns={[{
            header: 'Name',
            hash: 'name',
          }]}
        />
      </Card>
    </Loading>
  )
}
