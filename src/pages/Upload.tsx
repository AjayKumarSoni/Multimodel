import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Chip,
  Avatar,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import EmailIcon from '@mui/icons-material/Email'

export default function Upload() {
  const [queue, setQueue] = useState<{ name: string; progress: number; status: 'Pending' | 'Extracting' | 'Indexing' | 'Completed' | 'Failed' }[]>([])
  const { enqueueSnackbar } = useSnackbar()
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const items = acceptedFiles.map((f) => ({ name: f.name, progress: 0, status: 'Pending' as const }))
    setQueue((q) => [...q, ...items])
    // Simulate progress
    items.forEach((item) => {
      const start = Date.now()
      const timer = setInterval(() => {
        const elapsed = Date.now() - start
        const p = Math.min(100, Math.floor(elapsed / 50))
        setQueue((q) =>
          q.map((it) => (it.name === item.name ? { ...it, progress: p, status: p < 30 ? 'Extracting' : p < 90 ? 'Indexing' : 'Completed' } : it)),
        )
        if (p >= 100) {
          clearInterval(timer)
          enqueueSnackbar(`Upload completed: ${item.name}`, { variant: 'success' })
        }
      }, 100)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const folderInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (folderInputRef.current) {
      folderInputRef.current.setAttribute('webkitdirectory', '')
      folderInputRef.current.setAttribute('directory', '')
      folderInputRef.current.multiple = true
    }
  }, [])

  const rootStyles = useMemo(
    () => ({
      border: '2px dashed',
      borderColor: 'divider',
      borderRadius: 2,
      p: 6,
      textAlign: 'center',
      bgcolor: isDragActive ? 'action.hover' : 'transparent',
    }),
    [isDragActive],
  )

  return (
    <Stack spacing={3}>
      {/* Uploader Card */}
      <Paper
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(10px)',
          backgroundColor: (t) => (t.palette.mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(18,22,33,0.6)'),
          transition: 'all .2s',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            <CloudUploadIcon fontSize="small" />
          </Avatar>
          <Typography variant="h6" fontWeight={800}>Upload Files or Folders</Typography>
        </Stack>
        <Box
          {...getRootProps({ style: {} })}
          sx={{
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'divider',
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            bgcolor: isDragActive ? 'action.hover' : 'transparent',
            transition: 'all .2s',
            '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
          }}
        >
          <input {...getInputProps()} />
          <Stack spacing={1} alignItems="center">
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
              <FolderOpenIcon />
            </Avatar>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>Drag & drop files or folders here</Typography>
            <Typography variant="body2" color="text.secondary">or</Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="contained">Browse files</Button>
              <input
                type="file"
                ref={folderInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? [])
                  if (files.length) onDrop(files)
                }}
              />
              <Button variant="outlined" onClick={() => folderInputRef.current?.click()}>Browse folder</Button>
            </Stack>
          </Stack>
        </Box>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 2 }}>
          <TextField select label="Schedule" defaultValue="now" sx={{ minWidth: 200 }} size="small" InputProps={{ startAdornment: <ScheduleIcon fontSize="small" /> as any }}>
            <MenuItem value="now">Now</MenuItem>
            <MenuItem value="off-hours">Off-hours</MenuItem>
          </TextField>
          <TextField select label="Priority" defaultValue="normal" sx={{ minWidth: 200 }} size="small" InputProps={{ startAdornment: <PriorityHighIcon fontSize="small" /> as any }}>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </TextField>
          <FormControlLabel control={<Checkbox defaultChecked />} label={<Stack direction="row" spacing={0.5} alignItems="center"><EmailIcon fontSize="small" /> <span>Email notifications</span></Stack>} />
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained">Start Upload</Button>
        </Stack>
      </Paper>

      {/* Queue Card */}
      <Paper
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(10px)',
          backgroundColor: (t) => (t.palette.mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(18,22,33,0.6)'),
        }}
      >
        <Typography variant="subtitle1" fontWeight={800} gutterBottom>
          Upload Queue
        </Typography>
        <List>
          {queue.map((item) => (
            <ListItem key={item.name} sx={{ flexDirection: 'column', alignItems: 'stretch', mb: 1.5 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%', mb: 0.5 }}>
                <ListItemText primary={item.name} />
                <Chip
                  size="small"
                  label={item.status}
                  color={item.status === 'Completed' ? 'success' : item.status === 'Failed' ? 'error' : 'default'}
                  variant={item.status === 'Completed' ? 'filled' : 'outlined'}
                />
              </Stack>
              <LinearProgress variant="determinate" value={item.progress} sx={{ height: 8, borderRadius: 2 }} />
            </ListItem>
          ))}
          {queue.length === 0 && (
            <ListItem>
              <ListItemText primary="No items in queue yet." secondary="Drag files above to start uploads." />
            </ListItem>
          )}
        </List>
      </Paper>
    </Stack>
  )
}
