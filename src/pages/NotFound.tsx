import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h4" fontWeight={800}>404</Typography>
          <Typography variant="h6">Page not found</Typography>
          <Typography variant="body2" color="text.secondary">The page you are looking for doesn’t exist.</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={() => navigate('/')}>Go Home</Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>Go Back</Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}
