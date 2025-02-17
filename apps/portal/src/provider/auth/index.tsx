import {
  useEffect,
  useState,
} from 'react'
import {
  useNavigate,
} from 'react-router-dom'
import {
  useDispatch,
} from 'react-redux'
import {
  Button,
  Typography,
} from 'antd'
import {
  useGetInfo,
} from '@/services'
import {
  updateUser,
  useAppSelector,
} from '@/store'
import {
  Center,
  Flex,
  Loading,
} from '@/components'
import errorSrc from '@/assets/normal/error.svg'
import {
  IRouteType,
} from '@/routes'

type IPropsType = {
  children: React.ReactNode
  currentRoute?: IRouteType
}

const {
  Title,
} = Typography

export const AuthProvider = ({
  children,
  currentRoute,
}: IPropsType) => {
  const {
    token,
  } = useAppSelector((state) => state.global)
  const [userInfo, setUserInfo] = useState<{
    name?: string,
    email?: string
  } | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    data,
    fetchData,
    loading,
    error,
  } = useGetInfo()

  useEffect(() => {
    if (token) {
      fetchData?.()
    } else {
      setUserInfo(null)
    }
  }, [token])

  useEffect(() => {
    if (data?.data) {
      setUserInfo(data.data.user)
    }
  }, [data?.data])

  useEffect(() => {
    if (userInfo) {
      dispatch(updateUser({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
      }))
    }
  }, [userInfo])

  return (
    <Loading
      loading={loading || (!!currentRoute && !currentRoute?.isPublic && !userInfo)}
      isGlobal
    >
      {
        (error || (!!currentRoute && !currentRoute?.isNoConnection && !data?.data?.connection)) && !currentRoute?.isPublic ? (
          <Center>
            <img
              src={errorSrc}
              style={{
                width: 400,
                height: 300,
              }}
              alt="error"
            />
            <Title
              level={3}
              style={{
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Error
            </Title>
            <Typography
              style={{
                textAlign: 'center',
                marginBottom: '40px',
              }}
            >
              {error || token ? 'Please choose a connection first' : 'Please login first'}
            </Typography>
            <Flex
              justifyContent="center"
              style={{
                marginTop: 32,
              }}
            >
              {
                error ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      fetchData?.()
                    }}
                  >
                    Retry To Continue
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate(token ? '/connections' : '/login')
                    }}
                  >
                    { token ? 'Return to choose connections' : 'Return to login'}
                  </Button>
                )
              }
            </Flex>
          </Center>
        )
          : (
            <>
              {children}
            </>
          )
      }
    </Loading>
  )
}
