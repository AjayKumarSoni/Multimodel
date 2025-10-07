import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import HomeDashboard from './pages/HomeDashboard'
import Upload from './pages/Upload'
import SearchResults from './pages/SearchResults'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import UserProfile from './pages/UserProfile'
import Help from './pages/Help'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomeDashboard /> },
      { path: 'upload', element: <Upload /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'settings', element: <Settings /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'help', element: <Help /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
