import {
  Button,
  Modal,
  Typography,
} from 'antd'
import {
  useEffect,
  useState,
} from 'react'
import {
  DeleteOutlined,
} from '@ant-design/icons'
import {
  useDeleteAccounts,
} from '@/services'
import {
  Flex,
} from '@/components'
import {
  IAccountType,
} from '@/types'
import {
  useMessage,
} from '@/hooks'

type IPropsType = {
  refreshData: () => void
  record: IAccountType
}

const {
  Text,
} = Typography

export const DeleteModal = ({
  refreshData,
  record,
}: IPropsType) => {
  const message = useMessage()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {
    data,
    fetchData,
    loading,
    error,
  } = useDeleteAccounts(record?.id || '')

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  useEffect(() => {
    if (data?.data) {
      message.success('删除成功')
      setIsOpen(false)
      refreshData()
    }
  }, [data?.data])

  const onSubmit = () => {
    fetchData?.()
  }

  return (
    <>
      <Modal
        open={isOpen}
        title="删除任务"
        onCancel={() => {
          setIsOpen(false)
        }}
        centered
        footer={(
          <Flex
            justifyContent="flex-end"
            gap="8px"
          >
            <Button onClick={() => {
              setIsOpen(false)
            }}
            >
              取消
            </Button>
            <Button
              type="primary"
              loading={loading}
              onClick={onSubmit}
            >
              确认
            </Button>
          </Flex>
        )}
      >
        <Text>确定删除这个任务吗?</Text>
      </Modal>
      <Button
        danger
        type="text"
        onClick={() => {
          setIsOpen(true)
        }}
        icon={<DeleteOutlined />}
      />
    </>
  )
}
