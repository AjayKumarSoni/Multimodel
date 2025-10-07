import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const labelMap: Record<string, string> = {
  '': 'Home',
  upload: 'Upload',
  search: 'Search',
  analytics: 'Analytics',
  settings: 'Settings',
  profile: 'Profile',
  help: 'Help',
}

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)

  const items = [
    <Link key="home" component={RouterLink} color="inherit" to="/">
      {labelMap['']}
    </Link>,
    ...parts.map((p, idx) => {
      const to = '/' + parts.slice(0, idx + 1).join('/')
      const isLast = idx === parts.length - 1
      const label = labelMap[p] ?? p
      return isLast ? (
        <Typography key={to} color="text.primary">
          {label}
        </Typography>
      ) : (
        <Link key={to} component={RouterLink} color="inherit" to={to}>
          {label}
        </Link>
      )
    }),
  ]

  return <MUIBreadcrumbs sx={{ my: 1 }}>{items}</MUIBreadcrumbs>
}
