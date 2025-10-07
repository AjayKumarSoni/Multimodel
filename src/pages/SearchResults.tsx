import {
  Box,
  Tabs,
  Tab,
  Paper,
  Stack,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  TextField,
  MenuItem,
} from '@mui/material'
import SearchBar from '../components/SearchBar'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSearchStore } from '../store/search'
import { useSnackbar } from 'notistack'

export default function SearchResults() {
  const [params, setParams] = useSearchParams()
  const tabFromUrl = params.get('tab') ?? 'all'
  const sort = params.get('sort') ?? 'relevance'
  const q = (params.get('q') || '').trim()
  const tabIndex = tabFromUrl === 'documents' ? 1 : tabFromUrl === 'images' ? 2 : tabFromUrl === 'audio' ? 3 : 0
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const addRecent = useSearchStore((s) => s.addRecent)
  const bookmarks = useSearchStore((s) => s.bookmarks)
  const toggleBookmark = useSearchStore((s) => s.toggleBookmark)
  const recent = useSearchStore((s) => s.recent)
  const { enqueueSnackbar } = useSnackbar()

  const results = useMemo(() =>
    [...Array(6)].map((_, i) => ({
      id: `doc-${i + 1}`,
      title: `Result ${i + 1}`,
      relevance: (95 - i).toFixed(0),
      page: i + 2,
      preview: 'Preview text or transcript snippet with highlights ...',
    })),
  [])

  useEffect(() => {
    // Simulate loading on tab/sort/q change
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [tabFromUrl, sort, q])

  const scrollToResult = (id: string) => {
    const el = document.getElementById(`result-${id}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      enqueueSnackbar('Jumped to citation ' + id, { variant: 'info' })
    }
  }

  return (
    <Stack spacing={2}>
      <SearchBar
        elevated
        placeholder="Search results..."
        size="small"
        onSearch={(text) => {
          const query = text.trim()
          if (!query) return
          addRecent(query)
          const next = new URLSearchParams(params)
          next.set('q', query)
          setParams(next)
        }}
      />
      {q && (
        <Typography variant="body2" color="text.secondary">Showing results for: "{q}"</Typography>
      )}
      <Paper sx={{ p: 2, bgcolor: 'primary.dark', color: 'primary.contrastText' }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          AI Summary
        </Typography>
        <Typography variant="body2">
          Key findings from your query will appear here as a concise summary with citations.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
          <Chip label="[1] Policy.pdf" variant="outlined" color="default" clickable onClick={() => scrollToResult('doc-1')} />
          <Chip label="[2] Meeting.mp3" variant="outlined" color="default" clickable onClick={() => scrollToResult('doc-2')} />
          <Chip label="[3] Invoice.png" variant="outlined" color="default" clickable onClick={() => scrollToResult('doc-3')} />
          <Button size="small" sx={{ ml: 1 }} variant="contained" onClick={() => enqueueSnackbar('Exported results', { variant: 'success' })}>
            Export
          </Button>
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 1 }}>
            <Tabs
              value={tabIndex}
              onChange={(_, v) => {
                const next = new URLSearchParams(params)
                const map = ['all', 'documents', 'images', 'audio'] as const
                next.set('tab', map[v])
                setParams(next)
              }}
              variant="scrollable"
              allowScrollButtonsMobile
            >
              <Tab label="All" />
              <Tab label="Documents" />
              <Tab label="Images" />
              <Tab label="Audio" />
            </Tabs>
            <Divider />
            {loading ? (
              <Stack spacing={1.5} sx={{ p: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Box key={i} sx={{ height: 40, borderRadius: 1, bgcolor: 'action.hover' }} />
                ))}
              </Stack>
            ) : tabFromUrl === 'images' ? (
              <Stack direction="row" spacing={2} sx={{ p: 2, flexWrap: 'wrap' }}>
                {results.map((r) => (
                  <Paper key={r.id} sx={{ p: 1, width: 180, height: 160, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ bgcolor: 'action.hover', height: 90, borderRadius: 1 }} />
                    <Typography variant="caption">{r.title} · {r.relevance}%</Typography>
                    <Button size="small">Open</Button>
                  </Paper>
                ))}
              </Stack>
            ) : tabFromUrl === 'audio' ? (
              <List>
                {results.map((r) => (
                  <ListItem key={r.id}>
                    <ListItemText
                      primary={`${r.title} · Relevance ${r.relevance}%`}
                      secondary={`00:${String(r.page).padStart(2, '0')} · Transcript preview ...`}
                    />
                    <Button size="small">Play</Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <List>
                {results.map((r) => {
                  const isBookmarked = bookmarks.some((b) => b.id === r.id)
                  return (
                    <ListItem
                      key={r.id}
                      id={`result-${r.id}`}
                      secondaryAction={
                        <Stack direction="row" spacing={1}>
                          <Button size="small" onClick={() => enqueueSnackbar('Opening ' + r.title, { variant: 'info' })}>Open</Button>
                          <Button
                            size="small"
                            onClick={() => {
                              toggleBookmark({ id: r.id, title: r.title })
                              enqueueSnackbar(isBookmarked ? 'Removed bookmark' : 'Bookmarked', { variant: 'success' })
                            }}
                          >
                            {isBookmarked ? 'Unbookmark' : 'Bookmark'}
                          </Button>
                          <Button
                            size="small"
                            onClick={async () => {
                              await navigator.clipboard.writeText(`${r.title} (p.${r.page})`)
                              enqueueSnackbar('Copied to clipboard', { variant: 'success' })
                            }}
                          >
                            Copy
                          </Button>
                          <Button size="small" onClick={() => enqueueSnackbar('Downloading ' + r.title, { variant: 'info' })}>Download</Button>
                        </Stack>
                      }
                    >
                      <ListItemText
                        primary={`${r.title} · Relevance ${r.relevance}% (p.${r.page})`}
                        secondary={r.preview}
                      />
                    </ListItem>
                  )
                })}
              </List>
            )}
          </Paper>
        </Box>
        <Box sx={{ width: { xs: '100%', md: 320 } }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Refine
            </Typography>
            <Stack spacing={1}>
              <TextField
                select
                label="Sort by"
                size="small"
                value={sort}
                onChange={(e) => {
                  const next = new URLSearchParams(params)
                  next.set('sort', e.target.value)
                  setParams(next)
                }}
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="date">Date</MenuItem>
              </TextField>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Exact match" />
              <FormControlLabel control={<Checkbox />} label="Show bookmarked" />
            </Stack>
          </Paper>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Recent Searches
            </Typography>
            <List dense>
              {recent.slice(0, 6).map((r) => (
                <ListItem key={r.ts} secondaryAction={<Button size="small" onClick={() => navigate(`/search?q=${encodeURIComponent(r.q)}`)}>Open</Button>}>
                  <ListItemText primary={r.q} />
                </ListItem>
              ))}
              {recent.length === 0 && <ListItem><ListItemText primary="No recent searches" /></ListItem>}
            </List>
          </Paper>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Bookmarks
            </Typography>
            <List dense>
              {bookmarks.slice(0, 6).map((b) => (
                <ListItem key={b.id} secondaryAction={<Button size="small" onClick={() => navigate(`/search?q=${encodeURIComponent(b.title)}`)}>Search</Button>}>
                  <ListItemText primary={b.title} />
                </ListItem>
              ))}
              {bookmarks.length === 0 && <ListItem><ListItemText primary="No bookmarks" /></ListItem>}
            </List>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  )
}
