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
  Avatar,
  Button,
  Card,
  Empty,
  List,
  Typography,
} from 'antd'
import {
  useChooseConnection,
  useGetConnections,
} from '@/services'
import {
  IConnectionType,
} from '@/types'
import {
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
import './index.css'

const {
  Title,
} = Typography

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
      message.error({
        content: chooseError,
      })
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
      message.error({
        content: error,
      })
    }
  }, [error])

  return (
    <Flex justifyContent="center">
      <div>
        <Title
          level={3}
          style={{
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          连接列表
        </Title>
        <Typography
          style={{
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          管理你的所有连接器
        </Typography>
        <Card
          style={{
            width: '40vw',
            minWidth: 600,
          }}
          styles={{
            body: {
              padding: 0,
            },
          }}
        >
          <Loading
            loading={loading || chooseLoading}
            needMask
          >
            {
              !connections.length && (
                <Empty />
              )
            }
            <List
              itemLayout="horizontal"
              dataSource={connections}
              renderItem={(connection) => (
                <List.Item
                  className="hover-item"
                  style={{
                    padding: '16px 24px',
                  }}
                  onClick={() => {
                    setSelectedConnection(Number(connection.id))
                  }}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={CONNECTION_INFO[connection.type]?.logo} />}
                    title={connection.name}
                    description={connection.description || '暂时没有描述'}
                  />
                </List.Item>
              )}
            />
            <Button
              style={{
                width: '100%',
              }}
              type="primary"
              onClick={() => {
                navigate('/create-connection')
              }}
            >
              {
                !connections.length ? '创建你的第一个连接' : '创建一个新连接'
              }
            </Button>
          </Loading>
        </Card>
      </div>
    </Flex>
  )
}
