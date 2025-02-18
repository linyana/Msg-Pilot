import {
  useEffect,
  useState,
} from 'react'
import {
  Button,
  Typography,
} from '@mui/material'
import {
  useNavigate,
} from 'react-router-dom'
import {
  useDispatch,
} from 'react-redux'
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
            <Typography
              variant="h3"
              style={{
                marginTop: 32,
              }}
              textAlign="center"
              color="error"
            >
              Error
            </Typography>
            <Typography
              variant="h5"
              style={{
                marginTop: 16,
              }}
              textAlign="center"
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
                    variant="contained"
                    onClick={() => {
                      fetchData?.()
                    }}
                  >
                    Retry To Continue
                  </Button>
                ) : (
                  <Button
                    variant="contained"
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
