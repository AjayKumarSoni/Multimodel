import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material'

export default function Help() {
  return (
    <Stack spacing={2}>
      <TextField placeholder="Search help..." fullWidth />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700}>Quick Links</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
              {['Video tutorials', 'User manual', 'FAQs', 'Live chat', 'Support contact'].map((l) => (
                <Button key={l} variant="outlined" size="small">{l}</Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700}>Popular Topics</Typography>
            <List dense>
              {['Searching PDFs', 'Image OCR', 'Audio transcription', 'Bookmarks', 'Notifications'].map((t) => (
                <ListItem key={t}>
                  <ListItemText primary={t} secondary="Hindi + English" />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Typography color="text.secondary">Troubleshooting guides and bilingual docs are available above.</Typography>
      </Box>
    </Stack>
  )
}
