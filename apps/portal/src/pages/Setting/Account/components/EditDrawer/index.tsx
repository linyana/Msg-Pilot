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
      message?.success('修改成功')
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
        title="修改账号"
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
            label="账号名"
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
            确认修改
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
