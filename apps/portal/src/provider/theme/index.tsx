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
    palette: {
      primary: {
        light: '#95d85a',
        main: '#5da919',
        dark: '#69ad2e',
        contrastText: '#fff',
      },
    },
    typography: {
      allVariants: {
        color: '#4e4d4d',
      },
    }
  })

  return (
    <ThemeProvider theme={theme}>
      { children}
    </ThemeProvider>
  )
}
