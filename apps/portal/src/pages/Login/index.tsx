import {
  useEffect,
  useState,
} from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import {
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material'
import {
  Controller,
  useForm,
} from 'react-hook-form'
import {
  LoadingButton,
} from '@mui/lab'
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

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    token,
  } = useAppSelector((state) => state.global)
  const {
    control,
    handleSubmit,
    formState: {
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
    const response = data?.data
    if (response) {
      dispatch(updateToken(response?.access || ''))
    }

    if (token && response) {
      navigate('/connections')
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
            Sign in
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
