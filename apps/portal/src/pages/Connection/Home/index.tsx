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
  useGetConnections,
} from '@/services'
import {
  IConnectionType,
} from '@/types'
import {
  Center,
  Empty,
  Loading,
} from '@/components'
import {
  useMessage,
} from '@/hooks'
import {
  CONNECTION_INFO,
} from '@/constants'

export const Connections = () => {
  const [connections, setConnections] = useState<IConnectionType[]>([])

  const message = useMessage()
  const navigate = useNavigate()

  const {
    data,
    fetchData,
    loading,
    error,
  } = useGetConnections()

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
    <Center>
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
        <Loading loading={loading}>
          {
            !connections.length && (
              <Empty tip="No connections" />
            )
          }
          {
            connections.map((connection, index) => (
              <>
                {
                  index && <Divider />
                }
                <ListItem
                  component="div"
                  disablePadding
                >
                  <ListItemButton style={{
                    padding: '16px',
                  }}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Connection">
                        {CONNECTION_INFO[connection.type]?.logo || <StoreIcon />}
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
              </>
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
    </Center>
  )
}
