import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useUiStore } from './store/ui'
import './App.css'
import ErrorBoundary from './components/ErrorBoundary'

const queryClient = new QueryClient()

function makeTheme(mode: 'light' | 'dark') {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
      },
      background: {
        default: mode === 'light' ? '#f7f7fb' : '#0f1115',
        paper: mode === 'light' ? '#ffffff' : '#121621',
      },
    },
    components: {
      MuiContainer: {
        defaultProps: { maxWidth: 'xl' },
      },
    },
  })
}

export default function App() {
  const mode = useUiStore((s) => s.mode)
  const theme = makeTheme(mode)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
