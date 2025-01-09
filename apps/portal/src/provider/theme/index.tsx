import {
  ConfigProvider,
} from 'antd'
import zhCN from 'antd/locale/zh_CN'
import {
  theme,
} from '@/theme'

type IPropsType = {
  children: React.ReactNode
}

export const AntdThemeProvider = ({
  children,
}: IPropsType) => (
  <ConfigProvider
    locale={zhCN}
    theme={theme}
  >
    {children}
  </ConfigProvider>
)
