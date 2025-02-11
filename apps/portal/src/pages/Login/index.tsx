import {
  useEffect,
  useState,
} from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import {
  Button,
  Card,
  Form,
  FormProps,
  Input,
  Typography,
} from 'antd'
import {
  updateToken,
  useAppDispatch,
  useAppSelector,
} from '@/store'
import {
  Center,
  Flex,
} from '@/components'
import {
  useLogin,
} from '@/services'
import logo from '@/assets/logo.svg'
import {
  ILoginType,
} from './types'
import {
  useMessage,
} from '@/hooks/useMessage'

const {
  Title,
} = Typography

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    token,
  } = useAppSelector((state) => state.global)
  const [form] = Form.useForm()
  const message = useMessage()

  const [formData, setFormData] = useState<ILoginType>()

  const {
    data,
    fetchData,
    loading,
    error,
  } = useLogin(formData)

  useEffect(() => {
    if (formData) {
      fetchData?.()
    }
  }, [formData])

  useEffect(() => {
    const response = data?.data
    if (response) {
      dispatch(updateToken(response?.access || ''))
    }

    if (token && response) {
      navigate('/connections')
    }
  }, [data?.data, token])

  const onSubmit = () => {
    form.submit()
  }

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  const onFinish: FormProps<ILoginType>['onFinish'] = (values) => {
    setFormData(values)
  }

  return (
    <Center>
      <Card
        style={{
          width: '460px',
        }}
      >
        <Flex
          style={{
            marginBottom: 16,
          }}
          justifyContent="center"
          gap="8px"
          alignItems="center"
        >
          <img
            src={logo}
            style={{
              width: 32,
              height: 32,
            }}
            alt=""
          />
          <Title
            level={3}
            style={{
              textAlign: 'center',
              marginBottom: 4,
              color: 'var(--main-bg-color)',
            }}
          >
            Msg Pilot
          </Title>
        </Flex>
        <Typography
          style={{
            color: '#8c8c8c',
            textAlign: 'center',
          }}
        >
          欢迎回来，请登录
        </Typography>
        <Form
          layout="vertical"
          form={form}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{
              required: true,
              message: '请输入正确的邮箱',
              pattern: /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            }]}
          >
            <Input
              onPressEnter={onSubmit}
              placeholder="输入你的邮箱"
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{
              required: true,
              message: '密码需要在6到16位',
              max: 16,
              min: 6,
            }]}
          >
            <Input
              type="password"
              onPressEnter={onSubmit}
              placeholder="输入你的密码"
            />
          </Form.Item>
          <Button
            block
            type="primary"
            style={{
              marginTop: 12,
            }}
            onClick={onSubmit}
            loading={loading}
          >
            登录
          </Button>
        </Form>
      </Card>
    </Center>
  )
}
