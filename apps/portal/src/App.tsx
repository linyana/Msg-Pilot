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
  useDispatch,
} from 'react-redux'
import {
  I18nextProvider,
} from 'react-i18next'
import {
  ConfigProvider,
} from '@msg-pilot/hooks'
import {
  pageTypes,
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
  MUIThemeProvider,
} from './provider'

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

  const routeKey: string = pathname.split('/')[1]
  const needFrame = useMemo(() => !(pageTypes.noFrame.includes(routeKey)), [pageTypes, routeKey])

  const config = useMemo(() => ({
    token,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    httpStrategy: {
      401: () => {
        navigate('/login')
      },
    },
  }), [token])

  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider config={config}>
        <MUIThemeProvider>
          <Layout
            routes={routes}
            needFrame={needFrame}
          >
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={token || route.isPublic ? route.element : <Navigate to="/login" />}
                />
              ))}
            </Routes>
          </Layout>
        </MUIThemeProvider>
      </ConfigProvider>
    </I18nextProvider>
  )
}
