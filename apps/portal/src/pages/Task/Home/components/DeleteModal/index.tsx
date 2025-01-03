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
      message.success('Successfully create.')
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
        title="Delete account"
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
              Cancel
            </Button>
            <Button
              type="primary"
              loading={loading}
              onClick={onSubmit}
            >
              Yes
            </Button>
          </Flex>
        )}
      >
        <Text>Are you sure to delete this account?</Text>
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
