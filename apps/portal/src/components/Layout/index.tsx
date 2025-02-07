import React, {
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import {
  Layout as AntdLayout,
  Menu,
  Button,
  theme,
  Avatar,
  Typography,
  MenuProps,
  Dropdown,
  Tooltip,
  Space,
} from 'antd'
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  IRouteType,
} from '@/routes'
import {
  Flex,
} from '..'
import {
  useAppSelector,
} from '@/store'

const {
  Header,
  Sider,
  Content,
} = AntdLayout

type IPropsType = {
  children: React.ReactNode
  routes: IRouteType[]
  currentRoute?: IRouteType
}

const {
  Text,
} = Typography

export const Layout = ({
  children,
  routes,
  currentRoute,
}: IPropsType) => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    user,
  } = useAppSelector((state) => state.global)
  const {
    name,
  } = user
  const {
    token: {
      colorBgContainer,
    },
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)

  const handleLinkTo = (target: string) => {
    navigate(target)
  }

  const getItem = (route: IRouteType): any => {
    const filteredChildren = (route.children || [])?.filter((child) => child.text)

    return {
      key: route.id,
      icon: route.icon,
      label: route.text,
      children: filteredChildren.length ? filteredChildren.map((child) => getItem(child)) : undefined,
      onClick: ({
        keyPath,
      }: any) => {
        handleLinkTo(`/${keyPath[0]}` || route.path || '')
      },
    }
  }

  useEffect(() => {
    const routeIds = routes.filter((route) => route.text).map((route) => route.id)
    let existRouteName = location.pathname.slice(1)
    let safetyGuardsTimes = 0
    while (!routeIds.includes(existRouteName) && safetyGuardsTimes <= 20) {
      existRouteName = existRouteName.slice(0, -1)
      safetyGuardsTimes += 1
    }
  }, [location.pathname])

  const items = useMemo(() => {
    const finalRoutes: any[] = []
    const filterRoutes = routes.filter((route) => route.text)
    for (let index = 0; index < filterRoutes?.length; index += 1) {
      const filterRoute = filterRoutes[index]
      finalRoutes.push(getItem(filterRoute))
    }
    return finalRoutes
  }, [routes])

  const userActions: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Text>
          Logout
        </Text>
      ),
      icon: <LogoutOutlined />,
      onClick: () => {
        navigate('/login')
      },
    },
  ]

  const findNearestTextRoute = (routes: IRouteType[], path: string): string | null => {
    let selectedId = null

    const findRoute = (routes: IRouteType[]) => {
      routes.forEach((route) => {
        if (route.path && path.startsWith(route.path)) {
          if (route.text) {
            selectedId = route.id
          }
          if (route.children) {
            findRoute(route.children)
          }
        }
      })
    }

    findRoute(routes)
    return selectedId
  }

  const selectedKey = useMemo(() => findNearestTextRoute(routes, location.pathname) || '', [routes, location.pathname])

  return (
    <>
      {
        currentRoute?.isNoFrame ? <Content>{children}</Content> : (
          <AntdLayout style={{
            height: '100vh',
          }}
          >
            {
              currentRoute?.isNoConnection ? null : (
                <Sider
                  trigger={null}
                  collapsible
                  collapsed={collapsed}
                  theme="light"
                >
                  <div className="demo-logo-vertical" />
                  <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={items}
                  />
                </Sider>
              )
            }
            <AntdLayout style={{
              height: '100vh',
            }}
            >
              <Header style={{
                padding: 0,
                background: colorBgContainer,
              }}
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: '16px',
                      width: 64,
                      height: 64,
                    }}
                  />
                  <Space size="large">
                    <Dropdown
                      menu={{
                        items: userActions,
                      }}
                    >
                      <Button
                        style={{
                          marginRight: '32px',
                          padding: '0 12px',
                        }}
                        size="large"
                        type="text"
                      >
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          gap="8px"
                        >
                          <Avatar>{name?.charAt(0).toUpperCase()}</Avatar>
                          {
                            name?.length < 10
                              ? (
                                <Text type="secondary">
                                  {name}
                                </Text>
                              ) : (
                                <Tooltip
                                  placement="left"
                                  title={name}
                                >
                                  <Text type="secondary">{`${name?.slice(0, 10)}...`}</Text>
                                </Tooltip>
                              )
                          }
                        </Flex>
                      </Button>
                    </Dropdown>
                  </Space>
                </Flex>
              </Header>
              <Content style={{
                height: 'calc(100vh - 64px)',
                overflow: 'auto',
              }}
              >
                <div style={{
                  margin: '24px 16px',
                }}
                >
                  {children}
                </div>
              </Content>
            </AntdLayout>
          </AntdLayout>
        )
      }
    </>
  )
}
