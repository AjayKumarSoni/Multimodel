import { Box, Paper, Stack, Typography, List, ListItem, ListItemText, Divider, Button, Chip, Avatar } from '@mui/material'
import AssessmentIcon from '@mui/icons-material/Assessment'
import MemoryIcon from '@mui/icons-material/Memory'
import StorageIcon from '@mui/icons-material/Storage'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import BoltIcon from '@mui/icons-material/Bolt'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import SearchBar from '../components/SearchBar'
import { useNavigate } from 'react-router-dom'
import { useSearchStore } from '../store/search'

export default function HomeDashboard() {
  const navigate = useNavigate()
  const addRecent = useSearchStore((s) => s.addRecent)
  const recent = useSearchStore((s) => s.recent)
  const bookmarks = useSearchStore((s) => s.bookmarks)
  return (
    <Box>
      <Stack spacing={4}>
        {/* Hero section */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            p: { xs: 3, md: 6 },
            background: (theme) =>
              theme.palette.mode === 'light'
                ? 'linear-gradient(180deg, #e3f2fd 0%, #ffffff 60%)'
                : 'linear-gradient(180deg, #0b1220 0%, #0f1115 60%)',
          }}
        >
          {/* Decorative blurred orbs */}
          <Box sx={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(25,118,210,0.35), rgba(25,118,210,0))',
            filter: 'blur(20px)',
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 70% 70%, rgba(156,39,176,0.28), rgba(156,39,176,0))',
            filter: 'blur(24px)',
          }} />

          {/* Glass panel content */}
          <Paper
            elevation={0}
            sx={{
              backdropFilter: 'saturate(1.2) blur(10px)',
              backgroundColor: (t) => (t.palette.mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(18,22,33,0.5)'),
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: { xs: 2, md: 4 },
              maxWidth: 1000,
              mx: 'auto',
            }}
          >
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 0.3 }}>
                Multimodel Search
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
                Find documents, images, and audio in seconds. Natural language, multimodal inputs, and smart citations.
              </Typography>
              <Box sx={{ width: { xs: '100%', sm: '90%', md: '80%' }, mt: 1 }}>
                <SearchBar
                  elevated
                  placeholder="Search (text/voice/image)"
                  onSearch={(q) => {
                    const query = q.trim()
                    if (!query) return
                    addRecent(query)
                    navigate(`/search?q=${encodeURIComponent(query)}`)
                  }}
                />
              </Box>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                <Chip label="Upload" color="primary" variant="outlined" onClick={() => navigate('/upload')} />
                <Chip label="Recent" variant="outlined" onClick={() => recent[0] && navigate(`/search?q=${encodeURIComponent(recent[0].q)}`)} />
                <Chip label="Analytics" variant="outlined" onClick={() => navigate('/analytics')} />
                <Chip label="Settings" variant="outlined" onClick={() => navigate('/settings')} />
              </Stack>
            </Stack>
          </Paper>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: '1fr 2fr 1fr' },
          }}
        >
          <Paper sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', backdropFilter: 'blur(10px)', backgroundColor: (t) => (t.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(18,22,33,0.55)'), transition: 'all .2s', '&:hover': { boxShadow: 6 } }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main' }}>
                <AssessmentIcon fontSize="small" />
              </Avatar>
              <Typography variant="subtitle1" fontWeight={800}>System Stats</Typography>
            </Stack>
            <Stack spacing={1.2}>
              <Stack direction="row" spacing={1}>
                <Chip icon={<MemoryIcon />} label="CPU · 23%" size="small" color="default" variant="outlined" />
                <Chip icon={<MemoryIcon />} label="RAM · 62%" size="small" color="default" variant="outlined" />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Chip icon={<StorageIcon />} label="Indexed · 12,340" size="small" variant="outlined" />
                <Chip icon={<StorageIcon />} label="Storage · 128 GB / 1 TB" size="small" variant="outlined" />
              </Stack>
              <Box sx={{ mt: 1, height: 6, borderRadius: 3, bgcolor: 'action.hover', overflow: 'hidden' }}>
                <Box sx={{ width: '12.8%', height: '100%', bgcolor: 'primary.main' }} />
              </Box>
            </Stack>
          </Paper>
          <Paper sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', backdropFilter: 'blur(10px)', backgroundColor: (t) => (t.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(18,22,33,0.55)'), transition: 'all .2s', '&:hover': { boxShadow: 6 } }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: 'warning.main' }}>
                <LightbulbIcon fontSize="small" />
              </Avatar>
              <Typography variant="subtitle1" fontWeight={800}>Quick Tips</Typography>
            </Stack>
            <Stack spacing={1.2}>
              <Typography variant="body2" color="text.secondary">
                Try natural language like: “Share Q2 sales PDF and latest meeting notes”.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                <Chip icon={<BoltIcon />} size="small" label="Use filters: type, date, dept" variant="outlined" />
                <Chip icon={<BoltIcon />} size="small" label="Bookmark useful results" variant="outlined" />
                <Chip icon={<BoltIcon />} size="small" label="Export with citations" variant="outlined" />
              </Stack>
              <Divider />
              <Typography variant="subtitle2">Recent Activity</Typography>
              <List dense>
                <ListItem><ListItemText primary="Searched: policy update" secondary="2h ago" /></ListItem>
                <ListItem><ListItemText primary="Uploaded: customer calls" secondary="Yesterday" /></ListItem>
              </List>
            </Stack>
          </Paper>
          <Paper sx={{ p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider', backdropFilter: 'blur(10px)', backgroundColor: (t) => (t.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(18,22,33,0.55)'), transition: 'all .2s', '&:hover': { boxShadow: 6 } }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: 'success.main' }}>
                <StarOutlineIcon fontSize="small" />
              </Avatar>
              <Typography variant="subtitle1" fontWeight={800}>Quick Access</Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">Recent Searches</Typography>
            <List dense>
              {recent.slice(0,5).map((r) => (
                <ListItem key={r.ts} secondaryAction={<Button size="small" onClick={() => navigate(`/search?q=${encodeURIComponent(r.q)}`)}>Open</Button>}>
                  <ListItemText primary={r.q} />
                </ListItem>
              ))}
              {recent.length === 0 && (
                <ListItem><ListItemText primary="No recent searches" /></ListItem>
              )}
            </List>
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption" color="text.secondary">Bookmarks</Typography>
            <List dense>
              {bookmarks.slice(0,5).map((b) => (
                <ListItem key={b.id} secondaryAction={<Button size="small" onClick={() => navigate('/search?q='+encodeURIComponent(b.title))}>Search</Button>}>
                  <ListItemText primary={b.title} />
                </ListItem>
              ))}
              {bookmarks.length === 0 && (
                <ListItem><ListItemText primary="No bookmarks yet" /></ListItem>
              )}
            </List>
          </Paper>
        </Box>
      </Stack>
    </Box>
  )
}
