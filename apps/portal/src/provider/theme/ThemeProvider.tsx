import {
  createTheme,
  Theme,
  ThemeProvider,
} from '@mui/material'

type IPropsType = {
  children: React.ReactNode
}

declare module '@mui/material/styles' {
  interface Theme {
    [key: string]: any;
  }
  interface ThemeOptions {
    [key: string]: any;
  }
}

export const MUIThemeProvider = ({
  children,
}: IPropsType) => {
  const theme: Theme = createTheme({
    status: {
      danger: '',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      { children}
    </ThemeProvider>
  )
}
