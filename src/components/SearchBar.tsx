import { Box, TextField, InputAdornment, IconButton, Stack, MenuItem, Button, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MicIcon from '@mui/icons-material/Mic'
import ImageIcon from '@mui/icons-material/Image'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

export type AdvancedFilters = {
  fileType?: string
  dateFrom?: Dayjs | null
  dateTo?: Dayjs | null
  department?: string
}

export default function SearchBar(props: {
  placeholder?: string
  size?: 'small' | 'medium'
  fullWidth?: boolean
  elevated?: boolean
  onSearch?: (q: string, filters: AdvancedFilters) => void
}) {
  const { placeholder = 'Search anything...', size = 'medium', fullWidth = true, elevated = false, onSearch } = props
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState<AdvancedFilters>({ dateFrom: null, dateTo: null })

  const run = () => onSearch?.(q, filters)

  return (
    <Paper elevation={elevated ? 3 : 0} sx={{ p: 2, borderRadius: 2 }}>
      <Stack spacing={2}>
        <TextField
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          size={size}
          fullWidth={fullWidth}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" aria-label="voice search">
                  <MicIcon />
                </IconButton>
                <IconButton size="small" aria-label="image search">
                  <ImageIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') run()
          }}
        />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            select
            label="File type"
            value={filters.fileType ?? ''}
            onChange={(e) => setFilters((f) => ({ ...f, fileType: e.target.value }))}
            sx={{ minWidth: 180 }}
            size="small"
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="image">Image</MenuItem>
            <MenuItem value="audio">Audio</MenuItem>
            <MenuItem value="doc">Document</MenuItem>
          </TextField>
          <DatePicker
            label="From"
            value={filters.dateFrom}
            onChange={(v) => setFilters((f) => ({ ...f, dateFrom: v ?? dayjs() }))}
            slotProps={{ textField: { size: 'small' } }}
          />
          <DatePicker
            label="To"
            value={filters.dateTo}
            onChange={(v) => setFilters((f) => ({ ...f, dateTo: v ?? dayjs() }))}
            slotProps={{ textField: { size: 'small' } }}
          />
          <TextField
            select
            label="Department"
            value={filters.department ?? ''}
            onChange={(e) => setFilters((f) => ({ ...f, department: e.target.value }))}
            sx={{ minWidth: 180 }}
            size="small"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="hr">HR</MenuItem>
            <MenuItem value="engineering">Engineering</MenuItem>
          </TextField>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" onClick={run}>
            Search
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}
