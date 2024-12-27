import {
  useEffect,
  useState,
} from 'react'
import {
  Avatar,
  Button,
  Card,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import StoreIcon from '@mui/icons-material/Store'
import {
  useNavigate,
} from 'react-router-dom'
import {
  useDispatch,
} from 'react-redux'
import {
  useChooseConnection,
  useGetConnections,
} from '@/services'
import {
  IConnectionType,
} from '@/types'
import {
  Empty,
  Flex,
  Loading,
} from '@/components'
import {
  useMessage,
} from '@/hooks'
import {
  CONNECTION_INFO,
} from '@/constants'
import {
  updateToken,
  useAppSelector,
} from '@/store'

export const Connections = () => {
  const [connections, setConnections] = useState<IConnectionType[]>([])
  const [selectedConnection, setSelectedConnection] = useState<number>()

  const message = useMessage()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    token,
  } = useAppSelector((state) => state.global)

  const {
    data,
    fetchData,
    loading,
    error,
  } = useGetConnections()

  const {
    data: chooseData,
    fetchData: fetchChooseData,
    loading: chooseLoading,
    error: chooseError,
  } = useChooseConnection({
    connection_id: selectedConnection,
  })

  useEffect(() => {
    if (selectedConnection) {
      fetchChooseData?.()
    }
  }, [selectedConnection])

  useEffect(() => {
    if (chooseError) {
      message.error(chooseError)
      setSelectedConnection(0)
    }
  }, [chooseError])

  useEffect(() => {
    const response = chooseData?.data
    if (response) {
      dispatch(updateToken(response?.access || ''))
    }

    if (token && response) {
      navigate('/dashboard')
    }
  }, [chooseData?.data, token])

  useEffect(() => {
    fetchData?.()
  }, [])

  useEffect(() => {
    if (data?.data) {
      setConnections(data.data)
    }
  }, [data?.data])

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  return (
    <Flex justifyContent="center">
      <div>
        <Typography
          variant="h3"
          gutterBottom
          textAlign="center"
          marginBottom="8px"
        >
          Connection List
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          marginBottom="40px"
        >
          Manage your connection list.
        </Typography>
        <Card sx={{
          padding: 0,
          width: 600,
        }}
        >
          <Loading
            loading={loading || chooseLoading}
            needMask
          >
            {
              !connections.length && (
                <Empty tip="No connections" />
              )
            }
            {
              connections.map((connection, index) => (
                <div key={connection.id}>
                  {
                    index ? <Divider /> : <></>
                  }
                  <ListItem
                    component="div"
                    disablePadding
                    onClick={() => {
                      setSelectedConnection(Number(connection.id))
                    }}
                  >
                    <ListItemButton
                      style={{
                        padding: '16px',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Connection"
                          src={CONNECTION_INFO[connection.type]?.logo}
                        >
                          <StoreIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={connection.name}
                        secondary={connection.description ? (
                          <>
                            {connection.description}
                          </>
                        ) : undefined}
                      />
                    </ListItemButton>
                  </ListItem>
                </div>
              ))
            }
            <div style={{
              padding: 16,
            }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  navigate('/create-connection')
                }}
              >
                {
                  !connections.length ? 'Create your first connection' : 'Create a new connection'
                }
              </Button>
            </div>
          </Loading>
        </Card>
      </div>
    </Flex>
  )
}
