import {
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Input,
  TextField,
  Typography,
} from '@mui/material'
import {
  AuthProvider,
  AuthResponse,
  SignInPage,
} from '@toolpad/core'
import {
  Controller,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import {
  LoadingButton,
} from '@mui/lab'
import {
  updateToken,
  updateUserEmail,
  updateUserId,
  updateUserName,
  useAppDispatch,
  useAppSelector,
} from '@/store'
import {
  Center,
  CopyRight,
  Flex,
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
import logo from '@/accsets/message.svg'
import {
  ILoginType,
} from './types'
import {
  useMessage,
} from '@/hooks/useMessage'

const providers = [{
  id: 'credentials', name: 'Email and password',
}]

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    token,
  } = useAppSelector((state) => state.global)
  const {
    control, handleSubmit, formState: {
      errors,
    },
  } = useForm<ILoginType>()
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
    window.localStorage.removeItem('msg-pilot-jwt-token')
    window.localStorage.removeItem('msg-pilot-jwt-userEmail')
    window.localStorage.removeItem('msg-pilot-jwt-userName')
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
      message.error(error)
    }
  }, [error])

  const onSubmit = (data: ILoginType) => {
    setFormData(data)
  }

  return (
    <Center>
      <Card
        variant="outlined"
        sx={{
          width: 400,
          padding: '16px',
        }}
      >
        <CardContent>
          <Flex
            style={{
              marginBottom: 16,
            }}
            justifyContent="center"
          >
            <img
              src={logo}
              style={{
                width: 32,
                height: 32,
              }}
              alt=""
            />
          </Flex>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            style={{
              fontWeight: 500,
            }}
          >
            Sign in to Msg Pilot
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            align="center"
            marginBottom="16px"
            color="#8C8C8C"
          >
            Welcome, please sign in to continue
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              rules={{
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter the corrent email',
                },
              }}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="email"
                  margin="normal"
                  required
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message as string : ''}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({
                field,
              }) => (
                <TextField
                  {...field}
                  type="password"
                  fullWidth
                  label="password"
                  margin="normal"
                  required
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message as string : ''}
                />
              )}
            />
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginTop: 16,
              }}
            >
              Sign In
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </Center>
  )
}
