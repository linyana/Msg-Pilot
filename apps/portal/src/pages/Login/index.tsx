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
} from '@mui/material'
import {
  AuthProvider,
  AuthResponse,
  SignInPage,
} from '@toolpad/core'
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
      messageApi.error(error)
    }
  }, [error])

  const signIn = (
    _provider: AuthProvider,
    formData?: FormData,
  ) => {
    const submitData = {
      email: formData?.get('email'),
      password: formData?.get('password'),
    }
    window.console.log(submitData)
  }

  return (
    <>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: {
            autoFocus: false,
          },
        }}
      />
    </>
  )
}
