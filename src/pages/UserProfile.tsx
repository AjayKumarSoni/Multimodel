import { Avatar, Button, Card, CardContent, List, ListItem, ListItemText, Stack, Typography, Box } from '@mui/material'

export default function UserProfile() {
  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', md: 'center' }}>
            <Avatar sx={{ width: 80, height: 80 }}>U</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">User Name</Typography>
              <Typography color="text.secondary">Department · Role · user@example.com</Typography>
            </Box>
            <Box>
              <Button variant="outlined" sx={{ mr: 1 }}>Edit Profile</Button>
              <Button variant="outlined">Change Password</Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700}>Activity Stats</Typography>
            <List dense>
              <ListItem><ListItemText primary="Searches" secondary="1,240" /></ListItem>
              <ListItem><ListItemText primary="Uploads" secondary="350" /></ListItem>
              <ListItem><ListItemText primary="Bookmarks" secondary="48" /></ListItem>
              <ListItem><ListItemText primary="Time Saved" secondary="12h" /></ListItem>
            </List>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700}>Bookmarked Searches</Typography>
            <List dense>
              {['policy update', 'sales report Q2', 'support tickets'].map((b, i) => (
                <ListItem key={i} secondaryAction={<Button size="small">Search</Button>}>
                  <ListItemText primary={b} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  )
}
