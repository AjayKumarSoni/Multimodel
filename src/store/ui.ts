import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark'

type UiState = {
  mode: ThemeMode
  toggleMode: () => void
}

export const useUiStore = create<UiState>((set, get) => ({
  mode: ((): ThemeMode => {
    const saved = localStorage.getItem('themeMode') as ThemeMode | null
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })(),
  toggleMode: () => {
    const next = get().mode === 'light' ? 'dark' : 'light'
    localStorage.setItem('themeMode', next)
    set({ mode: next })
  },
}))
