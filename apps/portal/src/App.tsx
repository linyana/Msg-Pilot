import {
  ConfigProvider,
} from '@auto-send-message/hooks'
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
  message,
  ConfigProvider as AntdConfigProvider,
} from 'antd'
import enUS from 'antd/locale/en_US'
import {
  useDispatch,
} from 'react-redux'
import {
  I18nextProvider,
} from 'react-i18next'
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
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const {
    pathname,
  } = useLocation()
  const navigate = useNavigate()

  const routeKey: string = pathname.split('/')[1]
  const memoPageType = useMemo(() => (pageTypes.noFrame.includes(routeKey) ? 'noFrame' : 'frame'), [pageTypes, routeKey])

  const appContextMemoValue = useMemo(() => ({
    messageApi,
  }), [
    messageApi,
  ])

  return (
    <I18nextProvider i18n={i18n}>
      <AppContext.Provider value={appContextMemoValue}>
        {contextHolder}
        <ConfigProvider config={{
          token,
          apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
          httpStrategy: {
            401: () => {
              // delete token
              navigate('/login')
            },
          },
        }}
        >
          <AntdConfigProvider
            locale={enUS}
          >
            <Layout
              routes={routes}
              pageType={memoPageType}
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
          </AntdConfigProvider>
        </ConfigProvider>
      </AppContext.Provider>
    </I18nextProvider>
  )
}
