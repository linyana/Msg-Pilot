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
  RouteItem,
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
  routes: RouteItem[]
  pageType?: 'noFrame' | 'frame'
}

const {
  Text,
} = Typography

export const Layout = ({
  children,
  routes,
  pageType,
}: IPropsType) => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    userName,
  } = useAppSelector((state) => state.global)
  const {
    token: {
      colorBgContainer,
    },
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)
  const [currentRoute, setCurrentRoute] = useState(location.pathname.slice(1))

  const handleLinkTo = (target: string) => {
    navigate(target)
  }

  const getItem = (route: RouteItem) => ({
    key: route.id,
    icon: route.icon,
    label: route.text,
    onClick: ({
      keyPath,
    }: any) => {
      handleLinkTo(`/${keyPath[0]}` || route.path)
    },
  })

  useEffect(() => {
    const routeIds = routes.filter((route) => route.text).map((route) => route.id)
    let existRouteName = location.pathname.slice(1)
    let safetyGuardsTimes = 0
    while (!routeIds.includes(existRouteName) && safetyGuardsTimes <= 20) {
      existRouteName = existRouteName.slice(0, -1)
      safetyGuardsTimes += 1
    }
    setCurrentRoute(existRouteName)
  }, [location.pathname])

  const items = useMemo(() => {
    const finalRoutes: any[] = []
    const filterRoutes = routes.filter((route) => route.text)
    for (let index = 0; index < filterRoutes?.length; index += 1) {
      const filterRoute = filterRoutes[index]
      if (filterRoute.icon) {
        finalRoutes.push(getItem(filterRoute))
      } else {
        const category = filterRoute.id.split('/')[0]
        const firstLevelRoute = finalRoutes.find((item) => item.key.split('/')[0] === category)
        if (firstLevelRoute?.children?.length) {
          firstLevelRoute?.children.push(getItem(filterRoute))
        } else {
          firstLevelRoute.children = [getItem(filterRoute)]
        }
      }
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

  return (
    <>
      {
        pageType === 'frame' ? (
          <AntdLayout style={{
            height: '100vh',
          }}
          >
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
            >
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                selectedKeys={[currentRoute || '']}
                items={items}
              />
            </Sider>
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
                          <Avatar>{userName?.charAt(0).toUpperCase()}</Avatar>
                          {
                            userName?.length < 10
                              ? (
                                <Text type="secondary">
                                  {userName}
                                </Text>
                              ) : (
                                <Tooltip
                                  placement="left"
                                  title={userName}
                                >
                                  <Text type="secondary">{`${userName?.slice(0, 10)}...`}</Text>
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
          : <Content>{children}</Content>
      }
    </>
  )
}
