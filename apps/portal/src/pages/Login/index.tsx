import {
  Button,
  Card,
  Form,
  Input,
} from 'antd'
import {
  useForm,
} from 'antd/es/form/Form'
import {
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import {
  updateToken,
  updateUserEmail,
  updateUserId,
  updateUserName,
  useAppDispatch,
  useAppSelector,
} from '@/store'
import {
  CopyRight,
} from '@/components'
import {
  StyledOrWrapper,
} from './styled'
import {
  useLogin,
} from '@/services'
import {
  AppContext,
} from '@/App'

export const Login = () => {
  const [form] = useForm()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    token,
  } = useAppSelector((state) => state.global)
  const {
    messageApi,
  } = useContext(AppContext)
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  })

  const {
    data,
    fetchData,
    loading,
    error,
  } = useLogin(formData)

  const handleLogin = () => {
    fetchData?.()
  }

  useEffect(() => {
    window.localStorage.removeItem('auto-send-message-jwt-token')
    window.localStorage.removeItem('auto-send-message-jwt-userEmail')
    window.localStorage.removeItem('auto-send-message-jwt-userName')
    dispatch(updateUserName(''))
    dispatch(updateToken(''))
    dispatch(updateUserEmail(''))
  }, [])

  useEffect(() => {
    const response = data?.data
    if (response) {
      dispatch(updateUserName(response?.name || ''))
      dispatch(updateToken(response?.access || ''))
      dispatch(updateUserEmail(response?.email || ''))
      dispatch(updateUserId(response?.id || ''))
    }

    if (token) {
      navigate('/dashboard')
    }
  }, [data?.data, token])

  useEffect(() => {
    if (error) {
      messageApi.error(error)
    }
  }, [error])
  return (
    <>
      <Card
        title="Login"
        bordered={false}
        style={{
          width: 500,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Form
          form={form}
          onValuesChange={(_, values) => setFormData(values)}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{
              required: true,
              message: 'please enter the correct email.',
              pattern: /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            }]}
          >
            <Input
              onPressEnter={handleLogin}
              placeholder="please type your email"
              maxLength={60}
              showCount
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{
              required: true,
              message: 'your password must be a 6~16 characters.',
              max: 16,
              min: 6,
            }]}
            style={{
              marginBottom: '0',
            }}
          >
            <Input.Password
              type="password"
              placeholder="please type your password"
              onPressEnter={handleLogin}
              maxLength={16}
            />
          </Form.Item>
          <Button
            type="link"
            style={{
              padding: '0',
              marginTop: '4px',
            }}
            onClick={() => navigate('/')}
          >
            Forgot Password?
          </Button>
          <Button
            block
            type="primary"
            style={{
              marginTop: 12,
            }}
            onClick={handleLogin}
            loading={loading}
          >
            Login
          </Button>
        </Form>
        <div style={{
          marginTop: '32px',
          marginBottom: '8px',
          position: 'relative',
          height: '1px',
          backgroundColor: 'rgb(232, 232, 232)',
        }}
        >
          <StyledOrWrapper>or</StyledOrWrapper>
        </div>
        <Button
          block
          type="link"
          style={{
            padding: '0',
            marginTop: '4px',
          }}
          onClick={() => navigate('/')}
        >
          Register
        </Button>
      </Card>
      <CopyRight needFixed />
    </>
  )
}
