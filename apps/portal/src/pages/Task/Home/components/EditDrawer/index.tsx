import {
  Button,
  Drawer,
  Form,
  FormProps,
  Input,
} from 'antd'
import {
  useEffect,
  useState,
} from 'react'
import {
  EditOutlined,
} from '@ant-design/icons'
import {
  useEditAccounts,
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
  TextArea,
} = Input

export const EditDrawer = ({
  refreshData,
  record,
}: IPropsType) => {
  const [open, setOpen] = useState(false)
  const message = useMessage()

  const onClose = () => {
    setOpen(false)
  }

  const [form] = Form.useForm()
  const name = Form.useWatch('name', form)
  const cookie = Form.useWatch('cookie', form)

  const [formData, setFormData] = useState<IAccountType>()

  const {
    data,
    fetchData,
    loading,
    error,
  } = useEditAccounts(record?.id || '', formData)

  useEffect(() => {
    if (error) {
      message?.error(error)
    }
  }, [error])

  useEffect(() => {
    if (data?.data) {
      message?.success('Successfully create.')
      setOpen(false)
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
      <Drawer
        title="Edit Account"
        onClose={onClose}
        open={open}
      >
        <Form
          layout="vertical"
          form={form}
          autoComplete="off"
          onFinish={onFinish}
          initialValues={record}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{
              required: true,
              message: 'please type your name.',
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
            label="Description"
            name="description"
          >
            <TextArea />
          </Form.Item>
        </Form>
        <Flex justifyContent="flex-end">
          <Button
            type="primary"
            disabled={
              record?.name === name && record?.cookie === cookie
            }
            onClick={onSubmit}
            loading={loading}
          >
            OK
          </Button>
        </Flex>
      </Drawer>
      <Button
        type="text"
        onClick={() => {
          setOpen(true)
        }}
        icon={<EditOutlined />}
      />
    </>
  )
}
