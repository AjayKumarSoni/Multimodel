import { create } from 'zustand'

export type RecentSearch = {
  q: string
  ts: number
}

export type Bookmark = {
  id: string
  title: string
}

type SearchState = {
  recent: RecentSearch[]
  bookmarks: Bookmark[]
  addRecent: (q: string) => void
  toggleBookmark: (b: Bookmark) => void
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export const useSearchStore = create<SearchState>((set) => ({
  recent: load<RecentSearch[]>('recent_searches', []),
  bookmarks: load<Bookmark[]>('bookmarks', []),
  addRecent: (q: string) => {
    const now = Date.now()
    const item: RecentSearch = { q: q.trim(), ts: now }
    set((s) => {
      const recent = [item, ...s.recent.filter((r) => r.q !== item.q)].slice(0, 10)
      localStorage.setItem('recent_searches', JSON.stringify(recent))
      return { recent }
    })
  },
  toggleBookmark: (b: Bookmark) => {
    set((s) => {
      const exists = s.bookmarks.some((x) => x.id === b.id)
      const bookmarks = exists ? s.bookmarks.filter((x) => x.id !== b.id) : [b, ...s.bookmarks]
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
      return { bookmarks }
    })
  },
}))
