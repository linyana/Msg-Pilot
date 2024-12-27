import {
  createTheme,
  Theme,
} from '@mui/material'

declare module '@mui/material/styles' {
  interface Theme {
    [key: string]: any;
  }
  interface ThemeOptions {
    [key: string]: any;
  }
}

export const theme: Theme = createTheme({
  palette: {
    primary: {
      light: '#3cb96c',
      main: '#3cb96c',
      dark: '#3cb96c',
      contrastText: '#fff',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          width: '400px',
          padding: '16px',
          borderRadius: '0.5rem',
          borderColor: 'rgb(299,299,299)',
          boxShadow: 'rgba(0, 0, 0, 0.3) 0rem 0.0125rem 0.125rem 0rem;',
          borderWidth: '0.0625rem',
          borderStyle: 'solid',
        },
      },
    },
  },
  typography: {
    allVariants: {
      color: '#4e4d4d',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h5: {
      color: 'rgb(123, 128, 154)',
      fontSize: '1.25rem',
      fontWeight: 400,
    },
  },
})
