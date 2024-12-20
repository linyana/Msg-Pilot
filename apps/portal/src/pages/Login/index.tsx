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
  return (
    <>
      1
    </>
  )
}
