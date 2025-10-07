import { Box, Paper, Stack, Typography, List, ListItem, ListItemText } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const lineData = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, searches: Math.round(50 + 30 * Math.sin(i / 5)) }))
const pieData = [
  { name: 'PDF', value: 45 },
  { name: 'Image', value: 30 },
  { name: 'Audio', value: 15 },
  { name: 'Other', value: 10 },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Analytics() {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Total Searches</Typography>
          <Typography variant="h4">12,345</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Avg Response</Typography>
          <Typography variant="h4">1.8s</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Storage Used</Typography>
          <Typography variant="h4">128 GB</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Active Users</Typography>
          <Typography variant="h4">58</Typography>
        </Paper>
      </Box>

      {/* Secondary cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>Files Indexed</Typography>
          <Typography variant="h5">42,780</Typography>
          <Typography variant="caption" color="text.secondary">+560 this week</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>Success Rate</Typography>
          <Typography variant="h5">98.2%</Typography>
          <Typography variant="caption" color="text.secondary">Last 7 days</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>Avg Storage per User</Typography>
          <Typography variant="h5">2.2 GB</Typography>
          <Typography variant="caption" color="text.secondary">Organization-wide</Typography>
        </Paper>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2 }}>
        <Paper sx={{ p: 2, height: 320 }}>
          <Typography variant="subtitle1" fontWeight={700}>30-day Search Trends</Typography>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="searches" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
        <Paper sx={{ p: 2, height: 320 }}>
          <Typography variant="subtitle1" fontWeight={700}>File Type Distribution</Typography>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90}>
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Top Queries */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={700}>Top Queries</Typography>
        <List>
          {[
            { q: 'policy update', n: 124 },
            { q: 'invoice', n: 96 },
            { q: 'meeting notes', n: 72 },
            { q: 'hiring plan', n: 55 },
            { q: 'customer calls', n: 41 },
          ].map((t) => (
            <ListItem key={t.q}>
              <ListItemText primary={t.q} secondary={`Frequency: ${t.n}`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={700}>Usage Heatmap</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(24, 1fr)', gap: 0.5, mt: 1 }}>
          {Array.from({ length: 7 * 24 }).map((_, i) => (
            <Box key={i} sx={{ aspectRatio: '1 / 1', bgcolor: `rgba(25,118,210,${Math.random() * 0.7 + 0.1})`, borderRadius: 0.5 }} />
          ))}
        </Box>
      </Paper>
    </Stack>
  )
}
