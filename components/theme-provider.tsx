'use client'

import * as React from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>('dark')

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem('cutflow-theme')
    const nextTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark'
    setThemeState(nextTheme)
  }, [])

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('cutflow-theme', theme)
  }, [theme])

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme: theme,
      setTheme: (nextTheme: Theme) => setThemeState(nextTheme),
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }

  return context
}
