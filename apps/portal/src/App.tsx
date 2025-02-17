import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom'
import {
  createContext,
  useMemo,
} from 'react'
import {
  I18nextProvider,
} from 'react-i18next'
import {
  ConfigProvider,
} from '@/hooks'
import {
  IRouteType,
  routes,
} from './routes'
import {
  useAppSelector,
} from './store'
import {
  Layout,
} from './components'
import i18n from './lang'
import {
  AntdThemeProvider,
  AuthProvider,
} from './provider'
import {
  MessageApiProvider,
} from './hooks'

interface IAppContext {
  messageApi: any
}
export const AppContext = createContext<IAppContext>({
  messageApi: null,
})

export default () => {
  const {
    token,
  } = useAppSelector((state) => state.global)

  const {
    pathname,
  } = useLocation()
  const navigate = useNavigate()
  const config = useMemo(() => ({
    token,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    httpStrategy: {
      401: () => {
        navigate('/login')
      },
    },
  }), [token])

  const flattenedRoutes = useMemo(() => {
    const flattenRoutes: IRouteType[] = []

    const flatten = (routeList: IRouteType[]) => {
      routeList.forEach((route) => {
        flattenRoutes.push(route)
        if (route.children) {
          flatten(route.children)
        }
      })
    }

    flatten(routes)
    return flattenRoutes
  }, [routes])

  const currentRoute = flattenedRoutes?.find((route) => route.path === pathname)

  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider config={config}>
        <MessageApiProvider>
          <AntdThemeProvider>
            <AuthProvider currentRoute={currentRoute}>
              <Layout
                routes={routes}
                currentRoute={currentRoute}
              >
                <Routes>
                  {flattenedRoutes.map((route) => (
                    <Route
                      key={route.id}
                      path={route.path}
                      element={token || route.isPublic ? route.element : <Navigate to="/login" />}
                    />
                  ))}
                </Routes>
              </Layout>
            </AuthProvider>
          </AntdThemeProvider>
        </MessageApiProvider>
      </ConfigProvider>
    </I18nextProvider>
  )
}
