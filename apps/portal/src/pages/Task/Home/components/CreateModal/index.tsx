import {
  Button,
  Modal,
  Form,
  Input,
  FormProps,
} from 'antd'
import {
  useEffect,
  useState,
} from 'react'
import {
  useCreateAccounts,
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
}

const {
  TextArea,
} = Input

export const CreateModal = (
  {
    refreshData,
  }: IPropsType,
) => {
  const message = useMessage()

  const [form] = Form.useForm()

  const [formData, setFormData] = useState<IAccountType>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {
    data,
    fetchData,
    loading,
    error,
  } = useCreateAccounts(formData)

  useEffect(() => {
    if (error) {
      message?.error(error)
    }
  }, [error])

  useEffect(() => {
    if (data?.data) {
      message?.success('创建成功')
      setIsOpen(false)
      refreshData()
    }
  }, [data?.data])

  const onSubmit = () => {
    form.submit()
  }

  const onFinish: FormProps<IAccountType>['onFinish'] = (values) => {
    setFormData(values)
  }

  useEffect(() => {
    if (formData) {
      fetchData?.()
    }
  }, [formData])

  return (
    <>
      <Modal
        open={isOpen}
        title="创建新账号"
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
              OK
            </Button>
          </Flex>
        )}
      >
        <Form
          layout="vertical"
          form={form}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{
              required: true,
              message: '请输入你的账号名',
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cookie"
            name="cookie"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="描述"
            name="desription"
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type="primary"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Create Account
      </Button>
    </>
  )
}
