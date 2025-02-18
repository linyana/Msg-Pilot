import {
  ThemeProvider,
} from '@mui/material'
import {
  theme,
} from '@/theme/mui'

type IPropsType = {
  children: React.ReactNode
}

export const MUIThemeProvider = ({
  children,
}: IPropsType) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)
