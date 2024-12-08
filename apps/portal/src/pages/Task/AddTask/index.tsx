import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
} from 'antd'
import {
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  useForm,
} from 'antd/es/form/Form'
import {
  useAddTask,
} from '@/services'
import {
  AppContext,
} from '@/App'
import {
  Flex,
} from '@/components'

export const AddTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [payload, setPayload] = useState<any>({
    content: '',
    filter: '',
  })

  const {
    messageApi,
  } = useContext(AppContext)
  const [form] = useForm()

  const {
    data,
    fetchData,
    loading,
    error,
  } = useAddTask(payload)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    fetchData?.()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (data?.data) {
      messageApi.success('Successfully added, we will send you an email later, please check it.')
      setIsModalOpen(false)
    }
  }, [data?.data])

  useEffect(() => {
    if (error) {
      messageApi.error(error)
    }
  }, [error])

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
      >
        Add a new task
      </Button>
      <Modal
        centered
        title="Add task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onValuesChange={(_, values) => setPayload(values)}
          layout="vertical"
        >
          <Form.Item
            label="Filter"
            name="filter"
            rules={[{
              required: true,
            }]}
            style={{
              marginBottom: '8px',
            }}
          >
            <Input
              placeholder="Enter your filter"
              style={{
                width: 240,
              }}
              value={payload.filter}
              defaultValue={payload.filter || ''}
            />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{
              required: true,
            }]}
            style={{
              marginBottom: '8px',
            }}
          >
            <Input
              placeholder="Enter your content"
              style={{
                width: 240,
              }}
              value={payload.content}
              defaultValue={payload.content || ''}
            />
          </Form.Item>
          <Flex
            justifyContent="flex-end"
            gap="16px"
          >
            <Button
              type="primary"
              ghost
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleOk}
              loading={loading}
              disabled={!payload?.filter || !payload.content}
            >
              Add
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}
