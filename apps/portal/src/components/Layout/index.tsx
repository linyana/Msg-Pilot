import * as React from 'react'
import {
  AppProvider,
  Navigation,
  Router,
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
  RouteItem,
} from '@/routes'
import logo from '@/accsets/message.svg'
import {
  useAppSelector,
} from '@/store'

const useDemoRouter = (initialPath: string): Router => {
  const [pathname, setPathname] = React.useState(initialPath)

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path: string | URL) => setPathname(String(path)),
  }), [pathname])

  return router
}

type IPropsType = {
  children: React.ReactNode
  routes: Array<RouteItem>
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
  } = useAppSelector((state) => state.global)
  const theme = useTheme()

  const navigation: Navigation = React.useMemo(() => routes.filter((route) => !route.isPublic || route.kind || route.text).map((route) => ({
    kind: route.kind,
    segment: route.text,
    title: route.text,
    icon: route.icon,
  })), [routes])

  return (
    <AppProvider
      navigation={navigation}
      theme={theme}
      session={{
        user: userName,
      }}
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
