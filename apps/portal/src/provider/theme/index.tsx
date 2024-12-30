import {
  ConfigProvider,
} from 'antd'
import enUS from 'antd/locale/en_US'
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
    locale={enUS}
    theme={theme}
  >
    {children}
  </ConfigProvider>
)
