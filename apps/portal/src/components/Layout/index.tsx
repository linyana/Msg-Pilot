import * as React from 'react'
import {
  AppProvider,
  Navigation,
} from '@toolpad/core/AppProvider'
import {
  DashboardLayout,
} from '@toolpad/core/DashboardLayout'
import {
  PageContainer,
} from '@toolpad/core/PageContainer'
import {
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {
  useDispatch,
} from 'react-redux'
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  IRouteType,
} from '@/routes'
import logo from '@/accsets/message.svg'
import {
  updateToken,
  updateUserName,
  useAppSelector,
} from '@/store'

type IPropsType = {
  children: React.ReactNode
  routes: Array<IRouteType>
  needFrame: boolean
}

const CustomAppTitle = () => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={1.5}
  >
    <img
      src={logo}
      style={{
        width: 28,
        height: 28,
        marginTop: 4,
      }}
      alt=""
    />
    <Typography
      variant="h6"
      color="#75C82B"
    >
      Msg Pilot
    </Typography>
  </Stack>
)

export const Layout = ({
  children,
  routes,
  needFrame,
}: IPropsType) => {
  const {
    userName,
    userEmial,
  } = useAppSelector((state) => state.global)
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    pathname,
  } = useLocation()
  const router = {
    navigate: (value: string | URL) => {
      navigate(value)
    },
    pathname,
    searchParams: new URLSearchParams(window.location.search),
  }

  const navigation: Navigation = React.useMemo(() => routes.filter((route) => !route.isPublic || route.kind || route.text).map((route) => ({
    kind: route.kind,
    segment: route.path,
    title: route.text,
    icon: route.icon,
    children: route.children?.filter((child) => child.path).map((child) => ({
      kind: child.kind,
      segment: child.path?.split('/')[(child.path?.split('/') || []).length - 1],
      title: child.text,
      icon: child.icon,
    })),
  })), [routes])

  const authentication = React.useMemo(() => ({
    signIn: () => {
      window.console.log()
    },
    signOut: () => {
      dispatch(updateToken(''))
      dispatch(updateUserName(''))
    },
  }), [])

  return (
    <AppProvider
      navigation={navigation}
      theme={theme}
      router={router}
      session={{
        user: {
          name: userName,
          email: userEmial,
        },
      }}
      authentication={authentication}
    >
      {
        needFrame
          ? (
            <DashboardLayout slots={{
              appTitle: CustomAppTitle,
            }}

            >
              <PageContainer>
                {children}
              </PageContainer>
            </DashboardLayout>
          )
          : (
            <>{children}</>
          )
      }
    </AppProvider>
  )
}
