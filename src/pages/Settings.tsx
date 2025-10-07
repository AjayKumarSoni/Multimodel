import { Box, Divider, List, ListItemButton, ListItemText, Paper, Stack, TextField, Typography, MenuItem, Switch, FormControlLabel, Slider, Button } from '@mui/material'
import { useState } from 'react'

const sections = [
  'General',
  'Search options',
  'Upload settings',
  'Storage',
  'Notifications',
  'Security',
  'Backup & restore',
  'Advanced',
]

export default function Settings() {
  const [sel, setSel] = useState('General')

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      <Paper sx={{ width: { xs: '100%', md: 260 }, p: 1 }}>
        <List>
          {sections.map((s) => (
            <ListItemButton key={s} selected={s === sel} onClick={() => setSel(s)}>
              <ListItemText primary={s} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
      <Box sx={{ flex: 1 }}>
        {sel === 'General' && <General />}
        {sel === 'Search options' && <SearchOptions />}
        {sel === 'Storage' && <Storage />}
        {/* Other sections can be added similarly */}
      </Box>
    </Stack>
  )
}

function General() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">General Settings</Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Box>
          <TextField select fullWidth label="Language" defaultValue="both">
            <MenuItem value="hi">Hindi</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="both">Both</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField select fullWidth label="Default theme" defaultValue="auto">
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="auto">Auto</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField select fullWidth label="Default search" defaultValue="hybrid">
            <MenuItem value="semantic">Semantic</MenuItem>
            <MenuItem value="keyword">Keyword</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField fullWidth label="Results per page" type="number" defaultValue={20} />
        </Box>
        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
          <FormControlLabel control={<Switch defaultChecked />} label="Auto-index new files" />
        </Box>
      </Box>
    </Paper>
  )
}

function SearchOptions() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Search Options</Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Box>
          <TextField select fullWidth label="Algorithm" defaultValue="hybrid">
            <MenuItem value="semantic">Semantic</MenuItem>
            <MenuItem value="keyword">Keyword</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField fullWidth label="Results count" type="number" defaultValue={50} />
        </Box>
        <Box>
          <Typography gutterBottom>Confidence score</Typography>
          <Slider defaultValue={75} valueLabelDisplay="auto" />
        </Box>
        <Box>
          <FormControlLabel control={<Switch defaultChecked />} label="Enable OCR" />
        </Box>
        <Box>
          <TextField fullWidth label="Transcription language" defaultValue="English" />
        </Box>
      </Box>
    </Paper>
  )
}

function Storage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Storage Management</Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Box>
          <TextField select fullWidth label="Compression" defaultValue="auto">
            <MenuItem value="off">Off</MenuItem>
            <MenuItem value="auto">Auto</MenuItem>
            <MenuItem value="max">Max</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField select fullWidth label="Archive" defaultValue="30d">
            <MenuItem value="never">Never</MenuItem>
            <MenuItem value="30d">30 days</MenuItem>
            <MenuItem value="90d">90 days</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
          <Button variant="outlined">Remove duplicates</Button>
          <Button variant="outlined" sx={{ ml: 1 }}>Clean temp files</Button>
        </Box>
      </Box>
    </Paper>
  )
}
