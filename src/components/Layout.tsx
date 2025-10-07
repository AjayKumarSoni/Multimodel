import { AppBar, Toolbar, Typography, IconButton, Button, Box, Container, Stack } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'
import { useUiStore } from '../store/ui'
import Breadcrumbs from './Breadcrumbs'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload' },
  { to: '/search', label: 'Search' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/settings', label: 'Settings' },
  { to: '/profile', label: 'Profile' },
  { to: '/help', label: 'Help' },
]

export default function Layout() {
  const mode = useUiStore((s) => s.mode)
  const toggle = useUiStore((s) => s.toggleMode)
  const { pathname } = useLocation()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="fixed" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Multimodel
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
            {nav.map((n) => (
              <Button
                key={n.to}
                component={RouterLink}
                to={n.to}
                color={pathname === n.to || (n.to === '/' && pathname === '/') ? 'primary' : 'inherit'}
              >
                {n.label}
              </Button>
            ))}
          </Stack>
          <IconButton onClick={toggle} color="inherit" aria-label="Toggle theme">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Spacer to offset fixed AppBar height */}
      <Toolbar />
      <Container sx={{ py: 3 }}>
        <Breadcrumbs />
        <Outlet />
      </Container>
    </Box>
  )
}
