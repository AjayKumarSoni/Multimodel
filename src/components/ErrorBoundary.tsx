import { Component, type ReactNode } from 'react'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: any }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: any): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // eslint-disable-next-line no-console
    console.error('App error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h6">Something went wrong</Typography>
              <Typography variant="body2" color="text.secondary">Please refresh the page. If the problem persists, contact support.</Typography>
              <Button variant="contained" onClick={() => window.location.reload()}>Reload</Button>
            </Stack>
          </Paper>
        </Box>
      )
    }
    return this.props.children
  }
}
